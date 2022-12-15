const baseResponse = require('../../models/responses/baseResponse')
const logProductionService = require('../../services/logProduction/logProductionService')
const importLogProduction = async(req,res,next)=>{
    try {
        var {file} = req.files
        var importLogProd = await logProductionService.importLogProduction(file)
        res.status(200).send("test")
    } catch (error) {
        res.status(500).send(baseResponse(error.message))
    }
}

module.exports = {
    importLogProduction
}