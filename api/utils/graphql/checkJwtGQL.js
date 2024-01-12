// Third-party imports.
const boom = require('@hapi/boom');

const checkJwtGQL = async (context) => {
    const { user } = await context.authenticate('jwt', { session: false });

    // We validate the user has a valid token.
    if (!user) throw boom.unauthorized('Your token is invalid.');

    return user;
}

module.exports = checkJwtGQL;
