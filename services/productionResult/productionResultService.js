const serviceResponse = require('../../models/responses/serviceResponse')
const productionResultRepository = require('../../repositories/productionResultRepository')
const {getProductionResultArrObj, getProductionResultObj} = require('../../models/objects/productionResult')
const {buildCondition,fetchSortBy} = require('../../repositories/conditionBuilder/knexConditionBuilder')
const lineNumberRepository = require('../../repositories/lineNumbersRepository')

const addProductionResult = async(productionResult)=>{
    try {
        var added = await productionResultRepository.save(productionResult)
        return added
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const getProductionResultById = async(id)=>{
    try {
        var prodRes = await productionResultRepository.findById(id)
        prodRes.content = await validatePercentageResult(prodRes.content)
        return prodRes;
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const getDetailMachineProgres = async(paramsQuery)=>{
    try {
        var {
            date,
            data_length
        } = paramsQuery
        var responses = []

        if(data_length != undefined){
            if(date != undefined){
                var to = new Date(date)
            }else{
                var to = new Date()
            }

            var from = new Date()
            from.setDate(to.getDate() - data_length)
            paramsQuery.production_date_to = to
            paramsQuery.production_date_from = from
        }

        var machineList = await lineNumberRepository.findAll();

        for(let machine of machineList.content){
            var lineNumber = machine.type +"/"+machine.name
            paramsQuery.line_number = lineNumber

            var paramsBuilder = await buildCondition(getProductionResultArrObj(),paramsQuery)
            var order = await fetchSortBy(paramsQuery)
            var prodResults = await productionResultRepository.findAll(paramsBuilder,order)

            if(prodResults.code != 200){
                throw new Error(plans.message)
            }
            
            var data = []
            prodResults.content = await validatePercentageResult(prodResults.content);
            for(let prodRes of prodResults.content){
                var filtered = await filterPlanGraphicRespnse(prodRes)
                data.push(filtered)
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

const filterPlanGraphicRespnse = async(obj)=>{
    try {
        return {
            no_mo: obj.no_mo,
            production_date : obj.production_date,
            start_production : obj.start_production,
            finish_production : obj.finish_production,
            status : obj.status
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

const validatePercentageResult = async(content)=>{
    try {
        var newContent = []
        for(let prodRes of content){
            var newProdRes = getProductionResultObj(prodRes)
            newProdRes.oee = Number(newProdRes.oee).toFixed(2)
            newProdRes.availability = Number(newProdRes.availability).toFixed(2)
            newProdRes.performance = Number(newProdRes.performance).toFixed(2)
            newProdRes.quality = Number(newProdRes.quality).toFixed(2)
            newProdRes.achievement = Number(newProdRes.achievement).toFixed(2)
            newContent.push(newProdRes)
        }
        return newContent
    } catch (error) {
        throw new Error(error.message)   
    }
}

module.exports = {
    addProductionResult,
    getDetailMachineProgres,
    getProductionResultById
}