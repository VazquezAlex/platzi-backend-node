// Third-party imports.
const { Strategy } = require('passport-local');

// Local imports.
const AuthService = require('./../../../services/auth.service');

const service = new AuthService();

const LocalStrategy = new Strategy(
    {
        usernameField: 'email',
        passwordField: 'password',
    },
    async (email, password, done) => {
        try {
            const user = await service.getUser(email, password);

            // If no error was catched, we log the user.
            done(null, user);
        } catch (e) {
            done(e, false);
        }
    }
);

module.exports = LocalStrategy;
