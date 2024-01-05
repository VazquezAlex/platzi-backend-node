// Third-party imports.
const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const boom = require('@hapi/boom');

// Local imports.
const UserService = require('./../../../services/user.service');

const service = new UserService();

const LocalStrategy = new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            // We try to get the user with this email.
            const user = await service.findByEmail(email);

            // If no user is found, we return an error.
            if (!user) done(boom.unauthorized(), false);

            const passwordMatches = await bcrypt.compare(password, user.password);

            // If user password don't match the registered one, we send an error.
            if (!passwordMatches) done(boom.unauthorized(), false);

            // Delete the password from the response.
            delete user.dataValues.password;

            // If no error was catched, we log the user.
            done(null, user);
        } catch (e) {
            done(e, false);
        }
    }
);

module.exports = LocalStrategy;
