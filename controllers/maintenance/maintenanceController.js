const baseResponse = require("../../models/responses/baseResponse")
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

const getMaintenanceById = async(req,res,next)=>{
    try {
        var {id} = req.params
        var maintenance = await maintenanceService.getMaintenanceById(id)
        res.status(maintenance.code).send(baseResponse(maintenance.message,maintenance.content))
    } catch (error) {
        res.status(500).send(baseResponse(error.message))
    }
}

const importMaintenance = async(req,res,next)=>{
    try {
        var {file} = req.files
        var importMaintenance = await maintenanceService.importMaintenance(file)
        res.status(importMaintenance.code).send(baseResponse(importMaintenance.message,importMaintenance.content))
    } catch (error) {
        res.status(500).send(baseResponse(error.message))
    }
}

module.exports = {
    getMaintenanceList,
    addMaintenance,
    updatedMaintenance,
    getMaintenanceById,
    importMaintenance
}