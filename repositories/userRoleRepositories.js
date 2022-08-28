const userRoleModel = require('./initDatabaseModel').role_user

const save = async (userRole)=>{
    try {
        var result = userRoleModel.create(userRole)
        return result
    } catch (error) {
        throw error
    }
}

const findAll = async ()=>{
    try {
        var userRole = await userRoleModel.findAll();
        return userRole
    } catch (error) {
        throw error
    }
}

const findById = async (id)=>{
    try {
        var userRole = await userRoleModel.findByPk(id);
        return userRole
    } catch (error) {
        throw error
    }
}

const update = async (id,userRole)=> {
    var {user_id,role_id} = userRole
    try {
        var updateRoles = userRoleModel.update({
            user_id,role_id
        },{where : {id}})

        return updateRoles
    } catch (error) {
        throw error
    }
}

module.exports = {
    findAll,
    findById,
    update,
    save
}