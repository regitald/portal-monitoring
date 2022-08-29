const userService = require('../../services/user/userService')
const response = require('../../models/responses/baseResponse')

const login = async (req,res,next)=>{
    var passwordValid = Boolean(false)
    passwordValid = await comparePassword(1,2);

    if(passwordValid){
        var token = await generateToken();
        res.status(200).send(response("success",token))
    }else{
        res.status(400).send(response("wrong password"))
    }
}

const comparePassword = async(encryptedPassword,plainPassword)=>{
    return true
}

const generateToken = async()=>{
    return "jwtoken"
}

module.exports = {
    login
}