
// Local imports.
const CategoryService = require('./../../services/category.service');
const checkRolesGQL = require('../../utils/graphql/checkRolesGQL');
const checkJwtGQL = require('../../utils/graphql/checkJwtGQL');

// Create instance of category service.
const service = new CategoryService();

const addCategory = async (_, { dto }, context) => {
    // Check JWT is valid.
    const user = await checkJwtGQL(context);

    // Check if role has permission to perform.
    checkRolesGQL(user, 'admin');

    // Execute and return the process.
    return service.create({
        ...dto,
        image: dto.image.href
    });
}

module.exports = {
    addCategory,
}
