var userRepository = require('../../repositories/usersRepositories')
const bycrypt = require('bcrypt');


const getAllUser = async ()=>{
    try {
        var users = await userRepository.findAllWithRoles();
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

const addUser = async (user)=>{
    try {
        user.password = await encryptPassword(user.password);
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
    const encryptedPassword = bycrypt.hash(plainPassword,salt);
    return encryptedPassword;
}

module.exports = {
    getAllUser,
    getUserById,
    addUser,
    activeDeactiveUser,
    updateUser
    
}