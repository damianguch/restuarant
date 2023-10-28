const express = require('express');
const router = express.Router();
const Product = require('../models/productModel');

router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.get('/products-by-categories', async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $match: {} },
      {
        $group: {
          _id: '$category',
          products: { $push: '$$ROOT' }
        }
      },
      { $project: { name: '$_id', products: 1, _id: 0 } }
    ]);
    res.status(200).send({ data: products });
  } catch (err) {
    res.status(400).send({ error: err });
  }
});

router.get('/products/search', (req, res) => {
  const searchTerm = req.query.q;

  if (!searchTerm) {
    return res.status(400).json({ error: 'Search term is required' });
  }

  Product.find(
    { name: { $regex: searchTerm, $options: 'i' } },
    (err, products) => {
      if (err) {
        return res.status(500).json({ error: 'An error occurred' });
      }
      res.status(200).send({ data: products });
      //res.json(products);
    }
  );
});

module.exports = router;
