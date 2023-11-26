require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./db/index');
const productRouter = require('./routes/productRouter');
const userRouter = require('./routes/userRouter');
const stripeRouter = require('./routes/stripe');
const app = express();

var corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith('/api/webhook')) {
        req.rawBody = buf.toString();
      }
    }
  })
);

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/', productRouter);
app.use('/api/', userRouter);
app.use('/api/', stripeRouter);

// Connection error
db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// Connection disconnected
db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Close the MongoDB connection when the Node.js process is terminated
process.on('SIGINT', () => {
  db.close(() => {
    console.log('MongoDB connection closed due to application termination');
    process.exit(0);
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
