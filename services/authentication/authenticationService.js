const userService = require('../user/userService')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../../utils/jwtUtils')
const serviceResponse = require('../../models/responses/serviceResponse')

const login = async (userReq)=>{
    try {    
        var user = await userService.getUserByUsername(userReq.username)
    
        if(user.code == 500){
            return serviceResponse(user.code,user.message)
        }

        if(user.content == null){
            return serviceResponse("404","user not found")
        }

        if(!user.content.status){
            return serviceResponse("401","user is not active")
        }
        
        var passValid = await bcrypt.compare(userReq.password,user.content.password);

        if(passValid){
            var userContent = user.content
            var jwt = await jwtGenerator.generateAuthUserToken(userContent);
            return serviceResponse(200,"success",{
                fullname : userContent.first_name + userContent.last_name,
                email : userContent.email,
                status : userContent.status,
                role_id : userContent.role.id,
                token:jwt
            })
        }else{
            return serviceResponse(401,"username password not match")
        }   
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}



module.exports = {
    login
}