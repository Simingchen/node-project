// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
// var express = require('express')
// var bodyParser = require('body-parser')

// var app = express()

// app.post('/login', urlencodedParser, function (req, res) {
    //     if (!req.body) return res.sendStatus(400)
    //     res.send('welcome, ' + req.body.username)
    //     res.render('index', { title: 'Express1' });
    // })




var bodyParser = require('body-parser');
var mongooes = require("mongooes");

// 链接数据库
mongooes.content("mongodb://simingdatabase:siming123@ds241065.mlab.com:41065/simingdatabase");
// 创建图表
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    item: String,
    title: String,
    author: String,
    body: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
});

// 往数据库存储东西 Blog数据库名 blogSchema表
var Blog = mongoose.model('Blog', blogSchema);
// 存某一项
Blog({item: "hello everyone"}).save((err, data) => {
    if (err) throw err;
    console.log("item save");
});


var data = [
    {item: "非常欢迎你的"},
    {item: "非常欢迎你的"},
    {item: "非常欢迎你的"}
]
module.exports = app => {
    var jsonParser = bodyParser.json()

    var urlencodedParser = bodyParser.urlencoded({ extended: false })

    // 获取数据
    app.get("/todo", (req, res) => {
        res.render("todo", {todos: data})
    })

    // 传递数据
    app.get("/todo", urlencodedParser, (req, res) => {
        data.push(req.body);
    })
}