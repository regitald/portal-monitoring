const getMaintenanceObj = ({maintenance_date,line_number,desc,status,created_at,updated_at})=>{
    return {
        maintenance_date,line_number,desc,status,created_at,updated_at
    }
}

const getMaintenanceArrObj = ()=>{
    return[
        "maintenance_date","line_number","desc","status","created_at","updated_at"
    ]
}

module.exports = {getMaintenanceObj,getMaintenanceArrObj}