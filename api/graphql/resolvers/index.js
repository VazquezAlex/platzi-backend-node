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

const {
    addCategory
} = require('./category.resolvers');

const resolvers = {
    Query: {
        // Product Solvers
        product,
        products
    },
    Mutation: {
        // Auth Mutations.
        login,

        // Category Mutations.
        addCategory,

        // Product Mutations.
        addProduct,
        deleteProduct,
        updateProduct,
    }
}

module.exports = resolvers;
