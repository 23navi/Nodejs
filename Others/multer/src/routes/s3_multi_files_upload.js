const express = require("express");
const multer = require("multer");
const router = express.Router();
const { s3UploadMultipleFilesV2 } = require("../services/s3upload");

const storage = multer.memoryStorage();

const upload = multer({
  //   dest: "uploads/multiFile_withLimit",
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 4, files: 2 },
});

router.post(
  "/s3_multi_files_upload",
  upload.array("file"),
  async (req, res) => {
    const result = await s3UploadMultipleFilesV2(req.files);
    res.send({ result });
  }
);

module.exports = router;
