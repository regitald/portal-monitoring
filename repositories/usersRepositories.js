const db = require('./db')

const save = async (user)=>{
    var userMap = [user.first_name,user.last_name,user.username,
    user.email, user.phone_number, user.password
    ]
    try {
       var [result,fields] = await db.query(" "+
       " INSERT INTO users "+
       " (first_name, last_name, username, email, phone_number, "+
       " password) "+
       " VALUES(?,?,?,?,?,?)"+
       "" ,userMap)
        return result
    } catch (error) {
        throw error
    }
}

const findAll = async ()=>{
    try {
        var [users,fields] = await db.query("SELECT * FROM `users` ");
        return users
    } catch (error) {
        throw error
    }
}

const findById = async (id)=>{
    try {
        var [user,field] = await db.query("SELECT * FROM `users` WHERE `id` = ?",id)
        return user

    } catch (error) {
        throw error
    }
}

const updateById = async (user)=>{
    
}

module.exports = {
    save,
    findAll,
    findById,
}