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
var hbs = require('hbs')
var path = require("path")
var express = require("express");
var app = express();
app.use("/dist", express.static(path.join(__dirname, "/public")))
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

// 改动主要在这个方法
hbs.registerHelper('block', function(name, context) {
    var len = (blocks[name] || []).length;
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];

    return len ? val : context.fn(this);
});

app.get("/", function (req, res) {
    // res.render("index", {
    //     title: "首页",
    //     h1: "这是首页"
    // })
    res.render('pages/index', {
        title: "这是主页",
        name: "mickey",
        age: 24
    });
})

app.get("/about", (req, res) => {
    let id = req.params.id;
    var fortunes = [
        '传说中除甲醛的那些方法，真正有效的只有这2种 传说中除甲醛的那些方法，真正有效的只有这2种',
        '快播作者即将出狱！谈快播的技术有何可取之处 快播作者即将出狱！谈快播技术有何可取之处',
        "PConline消费者报告：大数据带你看透空气净化器 PConline消费者报告：大数据带你看透空气净化器",
        "蓝色版vivo X20给你带来全新的视觉体验 蓝色版vivo X20达人试玩 全新的视觉体验",
        '10.5寸iPad Pro长测二:平板+键盘+笔>笔记本？ 10.5寸iPad Pro长测二:平板+键盘+笔>笔记本？',
        "想做每个人的理财中心？支付宝新版发布 想做每个人的理财中心？支付宝新版发布",
        "网络时代的矛伤害了谁 盾又应该谁来举起？ 网络时代的矛伤害了谁 盾又应该谁来举起？",
        "耕升GTX 1070 Ti G魂极客版显卡评测：极客味满满 GTX 1070 Ti看多了，这么极客风的少有",
        "2017年度横评抢先看！有关吃鸡一切答案，在这2017年双摄手机大横评佳能77D对比尼康D7500热门M.2 SSD硬盘横评魅蓝Note6能畅快地吃鸡？"
    ]
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    Array.prototype.shuffle = function(n) {
        var len = this.length ,
        num = n ? Math.min(n,len) : len,
        arr = this.slice(0);
        arr.sort(function(a,b){
        return Math.random()-0.5;
        });
        return arr.slice(0,num-1);
    }
    res.render("pages/about", {
        title: "这是详情页",
        h1: randomFortune
    })
})

app.use(function (req, res, next) {
    res.status(404)
    var fortunes = [
        '传说中除甲醛的那些方法，真正有效的只有这2种 传说中除甲醛的那些方法，真正有效的只有这2种',
        '快播作者即将出狱！谈快播的技术有何可取之处 快播作者即将出狱！谈快播技术有何可取之处',
        "PConline消费者报告：大数据带你看透空气净化器 PConline消费者报告：大数据带你看透空气净化器",
        "蓝色版vivo X20给你带来全新的视觉体验 蓝色版vivo X20达人试玩 全新的视觉体验",
        '10.5寸iPad Pro长测二:平板+键盘+笔>笔记本？ 10.5寸iPad Pro长测二:平板+键盘+笔>笔记本？',
        "想做每个人的理财中心？支付宝新版发布 想做每个人的理财中心？支付宝新版发布",
        "网络时代的矛伤害了谁 盾又应该谁来举起？ 网络时代的矛伤害了谁 盾又应该谁来举起？",
        "耕升GTX 1070 Ti G魂极客版显卡评测：极客味满满 GTX 1070 Ti看多了，这么极客风的少有",
        "2017年度横评抢先看！有关吃鸡一切答案，在这2017年双摄手机大横评佳能77D对比尼康D7500热门M.2 SSD硬盘横评魅蓝Note6能畅快地吃鸡？"
    ]
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)]
    Array.prototype.shuffle = function(n) {
        var len = this.length ,
        num = n ? Math.min(n,len) : len,
        arr = this.slice(0);
        arr.sort(function(a,b){
        return Math.random()-0.5;
        });
        return arr.slice(0,num-1);
    }
    res.render("pages/404", {
        title: "404",
        h1: randomFortune
    })
})

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.send("500");
})
app.listen(3000,function () {
    console.log("时间：" + new Date().toLocaleString())
    console.log("请访问3000端口")
})