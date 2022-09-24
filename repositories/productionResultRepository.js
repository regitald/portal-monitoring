const serviceResponse = require('../models/responses/serviceResponse');
const {knex} = require('./iniDbConnection')

const findAll = async(params,order)=>{
    try {
        var productionResults = await knex('production_result').where(params)
        .orderBy(order)
        return serviceResponse(200,"success",productionResults)
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const save = async(productionResult)=>{
    try {
        var {
            no_mo,
            total_ok,
            total_ng,
            total_ng_setting,
            total_running_time,
            total_stopline,
            npk,
            line,
            achievement,
            availability,
            performance,
            quality,
            oee,
            shift_no,
            production_date
        } = productionResult
        console.log(productionResult);
        var [saved] = await knex('production_result').insert({
            no_mo,
            total_ok,
            total_ng,
            total_ng_setting,
            total_running_time,
            total_stopline,
            npk,
            line,
            achievement,
            availability,
            performance,
            quality,
            oee,
            shift_no,
            production_date,
            created_at : new Date()
        })
        var prodRes = await findById(saved)
        return serviceResponse(201,"success",prodRes.content)

    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const findById = async(id)=>{
    try {
        const prodRes = await knex('production_result').where('id',id)
        return serviceResponse(200,"success",prodRes)
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

module.exports = { 
    save,
    findById,
    findAll
}