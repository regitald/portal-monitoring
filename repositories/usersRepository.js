const { roles, permissions,role_user, menu } = require('./initDatabaseModel')
const userModel = require('./initDatabaseModel').users
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
    try {
        await userModel.create(user);
        return serviceResponse(201,"success")         
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
            include : [{
                model: roles,
                as : "role",
                include:[
                    {
                        model:permissions,
                        include: {
                            model : menu,
                            as : "menu"
                        }
                    }
                ]
            }]
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
                    as : "role",
                    include: [
                        permissions
                    ]
                }
            ]
        });
        return serviceResponse(200,"success",user)
    } catch (error) {
        return serviceResponse(505,error.message)
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
        await userModel.update(user,{where : {id}})
        return serviceResponse(201,"success")
    } catch (error) {
        return serviceResponse(500,error.message)
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