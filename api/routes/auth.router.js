// Third-party imports.
const express = require('express');
const passport = require('passport');

// Create the router.
const router = express.Router();

router.post('/login',
    passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            res.json(req.user);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;
