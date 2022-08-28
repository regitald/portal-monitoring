var roleRepository = require('../../repositories/rolesRepositories')
var response = require('../../models/responses/baseResponse')
const getAllRoles = async (req,res,next)=>{
    try {
        var roles = await roleRepository.findAll();
        res.send(response("succes",roles));
    } catch (error) {
        res.status(500).send(error)
    }    
}

const getRoleById = async (req,res,next)=>{
    var id = req.params.id
    try {
        var role = await roleRepository.findById(id);
        if(role != null){
            res.send(response("succes",role));
        }else{
            res.status(404).send(response("role not found"))
        }
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

const addRole = async (req,res,next)=>{
    try {
        var role = req.body
        var roleAdded = await roleRepository.save(role);
        res.status(201).send(response("success"));
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

const updateRole = async(req,res,next)=>{
    try {
        var {id} = req.params
        var role = req.body
        var roleAdded = await roleRepository.update(id,role);
        res.status(201).send(response("success"));
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

module.exports = {
    getAllRoles,
    getRoleById,
    addRole,
    updateRole
}