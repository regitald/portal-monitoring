const mo = (production_date,line_number,shift_no,no_mo,part_no,
    part_name,part_category,target_production,cycle_time,start_production,
    finish_production,work_hours,status)=>{
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
            work_hours
        }
}

module.exports = {
    mo
}