'use strict';

let qiniu = require("qiniu");

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = '-Jr2-ZZqpZK9acf5ZiX4jKQrmy8qE2SFvFiSIuXI';
qiniu.conf.SECRET_KEY = 'DkrecKEa36dZjhMQrL4jzP5DxlyLpDAdjYlhLC9W';

//要上传的空间
let bucket = 'tonny-lab';

//构建上传策略函数
function uptoken(bucket, key) {
  let putPolicy = new qiniu.rs.PutPolicy(bucket+":"+key);
  return putPolicy.token();
}

//要上传文件的本地路径
let filePath = './ruby-logo.png';

let uploadEndpoint = 'http://oiqp6hhcl.bkt.clouddn.com/'

//构造上传函数
function uploadFile(uptoken, key, localFile) {
  return new Promise(function(resolve, reject) {
    let extra = new qiniu.io.PutExtra();
  	qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) resolve(ret);     
      else reject(err);
    });
  });
}

module.exports = function(file) {
    return new Promise(function(resolve, reject) {
      uploadFile(uptoken(bucket, file.filename+'.png'), file.filename+'.png', file.path).then(function(ret) {
        resolve(uploadEndpoint+ret.key);
      }).catch(function(err) {
        reject(err);
      });
    });
}

