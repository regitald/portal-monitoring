var permissionRepositories = require('../../repositories/permissionRepositories')

const getAllPermissions = async ()=>{
    try {
        var permissions = await permissionRepositories.findAll();
        return permissions
    } catch (error) {
        throw error
    }    
}

const getPermissionById = async (id)=>{
    try {
        var permission = await permissionRepositories.findById(id);
        return permission
    } catch (error) {
        throw error
    }
}

const addPermission = async (permissions)=>{
    try {
        var permissionsAdded = await permissionRepositories.save(permissions);
        return permissionsAdded
    } catch (error) {
        throw error
    }
}

const updatePermission = async(id,permission)=>{
    try {
        var permissionUpdated = await permissionRepositories.update(id,permission);
        return permissionUpdated
    } catch (error) {
        throw permissionUpdated
    }
}

module.exports = {
    getAllPermissions,
    getPermissionById,
    addPermission,
    updatePermission
}