const reportRepository = require('../../repositories/reportRepository')
const { createDoc } = require('../../utils/PdfGenerator/pdfGenerator')
const planningService = require('../../services/planning/planningService')
const serviceResponse = require('../../models/responses/serviceResponse')

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

    if(mo.code != 200){
        return mo
    }

    var moContent = mo.content
    const timeList = getTimeList(0,0)

    var ngList =  await reportRepository.getNgList()
    var ngKeys = []
    var total = {
        okLh_total : 0,
        ngLh_total : 0,
        okngLh_total : 0,
        okRh_total : 0,
        ngRh_total : 0,
        okngRh_total : 0
    }

    for(ng of ngList){
        var newNg = ng.name.replace(/ /g,'')
        ngKeys.push(newNg)
        total[newNg+"_total"] = 0
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
        paramsLog.datetime_from = params.production_date + " " + time.start
        paramsLog.datetime_to = params.production_date + " " + time.stop
        data.production_date = params.production_date
        data.start = time.start 
        data.stop = time.stop

        row.push({
            style : 'body',
            rowSpan : 2,
            text: time.start
          })

        row.push({
            rowSpan : 2,
            style : 'body',
            text: time.stop
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
            total[totalKey] += parseInt(dataLogLH[key])
            row.push({
                style : 'body',
                text: dataLogLH[key]
            })
            if(index == timeList.length - 1){
                rowTotalLh.push({ 
                    style : 'body',
                    text: total[totalKey]
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
            total[totalKey] += parseInt(dataLogRH[key])
            row.push({
                style : 'body',
                text: dataLogRH[key]
            })

            if(index == timeList.length - 1){
                rowTotalRh.push({ 
                    style : 'body',
                    text: total[totalKey]
                })
            }
        }

        rows.push(row)
        index++;
    }
    rows.push(rowTotalLh)
    rows.push(rowTotalRh)

    var pdfDocWriteStream  = await createDoc(ngList,rows,moContent[0],total)

    return serviceResponse(200,"success",pdfDocWriteStream)
   } catch (error) {
    serviceResponse(500,error.message)
   }

}


const getTimeList = (shift,shift_mode)=>{
    return [
        {start:"07:00",stop:"08:00"},
        {start:"08:00",stop:"09:00"},
        {start:"09:00",stop:"10:00"},
        {start:"10:00",stop:"11:00"},
        {start:"11:00",stop:"12:00"},
        {start:"12:00",stop:"13:00"},
        {start:"13:00",stop:"14:00"},
        {start:"14:00",stop:"15:00"}
    ]
}

module.exports = {
    getLogReport
}