const uuid = require('uuid')
const {getMqttCon} = require('../../config/mqtt')

const getSubMqtt = async()=>{
    var mqttClient = await getMqttCon(uuid.v4())
    mqttClient.subscribe('test',{},(err)=>{
        mqttClient.on('message',(msg,buff,pckt)=>{
            console.log(buff.toString());
        })
     })

}
getSubMqtt()
