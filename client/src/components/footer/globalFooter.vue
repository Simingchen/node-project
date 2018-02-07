<template>
    <footer class="footer footer-icons">
        <router-link class="footer-item iconfont icon-31shouye" to="/gobal" :class="{active : curPage == '/gobal'}">
            全球购
        </router-link>
        <router-link class="footer-item iconfont icon-fenlei2" to="/gobal/sort" :class="{active : curPage == '/gobal/sort'}">
            扫货分类
        </router-link>
        <router-link class="footer-item iconfont icon-31gouwuche" to="/shopCart" :class="{active : curPage == '/shopcart'}">
            购物车
        </router-link>
        <router-link class="footer-item iconfont icon-31wode" to="/mine" :class="{active : curPage == '/mine'}">
            个人中心
        </router-link>
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
