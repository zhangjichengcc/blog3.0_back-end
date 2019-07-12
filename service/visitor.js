const app = require('../app.js');
const BLOGDB = require('../database.js');

// 获取所有的访客数据
app.get('/api/visitor/getVisitorList', (req, res) => {
    const { pageNum = 1, pageSize = 10 } = req.query;
    // 定义SQL语句
    const sqlStr = `select * from visitor limit ${(pageNum - 1) * pageSize}, ${pageNum * pageSize}; select count(*) from visitor;`;
    BLOGDB.query(sqlStr, (err, results) => {
        console.log(err, results)
        if(err) return res.json({ code:1, message:'获取失败' })
        res.json({
            code: 0,
            data: {
                list: results[0],
                total: results[1][0]['count(*)'],
            },
        })
    })
})

// 插入访客数据
app.get('/api/visitor/insertVisitor', (req, res) => {
    const { userId, ip, name, date, area } = req.query;
    console.log(name, date);
    const sqlStr = 'insert into visitor (userId, ip, name, date, area) values (?, ?, ?, ?, ?)';
    BLOGDB.query(sqlStr, [userId, ip, name, date, area], (err, results) => {
        console.log(err, results)
        if(err) return res.json({ code: 1, message:'获取失败' });
        res.json({
            code: 0,
            message: 'success',
        })
    })
})

app.listen(5003, ()=>{
    console.log('server: visitor');
    console.log('listen: http://127.0.0.1:5003');
});
