// Third-party imports.
const boom = require('@hapi/boom');

// Local imports.
// const getConnection = require('../libs/postgres');
const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

    async create(data) {
        const res = await models.User.create(data);
        return res;
    }

    async find() {
        // const client = await getConnection();
        // const rta = await client.query('SELECT * FROM tasks');
        const rta = await models.User.findAll();
        return rta;
    }

    async findOne(id) {
        const user = await models.User.findByPk(id);
        if (!user) throw boom.notFound('user not found');

        return user;
    }

    async update(id, changes) {
        // Get the user.
        const user = await this.findOne(id);

        // Update the user.
        const res = user.update(changes);

        return res;
    }

    async delete(id) {
        const user = await this.findOne(id);
        await user.destroy();

        return id;
    }
}

module.exports = UserService;
