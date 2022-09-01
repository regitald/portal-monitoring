const { roles, permissions,role_user } = require('./initDatabaseModel')
const userModel = require('./initDatabaseModel').users
const sequelize = require('./iniDbConnection')
const serviceResponse = require('../models/responses/serviceResponse')

const save = async (user)=>{
    try {
        var result = userModel.create(user)
        return {
            "code":201,
            "message":"success"
        }
    } catch (error) {
        return {
            "code":201,
            "message":"success"
        }
    }
}

const saveUserAndRole =async (user)=>{
    var roles = user.roles
    
    try {
        var restul = await sequelize.transaction(async(t)=>{

            var userCreated = await userModel.create(user,{
                transaction : t
            })

            var newUser = userCreated.dataValues

            for(i in roles){
                let role = roles[i]
                await role_user.create({
                    user_id : newUser.id,
                    role_id : role.id
                },{
                   transaction : t
                })
            }
        })

        return {
            "code":201,
            "message":"success"
        }            

    } catch (error) {
        return {
            "code":500,
            "message":error.message
        }
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
        var user = await userModel.findByPk(id,{
            include : [
                {
                    model : roles,
                    include : [
                        permissions
                    ]
                }
            ]
        });
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

const deleteUser = async (id)=>{
    try {
        await userModel.destroy({where:{id}})
        return serviceResponse(200,"success")
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}


const findUser = async(condition)=>{
    try {
        var user = await userModel.findOne({
            where : condition
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
    findUser,
    saveUserAndRole,
    deleteUser
}