require('dotenv').config();
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connection to database successful!');
  })
  .catch((err) => {
    console.log({ error: err.message });
  });

const db = mongoose.connection;

module.exports = db;
