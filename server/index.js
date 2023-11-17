require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const productRouter = require('./routes/productRouter');
const Order = require('./models/Order');
const stripeRouter = require('./routes/stripe');
const app = express();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

var corsOptions = {
  origin: 'http://localhost:3000'
};

const calculateOrderAmount = (orderItems) => {
  const initialValue = 0;
  const itemsPrice = orderItems.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.price * currentValue.quantity,
    initialValue
  );
  return itemsPrice * 100;
};

app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/webhook')) {
        req.rawBody = buf.toString();
      }
    }
  })
);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/', productRouter);
app.use('/api/', stripeRouter);

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
app.post('/webhook', async (req, res) => {
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
    // Funds have been captured
    // Fulfill any orders, e-mail receipts, etc
    console.log('❌ Payment failed.');
  } else if (eventType === 'payment_intent.succeeded') {
    console.log('💰 Payment captured!');
  } else {
    console.log(`Unhandled event type ${eventType}`);
  }
  res.sendStatus(200);
});

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { orderItems, shippingAddress, userId } = req.body;

    const totalPrice = calculateOrderAmount(orderItems);
    const taxPrice = 0;
    const shippingPrice = 0;

    const order = new Order({
      orderItems,
      shippingAddress,
      paymentMethod: 'stripe',
      totalPrice,
      taxPrice,
      shippingPrice,
      user: ''
    });

    //await order.save();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalPrice,
      currency: 'usd'
    });

    res.send({
      clientSecret: paymentIntent.client_secret
    });
    console.log(clientSecret);
  } catch (e) {
    res.status(400).json({
      error: {
        message: e.message
      }
    });
  }
});

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Food Ordering' });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
