// Third-party imports.
const faker = require('faker');
const boom = require('@hapi/boom');
const { Op } = require('sequelize');

// Local imports.
const { models } = require('./../libs/sequelize');

class ProductService {

    constructor() {
        this.products = [];
        this.generate();
        // this.pool = pool;
        // this.pool.on('error', (err) => console.error(err));
    }

    async generate() {
        const limit = 100;

        for (let i = 0; i < limit; i++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                price: parseInt(faker.commerce.price(), 10),
                image: faker.image.imageUrl(),
                isBlocked: faker.datatype.boolean(),
            });
        }
    }

    async create(data) {
        const newProduct = await models.Product.create(data);
        return newProduct;
    }

    async find(query) {
        // const query = 'SELECT * FROM tasks';
        // const [data] = await sequelize.query(query);

        const options = {
            include: [{ all: true }],
            where: {},
        }

        const { limit, offset, price_min, price_max } = query;

        if (limit && offset) {
            options.limit = limit;
            options.offset = offset;
        }

        if (price_min && price_max) {
            options.where.price = {
                [Op.gte]: price_min,
                [Op.lte]: price_max,
            };
        }

        const data = await models.Product.findAll(options);

        return data;
    }

    async findOne(id) {
        const product = this.products.find(item => item.id === id);
        if (!product) throw boom.notFound('Product not found');
        if (product.isBlocked) throw boom.conflict('Product is blocked');
        return product;
    }

    async update(id, changes) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw boom.notFound('Product not found');
        }

        this.products[index] = {
            ...this.products[index],
            ...changes
        };

        return this.products[index];
    }

    async delete(id) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error('product not found');
        }

        this.products.splice(index, 1);

        return { id }
    }

}

module.exports = ProductService;
