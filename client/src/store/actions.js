/*  流程图
    components -> dispatch -> actions -> commit -> mutations -> state
    backend api build here
    接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation,
    或者通过 context.state 和 context.getters 来获取 state 和 getters。

    // ES2015 的 参数解构写法
    fn ({ commit,state}) {
        commit('fn')
    }
*/
import Vue from 'vue'
import apiList from "../apiList.js"  //api列表

export default {
    // 存储个人信息
    saveUserMsg (context, data) {
        context.commit('saveUserMsg', data);
    },
    // 热卖列表
    getHotList (context) {
        let oWin = window;
        try {   // 后台拉取热卖列表数据 使用try是防止window.localStorage不支持而阻塞后面语句
            if (oWin.sessionStorage && oWin.sessionStorage.hotList) {
                context.commit('getHotList', JSON.parse(oWin.sessionStorage.hotList));
            }
        } catch (e) {
            console.info(e);
        }

        var url = apiList.GdsHots;
        Vue.http.post(url).then(function (data) { 
            context.commit('getHotList', data.body.Hots);
            oWin.sessionStorage.hotList = oWin.JSON.stringify(data.body.Hots);
        },function(response){
            console.info(response);
        });
    }

};