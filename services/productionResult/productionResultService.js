const serviceResponse = require('../../models/responses/serviceResponse')
const productionResultRepository = require('../../repositories/productionResultRepository')
const {getProductionResultArrObj} = require('../../models/objects/productionResult')
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
        return prodRes
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

module.exports = {
    addProductionResult,
    getDetailMachineProgres
}