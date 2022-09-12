const xlsx = require('xlsx');

const convertToJson = async (file,model)=>{
    var workbook = xlsx.read(file,{
        cellDates: true
    })
    var objArr = new Array()
    var worksheet = workbook.SheetNames[0]
    var sheetObj = xlsx.utils.sheet_to_json(workbook.Sheets[worksheet], {header: 1});
    sheetObj.map(async (oArr,iArr)=>{
        if(iArr>0){
            var obj = {}
            oArr.map(async(o,i)=>{
                obj[model[i]] = o
            })

            objArr.push(obj)
        }
    })

    return objArr
}

module.exports = {
    convertToJson
}