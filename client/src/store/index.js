/*
    完整的闭环是 store.dispatch('action') -> action -> commit -> mutation -> getter -> computed，
    实际上中间的环节有的可以省略，因为 API 文档提供了以下几个方法 mapState、mapGetters、mapActions、mapMutations，
    然后在组件里可以直接调取
*/
import Vue from 'vue'
import Vuex from 'vuex'
// import getters from './getters.js'
import actions from './actions.js'
import mutations from './mutations.js'

Vue.use(Vuex);

// 数据
const state = {
    isLoading: false,  // 是否页面切换加载状态
    userMsg: {      // 用户信息
        User: {},   // 用户个人信息
        fesid: "",    // 用户id
        fid: 0,       // 企业id
        forbidcompanyId: [],             // 被禁止访问的企业ID 当前需手动设置
        forbidUrl: ["gobal", "netShop"],    // 禁止访问的url地址 当前需手动设置
        needLoginPage: ["shopcart", "order", "orderList"],    // 需要登录的页面 当前需手动设置
        OdType: 0,    // 建行类型 0不跳转
    },  
    webMsg: {},     // 网站信息
    hotList: [],   // 热销商品
    isWeChat: false,   // 是否为微信
    isOnWechatCharge: false  // 是否启用微信充值  默认false禁止 当前需手动设置

};

// 设置全局网站静态信息
const webMsg = {
    title: "分享汇",  // 首页标题
    QQLink: "http://wpa.qq.com/msgrd?v=3&uin=1923191362&site=qq&menu=yes",     // 网站QQ客服链接
    phone: "02037362820",               // 客服电话
    mailSever: "lsw@gzshengjian.net",     // 网站邮箱客服链接
    mailSever1: "yu.peng3@fesco.com.cn",     // 平台客服邮箱
}
state.webMsg = webMsg;

// 是否为微信
if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger") {
    state.isWeChat = true;
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
    state,
    actions,
    mutations,
    strict: debug
})