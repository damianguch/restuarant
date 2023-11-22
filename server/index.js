require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
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

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
