// Third party imports.
const boom = require("@hapi/boom");

const checkRolesGQL = (user, ...roles) => {
    if (!roles.includes(user.role)) throw boom.unauthorized(`You don't have permission to perform this action.`);
}

module.exports = checkRolesGQL;
