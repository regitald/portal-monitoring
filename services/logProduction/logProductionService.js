const { logProdArrObj } = require("../../models/objects/log_production")
const { convertToJson } = require("../../utils/xlsxConverter")
const {save} = require('../../repositories/logProductionRepository')
const serviceResponse = require("../../models/responses/serviceResponse")

const importLogProduction = async(file)=>{
    try {
        var obj = logProdArrObj()
        var logProdArr = await convertToJson(file.data,obj)
        
        let counter = 1;
        let logProdAdded = []
        let logProdFailed = []
        let messages = []
        let inserted = 0
        let failed = 0

        for(let x = 0;x <= logProdArr.length-1;x++){
            try {
                var message = "data "+counter+" ";
                counter++;

                let logProd = logProdArr[x]

                let added = await save(logProd)

                if(added.code == 201){
                    inserted++
                    logProdAdded.push(added.content)
                }else{
                    failed++
                }
                message += added.message
                messages.push(message)   

            } catch (error) {
                logProdFailed.push(planObj)
                failed++
                messages.push(error.message) 
            }
        }

        var response = {
            inserted,
            failed,
            data : {
                inserted: logProdAdded,
                failed : logProdFailed
            }
        }
        return serviceResponse(200,messages,response)
    } catch (error) {
        return serviceResponse(500,error.error)
    }
}

module.exports = {
    importLogProduction
}