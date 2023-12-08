const { S3 } = require("aws-sdk");

// Single file upload
exports.s3UploadV2 = async (file) => {
  const s3 = new S3();
  const param = {
    Bucket: "navi-demo-public-read-sdk-upload",
    Key: `multiplefiles/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
  };
  return await s3.upload(param).promise();
};

exports.s3UploadMultipleFilesV2 = async (files) => {
  const s3 = new S3();
  const params = files.map((file) => {
    return {
      Bucket: "navi-demo-public-read-sdk-upload",
      Key: `multiplefiles/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
    };
  });
  //   return await s3.upload(params).promise();   // Does this work??

  return await Promise.all(
    params.map((param) => {
      return s3.upload(param).promise();
    })
  );
};
