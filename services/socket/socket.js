const lineNumberService = require('../../services/lineNumber/lineNumberService')
const {subKpi} = require('../mqtt/mqttService')
const {getMqttCon} = require('../../config/mqtt')
const uuid = require('uuid')

const kpiSocket = async(io)=>{
    try {
        var mqttClient = await getMqttCon(uuid.v4())
        mqttClient.setMaxListeners(100);
        var lineNumbers = (await lineNumberService.getLineNumbers()).content
          io.of("/machines").on("connection",async(socket)=>{   
            var dataArr = {}

            mqttClient.subscribe('porting/kpi/injection/01',{},(err)=>{
                mqttClient.on('message',(msg,buff,pckt)=>{
                    data = buff.toString()
                    try {
                        data = JSON.parse(data)                    
                    } catch (error) {
                        data = {}
                    }
                    dataArr[lineNumbers[0]] = data
                })
             })

             mqttClient.subscribe('porting/kpi/injection/02',{},(err)=>{
                mqttClient.on('message',(msg,buff,pckt)=>{
                    data = buff.toString()
                    try {
                        data = JSON.parse(data)                    
                    } catch (error) {
                        data = {}
                    }
                    dataArr[lineNumbers[1]] = data
                })
             })

             mqttClient.subscribe('porting/kpi/injection/03',{},(err)=>{
                mqttClient.on('message',(msg,buff,pckt)=>{
                    data = buff.toString()
                    try {
                        data = JSON.parse(data)                    
                    } catch (error) {
                        data = {}
                    }                    
                    dataArr[lineNumbers[2]] = data
                })
             })

             mqttClient.subscribe('porting/kpi/injection/04',{},(err)=>{
                mqttClient.on('message',(msg,buff,pckt)=>{
                    data = buff.toString()
                    try {
                        data = JSON.parse(data)                    
                    } catch (error) {
                        data = {}
                    }                    
                    dataArr[lineNumbers[3]] = data
                })
             })

             mqttClient.subscribe('porting/kpi/injection/05',{},(err)=>{
                mqttClient.on('message',(msg,buff,pckt)=>{
                    data = buff.toString()
                    try {
                        data = JSON.parse(data)                    
                    } catch (error) {
                        data = {}
                    }                    
                    dataArr[lineNumbers[4]] = data
                })
             })

             mqttClient.subscribe('porting/kpi/injection/06',{},(err)=>{
                mqttClient.on('message',(msg,buff,pckt)=>{
                    data = buff.toString()
                    try {
                        data = JSON.parse(data)                    
                    } catch (error) {
                        data = {}
                    }                    
                    dataArr[lineNumbers[5]] = data
                })
             })

             mqttClient.subscribe('porting/kpi/injection/07',{},(err)=>{
                mqttClient.on('message',(msg,buff,pckt)=>{
                    data = buff.toString()
                    try {
                        data = JSON.parse(data)                    
                    } catch (error) {
                        data = {}
                    }
                    dataArr[lineNumbers[6]] = data
                })
             })

             mqttClient.subscribe('porting/kpi/injection/08',{},(err)=>{
                mqttClient.on('message',(msg,buff,pckt)=>{
                    data = buff.toString()
                    try {
                        data = JSON.parse(data)                    
                    } catch (error) {
                        data = {}
                    }
                    dataArr[lineNumbers[7]] = data
                })
            })

            mqttClient.subscribe('porting/kpi/injection/11',{},(err)=>{
                mqttClient.on('message',(msg,buff,pckt)=>{
                    data = buff.toString()
                    try {
                        data = JSON.parse(data)                    
                    } catch (error) {
                        data = {}
                    }
                    dataArr[lineNumbers[8]] = data
                })
            })
             
            mqttClient.subscribe('porting/kpi/injection/12',{},(err)=>{
                mqttClient.on('message',(msg,buff,pckt)=>{
                    data = buff.toString()
                    try {
                        data = JSON.parse(data)                    
                    } catch (error) {
                        data = {}
                    }
                    dataArr[lineNumbers[9]] = data
                })
            })

            mqttClient.subscribe('porting/kpi/assembly/03',{},(err)=>{
                mqttClient.on('message',(msg,buff,pckt)=>{
                    data = buff.toString()
                    try {
                        data = JSON.parse(data)                    
                    } catch (error) {
                        data = {}
                    }
                    dataArr[lineNumbers[9]] = data
                })
            })

            send(dataArr,lineNumbers,socket)

          })
    } catch (error) {
        console.log(error);
    }
}

const send = (data,lineNumbers,socket)=>{
    var dataArr = []
    setInterval(()=>{
        for(let lineNumber of lineNumbers){
            var oee = 0
            var ava = 0
            var perf = 0
            var qua = 0
            var runtime = 0
            var status = 0


            if(data[lineNumber] != undefined){
                oee = data[lineNumber].oee
            }else{
                oee = 0
            }

            if(data[lineNumber] != undefined){
                ava = data[lineNumber].ava
            }else{
                ava = 0
            }

            if(data[lineNumber] != undefined){
                perf = data[lineNumber].perf
            }else{
                perf = 0
            }

            if(data[lineNumber] != undefined){
                qua = data[lineNumber].perf
            }else{
                qua = 0
            }

            if(data[lineNumber] != undefined){
                runtime = data[lineNumber].runtime
            }else{
                runtime = 0
            }

            if(data[lineNumber] != undefined){
                status = data[lineNumber].status
            }else{
                status = 0
            }

            dataArr.push({
                lineNumber,
                oee,
                ava,
                perf,
                qua,
                runtime,
                status
            })
        }
        console.log(dataArr);
        socket.emit("kpi",dataArr)
    },5000)

}

module.exports = {
    kpiSocket
}