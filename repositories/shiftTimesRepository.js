const serviceResponse = require('../models/responses/serviceResponse')
const {knex} = require('./iniDbConnection')

const getShiftTimeByShiftAndMode =async (params) => {
    try {
        var shiftTimes = await knex('shift_times').where(params);
        return serviceResponse(200,"success",shiftTimes)
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

module.exports = {
    getShiftTimeByShiftAndMode
}