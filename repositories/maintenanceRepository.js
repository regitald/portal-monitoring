const serviceResponse = require('../models/responses/serviceResponse')
const {knex} = require('./iniDbConnection')

const findAll = async (params,order)=>{
    try {
        var maintenanceList = await knex('maintenance').where(params).orderBy(order)
        return serviceResponse(200,"success",maintenanceList)
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const findById = async(id)=>{
    try {
        var maintenance = await knex('maintenance').where({id})
        return serviceResponse(200,'',maintenance)
    } catch (error) {
        return serviceResponse(500,error.message)
    }  
}

const save = async(maintenance)=>{
    try {
        var {
            id,maintenance_date,line_number,desc,status,created_at,updated_at
        } = maintenance
        await knex('maintenance').insert(
            {
                id,maintenance_date,line_number,desc,status,created_at,updated_at
            }
        )   
        return serviceResponse(201,"maintenance added")
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}


const update = async(id,maintenance)=>{
    try {
        var {
            maintenance_date,line_number,desc,status,created_at,updated_at
        } = maintenance
        await knex('maintenance').where(id).update({
            maintenance_date,line_number,desc,status,created_at,updated_at
        })
        return serviceResponse(201,"maintenance updated")
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

module.exports = {
    findAll,
    save,
    update,
    findById
}