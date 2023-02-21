const { getPlanObj, getPartCategoryEnum } = require('../../models/objects/plan')
const serviceResponse = require('../../models/responses/serviceResponse')
const dailyPlanningRepository = require('../../repositories/dailyPlanningRepository')
const monthlyPlanningRepository = require('../../repositories/monthlyPlanningRepository')
const { getPlanArrObj } = require('../../models/objects/plan');
const {convertToJson} = require('../../utils/xlsxConverter')
const {getHourAndMinutesFromDate,getDateFromDateTime, getRoundedDateFromDateTime} =  require('../../utils/dateUtils')
const {buildCondition,fetchSortBy} = require('../../repositories/conditionBuilder/knexConditionBuilder')
const lineNumberRepository = require('../../repositories/lineNumbersRepository');
const { getLineNumbers } = require('../lineNumber/lineNumberService');

const getPlanningList = async(period,paramsQuery)=>{
    try {
        if(period == undefined){
            return serviceResponse(500,"Period is not defined, please choose daily/monthly")
        }

        if(paramsQuery.sort == undefined){
            paramsQuery.sort = 'id,desc'
        }

        var paramsBuilder = await buildCondition(getPlanArrObj(),paramsQuery)

        var order = await fetchSortBy(paramsQuery)

        if(period.toUpperCase() == 'DAILY'){
            return await dailyPlanningRepository.findAll(paramsBuilder,order)
        }else if(period.toUpperCase() == 'MONTHLY'){
            return await monthlyPlanningRepository.findAll(paramsBuilder,order)
        }else{
            return serviceResponse(400,"plan period required")
        }

    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const getPlanningById = async(period,id)=>{
    try {

        if(period.toUpperCase() == 'DAILY'){
            return await dailyPlanningRepository.findById(id)

        }else if(period.toUpperCase() == 'MONTHLY'){
            return await monthlyPlanningRepository.findById(id)
        }else{
            return serviceResponse(500,"period not recognized")
        }

    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const addPlanning = async(period,planning)=>{
    try {
        var newPlanning = getPlanObj(planning);
        if(isNaN(new Date(newPlanning.production_date).getTime())){
            return serviceResponse(500,"invalid production date")
        }

        newPlanning.production_date = await getDateFromDateTime(new Date(newPlanning.production_date))
        if(newPlanning.status != undefined){
            newPlanning.status = newPlanning.status.toUpperCase()
        }

        let noMo = ""

        if(period.toUpperCase() === 'DAILY' ){
            noMo = await generateDailyNoMo(newPlanning)

            var maxOrderId =await dailyPlanningRepository.findMaxOrderId(
                {
                    production_date : newPlanning.production_date,
                    part_category: newPlanning.part_category,
                    line_number: newPlanning.line_number
                }
            )
            if(maxOrderId.code == 200){
                if(maxOrderId.content != null){
                    if(maxOrderId.content.length > 0){
                        newPlanning.order_id = maxOrderId.content[0].maxOrderId + 1

                    }else{
                        newPlanning.order_id = 1                        
                    }
                }else{
                    newPlanning.order_id = 1
                }
            }else{
                return serviceResponse(500,"error find order id")
            }

            newPlanning.no_mo = noMo != null ? noMo : "";
            return await dailyPlanningRepository.save(newPlanning);

        }else if(period.toUpperCase() === 'MONTHLY'){
            noMo = await generateMontlyNoMo(newPlanning)

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

            newPlanning.no_mo = noMo != null ? noMo : "";

            return await monthlyPlanningRepository.save(newPlanning);
        }else{
            return serviceResponse(400,"period not recognize, please chose daily or monthly")
        }

    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const updatePlanning = async(id,period,newPlanning)=>{
    try {
        newPlanning.production_date = await getDateFromDateTime(new Date(newPlanning.production_date))
        newPlanning.status = newPlanning.status.toUpperCase();

        if(period.toUpperCase() === 'DAILY'){
            return await dailyPlanningRepository.update(id,newPlanning);
        }else if(period.toUpperCase() === 'MONTHLY'){
            return await monthlyPlanningRepository.update(id,newPlanning);
        }else{
            return serviceResponse(400,"period not recognize, please chose daily or monthly")
        }

    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const getGraphicPlan = async(paramsQuery)=>{
    try {
        var responses = []
        var machineList = await lineNumberRepository.findAll()

        for(let machine of machineList.content){
            var lineNumber = machine.type +"/"+machine.name
            paramsQuery.line_number = lineNumber

            var params = await buildCondition(getPlanArrObj(),paramsQuery)
    
            var plans = await dailyPlanningRepository.findAll(params,[]);

            if(plans.code != 200){
                throw new Error(plans.message)
            }
            
            var data = []
            
            for(let plan of plans.content){
                var filteredPlan = await filterPlanGraphicRespnse(plan)
                data.push(filteredPlan)
            }

            responses.push({
                line_number : lineNumber,
                data
            })
        }

        return serviceResponse(200,"success",responses)
        
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const filterPlanGraphicRespnse = async(plan)=>{
    try {
        return {
            no_mo: plan.no_mo,
            production_date : plan.production_date,
            start_production : plan.start_production,
            finish_production : plan.finish_production,
            status : plan.status,
            work_hour : plan.work_hour,
	    part_name : plan.part_name
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

const importPlanning = async (period,file)=>{
    try {
        var inserted = 0;
        var failed = 0;
        var messages = new Array()
        var planImportFormat = getPlanArrObj()
        var partNameEnum = getPartCategoryEnum()

        var planObjArr = await convertToJson(file.data,planImportFormat)
        var counter = 1;
        var planAddedArr = []
        var planFailedArr = []
        for(let i = 0;i<=planObjArr.length-1;i++){
            try {
                var message = "data "+counter+" ";
                counter++;
    
                var planObj = planObjArr[i]
    
                if(!partNameEnum.includes(planObj.part_category)){
                    throw new Error("Part category invalid")
                }

                var productionDate = new Date(planObj.production_date)

                if(isNaN(productionDate.getTime())){
                    throw new Error("Production date invalid")
                }

                var lineNumbers = (await getLineNumbers()).content

                if(!lineNumbers.includes(planObj.line_number)){
                    throw new Error("Line Number invalid")
                }
    
                var newStartProd = await getHourAndMinutesFromDate(planObj.start_production)
                var newFinishProd = await getHourAndMinutesFromDate(planObj.finish_production)
                
                planObj.start_production = newStartProd
                planObj.finish_production = newFinishProd
                planObj.production_date = await getRoundedDateFromDateTime(
                    planObj.production_date
                )
                                    
                var added = await addPlanning(period,planObj)
        
                if(added.code == 201){
                    inserted++
                    planAddedArr.push(added.content)
                }else{
                    failed++
                }
                message += added.message
                messages.push(message)   
            } catch (error) {
                planFailedArr.push(planObj)
                failed++
                messages.push(error.message)   
            }
        }

        var response = {
            inserted,
            failed,
            data : {
                inserted: planAddedArr,
                failed : planFailedArr
            }
        }
        return serviceResponse(200,messages,response)
        
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const generateDailyNoMo = async(planning)=>{
    try {
        let prodDate = new Date(planning.production_date)
        let firstDay = new Date(prodDate.getFullYear(),prodDate.getMonth(),1)
        let lastDay = new Date(prodDate.getFullYear(), prodDate.getMonth() + 1,0);

        let params = {
            production_date_from : firstDay,
            production_date_to : lastDay,
            line_number : planning.line_number,
        }

        let date = planning.production_date.split("-")

        let day = date[2]
        let month = date[1]
        let year = date[0]
        let lineNumberStart = planning.line_number.substring(0,3);
	let lineNoaja = planning.line_number.split("/")[1];
   	let inc = 1

        var paramsBuilder = await buildCondition(getPlanArrObj(),params)
        let mo = await dailyPlanningRepository.findAll(paramsBuilder,[])
        if(mo.content.length > 0){
            inc = mo.content.length + 1
        }

        let noMo =  day+"/"+month+"/"+year+"/"+lineNumberStart.toUpperCase()+"/"+lineNoaja+"/"+inc

        return noMo;

    } catch (error) {
        return null
    }
}

const generateMontlyNoMo = async(planning)=>{
    try {
        let prodDate = new Date(planning.production_date)
        let firstDay = new Date(prodDate.getFullYear(),prodDate.getMonth(),1)
        let lastDay = new Date(prodDate.getFullYear(), prodDate.getMonth() + 1,0);

        let params = {
            production_date_from : firstDay,
            production_date_to : lastDay,
            line_number : planning.line_number,
        }
        let today = new Date().getDate()
        let month = new Date().getMonth()
        let year = new Date().getFullYear()
        let lineNumberStart = planning.line_number.substring(0,3);
        let inc = 1

        var paramsBuilder = await buildCondition(getPlanArrObj(),params)
        let mo = await monthlyPlanningRepository.findAll(paramsBuilder,[])
        if(mo.content == null){
            inc = mo.content.size() + 1
        }

        let noMo = today+"/"+month+1+"/"+year+"/"+lineNumberStart.toUpperCase()+"/"+inc

        return noMo;

    } catch (error) {
        return error
    }
}

module.exports = {
    getPlanningList,
    updatePlanning,
    getPlanningById,
    addPlanning,
    importPlanning,
    getGraphicPlan
}
