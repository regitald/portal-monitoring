const serviceResponse = require("../../models/responses/serviceResponse")
const lineNumberService = require('../../services/lineNumber/lineNumberService')

const getMachineKpi = async()=>{
    try {
        var newMachineList = []
        var machines = await lineNumberService.getLineNumbers()
        return machines
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

module.exports = {
    getMachineKpi
}