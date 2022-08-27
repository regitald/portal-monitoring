const userRepositories = require('../repositories/usersRepositories')
var baseResponse = require('../models/responses/baseResponse')
var httpStatusCodes = require('http-status-codes')
var {user} = require('../models/user')

const getAllUser = async(req,res,next)=>{
    try {
        var users = await userRepositories.findAll();
        res.send(baseResponse(httpStatusCodes.StatusCodes.OK,"succes",users))
    }catch (error){
        console.log(error);
        res.send(baseResponse(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR,"error"))
    }
}

const getUserById = async(req,res,next)=>{
    var params = req.params
    try {
        var user = await userRepositories.findById(params.id)
        res.send(baseResponse(httpStatusCodes.StatusCodes.OK,"success",user))
    } catch (error) {
        res.send(baseResponse(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR,"error"))
    }
}

const addUser = async(req,res,next)=>{
    var body = req.body
    try {
        user = mapUser(body)
        error = await userRepositories.save(user)
        res.send(baseResponse(httpStatusCodes.StatusCodes.CREATED,"success"))   
    } catch (error) {
        res.send(baseResponse(httpStatusCodes.StatusCodes.INTERNAL_SERVER_ERROR,error))
    }
}

const mapUser = (userReq) => {
    user.first_name = userReq.firstName
    user.last_name = userReq.lastName
    user.email = userReq.email
    user.phone_number = userReq.phoneNumber
    user.password = userReq.password
    return user
}

module.exports = {
    getAllUser,
    getUserById,
    addUser
}