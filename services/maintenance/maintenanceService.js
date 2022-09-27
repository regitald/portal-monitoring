const {getMaintenanceArrObj,getMaintenanceObj} = require('../../models/objects/maintenance')
const serviceResponse = require('../../models/responses/serviceResponse')
const maintenanceRepository = require('../../repositories/maintenanceRepository')
const {fetchSortBy,buildCondition} = require('../../repositories/conditionBuilder/knexConditionBuilder')


const getMaintenanceById = async(id)=>{
    try {
        var maintenance = await maintenanceRepository.findById(id)
        return maintenance
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const getAllMaintenanceList = async (paramsQuery)=>{
    try {

        var order =await fetchSortBy(paramsQuery)
        var params =await buildCondition(getMaintenanceArrObj(),paramsQuery)
        
        var maintenanceList = await maintenanceRepository.findAll(params,order);
        return maintenanceList
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const addMaintenance = async(maintenanceReq)=>{
    try {
        var maintenance = getMaintenanceObj(maintenanceReq)
        maintenance.maintenance_date = new Date(maintenance.maintenance_date)
        maintenance.created_at = new Date()

        var added = await maintenanceRepository.save(maintenance);
        return added
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const updatedMaintenance = async(id,maintenanceReq)=>{
    try {
        var maintenance = getMaintenanceObj(maintenanceReq)
        maintenance.maintenance_date = new Date(maintenance.maintenance_date)
        maintenance.updated_at = new Date()

        var updated = await maintenanceRepository.update(id,maintenance);
        return updated
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}


module.exports = {
    getAllMaintenanceList,
    addMaintenance,
    updatedMaintenance,
    getMaintenanceById
}