let path = require('path');
//使用ejsexcel读取excel文件  npm install ejsexcel --save
let ejsExcel = require('ejsexcel');
let fs = require('fs');
//读取excel
let exBuf = fs.readFileSync(__dirname + '/resource/userList.xlsx');
let _data = [];
//获取成功后
ejsExcel.getExcelArr(exBuf).then(exlJson => {
    //获取excel数据
    let workBook = exlJson;
    //获取excel第一张表 sheet1
    let workSheets = workBook[0];
    //导出js的路径
    let newfilepath = path.join(__dirname, "/resource/test.js");
    //遍历第一张表的的每一行数据
    workSheets.forEach((item, index) => {
        //从第二行开始插入，避免连表头也插入_data里面
        if (index > 0) {
            //往_data插入单元格个值，item[0]相当于excel中的姓名，item[1]就是excel中的联系电话
            _data.push({
                name: item[0],
                phone: item[1]
            })
        }
    });
    //写入js文件
    fs.writeFileSync(newfilepath, 'let _data=' + JSON.stringify(_data) + ';export {_data}');
}).catch(error => {
    //打印获取失败信息
    console.log("读取错误!");
    console.log(error);
});
