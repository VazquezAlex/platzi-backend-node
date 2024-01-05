// Third-party imports.
const express = require('express');

// Local imports.
const { getProductSchema, createProductSchema, updateProductSchema, queryProductSchema } = require('../schemas/product.schema');
const ProductService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');

// Create the router and instance service.
const router = express.Router();
const service = new ProductService();

router.get('/',
    validatorHandler(queryProductSchema, 'query'),
    async (req, res) => {
        const products = await service.find(req.query);

        res.status(200).json({
            items: products.length,
            products
        });
    }
);

router.get('/:id',
    validatorHandler(getProductSchema, 'params'), // We run the validation middleware before, the router middleware.
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const product = await service.findOne(id);

            res.status(200).json({
                product,
            });
        } catch (e) {
            next(e);
        }
    }
);

router.post('/',
    validatorHandler(createProductSchema, 'body'),
    async (req, res) => {
        const body = req.body;
        const newProduct = await service.create(body);

        res.status(201).json({
            message: 'created',
            data: newProduct,
        })
    }
);

router.patch('/:id',
    validatorHandler(getProductSchema, 'params'),
    validatorHandler(updateProductSchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const { id } = req.params;

            const updatedProduct = await service.update(id, body);

            res.json({
                message: 'updated',
                data: updatedProduct
            });
        } catch(e) {
            next(e);
        }
    }
);

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
