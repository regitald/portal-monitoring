const reportRepository = require('../../repositories/reportRepository')
const planningService = require('../planning/planningService')
const { buildCondition } = require('../../repositories/conditionBuilder/knexConditionBuilder')
const { logProdArrObj } = require('../../models/objects/log_production')
const { createDoc } = require('../../utils/PdfGenerator/pdfGenerator')
const shiftTimeService = require('../shift/shiftService')
const serviceResponse = require('../../models/responses/serviceResponse')
const { readRuntime } = require('blade')

const generateReportByRawQuery = async(params)=>{
    try {
        let rows = []
        let ngSettingLh = 0
        let ngSettingRh = 0
        var ngList =  await reportRepository.getNgList()
        let ngSetting = {}
        var total = {
            okLh_total : 0,
            okRh_total : 0,
            okngLh_total : 0,
            ngLh_total : 0,
            ngRh_total : 0,
            okngRh_total : 0
        }

        let logs = await reportRepository.getLogByRawQuery();
        for(let log of logs){
            let rowR = []
            let start = log.st
            let stop = log.ft

            rowR.push({
                style : 'body',
                rowSpan : 2,
                text: start.substring(0,5)
              })
    
              rowR.push({
                rowSpan : 2,
                style : 'body',
                text: stop.substring(0,5)
              })

              rowR.push({
                style : 'body',
                text:'QTY'
            })
    
            rowR.push({
                style : 'body',
                text:'RH'
            })


            for(let rh = 1; rh< 17;rh++){
                let key = "r"+rh;
                let value = log[key]

                rowR.push({
                    style : 'body',
                    text: value
                })
            }

            let stopLineR = 0

            if(log['shortage'] == 'stopline'){
                stopLineR++;
            }

            if(log['mold'] == 'stopline'){
                stopLineR++;
            }

            rowR.push({
                style : 'body',
                text: stopLineR
              })

            rows.push(rowR)

            let rowL = []

            rowL.push('')
    
            rowL.push('')

            rowL.push({
                style : 'body',
                text:'QTY'
            })
    
            rowL.push({
                style : 'body',
                text:'LH'
            })

            for(let lh = 1; lh< 17;lh++){
                let key = "l"+lh;
                let value = log[key]

                rowL.push({
                    style : 'body',
                    text:value
                })
            }

            let stopLineL = 0

            if(log['shortage'] == 'stopline'){
                stopLineL++;
            }

            if(log['mold'] == 'stopline'){
                stopLineL++;
            }

            rowL.push({
                style : 'body',
                text: stopLineL
              })

            rows.push(rowL)

            
            total.okLh_total += parseInt(log['l1'])
            total.ngLh_total += parseInt(log['l2'])
            total.okngLh_total += parseInt(log['l3'])

            ngSetting.ngSettingRh = ngSettingRh + parseInt(log['ng_setting_rh'])
            ngSetting.ngSettingLh = ngSettingLh + parseInt(log['ng_setting_lh'])

            total.okRh_total += parseInt(log['r1'])
            total.ngRh_total += parseInt(log['r2'])
            total.okngRh_total += parseInt(log['r3'])
        }

        let mo = await getMo('daily',params)
        if(mo.code != 200 || mo.content.length == 0){
            return serviceResponse(404, "mo not found")
        }
        let footer = await getFooter(params,ngSetting,total,mo.content[0])
        var pdfDocWriteStream  = await createDoc(ngList,rows,mo.content[0],footer)

        return serviceResponse(200,"success",pdfDocWriteStream)
    } catch (error) {
        console.log(error);
    }
}

const getMo = async(period,params)=>{
    try {
        let getMoParams = {}
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
        var mo = await planningService.getPlanningList(period,getMoParams);
        return mo
    } catch (error) {
        return error.message
    }
}

const getTimeShifts = async(params)=>{
    try {
        var shiftParams = {
            shift : params.shift_no,
            shift_mode : params.shift_mode
        }
        
        var getTimeList = await shiftTimeService.getShifTimeByShiftAndMode(shiftParams)
        return getTimeList.content
    } catch (error) {
        return error   
    }
}

const getFooter = async(params,ngSetting,total,moContent)=>{
    try {
        var timeList = await getTimeShifts(params)

        var paramsBetweenToday = {
            datetime_from : params.production_date + " " + timeList[0].start_production,
            datetime_to : params.production_date + " " + timeList[timeList.length - 1].stop_production
        }
        
        var betweenToday = await buildCondition(logProdArrObj(),paramsBetweenToday)

        var footer = {}
        var gump = await reportRepository.getSumGump(betweenToday)
        var runner = await reportRepository.getRunner(betweenToday)

        footer.ngSettingLh = ngSetting.ngSettingLh
        footer.ngSettingRh =  ngSetting.ngSettingRh
        footer.gump = gump != null ? gump : 0
        footer.runner = runner != null ? runner : 0
        footer.ng_max = 12
        footer.achievementRateLH = Number(parseInt(total.okLh_total) / parseInt(moContent.target_production)).toFixed(2)
        footer.achievementRateRH = Number(parseInt(total.okRh_total) / parseInt(moContent.target_production)).toFixed(2)
        let ngRateLH = Number(parseInt(total.ngLh_total) / parseInt(total.okLh_total))
        let ngRateRH = Number(parseInt(total.ngRh_total) / parseInt(total.okRh_total))
        footer.ngRateLH = isNaN(ngRateLH) ? " NG/OK  :  "+ total.ngLh_total +"/"+total.okLh_total : (ngRateLH * 100).toFixed(2) + " %"
        footer.ngRateRH = isNaN(ngRateRH) ? "NG/OK :  "+ total.ngRh_total + "/" + total.okRh_total : (ngRateRH * 100).toFixed(2) + " %"
        footer.ng_max_default = 12

        return footer
     
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

module.exports = {
    generateReportByRawQuery,
    getMo
}