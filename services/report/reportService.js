const reportRepository = require('../../repositories/reportRepository')
const { createDoc } = require('../../utils/PdfGenerator/pdfGenerator')

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
    const timeList = getTimeList(0,0)

    var ngList =  await reportRepository.getNgList()
    var ngKeys = []
    for(ng of ngList){
        var newNg = ng.name.replace(/ /g,'')
        ngKeys.push(newNg)
    }   

    var paramsLog = Object.assign({},params)


    var result = []
    var rows = []
    let isLH = true


    for(time of timeList){
        var row = []
        var dataLog1 = {}
        var dataLog2 = {}

        var data = {}
        paramsLog.datetime_from = params.production_date + " " + time.start
        paramsLog.datetime_to = params.production_date + " " + time.stop
        data.production_date = params.production_date
        data.start = time.start 
        data.stop = time.stop

        row.push({
            style : 'body',
            text:time.start
          })
        row.push({
            style : 'body',
            text:time.stop
          })

        row.push({
            style : 'body',
            text:'LH'
        })
        paramsLog.position = 'LH'
        dataLog1 = await reportRepository.getMcLogByTime(paramsLog,ngKeys,ngList)

        for(ng of ngKeys){
            var key = "ng_"+ng
            row.push({
                style : 'body',
                text: dataLog1[key]
            })
        }

        row.push({
            style : 'body',
            text:'RH'
        })

        paramsLog.position = 'RH'
        dataLog2 = await reportRepository.getMcLogByTime(paramsLog,ngKeys,ngList) 

        for(ng of ngKeys){
            let key = "ng_"+ng
            row.push({
                style : 'body',
                text: dataLog2[key]
            })
        }

        rows.push(row)
    }

    console.log(rows);

    createDoc(ngList,rows)

    return ""
   } catch (error) {
    console.log(error);
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