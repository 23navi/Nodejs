const express = require("express");
const multer = require("multer");
const app = express();

const singleFile = require("./routes/singlefile");
const multiFile_singleField = require("./routes/multiFile_singleField");
const multiFile_multiField = require("./routes/multiFile_multiField");
const multiFile_withLimit = require("./routes/multiFile_withLimit");
const file_with_type = require("./routes/flies_with_typeCheck");

const upload = multer({ dest: "../uploads/" });

app.use("/upload", singleFile);
app.use("/upload", multiFile_singleField);
app.use("/upload", multiFile_multiField);
app.use("/upload", multiFile_withLimit);
app.use("/upload", file_with_type);

app.use("/s3upload");

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
