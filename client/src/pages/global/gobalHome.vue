<template>
    <div class="gobalHome-page">
        <router-link class="search-bar" :class="{ hoverbg: isHover }" to="/gobal/sort">
            <i class="iconfont icon-shaixuan"></i>
            <span class="txt">全球购分类</span>
        </router-link>
        <div class="index-con">
            <swipe class="mint-swipe my-swipe">
                <swipe-item class="slide1" v-for="(banner,index) in swipeInfo" :key="index">
                    <a :href="banner.link">
                        <img v-lazy="''+ banner.img" width="100%">
                    </a>
                </swipe-item>
            </swipe>
            <!-- 二级分类 -->
            <div class="sort-line">
                <ul class="flex-box">
                    <li class="flex-item" v-for="(floorItem,index) in items" v-if="index < 4">
                        <router-link class="item" :to="'/gobal/GoodsList?planid=102&colid='+ floorItem.Id">
                            <img class="img" src="http://img.51msyc.com/wx/nimages/menu01.png" v-if="floorItem.Id == '3465'">
                            <img class="img" src="http://img.51msyc.com/wx/nimages/menu02.png" v-if="floorItem.Id == '3467'">
                            <img class="img" src="http://img.51msyc.com/wx/nimages/menu03.png" v-if="floorItem.Id == '3468'">
                            <img class="img" src="http://img.51msyc.com/wx/nimages/menu04.png" v-if="floorItem.Id == '3458'">
                            <!-- <span class="txt">{{floorItem.Cname}}</span> -->
                        </router-link>
                    </li>
                </ul> 
                <!-- 分类大于4个时 -->
                <ul class="flex-box" v-if="items.length > 4">
                    <li class="flex-item" v-for="(floorItem,index) in items" v-if="index > 4">
                        <router-link class="item" :to="'/gobal/GoodsList?planid=102&colid='+ floorItem.Id">
                            <!-- <img class="img" v-lazy="floorItem.Img"> -->
                            <span class="txt">{{floorItem.Cname}}</span>
                        </router-link>
                    </li>
                </ul> 
            </div>
            <div class="floor" v-for="(item,index) in items">
                    <div :class="'index-tit-box img'+ item.Id">
                        <h2 class="tit">
                            <span class="txt">全球购</span> •
                            {{item.Cname}}
                        </h2>
                    </div>
                    <!-- <img class="img" src="../../assets/gobal/img3465.jpg" v-if="item.Id == '3465'">
                    <img class="img" src="../../assets/gobal/img3467.jpg" v-if="item.Id == '3467'">
                    <img class="img" src="../../assets/gobal/img3468.jpg" v-if="item.Id == '3468'">
                    <img class="img" src="../../assets/gobal/img3458.jpg" v-if="item.Id == '3458'"> -->
                <!-- <div class="index-tit">
                    <h2 class="box">
                        <span class="txt">{{item.Cname}}</span>
                    </h2>
                </div>-->
                 <router-link 
                    class="goodsItem" 
                    v-for="(goods,index) in item.GoodsList"
                    :key="index"
                    :to="'/gobal/goods?planid=' + goods.Planid + '&tid='+ goods.Id">
                    <img class="img" v-lazy="'http://msyc-img.oss-cn-shenzhen.aliyuncs.com' + goods.Img">
                    <div class="con">
                        <h3 class="tit">
                            {{goods.Cname}}
                        </h3>
                        <div class="price-li">
                            <span class="price">
                                <i class="price-unit">积分:</i>
                                {{goods.Price | formatMoney('')}}
                            </span>
                            <!-- <span class="market-price">{{goods.Basisprice | formatMoney('')}}</span> -->
                            <span class="origin">{{goods.Product}}</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <span class="back-img" @click="backTop()"></span>
        <div class="bottom-line">
            <span>到达底线啦~</span>
        </div>
        <div class="footer-box">
            <div class="hr28"></div>
            <pageFooter></pageFooter>
        </div>
    </div>
</template>
<script>
    import Content from '../../components/content'
    import { SlideWrapper, Slide } from '../../components/slide'
    import Footer from '../../components/footer/pageFooter.vue'
    require('vue-swipe/dist/vue-swipe.css');
    import { Swipe, SwipeItem } from 'vue-swipe';
    import apiList from "../../apiList.js"  // api列表

    export default {
        name: 'index',
        components: {
            'page-content': Content,
            'pageFooter': Footer,
            swipe: Swipe,
            'swipe-item': SwipeItem,
            SlideWrapper,
            Slide,
        },
        data () {
            return {
                isShowBackTop: false,  // 是否显示返回顶部
                isShow: false,    // 控制搜索框显示隐藏
                isHover: true,   // 搜索条背景颜色变化
                searchTxt: null,
                swipeInfo: [],   // 轮播图
                items: [],
                tipsContent: "",  // 未上线提示信息
            }
        },
        mounted: function () {
            this.$nextTick(function () { 
                // 获取数据
                this.getGoods();

                // 进入主页返回顶部
                this.backTop();

                // 滑动改变搜索框颜色，修改初始化找不到元素的错误
                var that = this;
                setTimeout(function () {
                    that.toggleTopBar();
                }, 100)

                // 设置标题
                this.setTitle("全球购");
            });
        },
        methods: {
            getGoods: function () {
                if (window.localStorage.GlobuyIndex) {
                    var GlobuyIndex = window.JSON.parse(window.localStorage.GlobuyIndex);
                    this.items = GlobuyIndex.Data;
                    this.swipeInfo = GlobuyIndex.Banner;
                }
                var url = apiList.data.GlobuyIndex;
                this.$http.post(url).then(function (data) {
                    var oData = data.body;
                    this.items = oData.Data;
                    this.swipeInfo = oData.Banner;
                    window.localStorage.GlobuyIndex = window.JSON.stringify(oData);
                }, function (response) {
                    console.info(response);
                })
            },
            onSlideChangeStart (currentPage) {
                //  console.log('onSlideChangeStart', currentPage);
            },
            onSlideChangeEnd (currentPage) {
                //  console.log('onSlideChangeEnd', currentPage);
            },
            // 搜索条背景颜色变化
            toggleTopBar: function () {
                var that = this;
                var routr = that.$router.fullPath;
                if (routr == "/home") {
                    document.addEventListener("scroll", function () {
                        var top = document.body.scrollTop;
                        that.isHover = top <= 56;
                        that.isShowBackTop = top <= 56;
                    })
                }
            },
            // 搜索关键字
            searchChar: function (value) {
                if (this.searchTxt) {
                    this.$router.push("/goodsList?searchar=" + this.searchTxt)
                }
            },
            // 返回顶部
            backTop: function () {
                document.body.scrollTop = 0;
            },
        },
        filters: {
            formatMoney: function (value, type) {
                return value.toFixed(2) + type;
            },
        },
    }
</script>
<style lang="less">
    .gobalHome-page{
        .sort-line{
            height:3.5rem;
            margin-top:0.5rem;
            text-align: center;
            .flex-item{
                height:2.75rem;
                padding:0 0.2rem;
            }
            .item{
                position:relative;
                display: block;
                width:4.2rem;
                height:2.75rem;
                border-radius: 3px;
                overflow: hidden;
            }
            .img{
                width:4.2rem;
                height:2.75rem; 
            }
            .txt{
                display:block;
                position: absolute;
                left:0;
                top:0;
                width:4.2rem;
                height:2.75rem;
                color:#fff;
                line-height: 2.75rem;
                background-color: rgba(0,0,0,.6);
            }
        }
        .goodsItem{
            display:block;
            position:relative;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            margin-bottom:5px;
            background-color: #fff;
            overflow:hidden;
            .tit{
                margin-top: 0.25rem;
                overflow: hidden;
                font-size: 16px;
                line-height: 1.2;
                color: #333;
            }
            .img{
                width:6.2rem;
                height:6.2rem;
            }
            .con{
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
                margin-left: 9px;
                padding-right: 9px;
                overflow: hidden;
            }
            .price-li{
                position:absolute;
                width:12.0rem;
                bottom:10px;
                line-height: 1.1rem;
                .price{
                    float:left;
                    font-size: 0.8rem;
                    font-weight: 700;
                    color: #DD2727;
                }
                .market-price{
                    font-size: 12px;
                    line-height: 16px;
                    color: #999;
                    text-decoration: line-through;
                }
                .origin{
                    float:right;
                    margin-right: 0.75rem;
                }
            }
            .price-unit{
                font-size: 12px;
            }
        }
        .back-img{
            position:fixed;
            bottom:20%;
            right:20px;
            width:2rem;
            height:2rem;
            background-color: rgba(0,0,0,0.5);
            -webkit-border-radius: 50%;
            border-radius: 50%;
            background-image: url(../../assets/top.png);
            background-position: center center;
            background-repeat: no-repeat;
            background-size:55% 55%;
        }
        .mint-swipe{
            img{
                height:10.0rem;
            }
            .is-active{
                background:#7a45e5!important;
            }
        }
        .goods-card{
            li{
                float:left;
                width:9.25rem;
                margin-right:0.25rem;
                margin-bottom: 3px;
                overflow: hidden;
                background-color: #fff;
                &:nth-child(2n){
                    margin-right:0;
                }
            }
            .item-pic{
                width:100%;
            
            }
            .item-info{
                display:block;
                padding: 5px 8px 8px;
            }
            .item-desc{
                display: block;
                height: 1.2rem;
                line-height: 1.2rem;
                font-size: 0.8rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow:ellipsis;
            }
            .item-price{
                color: #dd2727;
                font-size: 12px;
            }
            .fz16{
                font-size: 16px;
            }
            .ml-3{
                margin-left: -3px;
            }
        }
        .my-swipe {
            height: 10.0rem!important;
            color: #fff;
            font-size: 30px;
            text-align: center;
            .slide1 {
                  background-color: #0089dc;
                  color: #fff;
            }
            .mint-swipe-item{
                a{
                    position:relative;
                    display:block;
                    /*&:before{
                        position:absolute;
                        content:"";
                        display: block;
                        width:100%;
                        height:100%;
                        background: rgba(0,0,0,.3);
                    }*/
                }
            }
        }
        .search-bar{
            position:absolute;
            top:10px;
            left:50%;
            width:17.75rem;
            height:1.8rem;
            padding:0.4rem 0 0 6.25rem;
            color:#fff;
            border-radius: 1.0rem;
            background-color: rgba(0,0,0,0.3);
            z-index: 100;
            -webkit-transform:translate(-50%);
            transform:translate(-50%);
            .txt{
                margin-left:0.5rem;
            }
            /*&.hoverbg{
                background-color: rgba(0,0,0,.3)!important;
                background: -webkit-linear-gradient(top,rgba(0,0,0,.7),rgba(0,0,0,0))!important;
                background: linear-gradient(top,rgba(0,0,0,.7),rgba(0,0,0,0))!important;
                
            }*/
            .sort{
                display: block;
                height: 1.6rem;
                line-height: 1.6rem;
                margin-left: 10px;
                color:#fff;
                .icon-sort{
                    font-size: 1.3rem;
                }
            }
            .input{
                position: relative;
                display: block;
                height: 1.6rem;
                padding-left: 10px;
                margin: 0 10px;
                line-height: 1.6rem;
                background: #fff;
                opacity: .9;
                border-radius: 2px;
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
                color:#999;
            }
            .icon-search{
                position: absolute;
                top: 0;
                right: 10px;
                width: 20px;
                height: 30px;
            }
        }
        .bottom-line{
            position:relative;
            padding-bottom: 2.2rem;
            text-align: center;
            &:before{
                position:absolute;
                content:"";
                left:0;
                top:20px;
                width:100%;
                border-bottom:1px solid #ddd;
            }
            span{
                position: relative;
                display:block;
                width:5.0rem;
                margin:0 auto;   
                top:10px;
                color:#999;
                background-color: #eee;
            }
        }
        .banner-img{
            width:100%;
            height:2.8rem;
        }
        .index-tit-box{
            height:3.5rem;
            margin-top:0.75rem;
            background-repeat: no-repeat;
            background-position: center center; 
            background-size: 100%; 
            background-image: url(../../assets/gobal/default.jpg);
            &.img3465{
                background-image: url(../../assets/gobal/img3465.jpg);
            }
            &.img3467{
                background-image: url(../../assets/gobal/img3467.jpg);
            }
            &.img3468{
                background-image: url(../../assets/gobal/img3468.jpg);
            }
            &.img3458{
                background-image: url(../../assets/gobal/img3458.jpg);
            }
            .tit{
                height: 100%;
                color:#fff;
                font-size: 1.0rem;
                text-align: center;
                line-height: 3.5rem;
                background-color: rgba(0,0,0,.2);
            }
            .txt{
                color:#7a45e5;
                font-size: 1.1rem;
            }
        }
    }

    .gobalHome-page .index-tit {
        font-size: 14px;
        line-height: 28px;
        height: 28px;
        text-align: center;
    }
    .gobalHome-page .index-tit .box {
        width: 40%;
        height: 1px;
        background-color: #8a5ce6;
        margin: 20px auto;
    }
    .gobalHome-page .index-tit .box .txt {
        display: block;
        position: relative;
        top: -15px;
        width: 100px;
        color: #7a45e5;
        background-color: #f0f0f0;
        margin: 0 auto;
        font-size: 16px;
    }
</style>
