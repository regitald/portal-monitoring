const userActivityRepository = require('../../repositories/userActivityRepository')

const getAllUserActivities = async ()=>{
    try {
        var userActivities = await userActivityRepository.findAll();
        return userActivities;
    } catch (error) {
        throw error
    } 
}

const logUserActivity = async(userData,req) =>{
    try {
        var dateNow = new Date()
        var userActivity = userData.username+ " accessed "+ req.path + " at " + dateNow
        var userActivity = {
            user_id : userData.userId,
            activity : userActivity,
            dateTime : dateNow,
            module : req.path
        }
        const userActivityAdded = await userActivityRepository.addUserActivity(userActivity)
        return userActivityAdded            
    } catch (error) {
        return {
            error : true,
            message : "log failed",
            data : activityToLog
        }
    }
}

module.exports = {
    getAllUserActivities,
    logUserActivity
}