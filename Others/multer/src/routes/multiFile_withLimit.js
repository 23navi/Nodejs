const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/abc");
  },
  filename: function (req, file, cb) {
    cb(null, `abc-${Math.random()}-${file.originalname}`); //file.originalname is the name of the file that is uploaded.
  },
});

const upload = multer({
  //   dest: "uploads/multiFile_withLimit",
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 4, files: 1 },
});
const multiField = upload.fields([
  { name: "profile", maxCount: 3 },
  { name: "id", maxCount: 2 },
]);

router.post("/multiFile_withLimit", multiField, (req, res) => {
  console.log(req.files);

  res.send("done");
});

module.exports = router;
