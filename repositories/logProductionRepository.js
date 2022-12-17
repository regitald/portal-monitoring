const serviceResponse = require('../models/responses/serviceResponse');
const {knex} = require('./iniDbConnection')

const save = async(logProd)=>{
    var {
        datetime,
        production_id,
        op_id,
        add_op_id,
        status_machine,
        ok,
        ng,
        ng_gump_m,
        ng_gump_h,
        ng_gump_p,
        ng_gate,
        desc,
        ct_plan,
        ct_actual,
        stopline,
        area,
        cavity,
        position,
        part_no,
        line_name
        } = logProd
    try {
    var [logProdAdded] = (await knex('log_production').insert({
        datetime,
        production_id,
        op_id,
        add_op_id,
        status_machine,
        ok,
        ng,
        ng_gump_m,
        ng_gump_h,
        ng_gump_p,
        ng_gate,
        desc,
        ct_plan,
        ct_actual,
        stopline,
        area,
        cavity,
        position,
        part_no,
        line_name
        }))

        logProd.id = logProdAdded
        return serviceResponse(201,"success",logProd)
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

module.exports = {
    save
}