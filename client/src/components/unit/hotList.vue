<template>
    <!-- 推荐列表 -->
    <div class="recommend-cardList clearfix">
        <h3 class="recommend">
            <span class="txt iconfont icon-hot">推荐列表</span>
        </h3>
        <router-link 
        class="goodsItem"
        :to="'/goods?tid='+ hotGoods.Id + '&imgUrl='+ hotGoods.Img +'&title='+ hotGoods.Cname + '&price='+ hotGoods.Price+ '&marketPrice='+ hotGoods.Basisprice"
        v-for="(hotGoods, index) in hotList" 
        :key="index">
            <img class="img" v-lazy="''+hotGoods.Img" width="124" height="124">
            <div class="con">
                <h3 class="tit">{{hotGoods.Cname}}</h3>
                <div class="price-li">
                    <span class="price">
                        <!-- <i class="price-unit">积分:</i> -->
                        {{hotGoods.Price | formatMoney("")}}
                    </span>
                    <!-- <span class="market-price">ASD</span> -->
                </div>
            </div>
        </router-link>
    </div>
</template>

<script>
    import { mapState } from "vuex"

    export default {
        computed: {
            // vuex下热卖列表
            ...mapState({
                hotList: state => state.hotList
            }),
        },
        created () {
            // 触发api
            this.$store.dispatch("getHotList");
        }
    }
</script>
<style lang="less">
    .recommend-cardList{
        margin-top:2rem;
        margin-bottom:3rem;
        .recommend{
            position: relative;
            margin-top: 0.3rem;
            height: 1.6rem;
            text-align: center;
            line-height: 1.6rem;
            background-color: #efeff4;
            &:after{ 
                position: absolute;
                content: "";
                display: block;
                border-bottom: 1px solid #F8C6C2;
                width: 100%;
                height: 1px;
                line-height: 1.2rem;
                top: 45%;
                z-index: 1;
            }
            .txt{
                position: relative;
                display: block;
                margin: 0 auto;
                width: 6rem;
                background: #efeff4;
                color: #ec584e;
                font-size: 0.8rem;
                z-index: 3;
                &:before{
                    margin-right:0.25rem;
                }
            }
        }
        .goodsItem{
            display: block;
            float:left;
            width:50%;
            border-top: 0.25rem solid #efeff4;
            border-right:0.125rem solid #efeff4;
            &:nth-child(2n+1){
                border-left:0.125rem solid #efeff4;
                border-right:0;
            }
            img{
                width:100%;
                height:100%;
            }
            .tit{
                margin-bottom:0.5rem;
                color: #000;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            .con{
                height:4rem;
                padding:0.25rem;
            }
            .price-li{
                position:absolute;
                .price{
                    font-size: 0.8rem;
                    line-height: 0.8rem;
                    font-weight: 700;
                    color: #DD2727;
                }
                .market-price{
                    font-size: 0.6rem;
                    line-height: 0.8rem;
                    color: #999;
                    text-decoration: line-through;
                }
            }
        } 
    }
</style>
