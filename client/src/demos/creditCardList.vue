<template>
<div class="page creditPay-page bgf">
    <simple-header class="fixed" title="信用卡还款" :back-link="true"></simple-header>
    <page-content>
        <ul class="card-li">
            <li class="items-line bor-bottom flex-box">
                <img src="../assets/bank/bank (5).png" height="45">
                中国银行
            </li>
        </ul>
        <div class="empty" v-if="false">
            <p class="txt">您的信用卡为空~  T.T</p>
            <p class="subTxt">快去添加吧</p>
            <router-link class="btn toActive" to="/credit/creditNewCard">去添加</router-link>
        </div>
        <div class="flex-box tac">
            <router-link class="flex-item p10" to="/credit/creditRepay">
                <i class="iconfont icon-xinyongqiahuankuan"></i>
                <p>申请还款</p>
            </router-link>
            <router-link class="flex-item p10" to="/credit/creditRecordList">
                <i class="iconfont icon-quanbudingdan-01"></i>
                <p>还款记录</p>
            </router-link>
        </div>
    </page-content>

</div>
</template>
<script>
    import Content from '../components/content'
    import { SimpleHeader } from '../components/header'

    export default {
        components: {
            SimpleHeader,
            'page-content': Content
        },
        data(){
            return{

            }
        },
        mounted:function(){
            this.$nextTick(function(){
                //设置标题
                this.setTitle("信用卡还款");
            })
        },
        methods:{
            
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
