const {knex} = require('./iniDbConnection')
const {buildCondition} = require('./conditionBuilder/knexConditionBuilder')
const {logProdArrObj} = require('../models/objects/log_production')

const getNgList = async()=>{
    try {
        var getNgList = await knex('list_ng')
        return getNgList    
    } catch (error) {
        console.log(error.message);
    }
}

const getMcLogByTime = async(paramsQuery,ngKeys,ngList)=>{
    try {
        var result = {}
        var params = await buildCondition(logProdArrObj(), paramsQuery);
        var getSumOk = await knex('log_production').sum('ok').where(params)
        result.ok = getSumOk[0]['sum(`ok`)'] != null ? getSumOk[0]['sum(`ok`)'] : '0'

        let index = 0
        let paramsQueryNg = Object.assign({},paramsQuery)
        for(ng of ngList){
            var key = 'ng_' + ngKeys[index]
            paramsQueryNg.desc = 'like('+ng.name+')'
            paramsQueryNg.ng = 'gt('+0+')'
            var paramsNg = await buildCondition(logProdArrObj(),paramsQueryNg)
            var getNg = await knex('log_production').sum('ng').where(paramsNg)
            result[key] = getNg[0]['sum(`ng`)'] != null ? getNg[0]['sum(`ng`)'] : '0'
            index++
        }

        return result
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    getMcLogByTime,
    getNgList
}