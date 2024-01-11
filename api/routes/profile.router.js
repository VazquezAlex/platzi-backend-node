// Third-party imports.
const express = require('express');
const passport = require('passport');

// Local imports.
const OrderService = require('./../services/order.service');

const router = express.Router();
const protectRoute = passport.authenticate('jwt', { session: false });
const service = new OrderService();

router.get('/my-orders',
    protectRoute,
    async (req, res, next) => {
        try {
            const orders = await service.findByUser(req.user.sub);

            res.json({
                items: orders.length,
                data: {
                    orders
                }
            })
        } catch(e) {
            next(e);
        }
    }
);

module.exports = router;
