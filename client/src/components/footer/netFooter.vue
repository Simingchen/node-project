<template>
    <footer class="footer footer-icons">
        <router-link class="footer-item iconfont icon-31shouye" to="/netShop" :class="{active : curPage == '/netshop'}">
            严选首页
        </router-link>
        <router-link class="footer-item iconfont icon-fenlei2" to="/netShop/netSort" :class="{active : curPage == '/netshop/netsort'}">
            严选分类
        </router-link>
        <router-link class="footer-item iconfont icon-31gouwuche" to="/shopCart" :class="{active : curPage == '/shopcart'}">
            购物车
        </router-link>
        <router-link class="footer-item iconfont icon-31wode" to="/mine" :class="{active : curPage == '/mine'}">
            个人中心
        </router-link>
        <!-- <a class="footer-item" href="http://wpa.qq.com/msgrd?v=3&uin=2041306314&site=qq&menu=yes">  -->
        <!-- <a href="//im/chat?chat_type=wpa&uin=2041306314&version=1&src_type=web&web_src=bjhuli.com">
            测试客服
        </a> -->
    </footer>
</template>
<script>
    export default {
        data () {
            return {
                // curPage: this.$router.currentRoute.path.toLowerCase(), // 当前视图页路径
                curPage: this.$route.path.toLowerCase(), // 当前视图页路径
            }
        },
    }
</script>
<style lang="less">
@import "./footer.less";
.footer-icons{
    .footer-item{
        padding-top:1.85rem;
        color:#5f646e;
        font-size: 0.6rem;
    }
    .iconfont{
        &:before{
            position:absolute;
            top:0;
            left:50%;
            -webkit-transform:translate(-50%);
            transform:translate(-50%);
            font-size: 1.5rem!important;
        }
    }
}
</style>
