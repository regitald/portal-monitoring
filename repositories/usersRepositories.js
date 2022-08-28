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

const findAllWithRoles = async()=>{
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


module.exports = {
    findAll,
    findById,
    save,
    updateStatus,
    update,
    findAllWithRoles
}