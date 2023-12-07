const express = require("express");
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "uploads/multiFile_multiField/" });
const multiField = upload.fields([
  { name: "profile", maxCount: 1 },
  { name: "id", maxCount: 2 },
]);

router.post("/multiFile_multiField", multiField, (req, res) => {
  console.log(req.files);

  res.send("done");
});

module.exports = router;
