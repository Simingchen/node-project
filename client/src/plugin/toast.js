var Toast = {};
// 插件安装的时候执行了里面的函数，打印函数会直接执行
Toast.install = function (Vue, options) {
    // 安装时的总参数
    let opt = {
        defaultType: "center",  // 默认显示位置
        duration: 1500,     // 持续时间
    }

    // 合并options参数
    let merge = Object.assign({}, opt, options);

    Vue.prototype.$toast = (tips, type) => {   // 1、创建构造器，定义好提示信息的模板
        if (type) {
            merge.defaultType = type;  // 执行函数传参，权重大于插件传参
        }
        
        let toastTpl = Vue.extend({
            template: '<div class="vue-toast toast-' + merge.defaultType + '">' + tips + '</div>'
        });
        let tpl = new toastTpl().$mount().$el;  // 2、创建实例，挂载到文档以后的地方
        let oBody = document.body;
        let oTest = document.querySelector(".vue-toast");
        if (oTest) {  // 如果toast还在，则不在二次添加，更改参数即可
            oTest.innerHTML = tips;
            oTest.className = "vue-toast toast-" + merge.defaultType;
            return false;
        }
        oBody.appendChild(tpl);
        setTimeout(() => {
            oBody.removeChild(tpl);
        }, merge.duration);
    }
}

module.exports = Toast;