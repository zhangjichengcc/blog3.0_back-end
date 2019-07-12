const app = require('../app.js');
const BLOGDB = require('../database.js');

// 获取所有的文章数据
app.get('/api/artical/getArticalList', (req, res) => {
    const { pageNum = 1, pageSize = 10 } = req.query;
    // 定义SQL语句
    const sqlStr = `SELECT a.id, a.title, a.introduction, a.banner, a.create_time createTime, a.read_count readCount, a.like_count likeCount, msgCount, type FROM artical a LEFT JOIN ( SELECT count(*) msgCount, m.artical_id FROM artical_message m GROUP BY artical_id ) t ON a.id = t.artical_id LEFT JOIN ( SELECT ty.name type, ty.artical_id FROM artical_type ty ) t2 ON a.id = t2.artical_id LIMIT ${(pageNum - 1) * pageSize}, ${pageNum * pageSize}; SELECT count(*) total FROM artical;`;
    BLOGDB.query(sqlStr, (err, results) => {
        console.log('errormsg: ', err, 'results:', results);
        if(err) return res.json({code: 1, message: '获取失败', affectedRows: 0})
        res.json({
            code: 0,
            data: {
                list: results[0],
                total: results[1][0].total,
            },
        })
    })
})

app.listen(5001, ()=>{
    console.log('server: artical');
    console.log('listen: http://127.0.0.1:5001');
});

