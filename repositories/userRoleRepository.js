const userRoleModel = require('./initDatabaseModel').role_user
const serviceResponse = require('../models/responses/serviceResponse')

const save = async (userRole)=>{
    try {
        var result = await userRoleModel.create(userRole)
        return serviceResponse(200,"success")
    } catch (error) {
        return serviceResponse(500,error.message)
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

const deleteUserRole = async (id) => {
    try {
        await userRoleModel.destroy({where : {id}})
        return serviceResponse(200,"success")
    } catch (error) {
        return serviceResponse(500,error.message)
        
    }
}

module.exports = {
    findAll,
    findById,
    update,
    save,
    deleteUserRole
}