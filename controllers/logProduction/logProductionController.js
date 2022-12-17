const baseResponse = require('../../models/responses/baseResponse')
const logProductionService = require('../../services/logProduction/logProductionService')
const importLogProduction = async(req,res,next)=>{
    try {
        var {file} = req.files
        var importLogProd = await logProductionService.importLogProduction(file)
        res.status(importLogProd.code).send(baseResponse(importLogProd.message,importLogProd.content))
    } catch (error) {
        res.status(500).send(baseResponse(error.message))
    }
}

module.exports = {
    importLogProduction
}