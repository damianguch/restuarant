const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.post('/register', (req, res) => {
  const { name, email, firebase_id } = req.body;

  const user = new User({
    name,
    email,
    firebase_id
  });

  user.save((err, user) => {
    if (err) {
      res.status(400).send({ error: err });
    } else {
      const { _id, email, isAdmin, name } = user;
      res.status(200).send({
        data: {
          _id,
          email,
          isAdmin,
          name
        }
      });
    }
  });
});

module.exports = router;
