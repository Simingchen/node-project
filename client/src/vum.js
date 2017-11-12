import BackLink from './directives/back-link'
import Swipe from './directives/swipe'
import Transitionend from './directives/transitionend'
import db from './db'//将历史路径存在sessionStorage里面
import Vue from 'vue'

/**
 * vue-router does not support reverse transition下面是导航钩子
 * 使用 router.beforeEach 注册全局的 before 钩子：
const router = new VueRouter({ ... })
router.beforeEach((to, from, next) => {
// ...
})
*/

class RouterConfig {
    constructor (router) {
        this.router = router
    }
    config () {
        const router = this.router
        this.router.beforeEach(function (to, from, next) {
            // console.log(to, from, next)
            // to: Route: 即将要进入的目标 路由对象
            // from: Route: 当前导航正要离开的路由
            // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
            router.previousPath = from;//将上一个路由路径存在router中方便微信授权后跳转
            //将上一个路径存在window下方便后退时back-link不会推到登录页中
            window.previousPath = from;
            try {
                const _to = to.path
                const _from = from.path;
                var oPageContent = router.app.$el.querySelector('.page-content');
                const scrollTop = oPageContent ? oPageContent.scrollTop : 0;//修改某些页面去除page-content元素后未能取值的问题
                const h = db.get(_to)
                if (h && h.history || (_from && _from.indexOf(_to) === 0)) {
                    router.app.$el.className = 'transition-reverse'
                    h.history = false
                    db.set(_to, h)
                // console.log(_from)
                } else {
                    db.set(_from, {
                    // scrollTop: scrollTop,//修改了部分页面，组件page-content元素已经删除则无法进行跳转
                    scrollTop: 0,//scrollTop设置为0，组件页面每次跳转都在顶层
                    history: true
                })
                    router.app.$el.className = ''
                }
            } catch (e) {
                // swallo error
                console.log(e)
            }
            next()
        })
        this.router.afterEach(function (to, from, next) {
            const h = db.get(to.path)
            if (h && h.scrollTop) {
                Vue.nextTick(() => {
                    const _to = router.app.$el.querySelectorAll('.page-content')[1];
                    if (_to) _to.scrollTop = h.scrollTop;
                })
            }
        })
    }
}

export default {
    install (Vue) {
        Vue.directive('back-link', BackLink)
        Vue.directive('swipe', Swipe)
        Vue.directive('transitionend', Transitionend)
    },
    router (router) {
        const rc = new RouterConfig(router)
        rc.config()
    }
}
