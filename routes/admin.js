var express = require('express');
var router = express.Router();

//localhost:3000/admin/add
router.get("/add",function(req,res){
    res.render('control.jade',{
        title:'后台电影添加页',
        movie:{
            title:'',
            director:'',
            country:'', 
            language:'',
            year:'',
            poster:'',
            summary:'',
            flash:''
        }
    });
});


//localhost:3000/admin/list
router.get("/list",function(req,res){
    res.render('list.jade',{
        title:'后台电影列表',
      movies:[
        {
            _id:1,
            title:'海绵宝宝3D',
            director:'保罗·蒂比特'
        }
      ]
    });
});

module.exports = router;