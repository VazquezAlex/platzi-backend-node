const {
    product,
    products
} = require('./product.resolvers');

const resolvers = {
    Query: {
        // Product Solvers
        product,
        products
    },
}

module.exports = resolvers;
