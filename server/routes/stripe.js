require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const Order = require('../models/orderModel');
const router = express.Router();

const baseUrl = 'http://localhost:3000';

router.post('/create-checkout-session', async (req, res) => {
  const customer = await stripe.customers.create({
    metadata: {
      userId: req.body.userId,
      cart: JSON.stringify(req.body.cartItems)
    }
  });
  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.imageUrl],
          description: item.description,
          metadata: {
            id: item.id
          }
        },
        unit_amount: item.price * 100
      },
      quantity: item.quantity
    };
  });

  const session = await stripe.checkout.sessions.create({
    shipping_address_collection: {
      allowed_countries: ['US', 'CA', 'NG']
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency: 'usd'
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5
            },
            maximum: {
              unit: 'business_day',
              value: 7
            }
          }
        }
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 1500,
            currency: 'usd'
          },
          display_name: 'Next day air',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 1
            },
            maximum: {
              unit: 'business_day',
              value: 1
            }
          }
        }
      }
    ],
    phone_number_collection: {
      enabled: true
    },
    customer: customer.id,
    line_items,
    mode: 'payment',
    success_url: `${baseUrl}/payment-success`,
    cancel_url: `${baseUrl}/cart`
  });

  res.send({ url: session.url });
});

// CREATE ORDER
const createOrder = async (customer, data) => {
  const Items = JSON.parse(customer.metadata.cart);
  const products = Items.map((item) => {
    return {
      productId: item._id,
      quantity: item.quantity,
      name: item.name,
      price: item.price,
      category: item.category,
      adejective: item.adjective,
      description: item.description,
      image: item.imageUrl
    };
  });

  const newOrder = new Order({
    userId: customer.metadata.userId,
    customerId: data.customer,
    paymentIntentId: data.payment_intent,
    products: products,
    subtotal: data.amount_subtotal,
    total: data.amount_total,
    customer_email: customer.email,
    customer_phone: customer.phone,
    shipping: data.shipping_details,
    payment_status: data.payment_status
  });

  try {
    const savedOrder = await newOrder.save();
    console.log('Processed Order:', savedOrder);
    // Email notification here
  } catch (err) {
    console.log(err);
  }
};

// STRIPE WEBHOOK

// Expose an endpoint as a webhook handler for asynchronous events.
router.post('/webhook', async (req, res) => {
  let data, eventType;

  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers['stripe-signature'];
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // we can retrieve the event data directly from the request body.
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the event
  if (eventType === 'checkout.session.completed') {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        createOrder(customer, data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    console.log('Session completed');
  } else if (eventType === 'payment_intent.created') {
    console.log('Payment intent created');
  } else if (eventType === 'charge.succeeded') {
    console.log('Charge taken!');
  } else if (eventType === 'payment_intent.payment_failed') {
    console.log('❌ Payment failed.');
  } else if (eventType === 'payment_intent.succeeded') {
    console.log('💰 Payment captured!');
  } else {
    console.log(`Unhandled event type ${eventType}`);
  }
  res.sendStatus(200);
});

const calculateOrderAmount = (orderItems) => {
  const initialValue = 0;
  const itemsPrice = orderItems.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.price * currentValue.quantity,
    initialValue
  );
  return itemsPrice;
};

router.post('/create-payment-intent', async (req, res) => {
  try {
    const { orderItems, shippingAddress, userId, paymentMethodType } = req.body;

    const totalPrice = calculateOrderAmount(orderItems);
    const taxPrice = 0;
    const shippingPrice = 0;

    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethodType,
      totalPrice,
      taxPrice,
      shippingPrice,
      userId
    });

    await order.save();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: 'usd',
      payment_methods_types: [paymentMethodType]
    });

    res.json({
      clientSecret: paymentIntent.client_secret
    });
  } catch (e) {
    console.error(e);
    res.status(400).json({
      error: { message: e.message }
    });
  }
});

module.exports = router;
