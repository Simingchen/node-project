<template>
<div class="my-page orderDetail-page">
    <!-- <simple-header class="fixed" title="订单详情" :back-link="true" backText="返回"></simple-header> -->
    <div>
        <div class="order-state">
            <!-- 订单状态：未支付 = 1000, 已收款 = 2000, 已同意发货 = 2500,已发货 = 3000,已收货 = 6000, 已取消 = -1 -->
            <div class="" v-if="items.Dan.Danstate == 1000">
                <p>未支付</p>
                <img src="../assets/img/state (1).png" alt="未支付">
            </div>
            <div class="" v-if="items.Dan.Danstate == 2000">
                <p>已收款</p>
                <img src="../assets/img/state (2).png" alt="已收款">
            </div>
            <div class="" v-if="items.Dan.Danstate == 2500">
                <p>已同意发货</p>
                <img src="../assets/img/state (2).png" alt="已同意发货">
            </div>
            <div class="" v-if="items.Dan.Danstate == 3000">
                <p>已发货</p>
                <img src="../assets/img/state (3).png" alt="已发货">
            </div>
            <div class="" v-if="items.Dan.Danstate == 6000">
                <p>已收货</p>
                <img src="../assets/img/state (4).png" alt="已收货">
            </div>
            <div class="" v-if="items.Dan.Danstate == -1">
                <p>已取消</p>
                <img src="../assets/img/state (1).png" alt="已取消">
            </div>
        </div>
        <router-link :to="'/logistics?id='+ items.Dan.Id" class="items-line bor-bottom dpb" >
            <p>物流信息</p>
            <span class="link-arrow icon icon-link"></span>
        </router-link>
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
        <div class="order-goods">
            <ul class="goods-li">
                <li class="item clearfix bgf"v-for="(order,index) in items.Tails">
                    <router-link :to="'/goods?planid=' + order.Planid + '&tid='+ order.Tid">
                        <img class="img fl" :src="'http://www.shihuamall.com/Thumbnail/BusGoodsList' + order.Thumbnail" width="90" height="90">
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
        <div class="items-line">
            补差支付方式：
            <span v-if="items.Dan.Paytype == 10" class="c9">支付宝</span>
            <span v-if="items.Dan.Paytype == 8" class="c9">银联</span>
            <span v-if="items.Dan.Paytype == 4" class="c9">微信</span>
            <span v-else="" class="c9">不用补差</span>
        </div>
        <div class="order-msg items-line">  
            <p class="">订单编号:{{items.Dan.Danno}}</p>  
            <p class="">创建时间:{{items.Dan.Dandate | formatDate("")}}</p>  
            <p class="">成交时间:{{items.Dan.Paydate | formatDate("")}}</p>  
        </div>
    </div>
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
                this.setTitle("订单详情");
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
                        this.$router.push("/login");
                        
                        return false;
                    }
                    
                },function(response){
                    console.info(response);
                })
            }
        },
        filters:{
            formatMoney:function(value){
                if(!value){return 0.00};
                return value.toFixed(2);
            },
            //日期过滤器
            formatDate:function(value){
                //转换需要的方法
                String.prototype.ToString = function (format) {
                    var dateTime = new Date(parseInt(this.substring(6, this.length - 2)));
                    format = format.replace("yyyy", dateTime.getFullYear());
                    format = format.replace("yy", dateTime.getFullYear().toString().substr(2));
                    format = format.replace("MM", dateTime.getMonth() + 1)
                    format = format.replace("dd", dateTime.getDate());
                    format = format.replace("hh", dateTime.getHours());
                    format = format.replace("mm", dateTime.getMinutes());
                    format = format.replace("ss", dateTime.getSeconds());
                    format = format.replace("ms", dateTime.getMilliseconds())
                    return format;
                };
                //调用
                return value.ToString("yyyy-MM-dd  hh:mm:ss");
            }
        }
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
        .mb10{
            margin-bottom: 10px;
        }
    }


    
</style>
