// Third-party imports.
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: `${process.cwd()}/.env`});

// Local imports.
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const routerAPI = require('./routes');
const { checkApiKey } = require('./middlewares/auth.handler');

// Create express app.
const app = express();

// Port to run at.
const port = process.env.PORT || 3005;

// Enable JSON on bodies.
app.use(express.json());

// Enable cors with middleware.
const whiteList = ['http://localhost:8080', 'http://localhost:3000'];
const options = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not Allowed'));
        }
    }
}
app.use(cors(options));

// Mock route to protect.
app.get(
    '/',
    checkApiKey,
    (req, res) => {
        res.json({
            message: 'Access succesful'
        })
    }
);

// Set up routers.
routerAPI(app);

// Error middlewares (must be used after routing);
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Setup server port.
app.listen(port, () => {
    console.log('Server running on ', port);
});
