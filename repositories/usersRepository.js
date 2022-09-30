const { roles, permissions,role_user, menu, permission_role } = require('./initDatabaseModel')
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
        var saved = await userModel.create(user);
        saved.password = ''
        return serviceResponse(201,"success",saved)     
    } catch (error) {
        return {
            "code":500,
            "message":error.message
        }
    }
}

const findAllWithRolesAndPersmissions = async(where,order)=>{
    try {
        var users = await userModel.findAll({
            where,
            order,
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
        return serviceResponse(200,"success",users)
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
                    as : 'role',
                    include : [
                        {
                            model: permissions,
                            through: {attributes : []},
                            include : {
                                model: menu,
                                as : 'menu'
                            }                        
                        }
                    ]
                }
            ]
        })
        return serviceResponse(200,"success",user)
    } catch (error) {
        return serviceResponse(500,error.message)
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