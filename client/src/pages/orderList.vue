<!-- 显示都为子订单状态,点击进入单个子订单为父订单详情，父订单才有支付，确认收货操作 -->
<template>
<div class="page orderList-page">
    <!-- <simple-header title="我的订单"></simple-header> -->
    <ul class="flex-box top-nav rel bor-bottom bgf">
        <li class="flex-item" :class="{on:curType == 0}" @click="getOrderList(0,1)">
            <span >全部</span>
        </li>
        <li class="flex-item" :class="{on:curType == 1000}" @click="getOrderList(1000,1)">
            <span>待付款</span>
        </li>
        <!-- <li class="flex-item" :class="{on:curType == 2}" @click="getOrderList(1,2)">
            <span>待发货</span>
        </li> -->
        <li class="flex-item" :class="{on:curType == 3000}" @click="getOrderList(3000,1)">
            <span>待收货</span>
        </li>
        <!-- <li class="flex-item" :class="{on:curType == -1}" @click="getOrderList(-1,1)">
            <span>退款/售后</span>
        </li> -->
    </ul>
    <page-content class="con">
        <div class="hp100">
            <div class="order-con">
                <div class="empty" v-if="isEmpty">
                    <p class="txt">当前的订单为空~  T.T</p>
                    <p class="subTxt">快去挑点商品吧</p>
                    <router-link class="btn toActive" to="/goodsList">去逛逛</router-link>
                </div>
                <div class="order-list" v-else="isEmpty">
                    <scroll class="mb3rem" :on-refresh="onRefresh" :on-infinite="onInfinite">
                    <div class="goods-li ofh" v-for="(item,index) in items">
                        <ul v-for="(subItem,index) in item.subdanlist">
                            <!-- 订单状态：未支付 = 1000, 已收款 = 2000, 已同意发货 = 2500,已发货 = 3000,已收货 = 6000, 已取消 = -1 -->
                            <div class="state-li">
                                <span class="fl">订单状态：</span>
                                <p class="c58" v-if="subItem.danstate == 1000">未支付</p>
                                <p class="c58" v-if="subItem.danstate == 2000">已收款</p>
                                <p class="c58" v-if="subItem.danstate == 2500">已同意发货</p>
                                <p class="c58" v-if="subItem.danstate == 3000">已发货</p>
                                <p class="c58" v-if="subItem.danstate == 6000">已收货</p>
                                <p class="c58" v-if="subItem.danstate == -1">已取消</p>
                            </div>
                            <li class="item clearfix" v-for="(order,index2) in subItem.dantaillist">
                                <a href="javascript:;" @click="formatUrl(item,subItem)" :isgy="item.isgy">
                                    <img class="img fl" 
                                        v-if="order.planid != 102"
                                        :src="'/Thumbnail/BusGoodsList'+order.img" 
                                        width="90" height="90" 
                                        onerror="this.src='/static/img/loading.fc1fbe1.png'">
                                    <img class="img fl" :src="'http://msyc-img.oss-cn-shenzhen.aliyuncs.com'+order.img" width="90" height="90" v-if="order.planid == 102">
                                    <div class="item-content">
                                        <div class="item-title-row flex-box">
                                            <div class="item-title flex-item">
                                                {{order.hname}}
                                            </div>
                                            <div class="price">
                                                <p class="basePrice">{{order.price | formatMoney("")}}</p>
                                            </div>
                                        </div>
                                        <div class="item-subtitle">
                                            <p>{{order.ys1typename}} {{order.ys1name}}</p>
                                            <p>{{order.ys2typename}} {{order.ys2name}}</p>
                                            <div class="fr num">×<span class="num-txt">{{order.nums}}</span></div>
                                        </div>
                                    </div>
                                </a>
                            </li>
                        </ul>
                        <div class="li-bot bor-bottom rel">
                            <span>(含运费<b>0.00</b>)</span>
                            <span>合计:<b>{{item.totalfen | formatMoney("")}}</b></span>   
                            <span>共<b>{{item.subdanlist.length}}</b>件商品</span>   
                        </div>
                        <div class="mb10 clearfix">
                            <!-- <span class="delete-btn" @click="deleteOrder(item)">删除订单</span> -->
                            <span class="delete-btn" @click="certainOrder(item)" v-if="item.danstate == 3000">确认收货</span>
                            <span class="delete-btn" @click="cancleOrder(item)" v-if="item.danstate == 1100 || item.danstate == 1000">取消订单</span>
                            <span class="delete-btn" @click="payPop(item)" v-if="(item.danstate == 1100 || item.danstate == 1000) && isWeChatBrowser">在线支付</span>
                            <!-- <span class="delete-btn" @click="buyAgain(item)" v-if="item.danstate == 6000 || item.danstate == -1 || item.danstate == 2000">再次购买</span> -->
                        </div>
                    </div>
                    </scroll>
                </div>
            </div>
        </div>
    </page-content>
    <!-- 弹窗错误信息 -->
    <div class="notify" v-if="popMsg.isShowMsg">
        <div class="txt">{{popMsg.errorMsg}}</div>
    </div>
    <confirm :title="'提示'" :content="'删除当前订单吗？'" :on-ok="DeleteOk" ref="confirm" cancelText="取消" okText="确定"></confirm>
    <!-- 输入密码弹窗 -->
    <prompt title="请输入支付密码(默认123456)" :on-ok="payOrder" ref="prompt"></prompt>
    <pageFooter></pageFooter>
</div>
</template>
<script>
    import Content from '../components/content'
    import Scroll from '../components/scroll'
    import Footer from '../components/footer/pageFooter.vue'
    import { List, ListItem } from '../components/list'
    import { Confirm, Prompt } from '../components/modal'
    import apiList from "../apiList.js"  // api列表

    export default {
        components: {
            // SimpleHeader,
            'page-content': Content,
            'pageFooter': Footer,
            Confirm,
            List,
            ListItem,
            Prompt,
            Scroll
        },
        data () {
            return {
                isEmpty: true,   // 当前项列表是否为空
                items: [],     // 订单数据
                popMsg: {
                    isShowMsg: false,     // 是否显示弹窗错误信息
                    errorMsg: "",         // 弹窗错误信息
                },
                curMethods: null,       // 当前方法
                curType: 0,              // 当前类型 默认为全部
                totalPages: 0,         // 所有页数
                curPage: 0,           // 当前页数
                curItem: "",         // 选定的当前item
                isWeChatBrowser: false,  // 是否为微信浏览器可在线支付

            }
        },
        // goods增加返回planid,subdanstate,subdanstate值如下：
        // 没有申请记录(这种情况可以点击申请)=-1
        // 退款申请 = 0,
        // 换货申请 = 1,
        // 退货申请 = 2,
        // 退款驳回 = 3,
        // 换货驳回 = 4,
        // 退货驳回 = 5,
        // 已退款 = 6,
        // 已换货 = 7,
        // 已退货 = 8,
        // 已处理 = 9
        mounted: function () {
            this.$nextTick(function () {
                this.getWeChat(this.$route.fullPath);
                
                this.initGoodsList();
                this.isWeChat();

                // 设置标题
                this.setTitle("我的订单");
            })
        },
        methods: {
            getOrderList: function (type, index) {
                // type 0 全部订单， 1000待付款 3000待收货
                var url = apiList.data.MyOrderList;
                this.$http.post(url, {
                    danstate: type,
                    pindex: index,
                }).then(function (data) {
                    var oData = data.body;
                    var that = this; 
                    if (oData.Result == 1) {
                        // 导航选中状态
                        this.curType = type;
                        // 重新切换的时候始终保持在顶部
                        
                        // 如果页码为1，不进行列表叠加
                        if (index == 1) {
                            this.items = oData.Orderlist;
                        } else {
                            this.items = this.items.concat(oData.Orderlist);
                        }

                        // 判断当前列表是否为空
                        if (oData.Orderlist.length) {
                            this.isEmpty = false;
                        } else {
                            this.isEmpty = true;
                        }

                        this.totalPages = oData.Pcount;
                        this.curPage = oData.Pindex;

                        // 只有一页时隐藏加载条
                        if (this.curPage >= this.totalPages) {
                            setTimeout(function () {
                                let oLayer = that.$el.querySelector(".infinite-layer");
                                if (oLayer) {
                                    oLayer.style.display = "none";
                                }
                            }, 100)
                        }
                    } else {
                        this.$router.push("/login")
                        return false;
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 初始页面数据
            initGoodsList: function () {
                var urlType = this.$route.query.type;
                if (urlType) {
                    this.getOrderList(urlType, 1);
                }
            },
            // 确定删除当前项
            DeleteOk: function () {
                var url = apiList.data.OrderToCancel;
                this.$http.post(url, {
                    danid: this.curItem.danid
                }).then(function (data) {
                    var oData = data.body;
                    if (oData.Result == 1) {
                        this.getOrderList(1000, 1);
                        return false;
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 取消订单
            cancleOrder: function (item) {
                this.curItem = item;
                this.$refs.confirm.open();
                this.popMsg.errorMsg = "删除所选项吗？";
            },
            // 确认收货
            certainOrder: function (item) {
                var url = apiList.data.OrderToReceiving;
                this.$http.post(url, {
                    danid: item.danid
                }).then(function (data) {
                    var oData = data.body;
                    if (oData.Result == 1) {
                        // this.$router.push("/orderSuccess");
                        this.$router.push("/orderList?type=0");   // 返回到全部订单
                        return false;
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 再次购买,实质是加入购物车
            buyAgain: function (item) {
                var url = apiList.data.AddToShoppingCard;
                this.$http.post(url, {
                    nums: 1,
                    tid: item.tid
                }).then(function (data) {
                    var oData = data.body;
                    if (oData.Result == 1) {
                        this.$router.push("/shopCart");
                        return false;
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 下拉更新指定第一页,保持积分类型
            onRefresh: function (done) {
                var that = this;
                setTimeout(function () {
                    that.getOrderList(that.curType, 1);
                    done()// 执行完毕
                }, 1000)
            },
            // 滚动加载
            onInfinite: function (done) {
                var that = this;

                // 滚动到最后一页隐藏加载条
                if (this.curPage >= this.totalPages) {
                    this.$el.querySelector(".infinite-layer").style.display = "none";
                    return false;
                }

                // 刷新加载
                setTimeout(function () {
                    that.curPage = that.curPage + 1;
                    that.getOrderList(that.curType, that.curPage);
                    done()// call done()执行完毕
                }, 1000)
            },
            // 在线支付前弹出密码框
            payPop: function (item) {
                this.curItem = item;
                this.$refs.prompt.open();
            },
            // 在线支付
            payOrder: function () {
                var url = apiList.data.RepayOrder;
                this.$http.post(url, {
                    danid: this.curItem.danid,
                    paypass: this.$refs.prompt.mutableInput,   // prompt子组件下的值
                }).then(function (data) {
                    var oData = data.body;
                    var oResult = oData.Result;
                    var that = this;

                    if (oResult != 8) { // 不在触发微信支付下弹出,防止阻碍微信
                        this.popMsg.isShowMsg = true;
                        this.popMsg.errorMsg = oData.Message;
                    }

                    setTimeout(function () {
                        that.popMsg.isShowMsg = false;
                        if (oResult == -1) {  // -1未授权登录
                            that.$router.push({ path: '/login' }); 
                            return false;
                        }
                        if (oResult == 1) {   // 购买成功调回订单列表，type=0为全部订单
                            that.$router.push("/orderList?type=0");
                            return false;
                        }
                    }, 1e3)
                    if (oResult == 8) {   // 购买不足积分，唤起微信支付
                        var oParame = oData.Data,
                            appid = oParame.appId,
                            timeStamp = oParame.timeStamp,
                            nonceStr = oParame.nonceStr,
                            prepayId = oParame.package,
                            paySign = oParame.paySign,
                            signtype = oParame.signType;
                        // 微信支付
                        /* global WeixinJSBridge */
                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest', {
                                "appId": appid,          // 公众号名称，由商户传入     
                                "timeStamp": timeStamp,         // 时间戳，自1970年以来的秒数     
                                "nonceStr": nonceStr,        // 随机串     
                                "package": prepayId,     
                                "signType": signtype,         // 微信签名方式:    
                                "paySign": paySign       // 微信签名 
                            }, function (res) {     
                                if (res.err_msg == "get_brand_wcpay_request:ok") { // 成功后返回全部订单列表
                                    that.$router.push("/orderList?type=0");
                                    return false; 
                                } 
                                if (res.err_msg == 'get_brand_wcpay_request:cancel') { // 取消后返回全部订单列表
                                    that.$router.push("/orderList?type=0");
                                    return false;
                                } 
                            }
                        ); 
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            formatUrl: function (item, order) {
                if (item.isgy == -1) {
                    return "";
                } else {
                    this.$router.push('/orderDetail?code=' + order.subdanid);
                }
            },
            // 是否为微信浏览器
            isWeChat: function () {
                var ua = window.navigator.userAgent.toLowerCase(); 
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    this.isWeChatBrowser = true;
                }
            },
        },
        filters: {
            formatMoney: function (value) {
                if (!value) { return "" };
                return parseFloat(value).toFixed(2);
            },
            
        }
    }

</script>
<style lang="less">
    .orderList-page{
        .con{
            margin-top:2.2rem;
        }
        .empty{
            padding-top:5rem;
            text-align: center; 
            .txt{
                font-size: 16px;
                margin-bottom: 5px;
                color: #666;
            }
            .subTxt{
                margin-bottom:20px;
                color:#999;
            }
            .btn{
                display: block;
                width:5.2rem;
                height:1.8rem;
                border: 1px solid #ec584e;
                border-radius: 3px;
                text-align: center;
                line-height: 1.8rem;
                margin: 0 auto;
                color: #ec584e;
                font-size: 12px;
                &:active{

                }
            }
        }
        .top-nav{
            position:fixed;
            top:0;
            width:100%;
            max-width: 640px;
            height:2.2rem;
            text-align: center;
            line-height: 2.2rem;
            z-index: 10;
            .on{
                border-bottom:2px solid #ec584e;
                font-weight: 600;
                a{
                    color:#ec584e;
                }
            }
        }
        .order-list{
            .mb3rem{
                margin-bottom:3rem;
            }
        }

        .goods-li{
            margin-bottom:10px;
            background-color: #fff;
            .item{
                padding-top:10px!important;
            }
            .img{
                margin-right:10px;
                margin-left:10px;
            }
            .item-title{
                font-size: 0.7rem;
                max-height: 2.0rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                color:#333;
            }
            .item-content{
                padding-top:0rem;
                position: relative;
                padding-right: .75rem;
                &:before{
                    top:-10px;
                }
                
            }
            .item-subtitle{
                margin-top:10px;
                font-size: 0.6rem;
                color:#666;
            }
            .price{
                min-width:2.0rem;
                margin-left: 0.25rem;
                font-size: 0.6rem;
                text-align: center;
                font-weight: 600;
                .basePrice{
                    color:#222;
                }
                .marketPrice{
                    color:#999;
                }
            }
            .li-bot{
                font-size: 0.7rem;
                height:1.5rem;
                line-height: 1.5rem;
                span{
                    float:right;
                    margin-right: 0.5rem;
                }
            }
            .delete-btn{
                display:block;
                float:right;
                width:3.75rem;
                height: 1.2rem;
                margin-top:10px;
                margin-right:20px;
                line-height: 1.2rem;
                text-align: center;
                border: 1px solid #999;
                border-radius: 0.15rem;
                font-size: 0.7rem;
            }
            .mb10{
                margin-bottom: 10px;
            }
        }
        .state-li{
            padding:10px;
            background-color: #eae9ee;
        }

    }
</style>
