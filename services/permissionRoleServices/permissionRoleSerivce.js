var permissionRoleRepositories = require('../../repositories/permissionRoleRepositories')
var response = require('../../models/responses/baseResponse')

const getAllPermissionRole = async (req,res,next)=>{
    try {
        var permissionRole = await permissionRoleRepositories.findAll();
        res.send(response("succes",permissionRole));
    } catch (error) {
        res.status(500).send(error)
    }    
}

const getPermissionRoleById = async (req,res,next)=>{
    var id = req.params.id
    try {
        var permissionRole = await permissionRoleRepositories.findById(id);
        if(permissionRole != null){
            res.send(response("succes",permissionRole));
        }else{
            res.status(404).send(response("role not found"))
        }
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

const addPermissionRole = async (req,res,next)=>{
    try {
        var permissionRole = req.body
        var permissionRoleAdded = await permissionRoleRepositories.save(permissionRole);
        res.status(201).send(response("success"));
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

const updatePermissionRole = async(req,res,next)=>{
    try {
        var {id} = req.params
        var permissionRole = req.body
        var roleAdded = await permissionRoleRepositories.update(id,permissionRole);
        res.status(201).send(response("success"));
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

module.exports = {
    getAllPermissionRole,
    getPermissionRoleById,
    addPermissionRole,
    updatePermissionRole
}