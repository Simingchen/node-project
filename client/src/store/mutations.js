export default {
    // 存储个人信息
    saveUserMsg (state, data) {
        state.userMsg = Object.assign({}, state.userMsg, data);
    },
    // 页面切换加载状态vum.js中触发
    updateLoadingStatus (state, isLoading) {
        state.isLoading = isLoading;
    },
    // 获取热卖列表
    getHotList (state, data) {
        state.hotList = data;
    },
}