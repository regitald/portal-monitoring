var shiftTimesRepository = require('../../repositories/shiftTimesRepository')
const {buildCondition} = require('../../repositories/conditionBuilder/knexConditionBuilder')
const {gteShiftTimesArrObj} = require('../../models/objects/shift_times')
const serviceResponse = require('../../models/responses/serviceResponse')

const getShifTimeByShiftAndMode = async (paramsQuery)=>{
    try {
        var params = await buildCondition(gteShiftTimesArrObj(),paramsQuery)
        var shiftTimes = await shiftTimesRepository.getShiftTimeByShiftAndMode(params)
        return shiftTimes
    } catch (error) {
        return serviceResponse(500,error.message)
    }

}

module.exports = {
    getShifTimeByShiftAndMode
}