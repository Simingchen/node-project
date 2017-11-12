<template>
<div class="page autumn-page">
    <!-- <simple-header class="fixed" title="我的中秋" :back-link="true"></simple-header> -->
    <div class="con">
        <img src="../../assets/autumn/3.jpg" alt="我的中秋">
        <div class="cardList clearfix">
            <router-link :to="'/goods?planid=' + goods.Planid + '&tid='+ goods.Id" v-for="(goods,index) in items" 
                class="goodsItem" :key="index">
                <img v-lazy="'http://www.fescomall.com' + goods.Img" alt="我的中秋">
                <h3 class="tit">{{goods.Cname}}</h3>
                <p class="desc c9">【查看详情】</p>
            </router-link>
            <div class="goodsItem last-item">
                <div class="box">
                    <p>情浓思乡月</p>
                    <p>特惠迎金秋</p>
                </div>
            </div>
        </div>
        <img class="bot-img" src="../../assets/autumn/2.png" alt="我的中秋">
    </div>
    <div class="footer-box">
        <div class="hr28"></div>
        <pageFooter></pageFooter>
    </div>
</div>
</template>
<script>
    import { SimpleHeader } from '../../components/header'
    import Footer from '../../components/footer/pageFooter.vue'
    import apiList from "../../apiList.js"  // api列表

    export default {
        components: {
            SimpleHeader,
            'pageFooter': Footer
        },
        data () {
            return {
                items: [],
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getList(); // 中秋
                // 设置标题
                this.setTitle("我的中秋");
            })
        },
        methods: {
            getList: function () {
                var url = apiList.data.Autumn;
                this.$http.post(url, {
                }).then(function (data) {
                    var oData = data.body;
                    this.items = oData.data;
                }, function (response) {
                    console.info(response);
                })
            },
        }
    }
</script>
<style lang="less">
    .autumn-page{
        background:#d5b561 url(../../assets/autumn/bg.png) center center repeat;
        .con{
           background:#d5b561 url(../../assets/autumn/bg.png) center center repeat; 
        }
        .cardList .goodsItem{
            display: block;
            float:left;
            position: relative;
            width:50%;
            padding:0.5rem;
            border-top: 0.25rem solid #d5b561;
            border-right:0.125rem solid #d5b561;
            background-color: #fff;
            text-align: center;
            &.last-item{
                color:#fff;
                font-size: 0.8rem;
                background:#e1a813 url(../../assets/autumn/1.png) center center no-repeat;
                background-size:8.0rem 5.75rem;
                padding:0;
                .box{
                    height:12rem;
                    padding-top:4.0rem;
                    border:0.5rem solid #f6d47b!important;
                }
            }
            &:nth-child(2n){
                border-left:0.125rem solid #d5b561;
                border-right:0;
            }
            img{
                width:100%;
                height:100%;
            }
            .tit{
                font-size: 1.0rem;
                line-height: 1.7rem;
                color: #111;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
        } 
        .bot-img{
            background:#d5b561 url(../../assets/autumn/bg.png) center center repeat;;
        }
    }
</style>
