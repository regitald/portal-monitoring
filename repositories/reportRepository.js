const {knex} = require('./iniDbConnection')
const {buildCondition} = require('./conditionBuilder/knexConditionBuilder')
const {logProdArrObj} = require('../models/objects/log_production')
const serviceResponse = require('../models/responses/serviceResponse')

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
        var getSumOkNg = await knex('log_production').sum({
            ok : 'ok',ng:'ng'
        }).where(params)
        let sumOk = getSumOkNg[0]['ok']
        let sumNg = getSumOkNg[0]['ng'] 
        result['ok'] = sumOk != null ? parseInt(sumOk) : 0
        result['ng']= sumNg != null ? parseInt(sumNg ) : 0
        result['total'] = result.ok + result.ng

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
        console.log(result);
        return result
    } catch (error) {
        console.log(error.message);
    }
}

const getSumNGSetting = async (params)=>{
    try {
        var ngSetting = await knex('log_production').sum({ng:'ng'}).where(params)
        return ngSetting[0]['ng']
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const getSumGump = async(params)=>{
    try {
        var ngSumGump = await knex('log_production').sum({gumpM:'ng_gump_m',gumpH:'ng_gump_m',gumpP:'ng_gump_p'}).where(params)
        return parseInt(ngSumGump[0]['gumpM']) + parseInt(ngSumGump[0]['gumpH']) + parseInt(ngSumGump[0]['gumpP'])
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const getRunner = async(params)=>{
    try {
        var sumNgGate = await knex('log_production').sum({ng_gate:'ng_gate'}).where(params)
        return sumNgGate[0]['ng_gate']
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

module.exports = {
    getMcLogByTime,
    getNgList,
    getSumNGSetting,
    getSumGump,
    getRunner
}