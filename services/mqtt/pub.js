const uuid = require('uuid')
const {getMqttCon} = require('../../config/mqtt')

const pubMqtt = async()=>{
    var mqttClient = await getMqttCon(uuid.v4())
    var counter = 0;
    setInterval(()=>{
        var message = "counter "+counter
        var pub = mqttClient.publish('test',message,{qos:1, retain:false},(err)=>{
            console.log("publish ");
            if(err){
                console.log(err);
            }
        })
        counter++
    },100)

}

pubMqtt()