// Third-party imports.
const express = require('express');
const passport = require('passport');

// Local imports.
const AuthService = require('./../services/auth.service');

// Create the router and service.
const router = express.Router();
const service = new AuthService();

router.post('/login',
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user;
            const token = service.signToken(user);

            res.json({
                user,
                token,
            });
        } catch (error) {
            next(error);
        }
    }
);

router.post('/recover',
    async (req, res, next) => {
        try {
            const { email } = req.body;
            const response = await service.sendRecovery(email);

            res.json(response);
        } catch(e) {
            next(e);
        }
    }
);

router.post('/change-password',
    async (req, res, next) => {
        try {
            const { token, newPassword } = req.body;

            const response = await service.changePassword(token, newPassword);

            res.json(response);
        } catch (e) {
            next(e);
        }
    }
);

module.exports = router;
