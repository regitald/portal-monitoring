var userRepository = require('../../repositories/usersRepository')
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

        var checkUser = await userRepository.findUsernameEmailPhoneNumber(
            {username : user.username, 
            email :user.email, 
            phone_number :user.phone_number}
        )

        if(checkUser){
            throw new Error("user with email/username/phone number exists")
        }

        var newPass = "123456789"
        var encryptedPassword = await encryptPassword(newPass);
        user.password = encryptedPassword
        var userAdded = await userRepository.save(user);
        return userAdded
    } catch (error) {
        throw error
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

const updateUser = async(id,user)=>{
    try {
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
    getUserByUsername
    
}