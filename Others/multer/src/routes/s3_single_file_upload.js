const express = require("express");
const multer = require("multer");
const router = express.Router();
const { s3UploadV2 } = require("../services/s3upload");

const storage = multer.memoryStorage();

const upload = multer({
  //   dest: "uploads/multiFile_withLimit",
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 4, files: 1 },
});

router.post(
  "/s3_single_file_upload",
  upload.single("file"),
  async (req, res) => {
    const result = await s3UploadV2(req.file);
    res.send({ result });
  }
);

module.exports = router;
