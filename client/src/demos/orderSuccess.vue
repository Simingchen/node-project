<template>
<div class="my-page orderSuccess">
    <simple-header class="fixed" title="下单成功" :back-link="true"></simple-header>
    <page-content>
        <div class="order-state">
            <p>交易成功</p>
            <img src="../assets/img/state (2).png" alt="已收款">
        </div>
        <div class="order-addr rel bor-bottom">
            <i class="iconfont icon-location_light fl"></i>
            <div class="ofh">
                <div>
                    <span>收货人:{{items.Dan.Shouman}}</span>
                    <span>{{items.Dan.Mobile}}  {{items.Dan.Tel}}</span>
                </div>
                <p>{{items.Dan.Prov}} {{items.Dan.Xian}} {{items.Dan.Town}} {{items.Dan.Addr}}</p>
            </div>
        </div>
        <div class="items-line bor-bottom mb10" v-if="items.Dan.Fapiaostate">
            <p>发票类型 {{items.Dan.Fapiaotype}}</p>
            <p>发票抬头 {{items.Dan.Fapiaotitle}}</p>
        </div>
        <div class="items-line bor-bottom mb10" v-if="!items.Dan.Fapiaostate">
            <p>发票类型 <span class="c9">暂无信息</span></p>
            <p>发票抬头 <span class="c9">暂无信息</span></p>
        </div>
        <div class="order-goods">
            <ul class="goods-li">
                <li class="item clearfix bgf"v-for="(order,index) in items.Tails">
                    <router-link :to="'/goods?planid=' + order.Planid + '&tid='+ order.Tid">
                        <img class="img fl" :src="'http://www.shihuamall.com' + order.Thumbnail" width="90" height="90">
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
                    <span>共<b>{{items.Tails.length}}</b>件商品</span>   
                </div>
                <div class="items-line bor-bottom clearfix">
                    <div class="clearfix">
                        <span class="fl">补差额</span> 
                        <span class="fr c58">{{items.Dan.Mnypay | formatMoney("")}}</span>
                    </div>
                    <div class="clearfix">
                        <span class="fl">实付款</span>
                        <span class="fr c58">{{realPay | formatMoney("")}}</span>
                    </div>
                    <div class="clearfix">
                        <span class="fl">支付总额</span> 
                        <span class="fr c58">{{totalPay | formatMoney("")}}</span>
                    </div>
                </div>
            </ul>
        </div>
    </page-content>
</div>
</template>

<script>
    import Content from '../components/content'
    import { SimpleHeader } from '../components/header'
    import apiList from "../apiList.js"  //api列表

    export default {
        components: {
            SimpleHeader,
            'page-content': Content
        },
        data(){
            return{
                items:[],
                orderState:"",          //订单状态
                realPay:"",         //实付款
                totalPay:"",         //总支付额
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                this.getOrderDetail();
                
                //设置标题
                this.setTitle("下单成功");
            })
        },
        methods:{
            getOrderDetail:function(){
                var url = apiList.data.MyOrderdetail;
                var oQuery = this.$route.query;
                this.$http.post(url,{
                    danid: oQuery.code,
                }).then(function(data){
                    var oData = data.body;
                    if(oData.Result == 1){
                        this.items = oData;
                        this.realPay = oData.Pays[0].Realfenpay;
                        this.totalPay = oData.Pays[0].Fenpay;
                    }else{
                        // this.$router.push("/login");
                        return false;
                    }
                    
                },function(response){
                    console.info(response);
                })
            }
        }
    }
</script>
<style lang="less">
    .orderSuccess{
        .order-state{
            position:relative;
            height: 4.25rem;
            padding-left:1.75rem;
            background: #f1a81a;
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
    }
    
</style>
