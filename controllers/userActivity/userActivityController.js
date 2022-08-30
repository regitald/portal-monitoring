const userActivityService = require('../../services/userActivity/userActivityService')
const response = require('../../models/responses/baseResponse')

const getAllUserActivities = async (req,res,next)=>{
    try {
        var userActivities = await userActivityService.getAllUserActivities()
        res.status(200).send(response("succes",userActivities));
    } catch (error) {
        res.status(500).send("err: "+error)
    }   
}

module.exports = {
    getAllUserActivities
}