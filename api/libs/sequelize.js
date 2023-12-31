// Third-party imports.
const { Sequelize } = require('sequelize');

// Local imports.
const setupModels = require('../db/models');

// Variables for connection.
const USER = encodeURIComponent(process.env.DB_USER);
const PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);
const URI = `postgres://${USER}:${PASSWORD}@${ process.env.DB_HOST }:${ process.env.DB_PORT }/${ process.env.DB_NAME }`;

const sequelize = new Sequelize(URI, {
    dialect: 'postgres',
    logging: true,
});

// We setup the models with our sequilize object.
setupModels(sequelize);

// Syncs the model created to the database structure.
sequelize.sync();

module.exports = sequelize;
