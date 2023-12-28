// Third-party imports.
const express = require('express');
const routerAPI = require('./routes');

// Local imports.
const { logErrors, errorHandler } = require('./middlewares/error.handler');

// Create express app.
const app = express();

// Port to run at.
const port = 3005;

// Enable JSON on bodies.
app.use(express.json());

// Set up routers.
routerAPI(app);

// Error middlewares (must be used after routing);
app.use(logErrors);
app.use(errorHandler);

// Setup server port.
app.listen(port, () => {
    console.log('Server running on ', port);
});
