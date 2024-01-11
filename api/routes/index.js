// Third-party imports.
const express = require('express');

// Local imports.
const authRouter = require('./auth.router');
const categoriesRouter = require('./categories.router');
const customersRouter = require('./customers.router');
const ordersRouter = require('./orders.router');
const productsRouter = require("./products.router")
const profileRouter = require('./profile.router');
const usersRouter = require('./users.router');

function routerAPI(app) {
    const router = express.Router();
    app.use('/api/v1', router);

    router.use('/auth', authRouter);
    router.use('/categories', categoriesRouter);
    router.use('/customers', customersRouter);
    router.use('/orders', ordersRouter);
    router.use('/profile', profileRouter);
    router.use('/products', productsRouter);
    router.use('/users', usersRouter);
}

module.exports = routerAPI;
