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
                    var oee = getRandomNumb()
                    var ava = getRandomNumb()
                    var perf = getRandomNumb()
                    var qua = getRandomNumb()
                    var runtime = getRandomNumb()
                    dataArr.push({
                        lineNumber,
                        oee,
                        ava,
                        perf,
                        qua,
                        runtime

                    })
                }
                socket.emit("kpi",dataArr)
            },3000)
          })
    } catch (error) {
        console.log(error);
    }
}

const getRandomNumb = ()=>{
    return Math.floor(Math.random() * 100); 
}

module.exports = {
    kpiSocket
}