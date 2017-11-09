var mongoose = require("mongoose");
var config = require("./config.js");


module.exports = function(){
    var db = mongoose.connect(config.mongodb);
    db.connection.on("error",function(err){
        console.log("数据库链接失败");
    });
    db.connection.on("open",function(err){
        console.log("数据库链接成功");
    });
};

/*//数据库连接
var mongoose =require("mongoose");
var dbUrl = 'mongodb://siming:siming123@ds241065.mlab.com:41065/simingdatabase'
mongoose.connect(dbUrl, {useMongoClient: true});*/

// 数据库写入
/*var movie = mongoose.model("movie",movieSchema);
movie({title: "不能说的秘密"}).save((err, data) => {
    if (err) throw err;
    console.log(data);
})*/