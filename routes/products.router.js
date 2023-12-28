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

router.post('/', (req, res) => {
    const body = req.body;

    res.json({
        message: 'created',
        data: body,
    })
});

router.patch('/:id', (req, res) => {
    const body = req.body;
    const { id } = req.params;

    res.json({
        message: 'updated',
        data: body,
        id,
    })

});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    res.json({
        message: 'updated',
        id,
    })

});

// Export the router.
module.exports = router;
