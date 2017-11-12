import Vue from 'vue'
import FastClick from 'fastclick'
import VueResource from 'vue-resource';
import Vum from './vum.js'
import store from './store'
import router from './router'   // 路由
import VueLazyload from 'vue-lazyload' // vue图片懒加载
import apiList from "./apiList.js"  //api列表

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

new Vue({
    router,
    store
}).$mount('#app')

Vum.router(router)

FastClick.attach(document.body)


//全局设置title
Vue.prototype.setTitle = function (title) {
    document.title = title;
    var oIframe = document.createElement('iframe');
    oIframe.style.display = 'none';
    oIframe.onload = function() {
        setTimeout(function(){
            oIframe.remove();
        }, 10);
    }
    document.body.appendChild(oIframe);
}

//加载组件成功后清除loading样式
document.querySelector("#welcome-loading").style.display = "none";

//全局过滤器 价格添加两位数
Vue.filter('formatMoney', function(value, isLogin) {
    if (!value) return "";
    if (!isLogin) {   // 未传值为普遍页面的状态，因此当前去反值
        return value.toFixed(2);
    } else {
        var val = value.toString();
        return val.replace(val.substring(0, 2), "??") + ".00";
    }
})
//日期过滤器
Vue.filter('formatDate', function(value, isShowTime = true) {
    // isShowTime 是否显示时间值
    //转换需要的方法
    String.prototype.ToString = function (format) {
        var dateTime = new Date(parseInt(this.substring(6, this.length - 2)));
        format = format.replace("yyyy", dateTime.getFullYear());
        format = format.replace("yy", dateTime.getFullYear().toString().substr(2));
        format = format.replace("MM", dateTime.getMonth() + 1)
        format = format.replace("dd", dateTime.getDate());
        format = format.replace("hh", dateTime.getHours());
        format = format.replace("mm", dateTime.getMinutes());
        format = format.replace("ss", dateTime.getSeconds());
        format = format.replace("ms", dateTime.getMilliseconds())
        return format;
    };
    //调用
    return isShowTime ? value.ToString("yyyy-MM-dd  hh:mm:ss") : value.ToString("yyyy-MM-dd ");
})

//微信账号授权
Vue.prototype.getWeChat = function (path){
    var ua = window.navigator.userAgent.toLowerCase(); 
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        var url = apiList.data.Authorize;
        this.$http.post(url,{
            url:path
        }).then(function(data){ 
            var oData = data.body;
            if(oData){      //微信授权如果返回有数据连接再请求进行微信授权
                window.location.href = oData;
            }
        },function(response){
            console.info(response);
        });
    }
    return false;
}

