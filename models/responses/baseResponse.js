const baseResponse = (code,message,content)=> {
    return {
        "code":code,
        "message":message,
        "contents:":content
    }
}

module.exports = baseResponse;
