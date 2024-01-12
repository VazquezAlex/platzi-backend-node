const {
    addProduct,
    deleteProduct,
    product,
    products,
    updateProduct,
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
        deleteProduct,
        updateProduct,
    }
}

module.exports = resolvers;
