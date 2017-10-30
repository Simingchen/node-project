var express = require('express');
// var router = express();   // 是一个 express 实例
var router = express.Router();

/* GET home page. */
// 路由的定义由如下结构组成：app.METHOD(PATH, HANDLER)。
// 其中，app 是一个 express 实例；METHOD 是某个 HTTP 请求方式中的一个；PATH 是服务器端的路径；HANDLER 是当路由匹配到时需要执行的函数。
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express1' });
});

module.exports = router;
