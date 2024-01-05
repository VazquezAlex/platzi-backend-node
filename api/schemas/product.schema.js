const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const price = Joi.number().positive().integer();
const description = Joi.string();
const image = Joi.string().uri();
const categoryId = Joi.number();

const limit = Joi.number().min(1);
const offset = Joi.number();

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    description: description.required(),
    image: image.required(),
    categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
    name: name,
    price: price,
    image: image,
    description: description,
    categoryId: categoryId,
});

const getProductSchema = Joi.object({
    id: id.required(),
});

const queryProductSchema = Joi.object({
    limit,
    offset,
})

module.exports = {
    createProductSchema,
    getProductSchema,
    updateProductSchema,
    queryProductSchema,
}
