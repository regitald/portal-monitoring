var permissionRepositories = require('../../repositories/permissionRepositories')
var response = require('../../models/responses/baseResponse')

const getAllPermissions = async (req,res,next)=>{
    try {
        var permissions = await permissionRepositories.findAll();
        res.send(response("succes",permissions));
    } catch (error) {
        res.status(500).send(error)
    }    
}

const getPermissionById = async (req,res,next)=>{
    var id = req.params.id
    try {
        var permissions = await permissionRepositories.findById(id);
        if(userRole != null){
            res.send(response("succes",permissions));
        }else{
            res.status(404).send(response("permission not found"))
        }
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

const addPermission = async (req,res,next)=>{
    try {
        var permissions = req.body
        var permissionsAdded = await permissionRepositories.save(permissions);
        res.status(201).send(response("success"));
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

const updatePermission = async(req,res,next)=>{
    try {
        var {id} = req.params
        var permissions = req.body
        var permissionsAdded = await permissionRepositories.update(id,permissions);
        res.status(201).send(response("success"));
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

module.exports = {
    getAllPermissions,
    getPermissionById,
    addPermission,
    updatePermission
}