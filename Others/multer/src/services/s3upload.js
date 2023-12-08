const { S3 } = require("aws-sdk");

// Single file upload
exports.s3UploadV2 = async (file) => {
  const s3 = new S3();
  const param = {
    Bucket: "navi-demo-public-read-sdk-upload",
    Key: `${Date.now()}-${file.originalname}`,
    Body: file.buffer,
  };
  return await s3.upload(param).promise();
};
