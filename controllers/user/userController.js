var userService = require('../../services/user/userService')
var response = require('../../models/responses/baseResponse');
const bycrypt = require('bcrypt');
const { update } = require('../../repositories/usersRepository');
const baseResponse = require('../../models/responses/baseResponse');


const getAllUser = async (req,res,next)=>{
    try {
        var paramsQuery = req.query
        var users = await userService.getAllUser(paramsQuery);
        res.status(users.code).send(response(users.message,users.content))
    } catch (error) {
        res.status(500).send("err: "+error)
    }    
}

const getUserById = async (req,res,next)=>{
    var id = req.params.id
    try {
        var user = await userService.getUserById(id);
        res.status(user.code).send(baseResponse(user.message,user.content));
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

const addUser = async (req,res,next)=>{
    try {
        var userReq = req.body 
        var userAdded = await userService.addUser(userReq)        
        res.status(userAdded.code).send(response(userAdded.message,userAdded.content));
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

const activeDeactiveUser = async(req,res,next)=>{
    try {
        var {id} = req.params
        var {status} = req.query

        var user = await userService.getUserById(id)

        if(user == null){
            res.status(404).send(response('user not found'))
        }

        var updated = await userService.activeDeactiveUser(id,status)
        
        res.status(200).send(response("success"));
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

const updateUser = async(req,res,next)=>{
    var {id} = req.params
    var user = req.body
    try {
        var updated = await userService.updateUser(id,user);
        res.status(updated.code).send(response(updated.message))
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

const deleteUser = async(req,res,next)=>{
    var {id} = req.params
    try {
        var deleted = await userService.deleteUser(id)
        res.status(deleted.code).send(response(deleted.message))
    } catch (error) {
        res.status(500).send(error.message)        
    }
}

module.exports = {
    getAllUser,
    getUserById,
    addUser,
    activeDeactiveUser,
    updateUser,
    deleteUser    
}