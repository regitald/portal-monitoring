var permissionRoleRepository = require('../../repositories/permissionRoleRepository')

const getAllPermissionRole = async ()=>{
    try {
        var permissionRoles = await permissionRoleRepository.findAll();
        return permissionRoles
    } catch (error) {
        throw error
    }    
}

const getPermissionRoleById = async (id)=>{
    try {
        var permissionRole = await permissionRoleRepository.findById(id);
        return permissionRole
    } catch (error) {
        throw error
    }
}

const addPermissionRole = async (permissionRole)=>{
    try {
        var permissionRoleAdded = await permissionRoleRepository.save(permissionRole);
        return permissionRoleAdded
    } catch (error) {
        throw error
    }
}

const updatePermissionRole = async(id,permissionRole)=>{
    try {
        var permissionRoleUpdated = await permissionRoleRepository.update(id,permissionRole);
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