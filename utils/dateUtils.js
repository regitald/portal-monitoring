const convertToDate = async(dateString)=>{
    var dateFormatted = date.parse(dateString,'DD-MM-YYYY')
    dateFormatted.set
    console.log(dateFormatted);
}

const getHourAndMinutesFromDate = async(dateTime)=>{
    var hours = await getHoursFromDate(dateTime)
    var minutes = await getMinutesFromDate(dateTime)
    return hours + ":"+ minutes

}

const getMinutesFromDate = async(dateTime)=>{
    var minutes = new Date(dateTime).getMinutes();
    return minutes < 10 ? '0'+minutes : minutes
}

const getHoursFromDate = async(dateTime)=>{
    var hours = new Date(dateTime).getHours()
    return hours < 10 ? '0'+hours : hours
}

const getDateFromDateTime = async(dateTime)=>{
    var date = dateTime.getDate()
    var month = dateTime.getMonth() + 1
    var year = dateTime.getFullYear()

    var newDate = date < 10 ? "0"+date : date
    var newMonth = month < 10 ? "0"+month : month
    return year.toString() + "-"+ newMonth.toString() + "-"+ newDate.toString()
}

//case when date from excel parsed to date become less 12 ms from the correct datetime
const getRoundedDateFromDateTime = async(dateTime)=>{
    dateTime.setSeconds(dateTime.getSeconds() + 30)
    dateTime.setSeconds(0)
    var date = dateTime.getDate()
    var month = dateTime.getMonth() + 1
    var year = dateTime.getFullYear()

    var newDate = date < 10 ? "0"+date : date
    var newMonth = month < 10 ? "0"+month : month
    return year.toString() + "-"+ newMonth.toString() + "-"+ newDate.toString()
}

module.exports = {
    getHourAndMinutesFromDate,
    getDateFromDateTime,
    getRoundedDateFromDateTime
}
