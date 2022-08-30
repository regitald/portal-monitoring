var userRoleRepository = require('../../repositories/userRoleRepository')

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
    try {
        var roleAdded = await userRoleRepository.save(userRole);
        return roleAdded
    } catch (error) {
        throw error
    }
}

const updateUserRole = async(id,userRole)=>{
    try {
        var roleUpdated = await userRoleRepository.update(id,userRole);
        return roleUpdated
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllUserRole,
    getUserRoleById,
    addUserRole,
    updateUserRole
}