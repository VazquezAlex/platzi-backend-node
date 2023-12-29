// Third-party imports.
const { Client } = require('pg');

/**
 * Method in charge of connecting NodeJS project to Postgres DB on Docker.
 *
 * @async
 */
async function getConnection() {

    const client = new Client({
        host: 'localhost',
        port: 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });

    await client.connect();

    return client;
}

module.exports = getConnection;
