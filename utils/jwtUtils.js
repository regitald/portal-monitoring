const jwt = require('jsonwebtoken')
const keys = process.env.JWT_KEY

const generateAuthUserToken = async(user)=>{

    if(keys == null){
        return {
            error : true,
            message : "keys not found",
            token : null
        }
    }

    let data = {
        user_id : user.id,
        username : user.username,
        email : user.email,
        role : user.role,
        permission : user.permission
    }

    const token = await jwt.sign(data, keys,{
        expiresIn: 60 * 60
    });

    return {
        error : false,
        message : "success",
        token : token
    }
}

const validateJwt = async(token)=>{
    var isValidToken = await jwt.verify(token);
    return isValidToken
}

const decodeJwt = async(token)=>{
    var tokenDecoded = await jwt.decode(token)
    return tokenDecoded
}

module.exports = {
    generateAuthUserToken,
    validateJwt,
    decodeJwt
}