var express = require('express');
var router = express.Router();

//首页localhost:3000/
router.get('/', function(req, res, next) {
    res.render('index.jade', {
        title: '网站首页',
        movies: [{
            _id: 1,
            title: "海绵宝宝3D",
            poster: 'http://img31.mtime.cn/mg/2015/11/17/094620.70277104_170X256X4.jpg'
        }, {
            _id: 2,
            title: "星际迷航3",
            poster: 'http://img31.mtime.cn/mg/2016/09/01/143653.31713698_170X256X4.jpg'
        }, {
            _id: 3,
            title: "惊天绑架团",
            poster: 'http://img31.mtime.cn/mg/2016/07/12/091819.79722823_170X256X4.jpg'
        }, {
            _id: 4,
            title: "爱宠大机密",
            poster: 'http://img31.mtime.cn/mg/2016/06/21/093149.12209704_170X256X4.jpg'
        }, {
            _id: 5,
            title: "冰川时代4",
            poster: 'http://img31.mtime.cn/mt/2012/07/19/131845.38602455_170X256X4.jpg'
        }]
    });
});


//详情页
//localhost:3000/movie/1
router.get("/movie/:id", function(req, res) {
    res.render('detail.jade', {
        title: '电影详情',
        movie: {
            title: '海绵宝宝3D',
            director: '保罗·蒂比特',
            country: '美国',
            language: '英语',
            year: 2016,
            poster: 'http://img31.mtime.cn/mg/2015/11/17/094620.70277104_170X256X4.jpg',
            summary: '安东尼奥·班德拉斯饰演的大反派海盗杰克现身，他找到了一本神奇的宝书，可是想要获得完全的力量，一定要找到书中的最后一页。经过调查，这宝贵的最后一页，正存在海绵宝宝的家里。',
            flash: '#'
        }
    })
});

module.exports = router;
