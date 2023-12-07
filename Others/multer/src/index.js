const express = require("express");
const multer = require("multer");
const app = express();

const singleFile = require("./routes/singlefile");
const multiFile_singleField = require("./routes/multiFile_singleField");

const upload = multer({ dest: "../uploads/" });

// app.post("/upload/single", upload.single("file"), (req, res) => {
//   res.send("done");
// });

app.use("/upload", singleFile);
app.use("/upload", multiFile_singleField);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
