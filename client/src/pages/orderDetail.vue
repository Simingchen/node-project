<template>
<div class="page orderDetail-page">
    <!-- <simple-header class="fixed" title="订单详情" :back-link="true" backText="返回"></simple-header> -->
    <div class="order-state">
        <!-- 订单状态：未支付 = 1000, 已收款 = 2000, 已同意发货 = 2500,已发货 = 3000,已收货 = 6000, 已取消 = -1 -->
        <div class="" v-if="items.Subdan.Danstate == 1000">
            <p>未支付</p>
            <img src="../assets/img/state1.png" alt="未支付">
        </div>
        <div class="" v-if="items.Subdan.Danstate == 2000">
            <p>已收款</p>
            <img src="../assets/img/state2.png" alt="已收款">
        </div>
        <div class="" v-if="items.Subdan.Danstate == 2500">
            <p>已同意发货</p>
            <img src="../assets/img/state2.png" alt="已同意发货">
        </div>
        <div class="" v-if="items.Subdan.Danstate == 3000">
            <p>已发货</p>
            <img src="../assets/img/state3.png" alt="已发货">
        </div>
        <div class="" v-if="items.Subdan.Danstate == 6000">
            <p>已收货</p>
            <img src="../assets/img/state4.png" alt="已收货">
        </div>
        <div class="" v-if="items.Subdan.Danstate == -1">
            <p>已取消</p>
            <img src="../assets/img/state1.png" alt="已取消">
        </div>
    </div>
    <router-link 
        :to="'/logistics?id='+ items.Subdan.Id" 
        v-if="items.Subdan.Danstate == 3000 || items.Subdan.Danstate == 6000"
        class="items-line bor-bottom dpb">
        <p>物流信息</p>
        <span class="link-arrow icon icon-link"></span>
    </router-link>
    <div class="order-addr rel bor-bottom">
        <i class="iconfont icon-location_light fl"></i>
        <div class="ofh">
            <div>
                <span>收货人:{{items.Subdan.Shouman}}</span>
                <span>{{items.Subdan.Mobile}}  {{items.Subdan.Tel}}</span>
            </div>
            <p>{{items.Subdan.Prov}} {{items.Subdan.Xian}} {{items.Subdan.Town}} {{items.Subdan.Addr}}</p>
        </div>
    </div>
    <div class="items-line bor-bottom mb10" v-if="items.Subdan.Fapiaostate">
        <p>发票类型 {{items.Subdan.Fapiaotype}}</p>
        <p>发票抬头 {{items.Subdan.Fapiaotitle}}</p>
    </div>
    <div class="order-goods">
        <ul class="goods-li">
            <li class="item clearfix bgf" v-for="(order,index) in items.Tail">
                <router-link :to="'/goods?planid=' + order.Planid + '&tid='+ order.Tid"  v-if="order.Planid != 102">
                    <img class="img fl" :src="'/Thumbnail/BusGoodsList' + order.Thumbnail" width="90" height="90" v-if="order.Planid != 102">
                    <img class="img fl" :src="'http://msyc-img.oss-cn-shenzhen.aliyuncs.com' + order.Thumbnail" width="90" height="90" v-if="order.Planid == 102">
                    <div class="item-content clearfix">
                        <div class="item-title-row flex-box">
                            <div class="item-title flex-item">
                                {{order.Hname}}
                            </div>
                            <div class="price">
                                <p class="basePrice">{{order.Price | formatMoney("")}}</p>
                            </div>
                        </div>
                        <div class="item-subtitle">
                            <p>{{order.Ys1typename}} {{order.Ys1name}}</p>
                            <p>{{order.Ys2typename}} {{order.Ys2name}}</p>
                            <div class="fr num">×<span class="num-txt">{{order.Nums}}</span></div>
                        </div>
                    </div>
                </router-link>
                <!-- 全球购 -->
                <router-link :to="'/gobal/goods?planid=' + order.Planid + '&tid='+ order.Tid" v-if="order.Planid == 102">
                    <img class="img fl" :src="'/Thumbnail/BusGoodsList' + order.Thumbnail" width="90" height="90" v-if="order.Planid != 102">
                    <img class="img fl" :src="'http://msyc-img.oss-cn-shenzhen.aliyuncs.com' + order.Thumbnail" width="90" height="90" v-if="order.Planid == 102">
                    <div class="item-content clearfix">
                        <div class="item-title-row flex-box">
                            <div class="item-title flex-item">
                                {{order.Hname}}
                            </div>
                            <div class="price">
                                <p class="basePrice">{{order.Price | formatMoney("")}}</p>
                            </div>
                        </div>
                        <div class="item-subtitle">
                            <p>{{order.Ys1typename}} {{order.Ys1name}}</p>
                            <p>{{order.Ys2typename}} {{order.Ys2name}}</p>
                            <div class="fr num">×<span class="num-txt">{{order.Nums}}</span></div>
                        </div>
                    </div>
                </router-link>
            </li>
            <div class="li-bot bor-bottom rel">
                <span>(含运费<b>0.00</b>)</span>
                <!-- <span>合计:<b>{{items.Pays.Fenpay | formatMoney("")}}</b></span>    -->
                <!-- <span>共<b>{{items.Tails.length}}</b>件商品</span>    -->
            </div>
            <div class="items-line bor-bottom clearfix">
                <div class="clearfix">
                    <span class="fl">商品总额</span>
                    <span class="fr c58" v-if="totalMoney">{{totalMoney | formatMoney("")}}</span>
                </div>
                <div class="clearfix" v-if="items.Subdan.Yunfei > 0">
                    <span class="fl">清关费用</span> 
                    <span class="fr c58">{{items.Subdan.Yunfei | formatMoney("")}}</span>
                </div>
                <div class="clearfix" v-if="items.Subdan.Mnypay > 0">
                    <span class="fl">补差额</span> 
                    <span class="fr c58">{{items.Subdan.Mnypay | formatMoney("")}}</span>
                </div>
                <div class="clearfix" v-if="realPay > 0">
                    <span class="fl">实付款</span>
                    <span class="fr c58" v-if="realPay">{{realPay | formatMoney("")}}</span>
                </div>
                <div class="clearfix">
                    <span class="fl">支付总额</span> 
                    <span class="fr c58" v-if="totalPay">{{totalPay | formatMoney("")}}</span>
                </div>
            </div>
        </ul>
    </div>
    <div class="items-line">
        补差支付方式：
        <span v-if="items.Subdan.Paytype == 10" class="c9">支付宝</span>
        <span v-if="items.Subdan.Paytype == 8" class="c9">银联</span>
        <span v-if="items.Subdan.Paytype == 4" class="c9">微信</span>
        <span v-if="items.Subdan.Paytype != 4 && items.Subdan.Paytype != 8 && items.Subdan.Paytype != 10" class="c9">未补差</span>
    </div>
    <div class="order-msg items-line">  
        <p>订单编号：{{items.Subdan.Danno}}</p>  
        <p v-if="items.Subdan.Dandate">创建时间：{{items.Subdan.Dandate | formatDate(true)}}</p>  
        <!-- 取消与未支付不显示 -->
        <p v-if="items.Subdan.Danstate != 1000 && items.Subdan.Danstate != -1 && items.Subdan.Paydate">成交时间：{{items.Subdan.Paydate | formatDate(true)}}</p>  
    </div>
    <div class="footer-box" v-if="false">
        <div class="hr28"></div>
        <div class="order-opetate-bar footer">
            <router-link class="btn" :to="'/orderAfterSales?id=' + $route.query.code">
                申请售后
            </router-link>
        </div>
    </div>
</div>
</template>
<script>
    import Content from '../components/content'
    import { SimpleHeader } from '../components/header'
    import apiList from "../apiList.js"  // api列表

    export default {
        components: {
            SimpleHeader,
            'page-content': Content
        },
        data () {
            return {
                items: {
                    Subdan: {
                        Danstate: 0
                    }
                },
                orderState: "",          // 订单状态
                realPay: "",         // 实付款
                totalPay: "",         // 总支付额
                totalMoney: "",        // 商品总额
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getOrderDetail();
                
                // 设置标题
                this.setTitle("订单详情");
            })
        },
        methods: {
            getOrderDetail: function () {
                var url = apiList.data.Orderdetail;
                var oQuery = this.$route.query;
                this.$http.post(url, {
                    orderid: oQuery.code,
                }).then(function (data) {
                    var oData = data.body;
                    if (oData.Result == 1) {
                        this.items = oData;
                        this.realPay = oData.Pays[0].Realfenpay;
                        this.totalPay = oData.Pays[0].Fenpay;
                        this.totalMoney = oData.Tail[0].Price * oData.Tail[0].Nums;
                    } else {
                        this.$router.push("/login");
                        return false;
                    }
                }, function (response) {
                    console.info(response);
                })
            },
        },
    }
</script>
<style lang="less">
    .orderDetail-page{
        .order-state{
            position:relative;
            height: 4.25rem;
            padding-left:1.75rem;
            background: #f1a81a;
            /*background-image: -webkit-linear-gradient(top,#dbc168,#e6dbb8);*/
            /*background-image: -moz-linear-gradient(top,#dbc168,#e6dbb8);*/
            /*background-image: linear-gradient(180deg,#dbc168,#e6dbb8);*/
            -webkit-box-align: center;
            -moz-box-align: center;
            -ms-box-align: center;
            -o-box-align: center;
            box-align: center;
            display: -webkit-box;
            display: -moz-box;
            display: -ms-box;
            display: -o-box;
            display: box;
            p{
                float:left;
                color:#fff;
                font-size: 16px;
            }
            img{
                position: absolute;
                top:0;
                right:1.75rem;
                height:4.0rem;
            }
        }
        .order-addr{
            padding:10px;
            background-color: #fff; 
            .iconfont{
                margin-top:10px;
                margin-right:10px;
            }
        }
        .order-goods{
            padding:10px 0;
            background-color: #fff;
        }
        .goods-li{
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
            .mb10{
                margin-bottom: 10px;
            }
        }
        .order-msg{
            margin:10px 0;
        }
        .link-arrow {
            font-size: .7rem;
            position: absolute;
            right: .3rem;
            top: 50%;
            height: 1rem;
            width: .8rem;
            color: #c7c7c7;
            margin-top: -0.5rem;
        }
        .order-opetate-bar{
            padding-top:.65rem;
            .btn{
                display: block;
                width:4.0rem;
                height:1.5rem;
                margin-left: 1.0rem;
                text-align: center;
                line-height: 1.5rem;
                border:1px solid #666;
                border-radius:3px;
            }
        }
    }
</style>
