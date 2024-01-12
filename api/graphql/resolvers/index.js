const {
    addProduct,
    product,
    products
} = require('./product.resolvers');

const resolvers = {
    Query: {
        // Product Solvers
        product,
        products
    },
    Mutation: {
        // Product Mutations.
        addProduct,
    }
}

module.exports = resolvers;
