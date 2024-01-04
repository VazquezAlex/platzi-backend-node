// Local imports.
const { Customer, CustomerSchema } = require('./customer.model');
const { User, UserSchema } = require('./user.model');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Customer.init(CustomerSchema, Customer.config(sequelize));

    // Run associations (to set relationships).
    User.associate(sequelize.models);
    Customer.associate(sequelize.models);
}

module.exports = setupModels;
