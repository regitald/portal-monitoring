const reportRepository = require('../../repositories/reportRepository')
const { createDoc } = require('../../utils/PdfGenerator/pdfGenerator')
const planningService = require('../../services/planning/planningService')
const serviceResponse = require('../../models/responses/serviceResponse')
const shiftTimeService = require('../shift/shiftService')
const { getHourAndMinutesFromDate } = require('../../utils/dateUtils')
const { buildCondition } = require('../../repositories/conditionBuilder/knexConditionBuilder')
const { logProdArrObj } = require('../../models/objects/log_production')
var ng_max_default = 12

const getLogReport = async(params)=>{
    /*
    params should be :
    production_date,
    line_name,
    part_name,
    part_no,
    shift,
    shift_mode,
    */
   try {
    let period = 'daily'
    var getMoParams = {}

    var getlog = await reportRepository.getLogByRawQuery()
    

    if(params.production_date != null){
        getMoParams.production_date = params.production_date
    }

    if(params.line_number != null){
        getMoParams.line_number = params.line_number
    }

    if(params.shift_no != null){
        getMoParams.shift_no = params.shift_no
    }

    if(params.part_name != null){
        getMoParams.part_name = params.part_name
    }

    if(params.part_no != null){
        getMoParams.part_no = params.part_no
    }

    var shiftParams = {
        shift : params.shift_no,
        shift_mode : params.shift_mode
    } 
    var getTimeList = await shiftTimeService.getShifTimeByShiftAndMode(shiftParams)

    var timeList = getTimeList.content

    var ngList =  await reportRepository.getNgList()
    var ngKeys = []
    var total = {
        okLh_total : 0,
        okRh_total : 0,
        okngLh_total : 0,
        ngLh_total : 0,
        ngRh_total : 0,
        okngRh_total : 0
    }

    var logTotalRH = {}
    var logTotalLH = {}

    for(ng of ngList){
        var newNg = ng.name.replace(/ /g,'')
        ngKeys.push(newNg)
        logTotalRH[newNg+"_total"] = 0
        logTotalLH[newNg+"_total"] = 0
    }   

    var paramsLog = Object.assign({},params)
    var rows = []

    var rowTotalLh = [
        {
            rowSpan : 2,
            colSpan : 2,
            style : 'body',
            text:'Total'
        },'',{
            style : 'body',
            text:'QTY'
        },
        {
            style : 'body',
            text:'LH'
        }
    ]

    var rowTotalRh = [
        '','',{
            style : 'body',
            text:'QTY'
        },
        {
            style : 'body',
            text:'RH'
        }
    ]

    let index = 0;
    for(time of timeList){
        var row = []
        var dataLogLH = {}
        var dataLogRH = {}

        var data = {}
        paramsLog.datetime_from = params.production_date + " " + time.start_production
        paramsLog.datetime_to = params.production_date + " " + time.stop_production
        data.production_date = params.production_date
        data.start = time.start_production 
        data.stop = time.stop_production

        var startHour = await getHourAndMinutesFromDate(new Date(paramsLog.datetime_from))
        var stopHour = await getHourAndMinutesFromDate(new Date(paramsLog.datetime_to))

        row.push({
            style : 'body',
            rowSpan : 2,
            text: startHour
          })

        row.push({
            rowSpan : 2,
            style : 'body',
            text: stopHour
          })
        
        row.push({
            style : 'body',
            text:'QTY'
        })

        row.push({
            style : 'body',
            text:'LH'
        })

        paramsLog.position = 'LH'
        dataLogLH = await reportRepository.getMcLogByTime(paramsLog,ngKeys,ngList)

        row.push({
            style : 'body',
            text: dataLogLH.ok
        })

        row.push({
            style : 'body',
            text:dataLogLH.ng
        })

        row.push({
            style : 'body',
            text: dataLogLH.total
        })

        total.okLh_total += parseInt(dataLogLH.ok)
        total.ngLh_total += parseInt(dataLogLH.ng)
        total.okngLh_total += parseInt(dataLogLH.total)

        if(index == timeList.length - 1){
            rowTotalLh.push({ 
                style : 'body',
                text: total.okLh_total
            })

            rowTotalLh.push({ 
                style : 'body',
                text: total.ngLh_total
            })

            rowTotalLh.push({ 
                style : 'body',
                text: total.okngLh_total
            })
        }

        for(ng of ngKeys){
            var key = "ng_"+ng
            var totalKey = ng+"_total"
            logTotalRH[totalKey] += parseInt(dataLogLH[key])
            row.push({
                style : 'body',
                text: dataLogLH[key]
            })
            if(index == timeList.length - 1){
                rowTotalLh.push({ 
                    style : 'body',
                    text: logTotalRH[totalKey]
                })
            }
        }
        
        rows.push(row)
        
        var row = []
        
        row.push('')
          
        row.push('')

        row.push({
            style : 'body',
            text:'QTY'
        })

        row.push({
            style : 'body',
            text:'RH'
        })

        paramsLog.position = 'RH'
        dataLogRH = await reportRepository.getMcLogByTime(paramsLog,ngKeys,ngList) 

        row.push({
            style : 'body',
            text: dataLogRH.ok
        })

        row.push({
            style : 'body',
            text:dataLogRH.ng
        })

        row.push({
            style : 'body',
            text: dataLogRH.total
        })

        total.okRh_total += parseInt(dataLogRH.ok)
        total.ngRh_total += parseInt(dataLogRH.ng)
        total.okngRh_total += parseInt(dataLogRH.total)

        if(index == timeList.length - 1){
            rowTotalRh.push({ 
                style : 'body',
                text: total.okRh_total
            })

            rowTotalRh.push({ 
                style : 'body',
                text: total.ngRh_total
            })

            rowTotalRh.push({ 
                style : 'body',
                text: total.okngRh_total
            })
        }

        for(ng of ngKeys){
            let key = "ng_"+ng
            var totalKey = ng+"_total"
            logTotalLH[totalKey] += parseInt(dataLogRH[key])
            row.push({
                style : 'body',
                text: dataLogRH[key]
            })

            if(index == timeList.length - 1){
                rowTotalRh.push({ 
                    style : 'body',
                    text: logTotalLH[totalKey]
                })
            }
        }

        rows.push(row)
        index++;
    }

    rows.push(rowTotalLh)
    rows.push(rowTotalRh)

    //get footer data
    var paramsBetweenToday = {
        datetime_from : params.production_date + " " + timeList[0].start_production,
        datetime_to : params.production_date + " " + timeList[timeList.length - 1].stop_production
    }

    var paramsNgSettingLh = {
        datetime_from : paramsBetweenToday.datetime_from,
        datetime_to : paramsBetweenToday.datetime_to,
        ng : "1",
        position:"LH",
        status_machine:"0"
    }

    var paramsNgSettingRh = {
        datetime_from : paramsBetweenToday.datetime_from,
        datetime_to : paramsBetweenToday.datetime_to,
        ng : "1",
        position:"RH",
        status_machine:"0"
    }

    var ngSettingLhCondition = await buildCondition(logProdArrObj(),paramsNgSettingLh)
    var ngSettingRhCondition = await buildCondition(logProdArrObj(),paramsNgSettingRh)
    var betweenToday = await buildCondition(logProdArrObj(),paramsBetweenToday)

    let ngSettingLh = await reportRepository.getSumNGSetting(ngSettingLhCondition)
    let ngSettingRh = await reportRepository.getSumNGSetting(ngSettingRhCondition)
    var gump = await reportRepository.getSumGump(betweenToday)
    var runner = await reportRepository.getRunner(betweenToday)

    var mo = await planningService.getPlanningList(period,getMoParams);
    
    if(mo.code != 200){
        return serviceResponse(500,"mo not found")
    }else{
        var moContent = mo.content
        var footer = {}

        footer.ngSettingLh = ngSettingLh != null ? ngSettingLh : 0
        footer.ngSettingRh =  ngSettingRh != null ? ngSettingRh : 0
        footer.gump = gump != null ? gump : 0
        footer.runner = runner != null ? runner : 0
        footer.ng_max = ng_max_default
        footer.achievementRateLH = Number(parseInt(total.okLh_total) / parseInt(moContent[0].target_production)).toFixed(2)
        footer.achievementRateRH = Number(parseInt(total.okRh_total) / parseInt(moContent[0].target_production)).toFixed(2)
        let ngRateLH = Number(parseInt(total.ngLh_total) / parseInt(total.okLh_total)).toFixed(2) 
        let ngRateRH = Number(parseInt(total.ngRh_total) / parseInt(total.okRh_total)).toFixed(2)  
        footer.ngRateLH = isNaN(ngRateLH) ? " NG/OK  :  "+ total.ngLh_total +"/"+total.okLh_total : ngRateLH * 100 + " %"
        footer.ngRateRH = isNaN(ngRateRH) ? "NG/OK :  "+ total.ngRh_total + "/" + total.okRh_total : ngRateRH * 100 + " %"
        footer.ng_max_default = ng_max_default

        var pdfDocWriteStream  = await createDoc(ngList,rows,moContent[0],footer)
        
        return serviceResponse(200,"success",pdfDocWriteStream)
    }
   } catch (error) {
    serviceResponse(500,error.message)
   }

}


module.exports = {
    getLogReport
}