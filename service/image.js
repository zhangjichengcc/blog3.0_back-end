const app = require('../app.js');
const multer = require("multer");


const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})


// 添加配置文件到muler对象。
var upload = multer({ storage: storage });
var imgBaseUrl = '../'
 
// bodyParse 用来解析post数据
// app.use(express.static('public'));
 
// 文件上传请求处理，upload.array 支持多文件上传，第二个参数是上传文件数目
app.post('/api/image/uploadImage', upload.array('img', 2), function (req, res) {
  console.log(req);
  // 读取上传的图片信息
  // var files = req.files;
 
  // 设置返回结果
  var result = {};
  if(!req) {
    result.code = 1;
    result.errMsg = '上传失败';
  } else {
    result.code = 0;
    result.data = {
      url: req.path
    }
    result.errMsg = '上传成功';
  }
  res.end(JSON.stringify(result));
  // console.log(JSON.stringify(result))
});
