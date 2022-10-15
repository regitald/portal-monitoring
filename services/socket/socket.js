const lineNumberService = require('../../services/lineNumber/lineNumberService')
const {subKpi} = require('../mqtt/mqttService')

const kpiSocket = async(io)=>{
    try {
        var lineNumbers = (await lineNumberService.getLineNumbers()).content
        io.on('connection', (socket) => {
            socket.data.username = "ahmad"
            console.log(socket.id);
            socket.emit("kpi_machines","test test")
            console.log('a user connected');
          });

          var kpiData = await subKpi();
          console.log(kpiData);

          io.of("/machines").on("connection",(socket)=>{
            setInterval(async ()=>{
                var dataArr = []

                for(let lineNumber of lineNumbers){
                    var oee = getRandomNumb(100)
                    var ava = getRandomNumb(100)
                    var perf = getRandomNumb(100)
                    var qua = getRandomNumb(100)
                    var runtime = getRandomNumb(100)
                    var status = getRandomNumb(3)
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
          })
    } catch (error) {
        console.log(error);
    }
}

const getRandomNumb = (max)=>{
    return Math.floor(Math.random() * max); 
}

module.exports = {
    kpiSocket
}