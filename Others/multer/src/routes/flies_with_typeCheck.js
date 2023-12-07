const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `abc-${Math.random()}-${file.originalname}`); //file.originalname is the name of the file that is uploaded.
  },
});

const onlyPDFs = (req, file, cb) => {
  console.log("This is running");  ///Why is this log not working??
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only pdfs are allowed"), false);
  }
};

const upload = multer({
  //   dest: "uploads/multiFile_withLimit",
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 4, files: 1 },
  fileFilter: onlyPDFs,
});
const multiField = upload.fields([
  { name: "profile", maxCount: 3 },
  { name: "id", maxCount: 2 },
]);

router.post("/file_with_type", multiField, (req, res) => {
  console.log(req.files);
  console.log("Here??");
  res.send("done");
});

module.exports = router;
