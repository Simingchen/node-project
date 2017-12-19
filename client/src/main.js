import Vue from 'vue'
import FastClick from 'fastclick'
import VueResource from 'vue-resource';
import Vum from './vum.js'
import router from './router'   // 路由
import store from './store'
import VueLazyload from 'vue-lazyload' // vue图片懒加载
import Toast from "./plugin/toast.js"   // 贴士弹窗
import apiList from "./apiList.js"  //api列表

Vue.use(Toast);
Vue.use(VueResource);
Vue.use(Vum);
Vue.use(VueLazyload, {  
    try: 3,     // 尝试加载次数
    filter: {   // vue-lazy未使用
        webp ({ src }) {
            const isCDN = /qiniudn.com/
            if (isCDN.test(src)) {
                src += '?imageView2/2/format/webp'
            }
            return src
        },
        someProcess ({ el, src }) {
            if (el.getAttribute('large')) {
              src += '?large'
            }
            // console.log(src)
            // return src
        }
    }
})
// 全局样式
require("./components/page/page.less");
require("./components/page/style.less");

// 自定义过滤器和new Vue的顺序，一定要将自定义过滤器放到new Vue前面。
// 全局过滤器 价格添加两位数
Vue.filter('formatMoney', function(value, isLogin) {
    if (!value && value != 0) return "";
    if (!isLogin) {   // 未传值为普遍页面的状态，因此当前取反值
        return parseFloat(value).toFixed(2);
    } else {
        var val = value.toString();
        return val.replace(val.substring(0, 2), "??") + ".00";
    }
})
// 日期过滤器
Vue.filter('formatDate', function(value, isShowTime = true) {
    // isShowTime 是否显示时间值
    var value = String(value);
    function formatDouble (formatVal) {
        return formatVal = formatVal < 10 ? ("0" + formatVal) : formatVal;
    }
    String.prototype.ToString = function (timeVal) {
        var dateTime = new Date(parseInt(this.substring(6, this.length - 2)));
        timeVal = timeVal.replace("yyyy", dateTime.getFullYear());
        timeVal = timeVal.replace("yy", formatDouble(dateTime.getFullYear().toString().substr(2)));
        timeVal = timeVal.replace("MM", formatDouble(dateTime.getMonth() + 1));
        timeVal = timeVal.replace("dd", formatDouble(dateTime.getDate()));
        timeVal = timeVal.replace("hh", formatDouble(dateTime.getHours()));
        timeVal = timeVal.replace("mm", formatDouble(dateTime.getMinutes()));
        timeVal = timeVal.replace("ss", formatDouble(dateTime.getSeconds()));
        timeVal = timeVal.replace("ms", dateTime.getMilliseconds())
        return timeVal;
    };
    //调用
    return isShowTime ? value.ToString("yyyy-MM-dd  hh:mm:ss") : value.ToString("yyyy-MM-dd ");
})

new Vue({
    router,
    store
}).$mount('#app')

Vum.router(router)

FastClick.attach(document.body);


//全局设置title
Vue.prototype.setTitle = function (title) {
    document.title = title;
    // 如果是微信浏览器
    var ua = window.navigator.userAgent.toLowerCase(); 
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        var oIframe = document.createElement('iframe');
        oIframe.style.display = 'none';
        oIframe.onload = function() {
            setTimeout(function(){
                oIframe.remove();
            }, 10);
        }
        document.body.appendChild(oIframe);
    }
}

// 微信账号授权
Vue.prototype.getWeChat = function (path) {
    var ua = window.navigator.userAgent.toLowerCase(); 
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        var url = apiList.data.Authorize;
        this.$http.post(url, {
            url: path
        }).then(function(data){ 
            var oData = data.body;
            if (oData) {      //微信授权如果返回有数据连接再请求进行微信授权
                window.location.href = oData;
            }
        },function(response){
            console.info(response);
        });
    }
    return false;
}

// 加载组件成功后清除loading样式
setTimeout(() => {
    document.querySelector("#welcome-loading").style.display = "none";
}, 500);