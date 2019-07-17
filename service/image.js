const app = require('../app.js');
const multer = require("multer");
const fs = require('fs');

// 设置图片存储地址
const target = '/opt/imageServer/';
const optMulter = multer({dest: target});
app.use(optMulter.any());

const uploadImg = (file) => {
  return new Promise((resolve, reject) => {
    const timeTag = new Date().getTime();
    const fileName = file.originalname.replace(/(\..*)$/, `-${timeTag}$1`);
    let result = {};
    fs.rename(file.path, `${target}/${fileName}`, function (err) {
      if(err) {
        result.code = 1;
        result.errMsg = err;
        reject(result);
      }else{
        result.code = 0;
        result.errMsg = '上传成功';
        result.data = `http://118.190.52.53/images/${fileName}`;
        resolve(result);
      }
    })
  })
}

// 上传图片方法
const uploadImage = (req, res) => {
  const { files = [] } = req;
  const file = files[0];
  uploadImg(file).then(result => {
    res.end(JSON.stringify(result));
  });
}

module.exports = {
  uploadImg,
  uploadImage,
};