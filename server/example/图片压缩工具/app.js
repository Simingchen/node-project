var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var index = require('./routes/index');      // 前台路由
var admin = require('./routes/admin');      // 后台路由
var apiList = require('./api-client');
// 客户端post请求的数据用body-parser中间件进行处理
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//设置模板引擎
app.set("view engine",'jade');
app.set('views','./views/pages');

//设置静态资源
app.use("/static", express.static(path.join(__dirname, './public')));

// 前后台页面路由
app.use("/", index);
app.use("/admin", admin);

// 与客户端接口
app.use("/", apiList);

app.listen(3000, function () {
    console.log("请访问http://localhost:3000");
});



// 加载images模块
var images = require("images");
var imgPath = (__dirname + "/test.png")

images(imgPath)                     //Load image from file 
                                        //加载图像文件
    .size(100)                          //Geometric scaling the image to 400 pixels width
                                        //等比缩放图像到400像素宽
    // .draw(images("logo.png"), 10, 10)   //Drawn logo at coordinates (10,10)
                                        //在(10,10)处绘制Logo
    .save("output.jpg", {               //Save the image to a file, with the quality of 50
        // quality : 100                    //保存图片到文件,图片质量为50
    });