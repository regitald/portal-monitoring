const serviceResponse = require('../models/responses/serviceResponse');
const {knex} = require('./iniDbConnection')

const findAll = async(params,order)=>{
    try {
        var moList = await knex('list_mo').where(params).orderBy(order)
        return serviceResponse(200,"success",moList)
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const update = async(id,plan)=>{
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
        work_hour,
        status
    } = plan
    try {
        await knex('list_mo').where({id}).update({
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
            work_hour,
            status,
            updated_at : new Date()
        })

        var newPlan = await findById(id)
        return serviceResponse(201,"success",newPlan.content)
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const save = async(plan)=>{
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
        work_hour,
        status
        } = plan
    try {
    var [planAdded] = (await knex('list_mo').insert({
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
            work_hour,
            status,
            created_at : new Date() 
        }))

        plan.id = planAdded
        return serviceResponse(201,"success",plan)
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
        var mo = await knex.select().where({id}).from('list_mo')
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