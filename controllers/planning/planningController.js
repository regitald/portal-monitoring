const baseResponse = require('../../models/responses/baseResponse');
const planningService = require('../../services/planning/planningService')

const getPlanningList = async(req,res,next)=>{
    var {period} = req.params
    var paramsQuery = req.query
    var planningList  = await planningService.getPlanningList(period,paramsQuery);
    res.status(planningList.code).send(baseResponse(planningList.message,planningList.content))
}

const getPlanningById = async(req,res,next)=>{
    try {
        var {period,id} = req.params
        var plan = await planningService.getPlanningById(period,id)
        res.status(plan.code).send(baseResponse(plan.message,plan.content))   
    } catch (error) {
        res.status(500).send(baseResponse(error.message))
    }
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

const importPlanning = async(req,res,next)=>{
    try {
        var {module} = req.body
        var {file} = req.files
        var addPlan = await planningService.importPlanning(module,file)
        res.status(addPlan.code).send(baseResponse(addPlan.message,addPlan.content))
    } catch (error) {
        res.status(500).send(baseResponse(error.message))
    }
}

const getGraphicPlan = async(req,res,next)=>{
    try {
        var graphicPlan = await planningService.getGraphicPlan(req.query)
        res.status(graphicPlan.code).send(baseResponse(graphicPlan.message,graphicPlan.content))
    } catch (error) {
        res.status(500).send(baseResponse(error.message))
    }
}

module.exports = {
    getPlanningList,
    updatePlanning,
    addPlanning,
    importPlanning,
    getPlanningById,
    getGraphicPlan
}