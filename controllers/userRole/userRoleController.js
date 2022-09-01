var userRoleService = require('../../services/userRole/userRoleService')
var response = require('../../models/responses/baseResponse')

const getAllUserRole = async (req,res,next)=>{
    try {
        var userRole = await userRoleService.getAllUserRole();
        res.send(response("succes",userRole));
    } catch (error) {
        res.status(500).send(error)
    }    
}

const getUserRoleById = async (req,res,next)=>{
    var id = req.params.id
    try {
        var userRole = await userRoleService.getUserRoleById(id);
        if(userRole != null){
            res.send(response("succes",userRole));
        }else{
            res.status(404).send(response("role not found"))
        }
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

const addUserRole = async (req,res,next)=>{
    try {
        var userRole = req.body
        var user_id = userRole.user_id
        var roleAdded = await userRoleService.addUserRole(userRole);
        res.status(roleAdded.code).send(response(roleAdded.message)); 
    } catch (error) {
        res.status(500).send(response(error.message))
    }

}

const deleletUserRole = async(req,res,next)=>{
    try {
        var {id} = req.params
        var userRoleDeleted = await userRoleService.deleteUserRole(id)
        res.status(userRoleDeleted.code).send(response(userRoleDeleted.message))   
    } catch (error) {
        res.status(500).send(response(error.message))   

    }
}

const updateUserRole = async(req,res,next)=>{
    try {
        var {id} = req.params
        var userRole = req.body
        var roleAdded = await userRoleService.updateUserRole(id,userRole);
        res.status(201).send(response("success"));
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

module.exports = {
    getAllUserRole,
    getUserRoleById,
    addUserRole,
    updateUserRole,
    deleletUserRole
}