const { roles, permissions } = require('./initDatabaseModel')

const userModel = require('./initDatabaseModel').users

const save = async (user)=>{
    try {
        var result = userModel.create(user)
        return result
    } catch (error) {
        throw error
    }
}

const findAll = async ()=>{
    try {
        var users = await userModel.findAll();
        return users
    } catch (error) {
        throw error
    }
}

const findAllWithRolesAndPersmissions = async()=>{
    try {
        var users = await userModel.findAll({
            include : [
                {
                    model : roles,
                    include : [
                        permissions
                    ]
                }
            ]
        });
        return users
    } catch (error) {
        throw error
    }
}

const findById = async (id)=>{
    try {
        var user = await userModel.findByPk(id);
        return user
    } catch (error) {
        throw error
    }
}

const findByUserName = async(username)=>{
    try {
        var user = await userModel.findOne({
            where : {
                username
            },
            include : [
                {
                    model : roles,
                    include : [
                        permissions
                    ]
                }
            ]
        })
        return user
    } catch (error) {
        throw user
    }
}

const updateStatus = async (id,status)=>{
    try {
        var updateUser = await userModel.update(
            {status},{where : {id}})
        return updateUser
    } catch (error) {
        throw error
    }
}

const update = async (id,user)=> {
    try {
        var {
            first_name,last_name,email,
            username,email,phone_number,
            bio,location
         } = user
        var updateUser = await userModel.update(
            { 
                first_name,last_name,
                username,email,phone_number,
                bio,location
             },{where : {id}})
        return updateUser
    } catch (error) {
        throw error
    }
}

const findUsernameEmailPhoneNumber = async(params)=>{
    var {username, email, phone_number,}  = params
    try {
        var user = await userModel.findOne({
            where : {
                username, email, phone_number
            }
        });
        return user
    } catch (error) {
        throw error        
    }
}


module.exports = {
    findAll,
    findById,
    save,
    updateStatus,
    update,
    findAllWithRolesAndPersmissions,
    findByUserName,
    findUsernameEmailPhoneNumber
}