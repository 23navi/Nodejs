const { S3 } = require("aws-sdk");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

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
  // return await s3.upload(params).promise(); // Does this work?? -> nooo

  return await Promise.all(
    params.map((param) => {
      return s3.upload(param).promise();
    })
  );
};

/// V3 aws sdk

exports.s3UploadMultipleFilesV3 = async (files) => {
  const s3Client = new S3Client();
  const params = files.map((file) => {
    return {
      Bucket: "navi-demo-public-read-sdk-upload",
      Key: `multiplefiles/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
    };
  });

  return await Promise.all(
    params.map((param) => {
      return s3Client.send(new PutObjectCommand(param));
    })
  );
};

// Single file upload
exports.s3UploadV3 = async (file) => {
  const s3Client = new S3Client();
  const param = {
    Bucket: "navi-demo-public-read-sdk-upload",
    Key: `multiplefiles/${Date.now()}-${file.originalname}`,
    Body: file.buffer,
  };
  return await s3Client.send(new PutObjectCommand(param));
};
