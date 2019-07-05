const app = require('../app.js');
const BLOGDB = require('../database.js');

// 获取所有的文章数据
app.get('/api/artical/getArticalList', (req, res) => {
    const { pageNum = 1, pageSize = 10 } = req.query;
    // 定义SQL语句
    const sqlStr = `select id, title, introduction, banner, create_time as createTime, read_count as readCount, like_count as likeCount from artical limit ${(pageNum - 1) * pageSize}, ${pageNum * pageSize}; select count(*) from artical;`;
    BLOGDB.query(sqlStr, (err, results) => {
        console.log(err, results)
        if(err) return res.json({code: 1, message: '获取失败', affectedRows: 0})
        res.json({
            code: 0,
            data: {
                list: results[0],
                total: results[1][0]['count(*)'],
            },
        })
    })
})

// // 插入访客数据
// app.get('/api/insertVisitor', (req, res) => {
//     const { userId, ip, name, date, area } = req.query;
//     console.log(name, date);
//     const sqlStr = 'insert into visitor (userId, ip, name, date, area) values (?, ?, ?, ?, ?)';
//     BLOGDB.query(sqlStr, [userId, ip, name, date, area], (err, results) => {
//         console.log(err, results)
//         if(err) return res.json({err_code: 1, message:'获取失败', affectedRows: 0});
//         res.json({
//             err_code: 0,
//             message: 'success',
//         })
//     })
// })
