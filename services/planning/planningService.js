const { newPlanningReq } = require('../../models/objects/plan')
const serviceResponse = require('../../models/responses/serviceResponse')
const dailyPlanningRepository = require('../../repositories/dailyPlanningRepository')
const monthlyPlanningRepository = require('../../repositories/monthlyPlanningRepository')
const { getPlanModel } = require('../../models/objects/planImport');
const {convertToJson} = require('../../utils/xlsxConverter')

const getPlanningList = async({period})=>{
    try {
        if(period == undefined){
            return serviceResponse(500,"Period is not defined, please choose daily/monthly")
        }

        if(period.toUpperCase() == 'DAILY'){
            return await dailyPlanningRepository.findAll()
        }else if(period.toUpperCase() == 'MONTHLY'){
            return await monthlyPlanningRepository.findAll()
        }

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
        var newProdutcionDate = new Date(newPlanning.production_date)
        if(isNaN(newProdutcionDate.getTime())){
            return serviceResponse(500,"invalid production date")
        }

        newPlanning.production_date = newProdutcionDate
        if(newPlanning.status != undefined){
            newPlanning.status = newPlanning.status.toUpperCase()
        }


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


const importPlanning = async (period,file)=>{
    try {
        var inserted = 0;
        var failed = 0;
        var messages = new Array()
        var planImportFormat = getPlanModel()

        var planObjArr = await convertToJson(file.data,planImportFormat)
        var counter = 1;
        for(let i = 0;i<=planObjArr.length-1;i++){
            var message = "data "+counter+" ";
            counter++;
            var newstartProd = new Date(planObjArr[i].start_production).getHours()
            var added = await addPlanning(period,planObjArr[i])
    
            if(added.code == 201){
                inserted++
            }else{
                failed++
            }

            message += added.message
            messages.push(message)
        }

        var response = {
            inserted,
            failed,
            data : planObjArr
        }
        return serviceResponse(200,messages,response)
        
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

module.exports = {
    getPlanningList,
    updatePlanning,
    getPlanningById,
    addPlanning,
    importPlanning
}