var userRoleRepository = require('../../repositories/userRoleRepository')
var serviceResponse = require('../../models/responses/serviceResponse')

const getAllUserRole = async ()=>{
    try {
        var userRoles = await userRoleRepository.findAll();
        return userRoles
    } catch (error) {
        throw error
    }    
}

const getUserRoleById = async (id)=>{
    try {
        var userRole = await userRoleRepository.findById(id);
        return userRole
    } catch (error) {
        throw error
    }
}

const addUserRole = async (userRole)=>{
    var roleAdded = await userRoleRepository.save(userRole);
    return roleAdded
}

const updateUserRole = async(id,userRole)=>{
    try {
        var roleUpdated = await userRoleRepository.update(id,userRole);
        return roleUpdated
    } catch (error) {
        throw error
    }
}

const deleteUserRole = async(id)=>{
    try {
        var userRole = await getUserRoleById(id);

        if(!userRole){
            return serviceResponse(404,"user role not found")
        }
    
        var deleteRole = await userRoleRepository.deleteUserRole(id);
        return deleteRole   
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}
module.exports = {
    getAllUserRole,
    getUserRoleById,
    addUserRole,
    updateUserRole,
    deleteUserRole
}