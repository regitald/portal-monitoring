const { newPlanningReq } = require('../../models/objects/plan')
const serviceResponse = require('../../models/responses/serviceResponse')
const dailyPlanningRepository = require('../../repositories/dailyPlanningRepository')
const monthlyPlanningRepository = require('../../repositories/monthlyPlanningRepository')

const getPlanningList = async()=>{
    try {
        var moList = await dailyPlanningRepository.findAll()
        return moList
    } catch (error) {
        return serviceResponse(500,error.meesage)
    }
}

const getPlanningById = async(period,id)=>{
    try {
        var mo = await dailyPlanningRepository.findById()
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const addPlanning = async(period,planning)=>{
    try {
        var newPlanning = newPlanningReq(planning);
        newPlanning.status = newPlanning.status.toUpperCase()

        if(period.toUpperCase() === 'DAILY' ){
            var maxOrderId =await dailyPlanningRepository.findMaxOrderId(
                {
                    production_date : newPlanning.production_date,
                    part_category: newPlanning.part_category,
                    line_number: newPlanning.line_number
                }
            )
            if(maxOrderId.content != null){
                newPlanning.order_id = maxOrderId.content[0].maxOrderId + 1
            }else{
                newPlanning.order_id = 1
            }

            return await dailyPlanningRepository.save(newPlanning);

        }else if(period.toUpperCase() === 'MONTHLY'){
            var maxOrderId =await monthlyPlanningRepository.findMaxOrderId(
                {
                    production_date : newPlanning.production_date,
                    part_category: newPlanning.part_category,
                    line_number: newPlanning.line_number
                }
            )
            if(maxOrderId.content != null){
                newPlanning.order_id = maxOrderId.content[0].maxOrderId + 1
            }else{
                newPlanning.order_id = 1
            }
            return await monthlyPlanningRepository.save(newPlanning);
        }else{
            return serviceResponse(400,"period not defined/recognize, please chose daily or monthly")
        }

    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const updatePlanning = async(id,period,newPlanning)=>{
    try {
        newPlanning.production_date = new Date(newPlanning.production_date);
        newPlanning.status = newPlanning.status.toUpperCase();

        if(period.toUpperCase() === 'DAILY'){
            return await dailyPlanningRepository.update(id,newPlanning);
        }else if(period.toUpperCase() === 'MONTHLY'){
            return await monthlyPlanningRepository.update(id,newPlanning);
        }else{
            return serviceResponse(400,"period not defined/recognize, please chose daily or monthly")
        }

    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

module.exports = {
    getPlanningList,
    updatePlanning,
    getPlanningById,
    addPlanning
}