var userService = require('../../services/user/userService')
var response = require('../../models/responses/baseResponse');
const bycrypt = require('bcrypt');


const getAllUser = async (req,res,next)=>{
    try {
        var users = await userService.getAllUser();
        res.send(response("succes",users));
    } catch (error) {
        res.status(500).send("err: "+error)
    }    
}

const getUserById = async (req,res,next)=>{
    var id = req.params.id
    try {
        var user = await userService.getUserById(id);
        if(user != null){
            res.send(response("succes",user));
        }else{
            res.status(404).send(response("user not found"))
        }
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

const addUser = async (req,res,next)=>{
    try {
        var userReq = req.body 
        var userAdded = await userService.addUser(userReq)        
        res.status(userAdded.code).send(response(userAdded.message));
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
        var updates = await userService.updateUser(id,user);
        res.status(200).send(response("success"));
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

const encryptPassword = async (plainPassword)=>{
    const salt = await bycrypt.genSalt(10);
    const encryptedPassword = bycrypt.hash(plainPassword,salt);
    return encryptedPassword;
}

module.exports = {
    getAllUser,
    getUserById,
    addUser,
    activeDeactiveUser,
    updateUser,
    deleteUser    
}