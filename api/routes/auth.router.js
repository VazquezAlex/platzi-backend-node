// Third-party imports.
const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Create the router.
const router = express.Router();

router.post('/login',
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user;

            // Prepare payload for token.
            const payload = {
                sub: user.id,
                role: user.role,
            }

            // Generate token.
            const token = jwt.sign(payload, process.env.JWT_SECRET);

            res.json({
                user,
                token,
            });
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
