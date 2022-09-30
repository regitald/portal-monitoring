const permissionsModel = require('./initDatabaseModel').permissions
var {sequelize} = require('./iniDbConnection')
var serviceReponse = require('../models/responses/serviceResponse')
const { permission_role } = require('./initDatabaseModel')

const save = async (permissions)=>{
    try {
        var result = permissionsModel.create(permissions)
        return result
    } catch (error) {
        throw error
    }
}

const savePermissionAndRole = async (role_id,permissionsArr)=>{
    try {
        var transaction = await sequelize.transaction(async(t)=>{
            for(let i = 0; i < permissionsArr.length ; i ++){
                var permissionId; 
                var isPermissionExists = await permissionsModel.findAll({where:{
                    menu_id : permissionsArr[i].menu_id,
                    view : permissionsArr[i].view,
                    detail : permissionsArr[i].detail,
                    create : permissionsArr[i].create,
                    edit : permissionsArr[i].edit,
                    delete : permissionsArr[i].delete,
                }})

                if(isPermissionExists == undefined){
                    var createPermission = await permissionsModel.create(permissionsArr[i],{
                        transaction:t
                    })
                    permissionId = createPermission.dataValues.id
                }else{
                    permissionId = isPermissionExists[0].dataValues.id
                }

                await permission_role.create({
                    role_id:role_id,
                    permission_id:permissionId
                },{
                    transaction:t
                })
            
            }
        })
        return serviceReponse(201,"success")
    } catch (error) {
        return serviceReponse(500,error.message)
    }
}

const findAll = async ()=>{
    try {
        var permissions = await permissionsModel.findAll();
        return permissions
    } catch (error) {
        throw error
    }
}

const findById = async (id)=>{
    try {
        var permissions = await permissionsModel.findByPk(id);
        return permissions
    } catch (error) {
        throw error
    }
}

const update = async (id,permissions)=> {
    var {name,description} = permissions
    try {
        var updatePermission = permissionsModel.update({
            name,description
        },{where : {id}})

        return updatePermission
    } catch (error) {
        throw error
    }
}

module.exports = {
    findAll,
    findById,
    update,
    save,
    savePermissionAndRole
}