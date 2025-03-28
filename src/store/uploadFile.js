import AWS from "aws-sdk";
import mime from "mime";

/**
 *  更新时间 2020-02-09  author: henrenx
 */

/**
 * 上传文件到 S3 存储桶
 *
 * @param {File} fileList  文件
 * @param {Object} AWSConfig  后端传来的 AWS 秘钥 路径 等配置
 * @param {Function} callback 执行完成的回调函数
 * @param {Function} progress 上传进度回调函数, 不是必须
 */
function uploadFile(file, AWSConfig, callback, progress) {
  AWS.config = new AWS.Config({
    accessKeyId: AWSConfig.AccessKeyId,
    secretAccessKey: AWSConfig.SecretAccessKey,
    sessionToken: AWSConfig.SessionToken,
    region: "cn-northwest-1"
  });
  console.log(AWS.config)
  let mimeType="";
  const fileType = file.name.split(".").pop();
  if(fileType=="jpg"){
     mimeType = "image/"+fileType
  }else{
     mimeType = mime.getType(fileType)
  }
  
  let keyValue=""
  if(AWSConfig.flag=="avatar"){
    keyValue=`${AWSConfig.path}/${AWSConfig.userId}.${fileType}`
  }else{
    keyValue=`${AWSConfig.path}/${AWSConfig.id}.${fileType}`
  }
  console.log(keyValue)
  const params = {
    ACL: "public-read",
    Bucket: "rs-learning-resources",
    Body: file,
    Key: keyValue,
    ContentType: mimeType,
    Metadata: {
      uploader: localStorage.getItem("userId")
    }
  };
  console.log(params)
  let S3 = new AWS.S3();
  S3.putObject(params, callback).on("httpUploadProgress", progress);
}

export { uploadFile };
