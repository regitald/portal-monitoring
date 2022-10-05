const productionResultService = require('../../services/productionResult/productionResultService')
const baseResponse = require('../../models/responses/baseResponse')

const addProductionResult = async(req,res,next)=>{
    try {
        var added = await  productionResultService.addProductionResult(req.body)
        res.status(added.code).send(baseResponse(added.message,added.content))
    } catch (error) {
        res.status(500).send(baseResponse(error.message))
    }
}

const getProductionResult = async(req,res,next)=>{
    try {
        var prodRes = await productionResultService.getDetailMachineProgres(req.query)
        res.status(prodRes.code).send(baseResponse(prodRes.message,prodRes.content))
    } catch (error) {
        res.status(500).send(baseResponse(error.message))
    }
}

const getProductionResultById = async(req,res,next)=>{
    try {
        var {id} = req.params
        var prodRes = await productionResultService.getProductionResultById(id)
        res.status(prodRes.code).send(baseResponse(prodRes.message,prodRes.content))
    } catch (error) {
        res.status(500).send(baseResponse(error.message))
    }
}

module.exports = {
    addProductionResult,
    getProductionResult,
    getProductionResultById
}