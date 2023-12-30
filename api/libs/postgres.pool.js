// Third-party imports.
const { Pool } = require('pg');

const USER = encodeURIComponent(process.env.DB_USER);
const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const URI = `postgres://${USER}:${PASSWORD}@${ process.env.DB_HOST }:${ process.env.DB_PORT }/${ process.env.DB_NAME }`;

const pool = new Pool({ connectionString: URI })

/**
 * Creates a connection pool to postgres.
 * This is an explicit connection, were we specified each item.
*/
// const pool = new Pool({
//     host: process.env.DB_HOST,
//     port: process.env.DB_PORT,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME
// });

module.exports =  pool;
