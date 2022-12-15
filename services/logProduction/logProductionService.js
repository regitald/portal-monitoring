const { logProdArrObj } = require("../../models/objects/log_production")
const { convertToJson } = require("../../utils/xlsxConverter")

const importLogProduction = async(file)=>{
    try {
        var obj = logProdArrObj()
        var logProd = await convertToJson(file.data,obj)
        console.log("import log prod");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    importLogProduction
}