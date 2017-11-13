// 先创建Schema，再创建model,再进行数据操作
var mongoose = require("mongoose");
// var dbUrl = require("./mongooseConfig.js");
var dbUrl = 'mongodb://siming:siming123@ds241065.mlab.com:41065/simingdatabase'

//连接数据库
mongoose.connect(dbUrl, {useMongoClient: true});

// 所有model层
const mongooseModel = {
    // 用户注册model
    UserModel: function (userVal, passVal) {
        // userSchema层
        const userSchema = mongoose.Schema({
            username: String,
            password: String,
        })
        var user = mongoose.model("user", userSchema);
        let data = {
           username: userVal,
           password: passVal
        }
        // 数据库写入
        user(data).save((err, data) => {
            if (err) throw err;
            console.log("写入数据库成功");
            console.info(data);
        })
    },
    // 登录用户查找
    userFind: function (userVal, passVal, res) {
        // userSchema层
        const userSchema = mongoose.Schema({
            username: String,
            password: String,
        })
        var user = mongoose.model("user", userSchema);

        let data = {
           username: userVal,
           password: passVal
        }

        user.findOne({ username: userVal }, (err, data) => {
            if (err) throw err;
            
            console.info("查找结果" + data);
            // 查找为空时
            if (!data) {
                res.json({
                    Result: -1,
                    Message: "用户不存在"
                });
            } else {
                user.findOne({ password: passVal }, (err, data2) => {
                    if (!data2) {
                        res.json({
                            Result: -1,
                            Message: "密码不正确"
                        });
                    } else {
                        res.json({
                            Result: 1,
                            Message: "登录成功"
                        });
                    }
                })
            }

        });
    }
}

module.exports = mongooseModel;

// function(){
//     var db = mongoose.connect(config.mongodb);
//     db.connection.on("error",function(err){
//         console.log("数据库链接失败");
//     });
//     db.connection.on("open",function(err){
//         console.log("数据库链接成功");
//     });
// };

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