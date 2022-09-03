const serviceResponse = require('../../models/responses/serviceResponse');
var roleRepository = require('../../repositories/rolesRepository')

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

const deleteRole = async(id)=>{
    try {
        let role = await getRoleById(id);
        if(!role.content){
            return serviceResponse(404,"role not found")
        }
        return roleRepository.deleteRole(id);
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

module.exports = {
    getAllRoles,
    getRoleById,
    addRole,
    updateRole,
    deleteRole
}