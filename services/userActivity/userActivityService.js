const userActivityRepository = require('../../repositories/userActivityRepository')
const Op = require('sequelize').Op

const getAllUserActivities = async ()=>{
    var userActivities = await userActivityRepository.findAll();
    return userActivities;
}

const getAllUserActivitiesFiltered = async (filter)=>{
    var condition = {}
    var offset = 0;
    var limit = 20;
    var arrayOrder = [];

    var {
        page, size, sort, user_id,activity,module,date_from,date_to
    } = filter

    if(page && size){
        offset = parseInt(size) * parseInt(page)
        limit = parseInt(size)
    }

    if(sort){
        var order = sort.split(',');
        arrayOrder.push(order)
    }else{
        arrayOrder.push(['id','ASC'])

    }
    if(user_id){
        condition.user_id = user_id
    }

    if(activity){
        condition.activity = {
            [Op.like] : '%'+activity+'%' 
        }
    }

    if(module){
        condition.module = {
            [Op.like] : '%'+module+'%'
        }
    }

    if(date_from && date_to){
        condition.datetime = {
            [Op.between] : [date_from,date_to]
        }
    }

    var userActivities = await userActivityRepository.findAllFiltered(
        offset,limit,arrayOrder,condition);
    return userActivities;
}

const logUserActivity = async(userData) =>{
    var dateNow = new Date()
    var userActivity = {
        user_id : userData.userId,
        activity : userData.activity,
        datetime : dateNow,
        module : userData.module
    }
    const userActivityAdded = await userActivityRepository.addUserActivity(userActivity);
    return userActivityAdded
}

const getPaginationFilter = async(filter)=>{
    let page = filter.page
    let size = filter.size
    let sort = filter.sort 

    let count = await userActivityRepository.countAllRows()


}

module.exports = {
    getAllUserActivities,
    logUserActivity,
    getAllUserActivitiesFiltered
}