
const { models } = require('./../libs/sequelize');

class OrderService {

  constructor(){
  }

  async create(data) {
    return await models.Order.create(data);
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
            }
        ]
    });
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
