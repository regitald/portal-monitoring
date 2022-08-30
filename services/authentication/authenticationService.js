const userService = require('../user/userService')
const bcrypt = require('bcrypt')
const jwtGenerator = require('../../utils/jwtUtils')

const login = async (userReq)=>{
    var passwordValid = Boolean(false)
    
    var user = await userService.getUserByUsername(userReq.username)

    if(user==null){
        return {
            authenticated : false,
            errorCode : 404,
            message : "user not found"
        }
    }

    passwordValid = await comparePassword(user.password,userReq.password);

    if(passwordValid){
        var {error,message,token} = await jwtGenerator.generateAuthUserToken(user);
        return {
            authenticated : true,
            jwtResponse : {
                token
            }}
    }else{
        return {
            authenticated : false
        }
    }
}

const comparePassword = async(encryptedPassword,plainPassword)=>{
    var salt = await bcrypt.genSalt(10)
    var passValid = await bcrypt.compare(plainPassword,encryptedPassword);
    return passValid
}

module.exports = {
    login
}