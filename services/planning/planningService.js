const serviceResponse = require('../../models/responses/serviceResponse')
const moRepository = require('../../repositories/planningRepository')

const getPlanningList = async()=>{
    try {
        var moList = await moRepository.findAll()
        return moList
    } catch (error) {
        return serviceResponse(500,error.meesage)
    }
}

const getPlanningById = async(id)=>{
    try {
        var mo = await moRepository.findById()
    } catch (error) {
        return serviceResponse(500,error.message)
    }
}

const addPlanning = async(mo)=>{
    try {
        var maxOrderId =await moRepository.findMaxOrderId(
            {
                production_date : mo.production_date,
                part_category: mo.part_category,
                line_number: mo.line_number
            }
        )
        if(maxOrderId.content != null){
            mo.order_id = maxOrderId.content[0].maxOrderId + 1
        }else{
            mo.order_id = 1
        }

        var created = await moRepository.save(mo)
        return created
    } catch (error) {
        return serviceResponse(500,error.meesage)
    }
}

const updatePlanning = async(id,moReq)=>{
    try {
        moReq.production_date = new Date(moReq.production_date);
        var updated = await moRepository.update(id,moReq);
        return updated;
    } catch (error) {
        return serviceResponse(500,error.meesage)
    }
}

module.exports = {
    getPlanningList,
    updatePlanning,
    getPlanningById,
    addPlanning
}