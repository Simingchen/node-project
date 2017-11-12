<template>
<div class="my-page logistics-page">
    <simple-header class="fixed" title="查看物流" :back-link="true"></simple-header>
    <div class="con">
        <div class="empty" v-if="!isEmpty">
            <p class="txt">当前物流为空为空~  T.T</p>
            <p class="subTxt">请耐心等待哦</p>
            <router-link class="btn toActive" to="/goodsList">去逛逛</router-link>
        </div>
        <div class="" v-if="isEmpty">
            <div class="items-line">
                <p>
                    <label for="">物流状态：</label>
                    <!-- 2在途中  3 签收 4问题件-->
                    <span class="green" v-if="items.Detail.State == 2">   
                        在途中
                    </span>
                    <span class="green" v-if="items.Detail.State == 3">   
                        已签收
                    </span>
                    <span class="green" v-if="items.Detail.State == 4">   
                        问题件
                    </span>
                </p>
                <p>
                    <label for="">承运来源：</label>
                    <span>{{items.Wuliuname}}</span>
                </p>
                <p>
                    <label for="">运单编号：</label>
                    <span>{{items.Danno}}</span>
                </p>
            </div>
            <div class="order-addr rel bor-bottom">
                <i class="iconfont icon-location_light fl"></i>
                <div class="ofh">
                    <div>
                        <span>收货人：{{items.Shouman}}</span>&nbsp;
                        <span>{{items.Mobile}}</span>
                    </div>
                    <p>{{items.ShouAddr}}</p>
                </div>
            </div>
            <ul class="items">
                <li class="rel bor-bottom" v-for="(item,index) in list">
                    <p>{{item.AcceptStation}}</p>
                    <p class="time">{{item.AcceptTime}}</p>
                </li>
                <li v-if="!list.length">
                    <p>{{items.Detail.Reason}}</p>
                </li>
            </ul>
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
                isEmpty: false,    // 是否空列表
                items: {},
                list: [],
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getMsg();
                
                // 设置标题
                this.setTitle("物流信息");
            })
        },
        methods: {
            getMsg: function () {
                var oQuery = this.$route.query;
                
                var url = apiList.data.Logistics;
                this.$http.post(url, {
                    orderid: oQuery.id
                }).then(function (data) { 
                    var oData = data.body;
                    if (oData.Result == 1) {      // 成功
                        this.isEmpty = true;
                        this.items = oData;
                        this.list = oData.Detail.Traces.reverse();
                        return false;
                    }
                    
                    if (data.body.Result == -1) {     // 未登录
                        this.$router.push({ path: '/login' })  
                        return false;
                    }
                }, function (response) {
                    console.info(response);
                })
            }
        }
    }
</script>
<style lang="less">
    .logistics-page{
        .empty{
            padding-top:3rem;
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
        .order-addr{
            padding:10px;
            background-color: #fff; 
            margin:10px 0;
            .iconfont{
                margin-top:10px;
                margin-right:10px;
            }
        }
        .items{
            padding:10px;
            background-color: #fff;
            li{
                padding:5px 0;
                &:first-child{
                    color:green;
                }
            }
            .time{
                font-size: 12px;
            }
        }
        .green{
            color:green;
        }
        .fixed{
            position: fixed;
            top:0;
            max-width:640px;
            width: 100%;
            z-index: 999;
        }
        .con{
            margin-top:2.2rem;
        }
    }
</style>
