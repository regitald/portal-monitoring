const serviceResponse = require("../../models/responses/serviceResponse")
const repository = require('../../repositories/lineNumbersRepository');

const getLineNumbers = async()=>{
    try {
        var lineNumbers = await repository.findAll()
        var lineNumbersArr = []
        if(lineNumbers.code == 200){
            for(let line of lineNumbers.content){
                var lineNumber =  line.type +"/" + line.name
                lineNumbersArr.push(lineNumber)
            }
        }
        lineNumbers.content = lineNumbersArr
        return lineNumbers
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

module.exports = {
    getLineNumbers
}