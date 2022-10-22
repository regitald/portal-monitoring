const uuid = require('uuid')
const {getMqttCon} = require('../../config/mqtt')

const subKpi = async(getData)=>{
    var mqttClient = await getMqttCon(uuid.v4())
    mqttClient.subscribe('porting/kpi',{},(err)=>{
        mqttClient.on('message',(msg,buff,pckt)=>{
            getData(buff.toString())
            console.log(buff.toString());
        })
     })
}

module.exports = {
    subKpi
}