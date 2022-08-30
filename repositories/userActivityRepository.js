const userActivitiesModel = require('./initDatabaseModel').user_activities

const findAll = async ()=>{
    try {
        var userActivities = await userActivitiesModel.findAll();
        return userActivities
    } catch (error) {
        throw error
    }
}

const addUserActivity = async (userActivity)=>{
    var {
        user_id,activity,module,datetime
    } = userActivity
    try {
        var userActivityAdded = await userActivitiesModel.create({
            user_id,activity,module,datetime
        });
        return userActivityAdded
    } catch (error) {
        return {
            error : error,
            message : "log failed"
        }

    }
}

module.exports = {
    findAll,
    addUserActivity
}