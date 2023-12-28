// Third-party imports.
const express = require('express');

// Local imports.
const ProductService = require('../services/product.service');

// Create the router and instance service.
const router = express.Router();
const service = new ProductService();

router.get('/', (req, res) => {
    const products = service.find();

    res.status(200).json({
        items: products.length,
        products
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = service.findOne(id);

    res.status(200).json({
        product,
    });
});

router.post('/', (req, res) => {
    const body = req.body;
    const newProduct = service.create(body);

    res.status(201).json({
        message: 'created',
        data: newProduct,
    })
});

router.patch('/:id', (req, res) => {
    const body = req.body;
    const { id } = req.params;

    const updatedProduct = service.update(id, body);

    res.json({
        message: 'updated',
        data: updatedProduct
    })

});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const deletedProduct = service.delete(id);

    res.json({
        message: 'updated',
        ...deletedProduct,
    })

});

// Export the router.
module.exports = router;
