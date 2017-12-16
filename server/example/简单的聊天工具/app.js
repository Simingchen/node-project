var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

http.listen(3000, function() {
    console.log('listening on *:3000');
});

/*版本 1*/
// io.on('connection', function(socket) {
//     console.log('a user connected');
//     // 每个 socket 还会触发一个特殊的 disconnect 事件,页面断开就离线了
//     socket.on('disconnect', function() {   
//         console.log('user disconnected');
//     });
// });

/*版本2，接收从客户端信息*/
// io.on('connection', function(socket) {
//     // 接收从客户端socket.emit('chat message'); 发射过来的事件
//     socket.on('chat message', function(msg) {
//         console.log('message: ' + msg);
//     });
// });

/*版本3、广播：服务器将消息发送给其他用户。*/
io.on('connection', function(socket) {
    // 注册chat message，用于客户端接收信息，将消息发送给所有用户，包括发送者。
    socket.on('chat message', function(msg) {
        io.emit('chat message', msg);
    });
});

// 下面是一些可以做的优化：
// 当用户连接和断开连接时广播消息
// 添加昵称
// 不要将消息发送给服务器后再返回给发送者，应该在用户按下回车后立即将消息显示到消息列表。
// 添加 “{用户} 正在输入” 功能
// 显示在线用户
// 添加私密消息
// 分享你的改进！