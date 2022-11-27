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

const getQueyModel = ()=>{
    return {
        total_ok_rh,
        total_ng_rh,
        ngr01,
        ngr02,
        ngr03,
        ngr04,
        ngr05,
        ngr06,
        ngr07,
        ngr08,
        ngr09,
        ngr10,
        ngr11,
        ngr12,
        ngr13,
        ngr14,
        total_ok_lh,
        total_ng_lh,
        ngl01,
        ngl02,
        ngl03,
        ngl04,
        ngl05,
        ngl06,
        ngl07,
        ngl08,
        ngl09,
        ngl10,
        ngl11,
        ngl12,
        ngl13,
        ngl14,
        ng_setting_rh,
        setting_rh,
        ng_setting_lh,
        setting_lh,
        ttotal_rh,
        total_lh,
        mold,
        shortage
    }
}

module.exports = {
    getQueyModel
}