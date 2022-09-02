const serviceResponse = require('../../models/responses/serviceResponse');
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

const addPermission = async (permissionsAndRoles)=>{
    try {

        var {
            role_id,
            permissions
        } = permissionsAndRoles

        var permissionArr = new Array()

        for(let i=0; i<permissions.length; i++){
            var {menu_id,permission_ids} = permissions[i];
            let permissionToAdd = {}
            permissionToAdd.menu_id = menu_id
            permissionToAdd.view = permission_ids[0]
            permissionToAdd.detail = permission_ids[1]
            permissionToAdd.create = permission_ids[2]
            permissionToAdd.edit = permission_ids[3]
            permissionToAdd.delete = permission_ids[4]
            permissionArr.push(permissionToAdd)
        }
        var addPermissionAndRole = await permissionRepository.savePermissionAndRole(role_id,permissionArr)
        return addPermissionAndRole
    } catch (error) {
        return serviceResponse(500,err.message)
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