const {getMaintenanceArrObj,getMaintenanceObj} = require('../../models/objects/maintenance')
const serviceResponse = require('../../models/responses/serviceResponse')
const maintenanceRepository = require('../../repositories/maintenanceRepository')
const {fetchSortBy,buildCondition} = require('../../repositories/conditionBuilder/knexConditionBuilder')
const { convertToJson } = require('../../utils/xlsxConverter')
const { getRoundedDateFromDateTime } = require('../../utils/dateUtils')


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

        var newResponses = []

        for(object of maintenanceList.content){
            var newResponse = {}
            newResponse.title = object.line_number
            newResponse.start = object.maintenance_date
            if(object.status == 'open'){
                newResponse.color = '#448bcb'
            }else if(object.status == 'on_progress'){
                newResponse.color = '#1ea711'
            }else if(object.status == 'done'){
                newResponse.color = '#8b8b8b';
            }
            newResponses.push(newResponse);
        }

        maintenanceList.content = newResponses

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

const importMaintenance = async(file)=>{
    try {
        var inserted = 0;
        var failed = 0;
        var messages = []
        var resData = []
        var model = getMaintenanceArrObj();
        var maintenances = await convertToJson(file.data,model)
        var counter = 0
        for(let maintenance of maintenances){
            var message = "data "+counter+" ";

            maintenance.maintenance_date = await getRoundedDateFromDateTime(
                new Date(maintenance.maintenance_date))
            var added = await addMaintenance(maintenance)
            if(added.code == 201){
                inserted++;
            }else{
                failed++
            }
            message += added.message
            messages.push(message)
            resData.push(maintenance)
            counter++
        }
        var response = {
            inserted,
            failed,
            data : resData
        }
        return serviceResponse(201,messages,response)
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}


module.exports = {
    getAllMaintenanceList,
    addMaintenance,
    updatedMaintenance,
    getMaintenanceById,
    importMaintenance
}