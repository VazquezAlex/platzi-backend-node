// Third-party imports.
const { Pool } = require('pg');

/**
 * Creates a connection pool to postgres.
*/
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports =  pool;
