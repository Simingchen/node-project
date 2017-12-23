//直接写入文件会被直接覆盖掉以前的文档数据，因此先读取文档1数据，再把文档2的内容读取出来合并放到文档2 中

var fs=require("fs");
// var src      = "C:/Users/liangzhaos/Desktop/test/";     //文件路径
// var filename = src+"css.html";
// var dst      = src+"header.html";

// function filecopy(import,dst){
// 	fs.readFile(import,{encoding:"utf8"},function(err,data1){
// 		if (err) {
// 			console.log(err);
// 			return;
// 		}
// 		fs.readFile(dst,{encoding:"utf8"},function(err,data2){
// 			if (err) {
// 				console.log(err);
// 				return;
// 			}
// 			fs.writeFile(dst,data1+data2,{encoding:"utf8"},function(err){
// 				if (err) {
// 					console.log(err);
// 					return;
// 				}
// 				console.log("it worked");
// 			});
// 		});
// 	});
// }

// filecopy(src,dst);

//需要操作的文件夹
var folder = "C:/Users/liangzhaos/Desktop/test/";
//需要注入文件的数据（来源）；
var importData= "C:/Users/liangzhaos/Desktop/test/test.css";
// API文档中中找到遍历文件夹的API
// 读取 path 路径所在目录的内容。 回调函数 (callback) 接受两个参数 (err, files) 其中 files 是一个存储目录中所包含的文件名称的数组
fs.readdir(folder, function(err, files) {
    // files是名称数组
    files.forEach(function(filename) {
        // var oldfile = 'C:/Users/liangzhaos/Desktop/test/' + filename;
        fs.readFile(importData,{encoding:"utf8"},function(err,data1){
			if (err) {
				console.log(err);
				return;
			}
			fs.readFile(filename,{encoding:"utf8"},function(err,data2){
				if (err) {
					console.log(err);
					return;
				}
				fs.writeFile(filename,data1+data2,{encoding:"utf8"},function(err){
					if (err) {
						console.log(err);
						return;
					}
					console.log("it worked");
				});
			});
		});
    });
});