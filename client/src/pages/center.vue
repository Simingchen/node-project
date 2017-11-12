<template>
<div class="center-page">
    <div class="top rel">
        <router-link class="center-set" to="/mine/centerSet">
            <span class="iconfont icon-icon09"></span>
        </router-link>
        <div class="mine-msg tac rel">
            <router-link class="avatar flex-box" to="/mine/userInfo">
                <img src="../assets/img/avt.png">
                <i class="iconfont icon-nan" v-if="isLogin && items.User.Sex == '男'"></i>
                <i class="iconfont icon-iconfontiocnnv2" v-if="isLogin && items.User.Sex == '女'"></i>
            </router-link>
            <h1 class="name" v-if="isLogin">{{items.User.Cname}}</h1>
            <div class="bot" v-if="!isLogin">
                <router-link to="/login">登录</router-link>|
                <router-link to="/signup">注册</router-link>
            </div>
        </div>
    </div>
    <router-link to="/orderList?type=0" class="items-line all-order bor-bottom ico-cart toactive mt10">
        <span>我的订单</span>
        <span class="fr c9 pr20">查看全部订单</span>
        <span class="link-arrow icon icon-link"></span>
    </router-link>
    <ul class="top-list flex-box rel bgf bor-bottom">
        <router-link class="flex-item item toPay" to="/orderList?type=1000">
            <img src="../assets/center/o (2).jpg">
            <p>待付款</p>
        </router-link>
        <router-link class="flex-item item toDeliver" to="/orderList?type=3000">
            <img src="../assets/center/o (3).jpg">
            <p>待收货</p>
        </router-link>
        <!-- <router-link class="flex-item item toReceipt" to="/orderList?type=0">
            <img src="../assets/center/o (4).jpg">
            <p>待评价</p>
        </router-link> -->
        <router-link class="flex-item item toReceipt" to="/orderList?type=2000"  v-if="false">
            <img src="../assets/center/o (1).jpg">
            <p>退换/售后</p>
        </router-link>
    </ul>
    <div class="recharge-line items-line clearfix" v-if="isWeChatBrowser">
        <span class="c9 pl10">积分不足吗？去充值~</span>
        <router-link class="btn" to="/recharge">立即充值</router-link>
    </div>
    <router-link to="/mine/userAcount" class="items-line all-order bor-bottom ico-cart toactive mt10">
        <span>我的钱包</span>
        <span class="fr c9 pr20">查看全部资产</span>
        <span class="link-arrow icon icon-link"></span>
    </router-link>
    <ul class="money-line flex-box tac items-line" v-if="false">
        <li class="flex-item">
            <span class="amount">0.00</span>
            <p class="c9">积分</p>
        </li>
        <li class="flex-item">
            <span class="amount">0.00</span>
            <p class="c9">礼金卡</p>
        </li>
        <li class="flex-item">
            <span class="amount">0.00</span>
            <p class="c9">优惠券</p>
        </li>
        <li class="flex-item">
            <span class="amount">0.00</span>
            <p class="c9">余额</p>
        </li>
    </ul>
    <div class="act-box flex-box tac items-line mt10">
        <router-link class="flex-item" to="/mine/userInfo">
            <img src="../assets/center/c (6).jpg">
            <p class="txt">账户管理</p>
        </router-link>
        <router-link class="flex-item" to="/goodsCollection">
            <img src="../assets/center/c (8).jpg">
            <p class="txt">我的收藏</p>
        </router-link>
        <router-link class="flex-item" to="/mine/addressList">
            <img src="../assets/center/c (2).jpg">
            <p class="txt">我的地址</p>
        </router-link>
        <a class="flex-item" href="https://admin.qidian.qq.com/template/blue/wpa/launch-mobile-qq.html?kfuin=2852061114&kfext=2852270580&visitorId=8679600128&visitorid=8679600128&fid=1&key=2c6693033018c081cc24d0a604ad7ff6&cate=1&type=2&ftype=1&pid=ckxq95.5bxqdx.j6mxh4k3&clickid=qcg4c6.bdrkcr.j6mxi5pu&tpForm=1&qid=5fonsq.64e2jv.j6mxh4k8&env=1&eptype=2&clickType=1&tptype=2&roleKey=roleQQ&roleValue=&roleUin=2852270581&roleData=2852270581&isKfuin=&cb=JSONP_CB_2&protocol=mqqwpa:// im/chat?sigt=5CD3FAD9ED9A12B963FA07D21C30864EAE01DDA561AAC45BB5ADBF1CF6D3DED8B806A30AF433B8CC5EA5AFA7AB15609C356C55C7EA4F25954EE2AE835A1830F0AFE6DB9AD6592868928F5F74670D90AAE353CB84DB0654BD5D2DE8823492D13EA9642BD64C9C56E9F2B6187FAE672BB919533700A51BB91179B711428E2154B3&chat_type=crm&uin=2852270581&version=1&src_type=web&web_src=1&wpaType=2&assignId=2852270581&QidianSigT=5CD3FAD9ED9A12B963FA07D21C30864EAE01DDA561AAC45BB5ADBF1CF6D3DED8B806A30AF433B8CC5EA5AFA7AB15609C356C55C7EA4F25954EE2AE835A1830F0AFE6DB9AD6592868928F5F74670D90AAE353CB84DB0654BD5D2DE8823492D13EA9642BD64C9C56E9F2B6187FAE672BB919533700A51BB91179B711428E2154B3&QidianKfUin=2852061114&rkey=ed71bbc21063ae66a51836c913383c4c&shouldReturnToRoot=NO">
            <img src="../assets/center/c (4).jpg">
            <p class="txt">QQ客服</p>
        </a>
    </div>
    <div class="act-box flex-box tac items-line clearfix">
        <router-link class="flex-item" to="/mine/customerService">
            <i class="iconfont icon-kehufuwukefu fz21"></i>
            <p class="txt">客户服务</p>
        </router-link>
        <span class="flex-item"></span>
        <span class="flex-item"></span>
        <span class="flex-item"></span>
        <!-- <router-link class="flex-item" to="/">
            <img src="../assets/center/c (7).jpg">
            <p class="txt">邀请有礼</p>
        </router-link>
        <router-link class="flex-item" to="/">
            <img src="../assets/center/c (1).jpg">
            <p class="txt">赠品兑换</p>
        </router-link>
        <router-link class="flex-item" to="/">
            <img src="../assets/center/c (5).jpg">
            <p class="txt">礼品购</p>
        </router-link> -->
        <!-- <a href="">反馈建议</a> -->
    </div>
    <a class="signout" v-if="isLogin" @click="loginOut()">
        <span>退出登录</span>
    </a>
    <pageFooter></pageFooter>
    <!-- 信息不完全提示 -->
    <confirm title="温馨提示" content="系统检测到您填写的信息不完整哦，为了不影响你的购物体验请完善您的用户信息吧"  ref="confirm" cancelText="以后再说" okText="去完善" :on-ok="confirmOk" :on-cancel="confirmCancel"></confirm>
</div>
</template>
<script>
    import Footer from '../components/footer/pageFooter.vue'
    import { List, ListItem } from '../components/list'
    import { Confirm } from '../components/modal'
    import apiList from "../apiList.js"  // api列表

    export default {
        components: {
            'pageFooter': Footer,
            List,
            ListItem,
            Confirm
        },
        data () {
            return {
                items: {},  // 账号列表
                isWeChatBrowser: false,     // 判断是否为微信
                isLogin: false,         // 是否登录
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getUserInfo();
                this.isWeChat();
                // 设置标题
                this.setTitle('个人中心')
                document.body.scrollTop = 0;
            });
        },
        methods: {
            getUserInfo: function () {
                if (window.sessionStorage.centerData) {
                    this.items = JSON.parse(window.sessionStorage.centerData);
                }
                var url = apiList.data.UserInfo;
                this.$http.post(url).then(function (data) {
                    var oData = data.body;
                    if (oData.Result == 1) {
                        this.items = oData;
                        window.sessionStorage.centerData = window.JSON.stringify(oData);
                        this.isLogin = true;

                        // 如果账户不完全，7天一循环的提示
                        let isSet = this.getCookie("isSetBaseMsg");
                        if ((!this.items.User.Mobile || !this.items.User.Email) && isSet != "ignore") {
                            this.$refs.confirm.open();
                        }
                    } else {
                        this.isLogin = false;
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 微信账号绑定
            getWeChat: function() {
                var ua = window.navigator.userAgent.toLowerCase(); 
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    var url = apiList.data.Authorize;
                    var path = "/recharge"
                    this.$http.post(url, {
                        url: path
                    }).then(function (data) { 
                        var oData = data.body;
                        if (oData) {      // 微信授权如果返回有数据连接再请求进行微信授权
                            window.location.href = oData;
                        }
                    }, function (response) {
                        console.info(response);
                    });
                }
                return false;
            },
            isWeChat: function () {
                var ua = window.navigator.userAgent.toLowerCase(); 
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    this.isWeChatBrowser = true;
                }
            },
            // 退出登录
            loginOut: function () {
                var url = apiList.data.Logout;
                this.$http.post(url, {
                }).then(function (data) { 
                    this.$router.push("/login");
                }, function (response) {
                    console.info(response);
                });
            },
            // confirm确定
            confirmOk: function () {
                // 7天后再提示
                this.setCookie("isSetBaseMsg", "ignore", 7);
                this.$router.push("/mine/userInfo");
            },
            // confirm取消
            confirmCancel: function () {
                // 7天后再提示
                this.setCookie("isSetBaseMsg", "ignore", 7);
            },
            // 设置cookie
            setCookie: function (name, value, expires) {
                var oDate = new Date();
                oDate.setDate(oDate.getDate() + expires)
                document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ";expires=" + oDate.toGMTString())
            },
            // 获取cookie
            getCookie: function (name) {
                if (document.cookie.length > 0) {
                    var start = document.cookie.indexOf(name + "=");
                    if (start != -1) { 
                        start = start + name.length + 1 
                        var end = document.cookie.indexOf(";", start);
                        if (end == -1) {
                            end = document.cookie.length
                        }
                        return unescape(document.cookie.substring(start, end))
                    } 
                } else {
                    return ""
                }
            },
        }
    }
</script>
<style lang="less" scoped>
    .pr20{
        padding-right:1.0rem;
    }
    .pl10{
        padding-left:0.5rem;
    }
    .fz21{
        font-size: 1.1rem;
        color:#e7777c;
    }
    .top{
        height:8.15rem;
        padding-top:.9rem;
        background: #ffc501 url(../assets/center/top.jpg) no-repeat;
        background-size: 100% 100%;
        .center-set{
            position:absolute;
            top:0.7rem;
            left:0.7rem;
            width:2.0rem;
            height:2.0rem;
            z-index: 10;
            .iconfont{
                font-size: 1.2rem;
            }
        }
        .avatar{
            width:3.85rem;
            height:3.85rem;
            margin: 0 auto;
            border-radius: 3.85rem;
            border:2px solid #adaaa3;
            text-align: center;
            overflow: hidden;
            -webkit-align-items: center;
            align-items: center;
            -webkit-justify-content: center;
            justify-content: center;
            img{
                width:3.0rem;
                height:3.0rem;
                border-radius: 3.0rem;
            }
            .iconfont{
                position: absolute;
                top:3.15rem;
                left:50%;
                margin-top:-8px;
                margin-left: .92rem;
                &.icon-nan{
                    color:#3eb7e8;
                }
                &.icon-iconfontiocnnv2{
                    color:#f4608e;
                }
            }
        }
        .name{
            color:#fff;
            font-size: 16px;
            line-height: 1.5rem;
        }
        .btn{
            display:block;
            width:3.9rem;
            height:1.1rem;
            margin:10px auto;
            line-height: 1.1rem;
            color:#ffc501;
            background-color: #fff;
            border-radius: 1.1rem;
        }
        .bot{
            padding-top:0.5rem;
            a{
                margin:0 0.5rem;
                color:#ec584e;
                font-size: 0.8rem;
            }
        }
    }
    .top-list{
        padding:10px 0;
        color:#666;
        .item{
            display: block;
            padding-top: 0.4rem;
            padding-bottom: 0.4rem;
            text-align: center;
        }
        img{
            width:1.2rem;
            height:1.2rem;
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
    .money-line{
        .amount{
            color:#e53b3e;
            font-weight: 600i;
        }
        .c9{
            font-size: 12px;
        }
    }
    .all-order{
        display:block;
        padding-left: 1rem;
    }
    .center-page{
        position:static;
        padding-bottom:4rem;
    }
    .signout{
        display:block;
        width:4.6rem;
        height:1.9rem;
        margin:0.65rem auto;
        text-align: center;
        line-height: 1.9rem;
        border-radius: 3px;
        border:1px solid #ffc501;
        color:#ffc501;
        font-size: 16px;
    }
    .recharge-line{
        .btn{
            float:right;
            padding:3px 8px;
            color:#fff;
            background-color: #e43a3d;
            border-radius: 4px;
        }
    }
    .act-box{
        img{
            width:1.8rem;
            height:1.6rem;
        }
    }

</style>
