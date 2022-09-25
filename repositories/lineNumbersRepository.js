const serviceResponse = require('../models/responses/serviceResponse')
const {knex} = require('./iniDbConnection')

const findAll = async()=>{
    try {
        var lineNumbers = await knex('line_numbers')
        return serviceResponse(200,"",lineNumbers)
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

module.exports = {
    findAll
}
