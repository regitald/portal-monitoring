require('dotenv').config()
const dbConfig = require('./config.json')

const development = dbConfig.development;
development.host = process.env.DB_HOST
development.database = process.env.DB_NAME
development.username = process.env.DB_USERNAME
development.password = process.env.DB_PASSWORD
development.dialect = 'mysql'

module.exports = {
    development
}
