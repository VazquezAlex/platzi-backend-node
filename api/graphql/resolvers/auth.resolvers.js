// Third-party imports.
const boom = require('@hapi/boom');

// Local imports.
const AuthService = require('./../../services/auth.service');

// Instantiate auth service.
const service = new AuthService();

const login = async (_, { email, password }, context) => {
    const { user } = await context.authenticate('graphql-local', {email, password});

    if (!user) throw boom.unauthorized();

    const signedToken = service.signToken(user);

    return {
        user,
        accessToken: signedToken
    };
}

module.exports = {
    login,
}
