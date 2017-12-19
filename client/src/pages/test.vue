<template>
    <div class="wrap" id="goodsData">
        <ul class="goods-items">
            <li v-for="(goods, goodsIndex) in goodsData">
                <a :href="'http://www.fescomall.com/Business/Goods?tid='+ goods.id" target="_blank" class="goods-img">
                    <img :src="'http://www.fescomall.com' + goods.img">
                </a> 
                <h3 class="goods-name">
                    <a :href="'http://www.fescomall.com/Business/Goods?tid='+ goods.id" target="_blank" :title="goods.title">
                        {{goods.title}}
                    </a>
                </h3> 
                <p class="goods-price">
                    <span class="c58 mr10">{{goods.price | formatMoney("")}}</span>
                    <!-- <del class="c9">{{goods.marketPrice | formatMoney("")}}</del> -->
                </p>
            </li>
        </ul>
    </div>
</template>
<script>
    import { SimpleHeader } from '../components/header'
    import Content from '../components/content'
    import goodsData from "../data/Sheet2.js"
    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
        },
        data () {
            return {
                goodsData: []
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.goodsData = goodsData;
                console.log(goodsData)
            })
        },
        methods: {
            
        }
    }
</script>
<style lang="less">
    .wrap {
        width: 1200px;
        margin:0 auto;
    }
    .goods-items li {
        float: left;
        width: 265px;
        margin-right: 10px;
        margin-bottom: 30px;
        overflow: hidden;
        background-color: #fff;
    }

    .goods-items li:nth-child(4n) {
        margin-right: 0
    }

    .goods-items .goods-img {
        display: block;
        width:265px;
        height:265px;
        padding:20px;
        background-color: #fff;
        overflow: hidden;
    }

    .goods-items .goods-img img {
        -webkit-transition: 1s transform;
        -moz-transition: 1s transform;
        -o-transition: 1s transform;
        transition: 1s transform
    }

    .goods-items .goods-img img:hover {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1)
    }

    .goods-items .goods-name {
        height:45px;
        padding:0 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .goods-name a{
        font-size: 16px;
        color:#444;
    }
    .goods-items .goods-price {
        margin-bottom:10px;
        font-size: 18px;
        text-align: center;
        line-height: 30px;
        font-family: "Microsoft YaHei";
        color: #FF0036;
    }
    .goods-price span{
        color: #FF0036;
    }
</style>
