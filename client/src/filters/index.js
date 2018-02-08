import Vue from 'vue'
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
