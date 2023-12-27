// Third-party imports.
const express = require('express');

// Create express app.
const app = express();

// Port to run at.
const port = 3005;

app.get('/', (req, res) => {
    res.send('Hello, express listening');
});

// Setup server port.
app.listen(port, () => {
    console.log('Server running on ', port);
});
