// var $Hewenqi = (function () {
//     var _option = {
//         id:"hewenqi"
//     }
//     var _hewenqi = function () {
//         var h_obj;
//         h_obj = document.getElementById(_option.id);
//         if (h_obj){}
//         else{return;}

//         var initX;
//         var moveX;
//         var X = 0;
//         var objX = 0;


//         h_obj.addEventListener('touchstart', function (event) {
//             var obj = event.target.parentNode;
//             if (obj.className == "deletedItem") {
//                 initX = event.targetTouches[0].pageX;
//                 objX = (obj.style.transform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
//             }
//             if (objX == 0) {
//                 h_obj.addEventListener('touchmove', function (event) {
//                     var obj = event.target.parentNode;
//                     if (obj.className == "deletedItem") {
//                         moveX = event.targetTouches[0].pageX;
//                         X = moveX - initX;
//                         if (X > 0) {
//                             obj.style.transform = "translateX(" + 0 + "px)";
//                         }
//                         else if (X < 0) {
//                             var l = Math.abs(X);
//                             obj.style.transform = "translateX(" + -l + "px)";
//                             if (l > 80) {
//                                 l = 80;
//                                 obj.style.transform = "translateX(" + -l + "px)";
//                             }
//                         }
//                     }
//                 });
//             }
//             else if (objX < 0) {
//                 h_obj.addEventListener('touchmove', function (event) {
//                     var obj = event.target.parentNode;
//                     if (obj.className == "deletedItem") {
//                         moveX = event.targetTouches[0].pageX;
//                         X = moveX - initX;
//                         if (X > 0) {
//                             var r = -80 + Math.abs(X);
//                             obj.style.transform = "translateX(" + r + "px)";
//                             if (r > 0) {
//                                 r = 0;
//                                 obj.style.transform = "translateX(" + r + "px)";
//                             }
//                         }
//                         else {     //向左滑动
//                             obj.style.transform = "translateX(" + -80 + "px)";
//                         }
//                     }
//                 });
//             }

//         })
//         h_obj.addEventListener('touchend', function (event) {
//             var obj = event.target.parentNode;
//             if (obj.className == "deletedItem") {

//                 var h_li = document.getElementsByClassName("deletedItem");
//                 var h_count = h_li.length;
//                 for (var i = 0; i < h_count; i++) {
//                     if (obj != h_li[i])
//                     h_li[i].style.transform = "translateX(" + 0 + "px)";
//                 }

//                 objX = (obj.style.transform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
//                 if (objX > -40) {
//                     obj.style.transform = "translateX(" + 0 + "px)";
//                 } else {
//                     obj.style.transform = "translateX(" + -80 + "px)";
//                 }
//             }
//         })

//         var hewenqi_items = document.getElementsByClassName("hewenqi-btn");
//         var h_count = hewenqi_items.length;
//         for (var i = 0; i < h_count; i++) {
//             hewenqi_items[i].addEventListener('click', function (event) {
//                 var hewenqi_items = event.target.parentNode;
//                 hewenqi_items.style.display = 'none';//这里应该实现隐藏或者删除节点的功能
//             })
//         }
//     }

//     var _set=function(option){
//         _option = option;
//     }

//     return {
//         Hewenqi: _hewenqi,
//         Set:_set
//     }
// })();

(function (global, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(factory);
    } else {
        global.Inertia = factory();
    }
}(this, function () {
    'use strict';
    var _hewenqi = function (id) {
        var h_obj;
        h_obj = document.getElementById(id);
        if (h_obj){}
            else{return;}

        var initX;
        var moveX;
        var X = 0;
        var objX = 0;

        h_obj.addEventListener('touchstart', function (event) {
            var obj = event.target.parentNode;
            if (obj.className == "deletedItem") {
                initX = event.targetTouches[0].pageX;
                objX = (obj.style.transform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
            }
            if (objX == 0) {
                h_obj.addEventListener('touchmove', function (event) {
                    var obj = event.target.parentNode;
                    if (obj.className == "deletedItem") {
                        moveX = event.targetTouches[0].pageX;
                        X = moveX - initX;
                        if (X > 0) {
                            obj.style.transform = "translateX(" + 0 + "px)";
                        }
                        else if (X < 0) {
                            var l = Math.abs(X);
                            obj.style.transform = "translateX(" + -l + "px)";
                            if (l > 80) {
                                l = 80;
                                obj.style.transform = "translateX(" + -l + "px)";
                            }
                        }
                    }
                });
            }
            else if (objX < 0) {
                h_obj.addEventListener('touchmove', function (event) {
                    var obj = event.target.parentNode;
                    if (obj.className == "deletedItem") {
                        moveX = event.targetTouches[0].pageX;
                        X = moveX - initX;
                        if (X > 0) {
                            var r = -80 + Math.abs(X);
                            obj.style.transform = "translateX(" + r + "px)";
                            if (r > 0) {
                                r = 0;
                                obj.style.transform = "translateX(" + r + "px)";
                            }
                        }
                            else {     //向左滑动
                                obj.style.transform = "translateX(" + -80 + "px)";
                            }
                        }
                    });
            }

        })
        h_obj.addEventListener('touchend', function (event) {
            var obj = event.target.parentNode;
            if (obj.className == "deletedItem") {

                var h_li = document.getElementsByClassName("deletedItem");
                var h_count = h_li.length;
                for (var i = 0; i < h_count; i++) {
                    if (obj != h_li[i])
                        h_li[i].style.transform = "translateX(" + 0 + "px)";
                }

                objX = (obj.style.transform.replace(/translateX\(/g, "").replace(/px\)/g, "")) * 1;
                if (objX > -40) {
                    obj.style.transform = "translateX(" + 0 + "px)";
                } else {
                    obj.style.transform = "translateX(" + -80 + "px)";
                }
            }
        })

        var hewenqi_items = document.getElementsByClassName("deletedItem-btn");
        var h_count = hewenqi_items.length;
        for (var i = 0; i < h_count; i++) {
            hewenqi_items[i].addEventListener('click', function (event) {
                var hewenqi_items = event.target.parentNode;
                    hewenqi_items.style.display = 'none';//这里应该实现隐藏或者删除节点的功能
                })
        }
    }
    return _hewenqi;
}));