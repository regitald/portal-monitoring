const convertToDate = async(dateString)=>{
    var dateFormatted = date.parse(dateString,'DD-MM-YYYY')
    dateFormatted.set
    console.log(dateFormatted);
}

const getHourAndMinutesFromDate = async(date)=>{
    var hours = await getHoursFromDate(date)
    var minutes = await getMinutesFromDate(date)
    return hours + ":"+ minutes

}

const getMinutesFromDate = async(date)=>{
    var minutes = new Date(date).getMinutes();
    return minutes < 10 ? '0'+minutes : minutes
}

const getHoursFromDate = async(date)=>{
    var hours = new Date(date).getHours()
    return hours < 10 ? '0'+hours : hours
}

module.exports = {
    getHourAndMinutesFromDate
}
