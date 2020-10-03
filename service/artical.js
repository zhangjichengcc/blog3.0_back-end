/*
 * @Author: zhang jicheng
 * @Date: 2019-08-15 16:57:18
 * @LastEditTime: 2020-10-02 17:02:00
 * @LastEditors: zhangjicheng
 * @Description: In User Settings Edit
 * @FilePath: \node\service\artical.js
 */
const BLOGDB = require('../database.js');

// 查询文章列表
const selectArticalList = (req, res) => {
	const { pageNum = 1, pageSize = 10, name = '', tag = '' } = req.query;
	// 定义SQL语句
	const sqlStr = `
	SELECT
		tbl_art.id,
		tbl_art.title,
		tbl_art.publish,
		tbl_art.introduction,
		tbl_art.banner,
		DATE_FORMAT( tbl_art.create_time, "%Y-%m-%d %H:%i:%s" ) createTime,
		tbl_art.read_count readCount,
		tbl_art.like_count likeCount,
		msgCount,
		tag 
	FROM
		artical tbl_art
		LEFT JOIN ( SELECT count( * ) msgCount, m.artical_id FROM artical_message m GROUP BY artical_id ) t ON tbl_art.id = t.artical_id
		LEFT JOIN ( SELECT tbl_tag.name tag, tbl_tag.artical_id FROM artical_tags tbl_tag ) t2 ON tbl_art.id = t2.artical_id 
	WHERE
	 	(tbl_art.title LIKE UPPER( '%${name}%' ) OR tbl_art.title LIKE LOWER( '%${name}%' ))
		${tag ? `
		AND t2.tag = ${tag} 
	 	AND t2.tag IS NOT NULL
		` : ''} 
	ORDER BY
		create_time DESC
		LIMIT ${pageNum - 1}, ${pageSize};
	
	SELECT
		count(*) total
	FROM 
		artical tbl_art
		LEFT JOIN artical_tags tbl_tag ON tbl_art.id = tbl_tag.artical_id 
	WHERE 
		title LIKE UPPER('%${name}%') OR title LIKE LOWER('%${name}%')
		${tag ? `
		AND t2.tag = ${tag} 
	 	AND t2.tag IS NOT NULL
		` : ''} 
`
	BLOGDB.query(sqlStr, (err, results) => {
		console.log('errormsg: ', err, 'results:', results);
		if(err) return res.json({code: -1, message: '获取失败'})
		res.json({
			code: 0,
			message: 'success',
			data: {
				list: results[0],
				total: results[1][0].total,
			},
		})
	})
}

// 插入文章
const insertArtical = (req, res) => {
	const { title = null, introduction = '文章简介', publish = false, banner = null, mainContent = null, createTime =  new Date(), readCount = 0 } = req.body;
	const sqlStr = `INSERT INTO artical (title, introduction, publish, banner, main_content, create_time, read_count) VALUES (?, ?, ?, ?, ?, ?, ?);`
	BLOGDB.query(sqlStr, [title, introduction, publish, banner, mainContent, createTime, readCount], (err, results) => {
		console.log('errormsg: ', err, 'results:', results);
		if(err) return res.json({code: -1, message: '获取失败'});
		const resData = {id: results.insertId};
		res.json({
			code: 0,
			message: 'success',
			data: resData,
		})
	})
}

// 更新文章
const updateArtical = (req, res) => {
	const { id, title = null, publish = false, introduction = '文章简介', banner = null, mainContent = null, createTime = new Date() } = req.body;
	// const sqlStr = `UPDATE artical SET title=${title}, banner=${banner}, create_time=${createTime}, introduction=${introduction}, main_content=${mainContent} WHERE id=${id};`
	const sqlStr = `UPDATE artical SET title=?, publish=?, banner=?, create_time=?, introduction=?, main_content=? WHERE id=?;`
	BLOGDB.query(sqlStr, [title, publish, banner, createTime, introduction, mainContent, id], (err, results) => {
		console.log('errormsg: ', err, 'results:', results);
		if(err) return res.json({code: -1, message: '更新失败'});
		const resData = {id};
		res.json({
			code: 0,
			message: 'success',
			data: resData,
		})
	})
}

// 根据id查找文章
const selectArtical = (req, res) => {
	const { id } = req.query;
	const sqlStr = `SELECT id, title, introduction, publish, banner, DATE_FORMAT(create_time,"%Y-%m-%d %H:%i:%s") createTime, read_count readCount, like_count likeCount, main_content mainContent FROM artical WHERE id = ${id};`
	BLOGDB.query(sqlStr, (err, results) => {
		console.log('errormsg: ', err, 'results:', results);
		if(err) return res.json({code: -1, message: '获取失败'});
		const resData = results[0] || {}
		res.json({
			code: 0,
			message: 'success',
			data: resData,
		})
	})
}

// 根据id删除文章
const deleteArtical = (req, res) => {
	const { id } = req.query;
	const sqlStr = `DELETE FROM artical WHERE id = ${id}`;
	BLOGDB.query(sqlStr, (err, results) => {
		console.log('errormsg: ', err, 'results:', results);
		if(err) return res.json({code: -1, message: '操作失败'});
		res.json({
			code: 0,
			message: 'success',
			data: '操作成功',
		})
	})
}

module.exports = {
	selectArticalList,
	insertArtical,
	updateArtical,
	selectArtical,
	deleteArtical,
}

