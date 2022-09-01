const dbConfig = require('../config/config')
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.development);

module.exports = sequelize