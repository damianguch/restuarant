require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const express = require('express');
const router = express.Router();

const baseUrl = 'http://localhost:3000';

router.post('/create-checkout-session', async (req, res) => {
  const line_items = req.body.cartItems.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.imageUrl],
          description: item.description
        },
        unit_amount: item.price * 100
      },
      quantity: item.amount
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: `${baseUrl}/payment-success`,
    cancel_url: `${baseUrl}/cart`
  });

  res.send({ url: session.url });
});

module.exports = router;
