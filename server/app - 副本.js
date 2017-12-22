var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// 静态资源管理  express.static中间件相当于想发送的所有静态文件创建了一个路由
// 渲染文件并发送给客户端
app.use(express.static(path.join(__dirname, 'public')));
// view engine setup
// “views”选项用来设置模板文件所在目录
app.set('views', path.join(__dirname, 'views'));
// “view engine”选项用来设置要使用的引擎
app.set('view engine', 'jade');
app.set("view engine", "hbs");

/*// 加载hbs模块
var hbs = require('hbs');

// 指定模板文件的后缀名为html
app.set('view engine', 'html');

// 运行hbs模块
app.engine('html', hbs.__express);

这样可以再新建模板文件index.html，定义后缀名为html的文件。
*/

// app.use这个是用来配置路径响应的
// 一个请求过来, 被 .use 写好的各个函数依次处理
// 注册路由  app.get("/")
// app.use(path,callback)中的callback既可以是router对象又可以是函数
// app.get(path,callback)中的callback只能是函数
// 
// 路由规则是app.use(path,router)定义的，router代表一个由express.Router()创建的对象，在路由对象中可定义多个路由规则。
// 可是如果我们的路由只有一条规则时，可直接接一个回调作为简写，也可直接使用app.get或app.post方法。即
// 当一个路径有多个匹配规则时，使用app.use，否则使用相应的app.method(get、post)
// 
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));        // 路径为favicon.ico请求favicon.ico资源
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());




// 路由中间件 middleware
// 当app.use没有提供path参数时，路径默认为“/” ,默认忽略大小写和反斜杠，express默认状态码200，不用显式指定
app.use('/', index);
app.use('/users', users);   

// catch 404 and forward to error handler
// res.set 和 res.status 代替node的res.writeHead
// res.type 代替方便设置响应头content-type,但node方法中res.writeHead依旧可以使用 
app.use(function(req, res, next) {
    res.status(404);
    res.render("404");  // 用404模板
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// 或者这种写法404
app.get("*", function(request, response) {
    response.end("404!");
});

// error handler
// 没有路由匹配路径的处理器
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500); 
    res.render('error');
});

module.exports = app;
