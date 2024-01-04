const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(20);
const price = Joi.number().positive().integer();
const description = Joi.string();
const image = Joi.string().uri();

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    description: description.required(),
    image: image.required(),
});

const updateProductSchema = Joi.object({
    name: name,
    price: price,
    image: image,
    description: description,
});

const getProductSchema = Joi.object({
    id: id.required(),
});

module.exports = {
    createProductSchema,
    getProductSchema,
    updateProductSchema,
}
