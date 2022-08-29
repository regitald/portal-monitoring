const baseResponse = require('../../models/responses/baseResponse')

const validateAddUserRequest = async (req,res,next)=>{
    var userReq = req.body
    var valid = true;
    var message = ""

    var password = userReq.password;

    if(password.length < 6){
        valid = false
        message += "password length must be more than 6 character \n"
    }

    if(!valid){
        res.status(400).send(baseResponse(message))
    }else{
        next()
    }
}

module.exports = {
    validateAddUserRequest
}