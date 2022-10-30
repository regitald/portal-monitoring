const lineNumberService = require('../../services/lineNumber/lineNumberService')
const {getMqttCon} = require('../../config/mqtt')
const uuid = require('uuid')

const kpiSocket = async(io)=>{
    try {
        var mqttClient01 = await getMqttCon(uuid.v4())
        var mqttClient02 = await getMqttCon(uuid.v4())
        var mqttClient03 = await getMqttCon(uuid.v4())
        var mqttClient04 = await getMqttCon(uuid.v4())
        var mqttClient05 = await getMqttCon(uuid.v4())
        var mqttClient06 = await getMqttCon(uuid.v4())
        var mqttClient07 = await getMqttCon(uuid.v4())
        var mqttClient08 = await getMqttCon(uuid.v4())
        var mqttClient11 = await getMqttCon(uuid.v4())
        var mqttClient12 = await getMqttCon(uuid.v4())
        var mqttClient13 = await getMqttCon(uuid.v4())

        var lineNumbers = (await lineNumberService.getLineNumbers()).content
          io.of("/machines").on("connection",async(socket)=>{
            var data = {}


            mqttClient01.subscribe('porting/kpi/injection/01',{},(err)=>{
                mqttClient01.on('message',(msg,buff,pckt)=>{
                    let mc = {}
                    try {
                        mc = JSON.parse(buff.toString())                    
                    } catch (error) {
                        console.log(error);
                    }
                    data[lineNumbers[0]] = mc
                })
             })

             mqttClient02.subscribe('porting/kpi/injection/02',{},(err)=>{
                mqttClient02.on('message',(msg,buff,pckt)=>{
                    let mc = {}
                    try {
                        mc = JSON.parse(buff.toString())                    
                    } catch (error) {
                        console.log(error);
                    }
                    data[lineNumbers[1]] = mc
                })
             })

             mqttClient03.subscribe('porting/kpi/injection/03',{},(err)=>{
                mqttClient03.on('message',(msg,buff,pckt)=>{
                    let mc = {}
                    try {
                        mc = JSON.parse(buff.toString())                    
                    } catch (error) {
                       console.log(error);
                    }                    
                    data[lineNumbers[2]] = mc
                })
             })

             mqttClient04.subscribe('porting/kpi/injection/04',{},(err)=>{
                mqttClient04.on('message',(msg,buff,pckt)=>{
                    let mc = {}
                    try {
                        mc = JSON.parse(buff.toString())                    
                    } catch (error) {
                       console.log(error);
                    }                    
                    arr.push(mc)
                    data[lineNumbers[3]] = mc
                })
             })
        

             mqttClient05.subscribe('porting/kpi/injection/05',{},(err)=>{
                mqttClient05.on('message',(msg,buff,pckt)=>{
                    let mc = {}
                    try {
                        mc = JSON.parse(buff.toString())                    
                    } catch (error) {
                        console.log(error);
                    }
                    data[lineNumbers[4]] = mc
                })
             })

             mqttClient06.subscribe('porting/kpi/injection/06',{},(err)=>{
                mqttClient06.on('message',(msg,buff,pckt)=>{
                    let mc = {}
                    try {
                        mc = JSON.parse(buff.toString())                    
                    } catch (error) {
                       console.log(error);
                    }                    
                    arr.push(mc03)
                    data[lineNumbers[5]] = mc
                })
             })

             mqttClient07.subscribe('porting/kpi/injection/07',{},(err)=>{
                mqttClient07.on('message',(msg,buff,pckt)=>{
                    let mc = {}
                    try {
                        mc = JSON.parse(buff.toString())                    
                    } catch (error) {
                       console.log(error);
                    }                    
                    data[lineNumbers[6]] = mc
                })
             })

             mqttClient08.subscribe('porting/kpi/injection/08',{},(err)=>{
                mqttClient08.on('message',(msg,buff,pckt)=>{
                    let mc = {}
                    try {
                        mc = JSON.parse(buff.toString())                    
                    } catch (error) {
                       console.log(error);
                    }                    
                    arr.push(mc03)
                    data[lineNumbers[7]] = mc
                })
             })

             mqttClient11.subscribe('porting/kpi/injection/11',{},(err)=>{
                mqttClient11.on('message',(msg,buff,pckt)=>{
                    let mc = {}
                    try {
                        mc = JSON.parse(buff.toString())                    
                    } catch (error) {
                       console.log(error);
                    }                    
                    data[lineNumbers[8]] = mc
                })
             })

             mqttClient12.subscribe('porting/kpi/injection/12',{},(err)=>{
                mqttClient11.on('message',(msg,buff,pckt)=>{
                    let mc = {}
                    try {
                        mc = JSON.parse(buff.toString())                    
                    } catch (error) {
                       console.log(error);
                    }                    
                    data[lineNumbers[9]] = mc
                })
             })

             mqttClient13.subscribe('porting/kpi/assembly/03',{},(err)=>{
                mqttClient11.on('message',(msg,buff,pckt)=>{
                    let mc = {}
                    try {
                        mc = JSON.parse(buff.toString())                    
                    } catch (error) {
                       console.log(error);
                    }                    
                    data[lineNumbers[10]] = mc
                })
             })

            setInterval(()=>{
                var dataToSend = []
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
        
                    dataToSend.push({
                        lineNumber,
                        oee,
                        ava,
                        perf,
                        qua,
                        runtime,
                        status
                    })
                }
                console.log(dataToSend);
                socket.emit("kpi",dataToSend)
            },5000)

          })
    } catch (error) {
        console.log(error);
    }
}

const send = (data,lineNumbers,socket)=>{
    var dataArr = []


}

module.exports = {
    kpiSocket
}