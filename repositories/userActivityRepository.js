const userActivitiesModel = require('./initDatabaseModel').user_activities

const findAll = async ()=>{
    try {
        var userActivities = await userActivitiesModel.findAll();
        return {
            "code":200,
            "message":"success",
            "content":userActivities
        }
    } catch (error) {
        return {
            "code" : 500,
            "message" : "get log failed "+error.message,
        }
    }
}

const findAllFiltered = async(offset,limit,order,condition)=>{
    try {
        var userActivities = await userActivitiesModel.findAndCountAll({
            where : condition,
            limit,
            offset,
            order
        });
        return {
            "code":200,
            "message":"success",
            "content":userActivities
        }
    } catch (error) {
        return {
            "code" : 500,
            "message" : "get log failed "+error.message,
        }
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
        return {
            "code":201,
            "message":"success"
        }
    } catch (error) {
        return {
            "code" : 500,
            "message" : "log failed, "+error.message,
        }

    }
}


const countAllRows = async()=>{
    try {
        var count = await userActivitiesModel.count();
        return count
    } catch (error) {
        return {
            "code" : 500,
            "message" : "log failed, "+error.message,
        }
    }
}

module.exports = {
    findAll,
    addUserActivity,
    findAllFiltered,
    countAllRows
}