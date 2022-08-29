var roleRepository = require('../../repositories/rolesRepositories')

const getAllRoles = async ()=>{
    try {
        var roles = await roleRepository.findAll();
        return roles
    } catch (error) {
        res.status(500).send(error)
    }    
}

const getRoleById = async (id)=>{
    try {
        var role = await roleRepository.findById(id);
        return role
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

const addRole = async (role)=>{
    try {
        var roleAdded = await roleRepository.save(role);
        return roleAdded
    } catch (error) {
        throw error
    }
}

const updateRole = async(id,role)=>{
    try {
        var roleUpdated = await roleRepository.update(id,role);
        return roleUpdated
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllRoles,
    getRoleById,
    addRole,
    updateRole
}