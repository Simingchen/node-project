var express = require('express');
var router = express.Router();
var mongooseModel = require("./mongoose.js");
// 测试请求  
router.get('/test', function(req, res, next) {
    var data = {
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
    }
    res.json(data);
});

// 注册
router.post('/SimpRegister', function(req, res, next) {
    var reqData = req.body;

    if (reqData.phone) {
        var phoneReg = /^1\d{10}$/;
        if (!phoneReg.test(reqData.phone)) {
            data.Result = -1;
            data.Message = "手机号格式错误！"
            // 弹窗
            res.json(data);
            return false;
        }
    }
    if (!reqData.password) {
        data.Result = -1;
        data.Message = "请输入密码！"
        // 弹窗
        res.json(data);
        return false;
    }

    var data = {
        Result: 1,
        Message: "注册成功"
    }
    res.json(data);
    // 保存用户信息
    mongooseModel.UserModel(reqData.phone, reqData.password);
});

// 登录
router.post('/Login', function(req, res, next) {
    var reqData = req.body;
    // 初始返回数据
    var data = {
        Result: 1,
        Message: "登录成功"
    }

    if (!reqData.username) {
        data.Result = -1;
        data.Message = "手机号格式错误！"
        // 弹窗
        res.json(data);
        return false;
    }
    if (reqData.username) {
        var phoneReg = /^1\d{10}$/;
        if (!phoneReg.test(reqData.username)) {
            data.Result = -1;
            data.Message = "手机号格式错误！"
            // 弹窗
            res.json(data);
            return false;
        }
    }
    if (!reqData.password) {
        data.Result = -1;
        data.Message = "请输入密码！";
        // 弹窗
        res.json(data);
        return false;
    }
    
    // 查找用户信息
    mongooseModel.userFind(reqData.username, reqData.password, res);
    
});


module.exports = router;