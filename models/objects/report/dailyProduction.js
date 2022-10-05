const getDailyReportModel = ()=>{
    return {
        area,
        noMo,
        date,
        partName,
        partNumber,
        targetPerHour,
        shift,
        cycleTime,   
        member,
        production : []
        }
    }

const getProductionReportModel = ()=>{
    return {
        productionStart,
        productionFinish,
        qty,
        rhlh,
        ok,
        ng,
        total,
        bocor,
        crack,
        seraebut,
        scracth,
        setting,
        dirty,
        slinkmark,
        blackdot,
        other,
        lineStopAbnormality
    } 
}