// Third-party imports.
const express = require('express');

// Local imports.
const productsRouter = require("./products.router")
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const ordersRouter = require('./orders.router');

function routerAPI(app) {
    const router = express.Router();
    app.use('/api/v1', router);

    router.use('/products', productsRouter);
    router.use('/users', usersRouter);
    router.use('/categories', categoriesRouter);
    router.use('/orders', ordersRouter);
}

module.exports = routerAPI;
