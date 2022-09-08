const newPlanningReq = ({production_date,line_number,shift_no,no_mo,part_no,
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

module.exports = {
    newPlanningReq
}