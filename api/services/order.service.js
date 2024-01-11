// Third-party imports.
const boom = require('@hapi/boom');

// Local imports.
const { models } = require('./../libs/sequelize');

class OrderService {

  constructor(){ }

  async create(userId) {

    // Get customer by user's id.
    const customer = await models.Customer.findOne({
        where: {
            '$user.id$': userId,
        },
        include: ['user'],
    });

    // If we cannot find the customer, throw an error.
    if (!customer) throw boom.badRequest('Customer not found');

    // If we have a customer, create the new order.
    return await models.Order.create({
        customerId: customer.id,
    });
  }

  async addItem(data) {
    return await models.OrderProduct.create(data);
  }

  async find() {
    return await models.Order.findAll({
        include: [
            {
                association: 'customer',
                include: ['user']
            }
        ],
    });
  }

  async findOne(id) {
    return await models.Order.findByPk(id, {
        include: [
            {
                association: 'customer',
                include: ['user'],
            },
            {
                association: 'items'
            }
        ]
    });
  }

  async findByUser(id) {
    const orders = await models.Order.findAll({
        where: {
            '$customer.user.id$': id
        },
        include: [
            {
                association: 'customer',
                include: ['user']
            },
        ]
    });

    return orders;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
