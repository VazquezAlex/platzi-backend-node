// Local imports.
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { User, UserSchema } = require('./user.model');
const { Order, OrderSchema } = require('./order.model');
const { OrderProduct, OrdersProductsSchema } = require('./order-product.model');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));
    Category.init(CategorySchema, Category.config(sequelize));
    Product.init(ProductSchema, Product.config(sequelize));
    Order.init(OrderSchema, Order.config(sequelize));
    OrderProduct.init(OrdersProductsSchema, OrderProduct.config(sequelize));

    // Run associations (to set relationships).
    User.associate(sequelize.models);
    Customer.associate(sequelize.models);
    Category.associtate(sequelize.models);
    Product.associate(sequelize.models);
    Order.associate(sequelize.models);
}

module.exports = setupModels;
