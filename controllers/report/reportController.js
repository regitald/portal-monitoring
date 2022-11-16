const reportService = require('../../services/report/reportService')
const fs = require('fs')
const getLogReport = async (req,res,next)=>{
    try {
        var response = await reportService.getLogReport(req.query)
        var pdfDoc  = response.content
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=LPH.pdf');
        res.status(response.code)
        pdfDoc.pipe(res)
        pdfDoc.end()
    } catch (error) {
        res.status(500).send(error)
    }    
}

module.exports = {
    getLogReport
}