const dbConfig = require('../config/config')
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.databaseConfiguration);
const knex = require('knex').knex({
    client: 'mysql2',
    connection:{
        host: dbConfig.databaseConfiguration.host,
        port : dbConfig.databaseConfiguration.port,
        user : dbConfig.databaseConfiguration.username,
        password : dbConfig.databaseConfiguration.password,
        database : dbConfig.databaseConfiguration.database
    }
});

module.exports = {sequelize,knex}