const authenticationService = require('../../services/authentication/authenticationService')
const baseResponse = require('../../models/responses/baseResponse');
const { getUserById } = require('../../services/user/userService');

const authenticate = async (req,res,next)=>{
    try {
        var authenticated = await authenticationService.login(req.body);
        res.status(authenticated.code).send(baseResponse(authenticated.message,authenticated.content))
    } catch (error) {
        res.status(500).send(baseResponse(error.message))
    }

}

const getWhoAmI = async(req,res,next)=>{
    try {
        var user = await getUserById(req.params.id)
        res.status(user.code).send(baseResponse(user.message,user.content))
    } catch (error) {
        res.status(500).send(baseResponse(error.message))
    }
}

module.exports = {
    getWhoAmI,
    authenticate
}