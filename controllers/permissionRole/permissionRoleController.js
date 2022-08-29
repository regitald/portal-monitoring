var permissionRoleService = require('../../services/permissionRole/permissionRoleSerivce')
var response = require('../../models/responses/baseResponse')

const getAllPermissionRole = async (req,res,next)=>{
    try {
        var permissionRole = await permissionRoleService.getAllPermissionRole();
        res.send(response("succes",permissionRole));
    } catch (error) {
        res.status(500).send(error)
    }    
}

const getPermissionRoleById = async (req,res,next)=>{
    var id = req.params.id
    try {
        var permissionRole = await permissionRoleService.getPermissionRoleById(id);
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
        var permissionRoleAdded = await permissionRoleService.addPermissionRole(permissionRole);
        res.status(201).send(response("success"));
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

const updatePermissionRole = async(req,res,next)=>{
    try {
        var {id} = req.params
        var permissionRole = req.body
        var roleAdded = await permissionRoleService.updatePermissionRole(id,permissionRole);
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