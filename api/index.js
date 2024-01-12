// Local imports.
const createApp = require("./app");

(async () => {
    // Port to run at.
    const port = process.env.PORT || 3005;

    // Create the app.
    const app = await createApp();

    // Setup server port.
    app.listen(port, () => {
        console.log('Server running on ', port);
    });
})()
