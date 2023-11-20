require('dotenv').config();
const { faker } = require('@faker-js/faker');
const MongoClient = require('mongodb').MongoClient;
const _ = require('lodash');

async function main() {
  const url = process.env.MONGODB_ATLAS;
  const client = new MongoClient(url);

  try {
    await client.connect();

    const productsCollection = client
      .db('food-ordering')
      .collection('products');
    const categoriesCollection = client
      .db('food-ordering')
      .collection('categories');

    let categories = ['breakfast', 'lunch', 'dinner', 'drinks'].map(
      (category) => {
        return { name: category };
      }
    );
    await categoriesCollection.insertMany(categories);

    let imageUrls = [
      'https://res.cloudinary.com/djheoe7ya/image/upload/v1698815312/0Kbjfwunink_pmrbg7.jpg',
      'https://res.cloudinary.com/djheoe7ya/image/upload/v1698815312/0Kbjfwunink_pmrbg7.jpg',
      'https://res.cloudinary.com/djheoe7ya/image/upload/v1698815189/Sekm9_nC2BM_gl5uve.jpg',
      'https://res.cloudinary.com/djheoe7ya/image/upload/v1698815246/I90KYtZDi54_hohx8k.jpg',
      'https://res.cloudinary.com/djheoe7ya/image/upload/v1698815161/ykThMylLsbY_gt1erf.jpg'
    ];

    let products = [];
    for (let i = 0; i < 10; i += 1) {
      let newProduct = {
        name: faker.commerce.productName(),
        adjective: faker.commerce.productAdjective(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        category: _.sample(categories),
        imageUrl: _.sample(imageUrls)
      };
      products.push(newProduct);
    }
    await productsCollection.insertMany(products);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main();
