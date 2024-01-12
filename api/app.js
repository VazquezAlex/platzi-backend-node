// Third-party imports.
const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: `${process.cwd()}/.env`});

// Local imports.
const { checkApiKey } = require('./middlewares/auth.handler');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const routerAPI = require('./routes');
const useGraphQL = require('./graphql');
require('./utils/auth');


const createApp = () => {

    // Create express app.
    const app = express();

    // Enable JSON on bodies.
    app.use(express.json());

    // Enable cors with middleware.
    const whiteList = ['http://localhost:8080', 'http://localhost:3000', 'http://localhost:3005'];
    const options = {
        origin: (origin, callback) => {
            if (whiteList.includes(origin) || !origin) {
                callback(null, true);
            } else {
                callback(new Error('Host Not Allowed'));
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

    // Set up the GraphQL server.
    useGraphQL(app);

    // Error middlewares (must be used after routing);
    app.use(logErrors);
    app.use(ormErrorHandler);
    app.use(boomErrorHandler);
    app.use(errorHandler);

    return app;

}

module.exports = createApp;
