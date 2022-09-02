var userRepository = require('../../repositories/usersRepository')
var serviceResponse = require('../../models/responses/serviceResponse')
const bycrypt = require('bcrypt');


const getAllUser = async ()=>{
    try {
        var users = await userRepository.findAllWithRolesAndPersmissions();
        return users
    } catch (error) {
        throw error
    }    
}

const getUserById = async (id)=>{
    try {
        var user = await userRepository.findById(id);
        return user
    } catch (error) {
        throw error
    }
}

const getUserByUsername = async (username)=>{
    try {
        var user = await userRepository.findByUserName(username);
        return user
    } catch (error) {
        throw error
    }
}

const addUser = async (user)=>{
    try {

        var checkUsername = await userRepository.findUser(
            {username : user.username}
        )

        if(checkUsername){
            return {
                "code":409,
                "message":"user with "+user.username+" is exists"
            }
        }

        var checkEmail = await userRepository.findUser(
            {email : user.email}
        )

        if(checkEmail){
            return {
                "code":409,
                "message":"user with "+user.email+" is exists"
            }
        }

        var checkPhone = await userRepository.findUser(
            {phone_number : user.phone_number}
        )

        if(checkPhone){
            return {
                "code":409,
                "message":"user with "+user.phone_number +" is exists"
            }
        }

        var encryptedPassword = await encryptPassword(user.password);
        user.password = encryptedPassword
        var userAdded = await userRepository.saveUserAndRole(user);
        return userAdded
    } catch (error) {
        return {
            "code":500,
            "message":error.message
        }
    }
}

const activeDeactiveUser = async(id,status)=>{
    try {
        var user = await userRepository.findById(id)

        if(user == null){
            throw new Error("user not found")
        }

        var updated = await userRepository.updateStatus(id,status)
        return updated
    } catch (error) {
        throw error
    }
}

const deleteUser = async(id)=>{
    try {
        var deleted = await userRepository.deleteUser(id)
        return deleted
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const updateUser = async(id,user)=>{
    try {
        var isUserExists = await userRepository.findById(id)

        if(!isUserExists.content){
            return serviceResponse(404,'user not found')
        }

        var userUpdated = await userRepository.update(id,user);
        return userUpdated
    } catch (error) {
        throw error
    }
}

const encryptPassword = async (plainPassword)=>{
    const salt = await bycrypt.genSalt(10);
    const encryptedPassword = await bycrypt.hash(plainPassword,salt);
    return encryptedPassword;
}

module.exports = {
    getAllUser,
    getUserById,
    addUser,
    activeDeactiveUser,
    updateUser,
    getUserByUsername,
    deleteUser
    
}