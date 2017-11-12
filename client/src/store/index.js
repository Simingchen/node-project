import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'
import vueResource from 'vue-resource'

Vue.use(Vuex);

// 数据
const state = {
    userType: "",  //用户类型
    list: [],
    isSupportWebp: false   // 是否支持webp图片 未使用
};

export default new Vuex.Store({
    state,
    mutations,
    actions
})
