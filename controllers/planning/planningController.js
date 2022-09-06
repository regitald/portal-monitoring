const baseResponse = require('../../models/responses/baseResponse');
const planningService = require('../../services/planning/planningService')

const getPlanningList = async(req,res,next)=>{
    var moList  = await planningService.getPlanningList();
    res.status(moList.code).send(baseResponse(moList.message,moList.content))
}

const updatePlanning = async(req,res,next)=>{
    var id = req.params
    var moReq = req.body
    var updated = await planningService.updatePlanning(id,moReq)
    res.status(updated.code).send(baseResponse(updated.message,updated.content))
}

const addPlanning = async(req,res,next)=>{
    var planning = req.body
    var planningAdded = await planningService.addPlanning(planning);
    res.status(planningAdded.code).send(baseResponse(planningAdded.message,planningAdded.content))
}

module.exports = {
    getPlanningList,
    updatePlanning,
    addPlanning
}