const dbConfig = require('../config/config')
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.development);
const knex = require('knex').knex({
    client: 'mysql2',
    connection:{
        host: dbConfig.development.host,
        port : dbConfig.development.port,
        user : dbConfig.development.username,
        password : dbConfig.development.password,
        database : dbConfig.development.database
    }
});

module.exports = {sequelize,knex}