// Third-party imports.
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

// Local imports.
// const getConnection = require('../libs/postgres');
const { models } = require('./../libs/sequelize');

class UserService {
  constructor() {}

    async create(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const res = await models.User.create({
            ...data,
            password: hashedPassword
        });
        delete res.dataValues.password;
        return res;
    }

    async find() {
        // const client = await getConnection();
        // const rta = await client.query('SELECT * FROM tasks');
        const rta = await models.User.findAll({
            include: ['customer']
        });

        return rta;
    }

    async findByEmail(email) {
        const rta = await models.User.findOne({
            where: { email }
        });

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
