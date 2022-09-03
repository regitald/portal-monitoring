const serviceResponse = require('../models/responses/serviceResponse')
const { permissions } = require('./initDatabaseModel')

const rolesModel = require('./initDatabaseModel').roles

const save = async (role)=>{
    try {
        var result = rolesModel.create(role)
        return result
    } catch (error) {
        throw error
    }
}

const findAll = async ()=>{
    try {
        var roles = await rolesModel.findAll({
            include : permissions
        });
        return roles
    } catch (error) {
        throw error
    }
}

const findById = async (id)=>{
    try {
        var role = await rolesModel.findByPk(id);
        return serviceResponse(200,"success",role)
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const update = async (id,roles)=> {
    var {name,is_active} = roles
    try {
        var updateRoles = rolesModel.update({
            name,is_active
        },{where : {id}})

        return updateRoles
    } catch (error) {
        throw error
    }
}

const deleteRole = async(id)=>{
    try {
        await rolesModel.destroy({where:{id}})
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
    deleteRole
}