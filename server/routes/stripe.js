require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
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

module.exports = router;
