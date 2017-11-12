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


// //获取模型
// let UserModel = mongoose.model("user",userSchema);
// //通过Model对象向数据库中插入一条数据
// UserModel.create({name:"舒克",age:18},(err)=>{
//     if(!err){
//         console.log("插入成功~~");
//     }
// });
// 
// //Model对象的方法
// remove(conditions, callback)
// deleteOne(conditions, callback)
// deleteMany(conditions, callback)
// find(conditions, projection, options, callback)
// findById(id, projection, options, callback)
// findOne(conditions, projection, options, callback)
// count(conditions, callback)
// create(doc, callback)
// update(conditions, doc, options, callback)