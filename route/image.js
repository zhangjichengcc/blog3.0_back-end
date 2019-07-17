const app = require('../app.js');

const {
  uploadImage,
} = require('../service/image.js');

// 上传图片
app.post('/api/image/uploadImage', (req, res) => { uploadImage(req, res) });

const articalServer = app.listen(5002, () => {
  const host = articalServer.address().address
  const port = articalServer.address().port
	console.log('server: image');
	console.log('listen: http://%s:%s', host, port);
});
