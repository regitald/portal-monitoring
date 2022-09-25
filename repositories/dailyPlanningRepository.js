const serviceResponse = require('../models/responses/serviceResponse');
const {knex} = require('./iniDbConnection')
var dailyPlan = 'list_mo';

const findAll = async(params,order)=>{
    try {
        var moList = await knex(dailyPlan).where(params).orderBy(order)
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
        await knex(dailyPlan).where({id}).update({
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
    var [planAdded] = (await knex(dailyPlan).insert({
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
        var orderId = await knex(dailyPlan).max('order_id',{as: 'maxOrderId'}).where(
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

const findDistinct = async(fields)=>{
    try {
        var distinct = await knex(dailyPlan).distinct(fields)
        return serviceResponse(200,'',distinct);
    } catch (error) {
        return serviceResponse(500,error.message)   
    }
}

const findLineNumberByProductionTimes = async(params)=>{
    try {
        var {
            production_date,
            start_production,
            finish_production
        } = params
        var plan = await knex(dailyPlan).where({
            production_date,
            start_production,
            finish_production
        }).select('line_number')
        return serviceResponse(200,'success',plan)
    } catch (error) {
        return serviceResponse(500,error.message)    
    }
}


module.exports = {
    findDistinct,
    update,
    findAll,
    save,
    findById,
    findMaxOrderId,
    findLineNumberByProductionTimes
}