
// Local imports.
const CategoryService = require('./../../services/category.service');

// Create instance of category service.
const service = new CategoryService();

const addCategory = (_, { dto }) => {

    return service.create(dto);

}

module.exports = {
    addCategory,
}
