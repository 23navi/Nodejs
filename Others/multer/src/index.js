const express = require("express");
const app = express();

app.post("/upload", (req, res) => {
  res.send("done");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
