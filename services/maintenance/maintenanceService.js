const {newMaintenanceReq} = require('../../models/objects/maintenance')
const serviceResponse = require('../../models/responses/serviceResponse')
const maintenanceRepository = require('../../repositories/maintenanceRepository')

const getAllMaintenanceList = async (paramsQuery)=>{
    try {
        var params = (builder)=>{
            if(paramsQuery.line_number != undefined){
                builder.where('line_number',paramsQuery.line_number)
            }

            if(paramsQuery.dateFrom != undefined && paramsQuery.dateTo != undefined){
                builder.whereBetween('maintenance_date',[
                    new Date(paramsQuery.dateFrom),
                    new Date(paramsQuery.dateTo)
                ])
            }

            if(paramsQuery.desc != undefined){
                builder.whereILike('desc',"%"+paramsQuery.desc.toLowerCase()+"%")
            }

            if(paramsQuery.status != undefined){
                builder.where('status',paramsQuery.status)
            }
        }

        var maintenanceList = await maintenanceRepository.findAll(params);
        return maintenanceList
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const addMaintenance = async(maintenanceReq)=>{
    try {
        var maintenance = newMaintenanceReq(maintenanceReq)
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
        var maintenance = newMaintenanceReq(maintenanceReq)
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
    updatedMaintenance
}