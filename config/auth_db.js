const mysql = require('mysql2/promise')

var mysqlOpt = {
    host: "localhost",
    user: "root",
    password: "allyoucan#34T",
    database:"portal-auth",
    port:3306
  }

  try{
    var con = mysql.createPool(mysqlOpt);
    test = con.query("SELECT now()")
    if(test == null){
      console.log("Not Connected");
    }
    
  }catch{
    console.log("database not connected");
  }

module.exports = con
