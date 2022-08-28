const dbConfig = require('../config/config')
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.development);
var models = require('../models/mysql/init-models').initModels(sequelize)

module.exports = models