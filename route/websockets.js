/*
 * @Author: your name
 * @Date: 2020-08-17 10:10:32
 * @LastEditTime: 2020-08-17 18:11:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \node\route\websockets.js
 */
const WebSocket = require('ws');
// const wss = new WebSocket.Server(
//   {
//     port: 5000,
//     verifyClient: true, // 验证连接
//   }
// );

//

// wss.on('connection',function(ws, req){
//   const online =wss._server._connections;
//   console.log('当前在线' + online+'个连接');
//   ws.send('当前在线' + online+'个连接');
//   // let i = req.url;//提取网址参数
//   // let m = i.match(/(?<=\?)[^:]+?(?=:|$)/);    //提取我是谁,这部分代码只有第一次连接的时候运行,如果后面连接的m值相同,前面的连接会被覆盖身份
//   // if(m){
//   //     user[m] = ws;
//   // };
//   // let u = i.match(/(?<=:).+?$/);              //提取发给谁
//   ws.on('message',function(msg){
//     console.log('收到'+i+'的消息：'+msg);
//     ws.send(req.headers['sec-websocket-key'])
//     ws.send(req.url)
//     if(u){
//         if (user[u]){
//             if (user[u].readyState===1){
//                 user[u].send(msg);
//                 ws.send('发送成功');
//             }else{
//                 ws.send('对方掉线');
//             }
//         }else{
//             ws.send('找不到对象');
//         }
//     }else{//广播
//         wss.clients.forEach(function each(client) {
//             if (client !== ws && client.readyState === WebSocket.OPEN) {
//                 client.send(msg);
//             }
//         });
//     }

//     if (online != wss._server._connections){
//         online = wss._server._connections;
//         ws.send('当前在线' + online + '个连接');
//     }
//     ws.send(req.headers.origin)
//     ws.send(JSON.stringify(Array.from(wss.clients)))
//     ws.send(JSON.stringify(ws))
//     ws.send(JSON.stringify(req))   
//     setInterval(() => {
//       ws.send('hello')
//     }, 2500);     
//   })
// })


const wss = new WebSocket.Server({ port: 5000 });
wss.on('connection', function connection(ws) {
    ws.send(JSON.stringify({
      type: 'text',
      message: '链接已建立，开始通话',
      time: new Date().getTime(),
      messageId: new Date().getTime(),
      sourceId: 'node',
    }))
    ws.on('message', function incoming(params) {
      const {
        message = '',
        type = '',
        userId = '',
      } = JSON.parse(params) || {};
      const receive = {
        type,
        message,
        sourceId: userId,
        messageId: new Date().getTime(),
        time: new Date().getTime(),
      }
      const reply = {
        type,
        message: `回复 ${message}`,
        sourceId: 'node',
        messageId: new Date().getTime(),
        time: new Date().getTime(),
      }
      ws.send(JSON.stringify(receive));
      setTimeout(() => {
        ws.send(JSON.stringify(reply));
      }, 2000)
    });
});
