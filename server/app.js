// var express = require("express");
// var app = express();
// var path = require('path');
// var bodyParser = require('body-parser');
// var index = require('./routes/index');      // 前台路由
// var admin = require('./routes/admin');      // 后台路由
// var apiList = require('./api-client');
// // 客户端post请求的数据用body-parser中间件进行处理
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// //设置模板引擎
// app.set("view engine",'jade');
// app.set('views','./views/pages');

// //设置静态资源
// app.use("/static", express.static(path.join(__dirname, './public')));

// // 前后台页面路由
// app.use("/", index);
// app.use("/admin", admin);

// // 与客户端接口
// app.use("/", apiList);

// app.get('/article', function(req, res) {
//    res.sendFile('./index.html');
// })

// app.listen(3000, function () {
//     console.log("请访问http://localhost:3000");
// });
var cookieParser = require('cookie-parser')
var hbs = require('hbs')
var path = require("path")
var express = require("express");
var app = express();
app.use(cookieParser())
app.use("/src", express.static(path.join(__dirname, "/public")))
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

app.get("/", function (req, res) {
    res.render('pages/index', {
        title: "这是主页",
        name: "mickey",
        age: 24
    });
})

app.get("/about/:id.html", (req, res) => {
    let id = req.params.id;
    var data = {
        a:1,
        b:2
    }
    res.json(req.cookies)
    res.render("pages/about", {
        title: "这是详情页",
        h1: id
    })
})

app.use(function (req, res, next) {
    res.status(404)
    res.send("404")
})

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.send("500");
})
app.listen(3000,function () {
    console.log("请访问3000端口")
})