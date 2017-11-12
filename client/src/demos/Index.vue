<template>
    <div class="page">
        <!-- <page-footer>
            <footer-item v-bind:class="{ 'active' : currentView === 'home' }" @click.native="changeView('home')">
                <span class="iconfont icon-iconhuidaoshouye"></span>
                <label>首页</label>
            </footer-item>
            <footer-item v-bind:class="{ 'active' : currentView === 'shopCart' }" @click.native="changeView('shopCart')">
                <span class="iconfont icon-gouwuche-01"></span>
                <label>购物车</label>
            </footer-item>
            <footer-item v-bind:class="{ 'active' : currentView === 'orderList' }" @click.native="changeView('orderList')">
                <span class="iconfont icon-quanbudingdan-01"></span>
                <span class="badge">2</span>
                <label>我的订单</label>
            </footer-item>
            <footer-item v-bind:class="{ 'active' : currentView === 'center' }" @click.native="changeView('center')">
                <span class="iconfont icon-icongerenzhongxin-01"></span>
            <label>个人中心</label>
            </footer-item>
        </page-footer> -->
        <keep-alive>
            <component :is="currentView"></component>
        </keep-alive>
    </div>
</template>

<script>
    import Page from '../components/page'
    // import { Footer, Item } from '../components/footer'
    import Home from './Home'
    // import shopCart from './shopCart'
    // import orderList from './orderList'
    // import center from './center'
    export default {
        components: {
            Page,
            // 'page-footer': Footer,
            // 'footer-item': Item,
            'home': Home,
            // 'shopCart': shopCart,
            // 'orderList': orderList,
            // 'center': center
        },
        data () {
            return {
                currentView: 'home'
            }
        },
        methods: {
            changeView (view) {
                this.currentView = view
            }
        }
    }
</script>

<style lang="less">
    .my-page {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        bottom: 2.8rem;
    }
    .demo-icon-home {
        background-image: url("../assets/images/home/home.png");
        background-size: 100%;
    }
    .demo-icon-search {
        background-image: url("../assets/images/home/search.png");
        background-size: 100%;
    }
    .demo-icon-noti {
        background-image: url("../assets/images/home/button.png");
        background-size: 100%;
    }
    .demo-icon-me {
        background-image: url("../assets/images/home/person.png");
        background-size: 100%;
    }
</style>
