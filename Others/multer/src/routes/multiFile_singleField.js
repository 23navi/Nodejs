const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "uploads/multiFile_singleField/" });

router.post("/multiFile_singleField", upload.array("file"), (req, res) => {
  console.log(req.files);

  res.send("done");
});

module.exports = router;
