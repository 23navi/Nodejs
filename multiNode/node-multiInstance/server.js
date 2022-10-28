const express = require('express');
const cluster= require("cluster")
const os= require("os")

// console.log(os.cpus().length)

const app = express();

function delay(duration) {
  const startTime = Date.now();
  while(Date.now() - startTime < duration) {
    //event loop is blocked...
  }
}

app.get('/', (req, res) => {
  res.send('Performance example');
});

app.get('/timer', (req, res) => {
  delay(9000);
  res.send('Ding ding ding! And it is handled by the processor '+process.pid);
})

if(cluster.isMaster){
  console.log("Master started with Pid of master: "+process.pid)
  const num_of_cpus= os.cpus().length
  for(let i=0;i<num_of_cpus;i++){
    cluster.fork();
  }
}else{
  console.log("worker started with pid: "+process.pid);
  app.listen(3002);
}
