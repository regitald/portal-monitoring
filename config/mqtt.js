var mqtt = require('mqtt')

// var opt = {
//     clientId:"mqttjs01",
//     username:process.env.MQTT_USERNAME,
//     password:process.env.MQTT_PASSWORD,
//     clean:true
// }

const getMqttCon = async (uuid)=>{
    var opt = {
        username : 'test',
        password : 'test',
        clientId : uuid
    }
    
    // var host = process.env.MQTT_HOST
    var host = 'mqtt://103.63.25.67'
    
    var mqttCon = mqtt.connect(host,opt);
    var mqttClient = await mqttCon.on("connect",()=>{})
    return mqttClient
}

module.exports = {
    getMqttCon
}