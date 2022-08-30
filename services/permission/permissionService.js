var permissionRepository = require('../../repositories/permissionRepository')

const getAllPermissions = async ()=>{
    try {
        var permissions = await permissionRepository.findAll();
        return permissions
    } catch (error) {
        throw error
    }    
}

const getPermissionById = async (id)=>{
    try {
        var permission = await permissionRepository.findById(id);
        return permission
    } catch (error) {
        throw error
    }
}

const addPermission = async (permissions)=>{
    try {
        var permissionsAdded = await permissionRepository.save(permissions);
        return permissionsAdded
    } catch (error) {
        throw error
    }
}

const updatePermission = async(id,permission)=>{
    try {
        var permissionUpdated = await permissionRepository.update(id,permission);
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