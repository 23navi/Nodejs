const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "uploads/singleFile/" });

router.post("/singleFile", upload.single("file"), (req, res) => {
  console.log(req.file);

  res.send("done");
});

module.exports = router;
