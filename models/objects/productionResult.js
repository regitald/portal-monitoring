const getProductionResultObj = ({
    id,
    production_date,
    no_mo,
    total_ok,
    total_ng,
    total_ng_setting,
    total_running_time,
    total_stopline,
    npk,
    time,
    line,
    achievement,
    availability,
    performance,
    quality,
    oee,
    created_at,
    shift_no,
})=>{
    return {
        id,
        production_date,
        no_mo,
        total_ok,
        total_ng,
        total_ng_setting,
        total_running_time,
        total_stopline,
        npk,
        time,
        line,
        achievement,
        availability,
        performance,
        quality,
        oee,
        created_at,
        shift_no
    }
}

const getProductionResultArrObj = ()=>{
    return [
        'id',
        'production_date',
        'no_mo',
        'total_ok',
        'total_ng',
        'total_ng_setting',
        'total_running_time',
        'total_stopline',
        'npk',
        'time',
        'line',
        'achievement',
        'availability',
        'performance',
        'quality',
        'oee',
        'created_at',
        'shift_no'
    ]
}


module.exports = {
    getProductionResultObj,
    getProductionResultArrObj
}