
            setInterval(async ()=>{
                try {
                    data = JSON.parse(data)                    
                } catch (error) {
                    data = {}
                }

                var dataArr = []

                for(let lineNumber of lineNumbers){
                    var oee = 0
                    var ava = 0
                    var perf = 0
                    var qua = 0
                    var runtime = 0
                    var status = 0


                    if(data.oee != undefined){
                        oee = data.oee
                    }else{
                        oee = 0
                    }

                    if(data.ava != undefined){
                        ava = data.ava
                    }else{
                        ava = 0
                    }

                    if(data.perf != undefined){
                        perf = data.perf
                    }else{
                        perf = 0
                    }

                    if(data.qua != undefined){
                        qua = data.perf
                    }else{
                        qua = 0
                    }

                    if(data.runtime != undefined){
                        runtime = data.runtime
                    }else{
                        runtime = 0
                    }

                    if(data.status != undefined){
                        status = data.status
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
          })