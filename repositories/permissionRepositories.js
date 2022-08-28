const permissionsModel = require('./initDatabaseModel').permissions

const save = async (permissions)=>{
    try {
        var result = permissionsModel.create(permissions)
        return result
    } catch (error) {
        throw error
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
    save
}