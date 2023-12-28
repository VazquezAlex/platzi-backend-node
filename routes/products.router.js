// Third-party imports.
const express = require('express');

// Local imports.
const ProductService = require('../services/product.service');

// Create the router and instance service.
const router = express.Router();
const service = new ProductService();

router.get('/', async (req, res) => {
    const products = await service.find();

    res.status(200).json({
        items: products.length,
        products
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await service.findOne(id);

    res.status(200).json({
        product,
    });
});

router.post('/', async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);

    res.status(201).json({
        message: 'created',
        data: newProduct,
    })
});

router.patch('/:id', async (req, res) => {
    try {
        const body = req.body;
        const { id } = req.params;

        const updatedProduct = await service.update(id, body);

        res.json({
            message: 'updated',
            data: updatedProduct
        });
    } catch(e) {
        res.status(404).json({
            message: e.message,
        });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    const deletedProduct = await service.delete(id);

    res.json({
        message: 'updated',
        ...deletedProduct,
    })

});

// Export the router.
module.exports = router;
