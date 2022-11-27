const {knex} = require('./iniDbConnection')
const {buildCondition} = require('./conditionBuilder/knexConditionBuilder')
const {logProdArrObj} = require('../models/objects/log_production')
const serviceResponse = require('../models/responses/serviceResponse')
const dailyProductionModel = require('../models/objects/report/dailyProduction')

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
            var getNg = await knex('log_production').sum('ng')
            .where('position',paramsQuery.position)
            .andWhere('ng','>',0)
            .andWhereBetween('datetime',[paramsQuery.datetime_from,paramsQuery.datetime_to])
            .andWhereILike('desc','%'+ng.name+'%')
            result[key] = getNg[0]['sum(`ng`)'] != null ? getNg[0]['sum(`ng`)'] : '0'
            index++
        }
        return result
    } catch (error) {
        return serviceResponse(500,error.message)
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

const getLogByRawQuery = async()=>{
    try {
        var result = await knex.raw(" " +
        "select FROM_UNIXTIME(AVG(UNIX_TIMESTAMP(CONCAT('1970-01-01',' ',b.start_production))),'%H:%i:%s') as st,  " +
        " b.stop_production as ft,  " +
        " ROUND((AVG(UNIX_TIMESTAMP(CONCAT('1970-01-01',' ',b.stop_production))) - AVG(UNIX_TIMESTAMP(CONCAT('1970-01-01',' ',b.start_production))))/AVG(a.ct_plan)) as sampai,  " +
        " ROUND(SUM(CASE WHEN a.ok = 1 THEN 1 WHEN a.ok = -1 THEN -1 ELSE 0 END) - AVG(a.ct_plan))as target,  " +
        " SUM(CASE WHEN a.ok = 1 AND a.position = 'RH' THEN 1 WHEN a.ok = -1 AND a.position = 'RH' THEN -1 ELSE 0 END) as r1,  " +
        " SUM(CASE WHEN a.ng = 1 AND a.position = 'RH' THEN 1 ELSE 0 END) as r2, " +
        " SUM(CASE WHEN a.ok = 1 AND a.position = 'RH' THEN 1 WHEN a.ok = -1 AND a.position = 'RH' THEN -1 ELSE 0 END) + SUM(CASE WHEN a.ng = 1 AND a.position = 'RH' THEN 1 ELSE 0 END) as r3,  " +
        " SUM(CASE WHEN a.`desc` = 'Weld line' and a.position = 'RH' THEN 1 ELSE 0 END) AS r4,  " +
        " SUM(CASE WHEN a.`desc` = 'Jetting' and a.position = 'RH' THEN 1 ELSE 0 END) AS r5,  " +
        " SUM(CASE WHEN a.`desc` = 'Sink Mark' and a.position = 'RH' THEN 1 ELSE 0 END) AS r6,  " +
        " SUM(CASE WHEN a.`desc` = 'Blackdot' and a.position = 'RH' THEN 1 ELSE 0 END) AS r7,  " +
        " SUM(CASE WHEN a.`desc` = 'Crack' and a.position = 'RH' THEN 1 ELSE 0 END) AS r8,  " +
        " SUM(CASE WHEN a.`desc` = 'Scratch' and a.position = 'RH' THEN 1 ELSE 0 END) AS r9,  " +
        " SUM(CASE WHEN a.`desc` = 'Bubble' and a.position = 'RH' THEN 1 ELSE 0 END) AS r10,  " +
        " SUM(CASE WHEN a.`desc` = 'Short Mold' and a.position = 'RH' THEN 1 ELSE 0 END) AS r11,  " +
        " SUM(CASE WHEN a.`desc` = 'Oil' and a.position = 'RH' THEN 1 ELSE 0 END) AS r12,  " +
        " SUM(CASE WHEN a.`desc` = 'Flowmark' and a.position = 'RH' THEN 1 ELSE 0 END) AS r13,  " +
        " SUM(CASE WHEN a.`desc` = 'Silver' and a.position = 'RH' THEN 1 ELSE 0 END) AS r14,  " +
        " SUM(CASE WHEN a.`desc` = 'Flek' and a.position = 'RH' THEN 1 ELSE 0 END) AS r15,  " +
        " SUM(CASE WHEN a.`desc` = 'DENTED' and a.position = 'RH' THEN 1 ELSE 0 END) AS r16,  " +
        " SUM(CASE WHEN a.`desc` = 'Kontaminasi' and a.position = 'RH' THEN 1 ELSE 0 END) AS r17,  " +
        " SUM(CASE WHEN a.ok = 1 AND a.position = 'LH' THEN 1 WHEN a.ok = -1 AND a.position = 'LH' THEN -1 ELSE 0 END) as l1,  " +
        " SUM(CASE WHEN a.ng = 1 AND a.position = 'LH' THEN 1 ELSE 0 END) as l2,  " +
        " SUM(CASE WHEN a.ok = 1 AND a.position = 'LH' THEN 1 WHEN a.ok = -1 AND a.position = 'LH' THEN -1 ELSE 0 END) + SUM(CASE WHEN a.ng = 1 AND a.position = 'LH' THEN 1 ELSE 0 END) as l3,  " +
        " SUM(CASE WHEN a.`desc` = 'Weld line' and a.position = 'LH' THEN 1 ELSE 0 END) AS l4,  " +
        " SUM(CASE WHEN a.`desc` = 'Jetting' and a.position = 'LH' THEN 1 ELSE 0 END) AS l5,  " +
        " SUM(CASE WHEN a.`desc` = 'Sink Mark' and a.position = 'LH' THEN 1 ELSE 0 END) AS l6,  " +
        " SUM(CASE WHEN a.`desc` = 'Blackdot' and a.position = 'LH' THEN 1 ELSE 0 END) AS l7,  " +
        " SUM(CASE WHEN a.`desc` = 'Crack' and a.position = 'LH' THEN 1 ELSE 0 END) AS l8,  " +
        " SUM(CASE WHEN a.`desc` = 'Scratch' and a.position = 'LH' THEN 1 ELSE 0 END) AS l9,  " +
        " SUM(CASE WHEN a.`desc` = 'Bubble' and a.position = 'LH' THEN 1 ELSE 0 END) AS l10,  " +
        " SUM(CASE WHEN a.`desc` = 'Short Mold' and a.position = 'LH' THEN 1 ELSE 0 END) AS l11,  " +
        " SUM(CASE WHEN a.`desc` = 'Oil' and a.position = 'LH' THEN 1 ELSE 0 END) AS l12,  " +
        " SUM(CASE WHEN a.`desc` = 'Flowmark' and a.position = 'LH' THEN 1 ELSE 0 END) AS l13,  " +
        " SUM(CASE WHEN a.`desc` = 'DENTED' and a.position = 'LH' THEN 1 ELSE 0 END) AS l14,  " +
        " SUM(CASE WHEN a.`desc` = 'Silver' and a.position = 'LH' THEN 1 ELSE 0 END) AS l15,  " +
        " SUM(CASE WHEN a.`desc` = 'Flek' and a.position = 'LH' THEN 1 ELSE 0 END) AS l16,  " +
        " SUM(CASE WHEN a.`desc` = 'Kontaminasi' and a.position = 'LH' THEN 1 ELSE 0 END) AS ngl17,  " +
        " SUM(CASE WHEN a.`desc` = 'NG SETTING' and a.position = 'RH' THEN 1 ELSE 0 END) AS ng_setting_rh,  " +
        " SUM(CASE WHEN a.`desc` = 'Setting' and a.position = 'RH' THEN 1 ELSE 0 END) AS setting_rh,  " +
        " SUM(CASE WHEN a.`desc` = 'NG SETTING' and a.position = 'LH' THEN 1 ELSE 0 END) AS ng_setting_lh,  " +
        " SUM(CASE WHEN a.`desc` = 'Setting' and a.position = 'LH' THEN 1 ELSE 0 END) AS setting_lh,  " +
        " SUM(CASE WHEN a.`desc` = 'Mold (Polish)' THEN stopline ELSE 0 END) as mold, "+
        " SUM(CASE WHEN a.`desc` = 'Shortage Man Power' THEN stopline ELSE 0 END) as shortage  " +
        " FROM `log_production` as `a` inner join `shift_times` as `b`  " +
        " on TIME(a.datetime) >= `b`.`start_production`  " +
        " and TIME(a.datetime) <= `b`.`stop_production`  " +
        " where `a`.`line_name` = 'INJECTION/MC11' and date(`a`.`datetime`) = '2022-11-04'  " +
        " group by `b`.`stop_production` ");

        return result[0];
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

module.exports = {
    getMcLogByTime,
    getNgList,
    getSumNGSetting,
    getSumGump,
    getRunner,
    getLogByRawQuery
}