const jwtUtils = require('../../utils/jwtUtils')
const jwt = require('jsonwebtoken');
const userActivityService = require('../../services/userActivity/userActivityService')

var jwtKey = process.env.JWT_KEY
var authHeader = process.env.JWT_HEADER

const logActivity = async (req,res,next)=>{
    try {
        var authToken = req.header(authHeader)
        var token;
        if(authToken){
            if (authToken.startsWith("Bearer ")){
                token = authToken.substring(7, authToken.length);
           }
           var userData = await jwt.verify(token,jwtKey)
            if(userData){
                var userActivity = userData.username+ " accessed "+ req.path 
                userData.activity = userActivity,
                userData.module = req.path
                var logged = await userActivityService.logUserActivity(userData,req)
            }
            next()
        }else{
            next()
        }
    } catch (error) {
        console.log(error);
        next()
    }
}

module.exports = {
    logActivity
}