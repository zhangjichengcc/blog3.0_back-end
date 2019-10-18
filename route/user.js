const app = require('../app.js');

const {
  login,
} = require('../service/user.js');

// 上传图片
app.post('/api/user/login', (req, res) => { login(req, res) });

const userServer = app.listen(5003, () => {
  const host = userServer.address().address
  const port = userServer.address().port
	console.log('server: user');
	console.log('listen: http://%s:%s', host, port);
});
