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
        var roles = await rolesModel.findByPk(id);
        return roles
    } catch (error) {
        throw error
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

module.exports = {
    findAll,
    findById,
    update,
    save
}