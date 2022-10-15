const lineNumberService = require('../../services/lineNumber/lineNumberService')

const kpiSocket = async(io)=>{
    try {
        var lineNumbers = (await lineNumberService.getLineNumbers()).content
        io.on('connection', (socket) => {
            socket.data.username = "ahmad"
            console.log(socket.id);
            socket.emit("kpi_machines","test test")
            console.log('a user connected');
          });

          io.of("/machines").on("connection",(socket)=>{
            setInterval(()=>{
                var dataArr = []

                for(let lineNumber of lineNumbers){
                    var oee = getRandomNumb(100)
                    var ava = getRandomNumb(100)
                    var perf = getRandomNumb(100)
                    var qua = getRandomNumb(100)
                    var runtime = getRandomNumb(100)
                    var status = getRandomNumb(100)
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
            },3000)
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