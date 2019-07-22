const app = require('../app.js');

const {
  selectArticalList,
  insertArtical,
  selectArtical,
} = require('../service/artical.js');

// 获取所有的文章数据
app.get('/api/artical/getArticalList', (req, res) => { selectArticalList(req, res) });

// 根据id获取文章
app.get('/api/artical/selectArtical', (req, res) => { selectArtical(req, res) });

// 新建文章
app.post('/api/artical/insertArtical', (req, res) => { insertArtical(req, res) });

const articalServer = app.listen(5001, () => {
  const host = articalServer.address().address
  const port = articalServer.address().port
	console.log('server: artical');
	console.log('listen: http://%s:%s', host, port);
});
