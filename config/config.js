require('dotenv').config()
const config = require('./config.json')

var databaseConfiguration = config.development;

if(process.env.env === 'production'){
    databaseConfiguration = config.production;
}else if(process.env.env === 'development'){
    databaseConfiguration = config.development
}else if(process.env.env === 'local'){
    databaseConfiguration = config.test;
}

module.exports = {
    databaseConfiguration
}
