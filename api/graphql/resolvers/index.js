const {
    addProduct,
    deleteProduct,
    product,
    products,
    updateProduct,
} = require('./product.resolvers');

const {
    login
} = require('./auth.resolvers');

const resolvers = {
    Query: {
        // Product Solvers
        product,
        products
    },
    Mutation: {
        // Auth Mutations.
        login,
        // Product Mutations.
        addProduct,
        deleteProduct,
        updateProduct,
    }
}

module.exports = resolvers;
