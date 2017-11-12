<template>
    <footer class="footer footer-icons">
        <router-link class="footer-item" to="/Home" :class="{active : curPage == '/Home' || curPage == '/'}" v-if="userType">
            <i class="iconfont icon-31shouye"></i>
            <p>首页</p>
        </router-link>
        <router-link class="footer-item" to="/midAutumn" :class="{active : curPage == '/midAutumn'}" v-if="!userType">
            <i class="iconfont icon-31shouye"></i>
            <p>我的中秋</p>
        </router-link>
        <router-link class="footer-item" to="/navSort" :class="{active : curPage == '/navSort'}" v-if="userType">
            <i class="iconfont icon-fenlei2"></i>
            <p>分类</p>
        </router-link>
        <a class="footer-item" href="https://admin.qidian.qq.com/template/blue/wpa/launch-mobile-qq.html?kfuin=2852061114&kfext=2852270580&visitorId=8679600128&visitorid=8679600128&fid=1&key=2c6693033018c081cc24d0a604ad7ff6&cate=1&type=2&ftype=1&pid=ckxq95.5bxqdx.j6mxh4k3&clickid=qcg4c6.bdrkcr.j6mxi5pu&tpForm=1&qid=5fonsq.64e2jv.j6mxh4k8&env=1&eptype=2&clickType=1&tptype=2&roleKey=roleQQ&roleValue=&roleUin=2852270581&roleData=2852270581&isKfuin=&cb=JSONP_CB_2&protocol=mqqwpa://im/chat?sigt=5CD3FAD9ED9A12B963FA07D21C30864EAE01DDA561AAC45BB5ADBF1CF6D3DED8B806A30AF433B8CC5EA5AFA7AB15609C356C55C7EA4F25954EE2AE835A1830F0AFE6DB9AD6592868928F5F74670D90AAE353CB84DB0654BD5D2DE8823492D13EA9642BD64C9C56E9F2B6187FAE672BB919533700A51BB91179B711428E2154B3&chat_type=crm&uin=2852270581&version=1&src_type=web&web_src=1&wpaType=2&assignId=2852270581&QidianSigT=5CD3FAD9ED9A12B963FA07D21C30864EAE01DDA561AAC45BB5ADBF1CF6D3DED8B806A30AF433B8CC5EA5AFA7AB15609C356C55C7EA4F25954EE2AE835A1830F0AFE6DB9AD6592868928F5F74670D90AAE353CB84DB0654BD5D2DE8823492D13EA9642BD64C9C56E9F2B6187FAE672BB919533700A51BB91179B711428E2154B3&QidianKfUin=2852061114&rkey=ed71bbc21063ae66a51836c913383c4c&shouldReturnToRoot=NO">
            <i class="iconfont icon-message_light"></i>
            <p>消息</p>
        </a>
        <!-- <router-link class="footer-item iconfont icon-31dingdan" to="/orderList?type=0" :class="{active : curPage == '/orderList?type=0'}">
            <p>我的订单</p>
        </router-link> -->
        <router-link class="footer-item" to="/shopCart" :class="{active : curPage == '/shopCart'}">
            <i class="iconfont icon-31gouwuche"></i>
            <p>购物车</p>
        </router-link>
        <router-link class="footer-item" to="/mine" :class="{active : curPage == '/mine'}">
            <i class="iconfont icon-31wode"></i>
            <p>个人中心</p>
        </router-link>
    </footer>
</template>
<script>
    export default {
        components: {
        },
        data () {
            return {
                curPage: this.$router.currentRoute.fullPath, // 当前视图页路径
                userType: true                  // 是否显示顶部分类
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                if (window.sessionStorage.fid_num39 == 39) { 
                    this.userType = false;
                }
            })
        }
    }
</script>
<style lang="less">
.footer-icons{
    .iconfont{
        display:block;
        height:1.5rem;
        margin-top:.2rem;
        font-size: 1.2rem;
    }
}
@import "./footer.less";
</style>
