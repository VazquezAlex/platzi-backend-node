// Third-party imports.
const boom = require('@hapi/boom');

// Local imports.
const CategoryService = require('./../../services/category.service');

// Create instance of category service.
const service = new CategoryService();

const addCategory = async (_, { dto }, context) => {
    const { user } = await context.authenticate('jwt', { session: false });

    // We validate the user has a valid token.
    if (!user) throw boom.unauthorized('Your token is invalid.');

    return service.create(dto);
}

module.exports = {
    addCategory,
}
