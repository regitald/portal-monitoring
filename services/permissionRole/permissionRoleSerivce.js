var permissionRoleRepositories = require('../../repositories/permissionRoleRepositories')

const getAllPermissionRole = async ()=>{
    try {
        var permissionRoles = await permissionRoleRepositories.findAll();
        return permissionRoles
    } catch (error) {
        throw error
    }    
}

const getPermissionRoleById = async (id)=>{
    try {
        var permissionRole = await permissionRoleRepositories.findById(id);
        return permissionRole
    } catch (error) {
        throw error
    }
}

const addPermissionRole = async (permissionRole)=>{
    try {
        var permissionRoleAdded = await permissionRoleRepositories.save(permissionRole);
        return permissionRoleAdded
    } catch (error) {
        throw error
    }
}

const updatePermissionRole = async(id,permissionRole)=>{
    try {
        var permissionRoleUpdated = await permissionRoleRepositories.update(id,permissionRole);
        return permissionRoleUpdated
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllPermissionRole,
    getPermissionRoleById,
    addPermissionRole,
    updatePermissionRole
}