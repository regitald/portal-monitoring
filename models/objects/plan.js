const getPlanObj = ({production_date,line_number,shift_no,no_mo,part_no,
    part_name,part_category,target_production,cycle_time,start_production,
    finish_production,work_hour,status})=>{
        return {
            production_date,
            line_number,
            shift_no,
            no_mo,
            part_no,
            part_name,
            part_category,
            target_production,
            cycle_time,
            start_production,
            finish_production,
            work_hour,
            status
        }
}

const getPlanArrObj = ()=>{
    return [ 
        "production_date",
        "shift_no",
        "line_number",
        "no_mo",
        "part_name",
        "part_category",
        "part_number",
        "target_production",
        "cycle_time",
        "start_production",
        "finish_production",
        "work_hour",
        "status"
    ]
}

const getFilterPlanArrObj = ()=>{
    return[ 
        "production_date",
        "shift_no",
        "line_number",
        "no_mo",
        "part_name",
        "part_category",
        "part_number",
        "target_production",
        "cycle_time",
        "start_production",
        "finish_production",
        "status",
        "production_date_from",
        "production_date_to",
    ]
}



module.exports = {
    getPlanObj,
    getPlanArrObj,
    getFilterPlanArrObj
}