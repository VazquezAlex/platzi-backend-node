// Local imports.
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { User, UserSchema } = require('./user.model');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));

    // Run associations (to set relationships).
    User.associate(sequelize.models);
    Customer.associate(sequelize.models);
    Category.associtate(sequelize.models);
    Product.associtate(sequelize.models);
}

module.exports = setupModels;
