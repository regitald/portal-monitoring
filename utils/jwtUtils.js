const jwt = require('jsonwebtoken')
const serviceResponse = require('../models/responses/serviceResponse')
const keys = process.env.JWT_KEY

const generateAuthUserToken = async(user)=>{

    if(keys == null){
        return serviceResponse(500,"keys not found")
    }

    let data = {
        user_id : user.id,
        email : user.email,
        username : user.username,
    }

    if(user.role != null){
        data.role_id = user.role.id
    }

    const token =  jwt.sign(data, keys,{
        expiresIn: 60 * 60 * 24
    });

    return token
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