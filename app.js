var express = require("express");
var app=express();
var path = require('path');
var index =require('./routes/index');
var admin = require('./routes/admin');


//设置模板引擎
app.set("view engine",'jade');
app.set('views','./views/pages');

//设置静态资源
app.use("/static", express.static(path.join(__dirname, './public')));


app.use("/",index);
app.use("/admin",admin);

//数据库连接
var mongoose =require("mongoose");
var dbUrl = 'mongodb://siming:siming123@ds241065.mlab.com:41065/simingdatabase'
//连接数据库
mongoose.connect(dbUrl, {useMongoClient: true});

app.listen(3000,function(){
    console.log("请访问http://localhost:3000");
});

var mongoose =require("mongoose");

var movieSchema = mongoose.Schema({
    //电影名称、导演、国家、语言、上映时间、图片、简介
    title:String,
    director:String,
    country:String, 
    language:String,
    year:Number,
    poster:String,
    summary:String,
    flash:String   
});

var movie = mongoose.model("movie",movieSchema);
movie({title: "不能说的秘密"}).save((err, data) => {
    if (err) throw err;
    console.log("写入数据库成功");
    console.log(data);
})