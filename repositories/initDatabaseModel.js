const sequelize = require('./iniDbConnection')
var models = require('../models/mysql/init-models').initModels(sequelize)

module.exports = models