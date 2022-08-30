const authenticationService = require('../../services/authentication/authenticationService')
const response = require('../../models/responses/baseResponse')

const authenticate = async (req,res,next)=>{
    try {
        var authenticationReq = req.body
        var {authenticated,errorCode,
            message,jwtResponse} = await authenticationService.login(authenticationReq);
    
        if(authenticated){
            res.status(200).send(response("success",jwtResponse))
        }else{
            if(errorCode == 404){
                res.status(404).send(response(message))
            }else{
                res.status(401).send(response("wrong username or password"))
            }
        }        
    } catch (error) {
        res.status(500).send(response(error.message))
    }

}

module.exports = {
    authenticate
}