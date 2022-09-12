const date = require('date-and-time')

const convertToDate = async(dateString)=>{
    var dateFormatted = date.parse(dateString,'DD-MM-YYYY')
    dateFormatted.set
    console.log(dateFormatted);

}
convertToDate('25-01-2022')
