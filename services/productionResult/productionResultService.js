const serviceResponse = require('../../models/responses/serviceResponse')
const productionResultRepository = require('../../repositories/productionResultRepository')
const {getProductionResultArrObj, getProductionResultObj} = require('../../models/objects/productionResult')
const {buildCondition,fetchSortBy} = require('../../repositories/conditionBuilder/knexConditionBuilder')

const addProductionResult = async(productionResult)=>{
    try {
        var added = await productionResultRepository.save(productionResult)
        return added
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

        var paramsBuilder = await buildCondition(getProductionResultArrObj(),paramsQuery)

        var order = await fetchSortBy(paramsQuery)

        var prodRes = await productionResultRepository.findAll(paramsBuilder,order)

        prodRes.content = await validatePercentageResult(prodRes.content);

        return prodRes
    } catch (error) {
        return serviceResponse(500,error.message)
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
    getDetailMachineProgres
}