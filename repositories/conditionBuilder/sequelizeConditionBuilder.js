const { Op } = require("sequelize")

const buildCondition = async (objModel,paramsQuery)=>{
    var where = {}
    try {
        var dateParams = checkDateFilter(paramsQuery)
        let filter = new Map(Object.entries(paramsQuery))
        for(let field of objModel){
            if( filter.has(field) ){
                var value = filter.get(field)
                if(value.startsWith('like')){
                    var extractedValue = extractValueFromBracket(value)
                    where[field] = {
                        [Op.iLike]: '%'+extractedValue+'%'
                    }
                }else{
                    where[field] = value
                }
            }
        }


        for(let dateField of dateParams){
            where[dateField.name] = {
                [Op.between] : [dateField.from,dateField.to]
            }
        }
        return where

    } catch (error) {
        throw error
    }
}

const extractValueFromBracket = (string)=>{
    var open = string.indexOf('(')
    var res = string.slice(open+1,-1)
    return res
}

const checkDateFilter = (paramsQuery)=>{
    var dateArrObj = []
    var filter = new Map(Object.entries(paramsQuery))
    var isFromExists = false;
    var isToExists = false;
    var dateObj = {}
    var name = ''
    filter.forEach((v,k)=>{
        if(k.endsWith('from')){
            name = k.replace('_from','')
            dateObj.from = v
            isFromExists = true
        }
        if(k.endsWith('to')){
            dateObj.to = v
            isToExists = true
        }
        if(isFromExists && isToExists){
            dateArrObj.push({
                name,
                from: dateObj.from,
                to: dateObj.to
            })
            isFromExists = false
            isToExists = false
        }
    })
    return dateArrObj
}

const fetchSortBy = async (paramsQuery)=>{
    var order = []
    try {
        if(paramsQuery.sort != undefined){
            if(Array.isArray(paramsQuery.sort)){
                var sortArr = paramsQuery.sort
                for(let sortByQuery of sortArr){
                    order.push(setOrderBy(sortByQuery))
                }
            }else{
                order.push(setOrderBy(paramsQuery.sort))
            }
        }
        return order

    } catch (error) {
        throw error
    }

}

const setOrderBy = (paramsQuery)=>{
    var sortByQuery = paramsQuery.split(',')
    return [sortByQuery[0],sortByQuery[1]]
}



module.exports = {
    buildCondition,
    fetchSortBy
}