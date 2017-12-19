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



/*
    nodejs:Excel导出json
    教程：http://blog.csdn.net/hero82748274/article/details/51857911
 */


var xlsx = require("node-xlsx");
var fs = require('fs');
var list = xlsx.parse("product1206.xlsx");

//解析Excel
function praseExcel(list) {
    console.log("qqq");
    for (var i = 0; i < list.length; i++) {
        var excleData = list[i].data;
        var sheetArray = [];
        var typeArray = excleData[1];
        var keyArray = excleData[2];
        for (var j = 3; j < excleData.length; j++) {
            var curData = excleData[j];
            if (curData.length == 0) continue;
            var item = changeObj(curData, typeArray, keyArray);
            sheetArray.push(item);
        }
        if (sheetArray.length > 0)
            writeFile(list[i].name + ".json", JSON.stringify(sheetArray));
    }
    console.log("qqq");
}
//转换数据类型
function changeObj(curData, typeArray, keyArray) {
    var obj = {};
    for (var i = 0; i < curData.length; i++) {
        //字母 
        obj[keyArray[i]] = changeValue(curData[i], typeArray[i]);
    }
    return obj;
}

function changeValue(value, type) {
    if (value == null || value == "null") return ""
    if (type == "int") return Math.floor(value);
    if (type == "Number") return value;
    if (type == "String") return value;
}
//写文件
function writeFile(fileName, data) {
    fs.writeFile(fileName, data, 'utf-8', complete);

    function complete(err) {
        if (!err) {
            console.log("文件生成成功1");
        }
    }
}

// praseExcel(list);
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