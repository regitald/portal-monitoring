const serviceResponse = (code,message,content)=> {
    return {
        code,
        message,
        content
    }
}

module.exports = serviceResponse;