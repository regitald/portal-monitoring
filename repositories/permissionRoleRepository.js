const permissionRoleModel = require('./initDatabaseModel').permission_role

const save = async (permissionRole)=>{
    try {
        var result = permissionRoleModel.create(permissionRole)
        return result
    } catch (error) {
        throw error
    }
}

const findAll = async ()=>{
    try {
        var permissionRole = await permissionRoleModel.findAll();
        return permissionRole
    } catch (error) {
        throw error
    }
}

const findById = async (id)=>{
    try {
        var permissionRole = await permissionRoleModel.findByPk(id);
        return permissionRole
    } catch (error) {
        throw error
    }
}

const update = async (id,permissionRole)=> {
    var {permission_id,role_id} = permissionRole
    try {
        var updateRoles = permissionRoleModel.update({
            permission_id,role_id
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