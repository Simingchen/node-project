<template>
<div class="page creditPay-page bgf">
    <simple-header class="fixed" title="信用卡还款" :back-link="true"></simple-header>
    <page-content>
        <ul class="card-li" v-for="(card,index) in items">
            <li class="items-line bor-bottom flex-box">
                <img src="../../assets/bank/bank (5).png" height="45">
                {{card.BankName}}
                <span class="card-num">{{card.BankNo | formatCard('')}}</span>
            </li>
        </ul>
        <div class="empty" v-if="!items.length">
            <p class="txt">您的信用卡为空~  T.T</p>
            <p class="subTxt">快去添加吧</p>
            <router-link class="btn toActive" to="/credit/creditNewCard">去添加</router-link>
        </div>
        <div class="flex-box tac" v-if="items.length">
            <router-link class="flex-item p10" to="/credit/creditRepay">
                <i class="iconfont icon-xinyongqiahuankuan"></i>
                <p>申请还款</p>
            </router-link>
            <router-link class="flex-item p10" to="/credit/creditRecordList">
                <i class="iconfont icon-quanbudingdan-01"></i>
                <p>还款记录</p>
            </router-link>
            <span class="flex-item p10" v-if="items.length > 0 && items.length <5">
                <i class="iconfont icon-quanbudingdan-01"></i>
                <p>添加信用卡</p>
            </span>
        </div>
    </page-content>

</div>
</template>
<script>
    import Content from '../../components/content'
    import { SimpleHeader } from '../../components/header'
    import apiList from "../../apiList.js"  // api列表

    var sdata = { 
        "Data": [{
            "Id": 14, 
            "Fesid": 4580,
            "Bankid": 9,
            "BankName": "中国工商银行",
            "BankType": "CC",
            "BankNo": "6222023803025874573",
            "Phone": "13926012343",
            "AccountName": "陈思明",
            "CreateDate": "/Date(1503995070000)/",
            "UpdateDate": "/Date(1503995070000)/",
            "IsAuthen": false,
            "IsDefault": false,
            "IsDel": false
        }],
        "TotalPages": 1,
        "PageIndex": 1,
        "JiFen": 0,
        "Rate": 10,
        "MinFee": 5
    }
    export default {
        components: {
            SimpleHeader,
            'page-content': Content
        },
        data () {
            return {
                items: [],
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getList();
                // 设置标题
                this.setTitle("信用卡还款");
            })
        },
        methods: {
            getList: function () {
                var url = apiList.data.MyOrderdetail;
                var oQuery = this.$route.query;
                this.$http.post(url, {
                    danid: oQuery.code,
                }).then(function (data) {
                    // var oData = data.body;
                    this.items = sdata.Data;
                    console.log(this.items)
                    // if(oData.Result == 1){
                    //     this.items = oData;
                    // }else{
                    //     this.$router.push("/login");
                        
                    //     return false;
                    // }
                }, function (response) {
                    console.info(response);
                })
            },
        },
        filters: {
            formatCard: function (value) {
                var newVal = value.slice(-4);
                return "**** **** ****" + newVal
            }
        }
    }
</script>
<style lang="less">
    .creditPay-page{
        .card-li{
            li{
                -webkit-align-items : center;
                align-items : center;
                line-height: 64px;
            }
        }
        .card-num{
            margin-left: 0.5rem;
            font-size: 1.0rem;
            letter-spacing: 0.05rem;
        }
    }
    .empty{
        padding-top:50px;
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
</style>
