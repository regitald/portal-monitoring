const baseResponse = require('../../models/responses/baseResponse')
const machineKpiService = require('../../services/machineKpi/machineKpiService')
const getMachineKpi = async(req,res,next)=>{
    try {
        var machineKpi = await machineKpiService.getMachineKpi()
        res.status(machineKpi.code).send(baseResponse(machineKpi.message,machineKpi.content))
    } catch (error) {
        res.status(500).send(baseResponse(error.message))
    }
}

module.exports = {
    getMachineKpi
}