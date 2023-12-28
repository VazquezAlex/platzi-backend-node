// Third-party imports.
const express = require('express');
const faker = require('faker');

// Create the router.
const router = express.Router();

router.get('/', (req, res) => {
    const products = [];
    const { size } = req.query;

    const limit = size || 10;

    for (let i = 0; i < limit; i++) {
        products.push({
            name: faker.commerce.productName(),
            price: parseInt(faker.commerce.price(), 10),
            image: faker.image.imageUrl(),

        });
    }

    res.status(200).json({
        items: products.length,
        products
    });
});


// Export the router.
module.exports = router;
