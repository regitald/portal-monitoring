const serviceResponse = require('../models/responses/serviceResponse');
const {knex} = require('./iniDbConnection')

const findAll = async()=>{
    try {
        var moList = await knex.select().from('list_mo')
        return serviceResponse(200,"success",moList)
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const update = async(id,moObject)=>{
    var {
        production_date,
        line_number,
        shift_no,
        no_mo,
        part_no,
        part_name,
        part_category,
        target_production,
        cycle_time,
        start_production,
        finish_production,
        work_hours,
        status
    } = moObject
    try {
        var moUpdated = await knex('list_mo').where(id).update({
            production_date,
            line_number,
            shift_no,
            no_mo,
            part_no,
            part_name,
            part_category,
            target_production,
            cycle_time,
            start_production,
            finish_production,
            work_hours,
            status
        })
        console.log(moUpdated);
        return serviceResponse(200,"success",moUpdated)
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const save = async(mo)=>{
    var {
        order_id,
        production_date,
        line_number,
        shift_no,
        no_mo,
        part_no,
        part_name,
        part_category,
        target_production,
        cycle_time,
        start_production,
        finish_production,
        work_hour
        } = mo
    try {
    (await knex('list_mo').insert({
            order_id,
            production_date,
            line_number,
            shift_no,
            no_mo,
            part_no,
            part_name,
            part_category,
            target_production,
            cycle_time,
            start_production,
            finish_production,
            work_hour       }))
        return serviceResponse(200,"success",mo)
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const findMaxOrderId = async(params)=>{
    try {
        var {
            production_date,
            part_category,
            line_number
        } = params   
        var orderId = await knex('list_mo').max('order_id',{as: 'maxOrderId'}).where(
            {production_date,part_category,line_number}
        )
        return serviceResponse(200,'success',orderId)
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const findById = async(id)=>{
    try {
        var mo = knex.select().where(id).from('list_mo')
        return serviceResponse(200,'success',mo)
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

module.exports = {
    update,
    findAll,
    save,
    findById,
    findMaxOrderId
}