// Third-party imports.
const { GraphQLLocalStrategy } = require('graphql-passport');

// Local imports.
const AuthService = require('../../../services/auth.service');

// Start auth service.
const service = new AuthService();

const GQLLocalStrategy = new GraphQLLocalStrategy(
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

module.exports = GQLLocalStrategy;
