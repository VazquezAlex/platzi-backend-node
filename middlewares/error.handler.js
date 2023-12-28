
// Note: To be an error type of middleware, we MUST include the 4 params.

/**
 * Error middleware to log our errors on the console.
 */
function logErrors(error, req, res, next) {
    console.log(error);

    // We pass the error to the next middleware.
    next(error);
}

/**
 * Handle generic errors not created through boom.
 */
function errorHandler(err, req, res, next) {
    // We send the error response to the user.
    res.status(500).json({
        message: err.message,
        stack: err.stack,
    })
}

/**
 * Handle boom errors.
 */
function boomErrorHandler(err, req, res, next) {
    if (err.isBoom) {
        const { output } = err;
        res.status(output.statusCode).json(output.payload);
    } else {
        next (err);
    }
}

module.exports = {
    boomErrorHandler,
    errorHandler,
    logErrors,
}
