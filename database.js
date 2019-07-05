const mysql = require('mysql');

// 链接博客数据库
const BLOGDB = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'BLOGDB',
    // 允许同时执行多条sql语句
    multipleStatements: true,
});

module.exports = BLOGDB;