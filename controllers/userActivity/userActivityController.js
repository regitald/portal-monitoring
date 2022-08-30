const userActivityService = require('../../services/userActivity/userActivityService')
const response = require('../../models/responses/baseResponse')

const getAllUserActivities = async (req,res,next)=>{
    var filters = req.query
    var userActivities = await userActivityService.getAllUserActivitiesFiltered(filters);
    res.status(userActivities.code).send(response(
        userActivities.message,userActivities.content
    ))
}

const logUserActivity = async(req,res,next) => {
    var userActivity = req.body 
    var logged = await userActivityService.logUserActivity(userActivity);
    res.status(logged.code).send(response(logged.message))
}

module.exports = {
    getAllUserActivities,
    logUserActivity
}