const express = require('express');
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
  delay(3000);
  res.send('Ding ding ding! And it is handled by the processor '+process.pid);
})

app.listen(3002);

