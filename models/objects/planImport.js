const getPlanModel = ()=>{
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
        "finish_production"    
    ]
}


module.exports = {
    getPlanModel
}