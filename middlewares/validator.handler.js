// Third-party imports.
const boom = require("@hapi/boom");

function validatorHandler(schema, property) {
    return (req, res, next) => {
        const data = req[property];
        const { error } = schema.validate(data, { abortEarly: false });

        // If there is an error we send it to the error middlewares.
        if (error) next(boom.badRequest(error));

        // If no error, we pass to the next middleware.
        next();
    }
}

module.exports = validatorHandler;
