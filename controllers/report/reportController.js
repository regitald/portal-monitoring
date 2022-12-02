const reportServiceByRawQuery = require('../../services/report/reportRawQuery')
const fs = require('fs')
const baseResponse = require('../../models/responses/baseResponse')
const getLogReport = async (req,res,next)=>{
    try {
        var response = await reportServiceByRawQuery.generateReportByRawQuery(req.query)
        if(response == undefined || response.code == undefined){
            res.status(500).send(baseResponse("internal server error"))
        }else if(response.code == 200){
            var pdfDoc  = response.content
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename=LPH.pdf');
            res.status(response.code)
            pdfDoc.pipe(res)
            pdfDoc.end()
        }else{
            res.status(response.code).send(baseResponse(response.message))
        }

    } catch (error) {
        res.status(500).send(error)
    }    
}

module.exports = {
    getLogReport
}