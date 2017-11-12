<template>
<div class="page center-page">
    <div class="top rel">
        <router-link class="center-set" to="/mine/centerSet">
            <span class="iconfont icon-icon09"></span>
        </router-link>
        <div class="mine-msg tac rel">
            <span class="avatar flex-box">
                <img src="../assets/img/avt.png">
            <i class="iconfont icon-nan" v-if="isLogin && items.User.Sex == '男'"></i>
            <i class="iconfont icon-iconfontiocnnv2" v-if="isLogin && items.User.Sex == '女'"></i>
            </span>
            <h1 class="name" v-if="isLogin">{{items.User.Cname}}</h1>
            <router-link class="btn" to="/login" v-if="!isLogin">登录</router-link>
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
        <router-link class="flex-item item toReceipt" to="/orderList?type=0">
            <img src="../assets/center/o (4).jpg">
            <p>待评价</p>
        </router-link>
        <router-link class="flex-item item toReceipt" to="/orderList?type=2000">
            <img src="../assets/center/o (1).jpg">
            <p>退换/售后</p>
        </router-link>
    </ul>
    <div class="recharge-line items-line clearfix" v-if="isWeChatBrowser">
        <span class="c9 pl10">积分不足吗？去充值~</span>
        <span class="btn" @click="getWeChat()">立即充值</span>
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
        <a class="flex-item" href="https://webpage.qidian.qq.com/2/chat/h5/index.html?kfuin=2852061114&kfext=2852270580&visitorId=186970112&visitorid=186970112&fid=10&key=a6a79e787d55c66d6b5081a9d5e7e5cb&cate=1&type=4&ftype=1&pid=tuc47i.ow8cd9.j27defb9&clickid=m2gjls.kyc9zy.j27df6re&tpForm=1&qid=4nxycg.79aokz.j27bxwob&env=1&eptype=2&clickType=1&tptype=2&roleKey=roleQQ&roleValue=&roleUin=2852270582&roleData=2852270582&cb=JSONP_CB_3&linkType=1">
            <img src="../assets/center/c (4).jpg">
            <p class="txt">客服中心</p>
        </a>
    </div>
    <div class="act-box flex-box tac items-line" v-if="false">
        <router-link class="flex-item" to="/">
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
        </router-link>
        <router-link class="flex-item" to="/">
            <img src="../assets/center/c (3).jpg">
            <p class="txt">关于世华</p>
        </router-link>
    </div>
    
    <router-link class="signout" to="/login" v-if="isLogin">
        <span>退出登录</span>
    </router-link>
    <pageFooter></pageFooter>
</div>
</template>
<script>
    import Footer from '../components/footer/pageFooter.vue'
    import { List, ListItem } from '../components/list'
    import apiList from "../apiList.js"  //api列表

    export default {
        components: {
            'pageFooter': Footer,
            List,
            ListItem
        },
        data(){
            return {
                items:{},  //账号列表
                isWeChatBrowser:false,     //判断是否为微信
                isLogin:false,         //是否登录
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                this.getUserInfo();
                this.isWeChat();
                //设置标题
                document.body.scrollTop = 0;
                this.setTitle('个人中心')
            });
        },
        methods:{
            getUserInfo:function(){
                if(sessionStorage.centerData){
                    this.items = JSON.parse(sessionStorage.centerData);
                }
                var url = apiList.data.UserInfo;
                this.$http.post(url).then(function(data){   //依赖vue-resource
                    var oData = data.body;
                    if(oData.Result == 1){
                        this.items = oData;
                        window.sessionStorage.centerData = JSON.stringify(oData);
                        this.isLogin = true;
                    }else{
                        this.isLogin = false;
                    }
                },function(response){
                    console.info(response);
                })
            },
            //微信账号绑定
            getWeChat:function(){
                var ua = window.navigator.userAgent.toLowerCase(); 
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    var url = apiList.data.Authorize;
                    this.$http.post(url,{
                    }).then(function(data){ 
                        var oData = data.body;
                        window.location.href = oData;
                    },function(response){
                        console.info(response);
                    });
                }
                return false;
            },
            isWeChat:function(){
                var ua = window.navigator.userAgent.toLowerCase(); 
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    this.isWeChatBrowser = true;
                }
            },
            
        }
    }
</script>
<style lang="less" scoped>
    .pr20{
        padding-right:20px;
    }
    .pl10{
        padding-left:10px;
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
            z-index: 10;
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
            text-align: center;
            line-height: 1.1rem;
            background-color: #fff;
            color:#ffc501;
            background-color: #fff;
            border-radius: 1.1rem;
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
