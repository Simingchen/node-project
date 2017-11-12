<template>
<div class="pageCon centerSet-page">
    <simple-header title="设置" :back-link="true"></simple-header>
    <page-content>
        <router-link to="/mine/userInfo" class="items-line all-order bor-bottom ico-manage mt10 toactive">
            <span class="iconfont icon-zhanghaoguanli"></span>
            <span>用户信息</span>
            <span class="link-arrow icon icon-link"></span>
        </router-link>
        
        <router-link to="/mine/modifyPass" class="items-line all-order bor-bottom ico-manage mt10 toactive">
            <span class="iconfont icon-denglumima"></span>
            <span>修改登录密码</span>
            <span class="link-arrow icon icon-link"></span>
        </router-link>
        <router-link to="/mine/newPass" class="items-line all-order bor-bottom ico-manage toactive">
            <span class="iconfont icon-zhifumimaxiugai"></span>
            <span>修改支付密码</span>
            <span class="link-arrow icon icon-link"></span>
        </router-link>
        <router-link to="/mine/addressList" class="items-line all-order bor-bottom ico-manage toactive">
            <span class="iconfont icon-location"></span>
            <span>管理收货地址</span>
            <span class="link-arrow icon icon-link"></span>
        </router-link>
        <router-link to="/credit" class="items-line all-order bor-bottom ico-manage toactive" v-if="false">
            <span class="iconfont icon-xinyongqiahuankuan"></span>
            <span>信用卡还款</span>
            <span class="link-arrow icon icon-link"></span>
        </router-link>
    </page-content>
</div>
</template>
<script>
    import { SimpleHeader } from '../components/header'
    import Content from '../components/content'

    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
        },
        data () {
            return {
                items: {}  // 账号列表
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                // 设置标题
                this.setTitle('设置');
            });
        },
    }
</script>
<style lang="less">
    .centerSet-page{
        .iconfont{
            margin-right: 0.5rem;
            font-size: 1.1rem;
            vertical-align: middle;
        }
        .icon-zhanghaoguanli{
            color:#f1407b;
        }
        .icon-denglumima{
            color:#32b2ec;
        }
        .icon-zhifumimaxiugai{
            color:#ffb359;
        }
        .icon-location{
            color:#35bb98;
        }
        .icon-xinyongqiahuankuan{
            color:#c19f24;
        }
        .top{
            height:5.0rem;
            background:url(../assets/signin_02.png) no-repeat;
            background-size: cover; 
            .mine-msg{
                position:absolute;
                bottom:0;
                width:100%;
                height:2.7rem;
                padding: 0.25rem 0.75rem;
                font-size: 15px;
                color:#fff;
                background-color: rgba(0,0,0,.6);
            }
        }
        .top-list{
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            padding:10px 0;
            .item{
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
                display: block;
                padding: 2.1rem 0 0.5rem;
                background-size: 1.2rem 1.2rem;
                text-align: center;
                background-repeat: no-repeat;
                background-position: center 0.6rem;
            }
            .toPay{
                background-image: url(https:// b.yzcdn.cn/v2/image/wap/uc/order_list/icon_topay@2x.png);
            }
            .toReceipt{
                background-image: url(https:// b.yzcdn.cn/v2/image/wap/uc/order_list/icon_daijiedan@2x.png);
            }
            .toDeliver{
                background-image: url(https:// b.yzcdn.cn/v2/image/wap/uc/order_list/icon_send@2x.png);
            }
        }
        .link-arrow{
            font-size: .7rem;
            position: absolute;
            right: .3rem;
            top: 50%;
            height: 1rem;
            width: .8rem;
            color: #c7c7c7;
            margin-top: -0.5rem;
        }
        .all-order{
            display:block;
            padding-left: 1rem;
            /*.bg{
                position:absolute;
                left:0.75rem;
                width: 1.25rem;
                height: 1.25rem;
                background-image:url(https:// b.yzcdn.cn/v2/image/wap/uc/uc_icon.png);
                background-repeat:no-repeat; 
                background-size: 0.9rem 10.9rem;
                background-position: 0.15rem 0.2rem;
                overflow: hidden;
            }
            &.ico-cart{
                .bg{
                    background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAwNJREFUWAndVj2IE0EU3k3OxIRE0E11pDCSQzxE0PxwAQsrIUjs0gliE+xt/CtSeIVY2V55hU1sj0gsjDYX89PomTvkwMCJICbhYhA0yWb93rADm+xu3LsMJ9zAy7yZ9973vnnzdjeS9J+HHIvFNAOHb7IsP6/Vas8wG/cNLmJV1xTcoqZpTxOJxJ2p/aNZohp3qSLxePzN0WSUJNmYCMlDWP9A+X+iEqeMNoF6G/hN4K82Go3SBAFKgtPvwRgWmNAWCkRuLFhYP2AvDOPter2+bmGfayuZTCqqqt4DyAPIw+kmlJD4I2VAFa7SLHpUq9WOoiirhIscyyYC2GcEQOSM6OQcr9frnea6iQASb+nGi9xJ9IwrWCFM5HpvIoDy7MCgwh5Np9Ne0cl1vBTNyLNpIlAsFv/Atov7cXe73fN6gOiJVWA8HldMBPRMn2gejUbCrwHvmhOAvgLRgsFg1ZIATs8IoETLRETkAOZl4J8E5na5XN63JACnJiWlx0Rkch2TN2CF1pYE3G43IwD7BXISOXC4fxPw+Xyf4ahCotls1iOSAKrKngBqQMK1rADu5jccv0AWWq3WkigCqVQqCqyzkP1MJsP6zOpbwPJRH4BAFEypD5gzMzj4QSIfnqAQ4kPAUWiGLA2Hw1t6+Mt8Pj8m3ZYAAqgPbrpcrkv4g1IxgmGfPtuKPpM+sR4MBj7ssYE4rlJT08tny+PxPOKbtgTguE0BkPuQxxRAaycDsXSFHfjSt7+t63vQ30UikVeFQmHAcWwJ4ORNvLMlXAE143cORjMHJx3CEpHu9Xo7gUCgXSqVfmFtOfCJn9i3JeD3+3f6/b4EIhpYnzOynkCYc2H6R2TEw2tzE+sVkHiCd8MLo+2wOhpxF3/Fhjx+JgH8PUuj3BtwnunHwZzMuM63uIZr3Nf2CsgBjkU8AddBghpxkQfNOb+eM/6YhTu+W+oHnH1NP3+OrmdWLZz6W34LbIDX0AdhEgMRG1e27cj/IARmJTu07SAEcniEvpIgW85BRkf+fwGeVziT+TixzgAAAABJRU5ErkJggg==);
                    background-size: 0.8rem 0.8rem;
                    background-position: center center;
                }
            }
            &.ico-pointsstore{
                .bg{
                    background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAnFBMVEUAAAAzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM+ZMmGAAAAM3RSTlMAA/ZiDu6XeT/X0fqjnpFnLhPf27ypilM6JB8IsHRZKuVvXk9KxcK3g34ZyZo0y6pIrEse3WpOAAABu0lEQVQ4y7WS15KjQAxFTUNDk3MwJpqM48z9/3/bKUKt2YXH0YtEcdQKV6dfsXPN96KWJNo9MCuL+x+4MONJ8WFE1ip7y1xbALQT+/JavzNzMF4OAFkSPup0gCKGm0SBBS2gsPX74eBWCTstRD5ItuQoCC4Hs/CEWHMA8XhiE/rkdTU/HZvjTu6uWscM58iTz+AfQymMeYgWmr2PXCQU5zmMG7imvYOELQq27u2tAzThN3KdQ70AvCxeensVF5YQgDw935D4axpoXUMBNBnny3OJGuLPE3nqFxuBu55NS5QmKFCX3uz8u+wNXTcCKbRGbi7j3iYvkvh0bPK8pyuGY+Yb+ipwecTUlCxyWDKSiNu7ZwMkXPWpPcBL/+Fy0ydQ+PXORNfmFQDyfTCryMqjmpeMGwHcQdCfMxXhxZ04FigqPs3Rw5// 5bKnXs1XJVJD++q8RBOl7HFZTqXZ2xO3bU2RlwtNj/cUqdrkR1e9HjEPV43miFGI5z1klMjfKg8FxDfjbTN2dXdAP2oIkgPAk/iQWfGYs4ovfQpQMd7mZYkLAFApJVNQtOXOdQiMHzSvUeSb9xWY7/H0C/YH+lAx6LUq3XwAAAAASUVORK5CYII=);
                    background-size: 0.8rem 0.8rem;
                    background-position: center center;
                }
            }
            &.ico-manage{
                .bg{
                    background-position: 3px -198px;
                }
            }*/
        }
    }
</style>
