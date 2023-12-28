
// Note: To be an error type of middleware, we MUST include the 4 params.
function logErrors(error, req, res, next) {
    console.log(error);

    // We pass the error to the next middleware.
    next(error);
}

function errorHandler(error, req, res, next) {
    // We send the error response to the user.
    res.status(500).json({
        message: error.message,
        stack: error.stack,
    })
}

module.exports = {
    errorHandler,
    logErrors,
}
