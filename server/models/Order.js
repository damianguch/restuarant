const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: false },
    customerId: {
      type: String
    },
    paymentIntentId: {
      type: String
    },
    products: [
      {
        productId: {
          type: String
        },
        quantity: {
          type: Number,
          default: 1
        },
        name: {
          type: String
        },
        price: {
          type: String
        },
        category: {
          type: String
        },
        adejective: {
          type: String
        },
        description: {
          type: String
        },
        image: { type: String }
      }
    ],
    subtotal: { type: Number, required: true },
    total: { type: Number, required: true },
    shipping: { type: Object, required: true },
    customer_phone: {
      type: String,
      required: true
    },
    customer_email: {
      type: String,
      required: true
    },
    delivery_status: { type: String, default: 'pending' },
    payment_status: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
