const baseResponse = require('../../models/responses/baseResponse');
const planningService = require('../../services/planning/planningService')

const getPlanningList = async(req,res,next)=>{
    var period = req.params
    var planningList  = await planningService.getPlanningList(period);
    res.status(planningList.code).send(baseResponse(planningList.message,planningList.content))
}

const updatePlanning = async(req,res,next)=>{
    var {id,period} = req.params
    var planningReq = req.body
    var updated = await planningService.updatePlanning(id,period,planningReq)
    res.status(updated.code).send(baseResponse(updated.message,updated.content))
}

const addPlanning = async(req,res,next)=>{
    var {period} = req.params
    var planning = req.body
    var added = await planningService.addPlanning(period,planning);
    res.status(added.code).send(baseResponse(added.message,added.content))
}

module.exports = {
    getPlanningList,
    updatePlanning,
    addPlanning
}