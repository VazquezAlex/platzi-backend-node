// Local imports.
const ProductService = require("../../services/product.service")

const service = new ProductService();

const product = async (_, { id }) => {
    return await service.findOne(id);
}

const products = async () => {
    return await service.find({});
}


module.exports = {
    product,
    products,
}
