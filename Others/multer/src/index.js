const express = require("express");
const multer = require("multer");
const app = express();

const upload = multer({ dest: "../uploads/" });

app.post("/upload", upload.single("file"), (req, res) => {
  res.send("done");
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
