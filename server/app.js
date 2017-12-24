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

var express = require("express");
var app = express();
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

app.get("/", function (req, res) {
    // res.render("index", {
    //     title: "首页",
    //     h1: "这是首页"
    // })
    res.render('pages/index', {title: 'hbs demo', author: 'chyingp'});
    // res.json({
    //     title: "这是主页",
    //     name: "mickey",
    //     age: 24
    // })
})

app.get("/about/:id.html", (req, res) => {
    let id = req.params.id
    res.render("about", {
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
    res.send(500);
})
app.listen(3000,function () {
    console.log("请访问3000端口")
})