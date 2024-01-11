// Third-party imports.
const express = require('express');
const passport = require('passport');

// Local imports.
const CategoryService = require('./../services/category.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/category.schema');
const { checkRoles } = require('././../middlewares/auth.handler');

const router = express.Router();
const service = new CategoryService();
const protectRoute = passport.authenticate('jwt', { session: false });

router.get('/',
    protectRoute,
    checkRoles('admin', 'seller', 'customer'),
    async (req, res, next) => {
        try {
            const categories = await service.find();
            res.json(categories);
        } catch (error) {
            next(error);
        }
}
);

router.get('/:id',
    protectRoute,
    checkRoles('admin', 'seller', 'customer'),
    validatorHandler(getCategorySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const category = await service.findOne(id);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/',
    protectRoute,
    checkRoles('admin'),
    validatorHandler(createCategorySchema, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const newCategory = await service.create(body);
            res.status(201).json(newCategory);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/:id',
    protectRoute,
    checkRoles('admin', 'seller'),
    validatorHandler(getCategorySchema, 'params'),
    validatorHandler(updateCategorySchema, 'body'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            const body = req.body;
            const category = await service.update(id, body);
            res.json(category);
        } catch (error) {
            next(error);
        }
    }
);

router.delete('/:id',
    protectRoute,
    validatorHandler(getCategorySchema, 'params'),
    async (req, res, next) => {
        try {
            const { id } = req.params;
            await service.delete(id);
            res.status(201).json({id});
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
