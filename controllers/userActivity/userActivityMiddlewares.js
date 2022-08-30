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
                var logged = await userActivityService.logUserActivity(userData,req)
                console.log(logged);
            }
        }
    } catch (error) {
        next()
    }
    next()
}

module.exports = {
    logActivity
}