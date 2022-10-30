const reportService = require('../../services/report/reportService')
const getLogReport = async (req,res,next)=>{
    try {
        var roles = await reportService.getLogReport(req.query)
        res.send(response("succes",roles));
    } catch (error) {
        res.status(500).send(error)
    }    
}

module.exports = {
    getLogReport
}