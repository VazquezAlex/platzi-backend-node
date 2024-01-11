// Third-party imports.
const express = require('express');
const passport = require('passport');

// Local imports.
const { addItemSchema, createOrderSchema, getOrderSchema } = require('../schemas/order.schema');
const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
    try {
        const orders = await service.find();
        res.status(200).json({
            items: orders.length,
            data: orders
        });
    } catch (e) {
        next(e);
    }
});

router.get('/:id',
    validatorHandler(getOrderSchema, 'params'),
    async (req, res, next) => {
        try {
            const order = await service.findOne(req.params.id);
            res.status(200).json({
                order
            });
        } catch (e) {
            next(e);
        }
    }
);

router.post('/',
    passport.authenticate('jwt', { session: false }),
    validatorHandler(createOrderSchema, 'body'),
    async (req, res, next) => {
        try {
            const order = await service.create(req.user.sub);
            res.status(200).json({
                order
            });
        } catch (e) {
            next(e);
        }
    },
);

router.post('/add-item',
    validatorHandler(addItemSchema, 'body'),
    async (req, res, next) => {
        try {
            const order = await service.addItem(req.body);
            res.status(200).json({
                order
            });
        } catch (e) {
            next(e);
        }
    },
);

module.exports = router;
