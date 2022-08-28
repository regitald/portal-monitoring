var userRepository = require('../../repositories/usersRepositories')
var response = require('../../models/responses/baseResponse');
const bycrypt = require('bcrypt');


const getAllUser = async (req,res,next)=>{
    try {
        var users = await userRepository.findAllWithRoles();
        res.send(response("succes",users));
    } catch (error) {
        res.status(500).send("err: "+error)
    }    
}

const getUserById = async (req,res,next)=>{
    var id = req.params.id
    try {
        var user = await userRepository.findById(id);
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
        var user = req.body
        user.password = await encryptPassword(user.password);
        var user = await userRepository.save(user);
        res.status(201).send(response("success"));
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

const activeDeactiveUser = async(req,res,next)=>{
    try {
        var {id} = req.params
        var {status} = req.query

        var user = await userRepository.findById(id)

        if(user == null){
            res.status(404).send(response('user not found'))
        }

        var updated = await userRepository.updateStatus(id,status)
        
        res.status(200).send(response("success"));
    } catch (error) {
        res.status(500).send("error : "+error)
    }
}

const updateUser = async(req,res,next)=>{
    var {id} = req.params
    var user = req.body
    try {
        var updates = await userRepository.update(id,user);
        res.status(200).send(response("success"));
    } catch (error) {
        res.status(500).send("error : "+error)
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
    updateUser
    
}