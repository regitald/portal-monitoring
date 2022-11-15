const {knex} = require('./iniDbConnection')
const {buildCondition} = require('./conditionBuilder/knexConditionBuilder')
const {logProdArrObj} = require('../models/objects/log_production')
const serviceResponse = require('../models/responses/serviceResponse')
const mysql = require('mysql2/promise');
    
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
            var getNg = await knex('log_production').count('ng')
            .where('position',paramsQuery.position)
            .andWhere('ng','>',0)
            .andWhereBetween('datetime',[paramsQuery.datetime_from,paramsQuery.datetime_to])
            .andWhereILike('desc','%'+ng.name+'%')
            result[key] = getNg[0]['count(`ng`)'] != null ? getNg[0]['count(`ng`)'] : '0'
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

const getLogByTimeRawQuery = async (paramsQuery)=>{
    
    try {

        // create the connection to database
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USERNAME,
            password : process.env.DB_PASSWORD,
            port : process.env.PORT,
            database: process.env.DB_NAME
        });

        const [rows, fields] = await connection.execute('' +
        "select ok,ng,ok+ng as okng,weldLine,jetting,c.sinkMark,blackDot,crack,scratch,bubble,oil,flowMark,flashingBurry,overCutting,\n" +
        "silver,flek,others from \n" +
        "(select sum(ok) as 'ok',sum(ng) as 'ng',1 as a from log_production lp \n" +
        "where `datetime` BETWEEN '2022-10-22 12:00' and '2022-10-22 13:00'\n" +
        "and  `position`  = 'RH')okng left join (\n" +
        "select count(*) as 'weldLine',1 as a from log_production lp \n" +
        "where `datetime` BETWEEN '2022-10-22 12:00' and '2022-10-22 13:00'\n" +
        "and  `position`  = 'RH' and `desc` like '%Weld Line%'\n" +
        ")a on okng.a = a.a left join (\n" +
        "select count(*) as 'jetting', 1 as a from log_production lp \n" +
        "where `datetime` BETWEEN '2022-10-22 12:00' and '2022-10-22 13:00'\n" +
        "and  `position`  = 'RH' and `desc` like '%Jetting%'\n" +
        ")b on a.a = b.a left join (\n" +
        "select count(*) as 'sinkMark', 1 as a from log_production lp \n" +
        "where `datetime` BETWEEN '2022-10-22 12:00' and '2022-10-22 13:00'\n" +
        "and  `position`  = 'RH' and `desc` like '%Sink Mark%'\n" +
        ")c on a.a = c.a left join (\n" +
        "select count(*) as 'blackDot', 1 as a from log_production lp \n" +
        "where `datetime` BETWEEN '2022-10-22 12:00' and '2022-10-22 13:00'\n" +
        "and  `position`  = 'RH' and `desc` like '%Black Dot%'\n" +
        ")d on a.a = d.a left join (\n" +
        "select count(*) as 'crack', 1 as a from log_production lp \n" +
        "where `datetime` BETWEEN '2022-10-22 12:00' and '2022-10-22 13:00'\n" +
        "and  `position`  = 'RH' and `desc` like '%Crack%'\n" +
        ")e on a.a = e.a left join (\n" +
        "select count(*) as 'scratch', 1 as a from log_production lp \n" +
        "where `datetime` BETWEEN '2022-10-22 12:00' and '2022-10-22 13:00'\n" +
        "and  `position`  = 'RH' and `desc` like '%Scratch%'\n" +
        ")f on a.a = f.a left join (\n" +
        "select count(*) as 'bubble', 1 as a from log_production lp \n" +
        "where `datetime` BETWEEN '2022-10-22 12:00' and '2022-10-22 13:00'\n" +
        "and  `position`  = 'RH' and `desc` like '%Bubble%'\n" +
        ")g on a.a = g.a left join (\n" +
        "select count(*) as 'oil', 1 as a from log_production lp \n" +
        "where `datetime` BETWEEN '2022-10-22 12:00' and '2022-10-22 13:00'\n" +
        "and  `position`  = 'RH' and `desc` like '%Oil%'\n" +
        ")h on a.a = h.a left join (\n" +
        "select count(*) as 'flowMark', 1 as a from log_production lp \n" +
        "where `datetime` BETWEEN '2022-10-22 12:00' and '2022-10-22 13:00'\n" +
        "and  `position`  = 'RH' and `desc` like '%Flowmark%'\n" +
        ")i on a.a = i.a left join (\n" +
        "select count(*) as 'flashingBurry', 1 as a from log_production lp \n" +
        "where `datetime` BETWEEN '2022-10-22 12:00' and '2022-10-22 13:00'\n" +
        "and  `position`  = 'RH' and `desc` like '%Flashin/Burry%'\n" +
        ")j on a.a = j.a left join (\n" +
        "select count(*) as 'overCutting', 1 as a from log_production lp \n" +
        "where `datetime` BETWEEN '2022-10-22 12:00' and '2022-10-22 13:00'\n" +
        "and  `position`  = 'RH' and `desc` like '%Over Cutting%'\n" +
        ")k on a.a = k.a left join (\n" +
        "select count(*) as 'silver', 1 as a from log_production lp \n" +
        "where `datetime` BETWEEN '2022-10-22 12:00' and '2022-10-22 13:00'\n" +
        "and  `position`  = 'RH' and `desc` like '%Silver%'\n" +
        ")l on a.a = l.a left join (\n" +
        "select count(*) as 'flek', 1 as a from log_production lp \n" +
        "where `datetime` BETWEEN '2022-10-22 12:00' and '2022-10-22 13:00'\n" +
        "and  `position`  = 'RH' and `desc` like '%Flek%'\n" +
        ")m on a.a = m.a left join (\n" +
        "select count(*) as 'others', 1 as a from log_production lp \n" +
        "where `datetime` BETWEEN '2022-10-22 12:00' and '2022-10-22 13:00'\n" +
        "and  `position`  = 'RH' and `desc` like '%Others%'\n" +
        ")n on a.a = n.a " +
        "",[]);
        return rows
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

module.exports = {
    getLogByTimeRawQuery,
    getMcLogByTime,
    getNgList,
    getSumNGSetting,
    getSumGump,
    getRunner
}