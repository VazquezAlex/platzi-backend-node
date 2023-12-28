// Third-party imports.
const express = require('express');
const routerAPI = require('./routes');

// Create express app.
const app = express();

// Port to run at.
const port = 3005;

// Enable JSON on bodies.
app.use(express.json());

// Set up routers.
routerAPI(app);

// Setup server port.
app.listen(port, () => {
    console.log('Server running on ', port);
});
