const serviceResponse = require('../models/responses/serviceResponse')
const {knex} = require('./iniDbConnection')

const findAll = async()=>{
    try {
        var machineKpi = await knex('mc_kpi');
           
    } catch (error) {
        
    }
}

module.exports = {
    getAllKpiMachine
}