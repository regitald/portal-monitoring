const baseResponse = require("../../models/responses/baseResponse")
const { update } = require("../../repositories/maintenanceRepository")

const maintenanceService = require('../../services/maintenance/maintenanceService')

const getMaintenanceList = async(req,res,next)=>{
    try {
        var params = req.query
        var maintenanceList = await maintenanceService.getAllMaintenanceList(params)
        res.status(maintenanceList.code).send(baseResponse(maintenanceList.message,maintenanceList.content))
    } catch (error) {
        res.status(500).send(baseResponse(error.message))
    }
}

const addMaintenance = async(req,res,next)=>{
    try {
        var maintenance = req.body 
        var added = await maintenanceService.addMaintenance(maintenance)
        res.status(added.code).send(baseResponse(added.message))
    } catch (error) {
        res.status(500).send(baseResponse(error.message))
    }
}

const updatedMaintenance = async(req,res,next)=>{
    try {
        var id = req.params
        var maintenance = req.body
        var updated = await maintenanceService.updatedMaintenance(id,maintenance)
        res.status(updated.code).send(baseResponse(updated.message))
    } catch (error) {
        res.status(500).send(baseResponse(error.message))
    }
}

module.exports = {
    getMaintenanceList,
    addMaintenance,
    updatedMaintenance
}