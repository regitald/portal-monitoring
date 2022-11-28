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
        "part_no",
        "part_name",
        "part_category",
        "cycle_time",
        "target_production",
        "work_hour",
        "start_production",
        "finish_production"
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
        "part_no",
        "target_production",
        "cycle_time",
        "start_production",
        "finish_production",
        "status",
        "production_date_from",
        "production_date_to",
    ]
}

const getPartCategoryEnum = ()=>{
    return [
        'RH','LH','MID'
    ]
}





module.exports = {
    getPlanObj,
    getPlanArrObj,
    getFilterPlanArrObj,
    getPartCategoryEnum

}