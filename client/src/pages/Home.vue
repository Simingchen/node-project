<template>
    <div class="home-page page">
        <div class="fixed" @touchmove.stop.prevent>
            <div class="search-bar" :class="{ hoverbg: isHover }">
                <router-link class="sort" to="/navSort">
                    <i class="iconfont icon-sort"></i>
                </router-link>
                <a class="input" href="javascript:;" v-on:click="toggleSearch()">
                    搜索商品
                    <i class="iconfont icon-search"></i>
                </a>
                <a class="signin" href="https://admin.qidian.qq.com/template/blue/wpa/launch-mobile-qq.html?kfuin=2852061114&kfext=2852270580&visitorId=8679600128&visitorid=8679600128&fid=1&key=2c6693033018c081cc24d0a604ad7ff6&cate=1&type=2&ftype=1&pid=ckxq95.5bxqdx.j6mxh4k3&clickid=qcg4c6.bdrkcr.j6mxi5pu&tpForm=1&qid=5fonsq.64e2jv.j6mxh4k8&env=1&eptype=2&clickType=1&tptype=2&roleKey=roleQQ&roleValue=&roleUin=2852270581&roleData=2852270581&isKfuin=&cb=JSONP_CB_2&protocol=mqqwpa://im/chat?sigt=5CD3FAD9ED9A12B963FA07D21C30864EAE01DDA561AAC45BB5ADBF1CF6D3DED8B806A30AF433B8CC5EA5AFA7AB15609C356C55C7EA4F25954EE2AE835A1830F0AFE6DB9AD6592868928F5F74670D90AAE353CB84DB0654BD5D2DE8823492D13EA9642BD64C9C56E9F2B6187FAE672BB919533700A51BB91179B711428E2154B3&chat_type=crm&uin=2852270581&version=1&src_type=web&web_src=1&wpaType=2&assignId=2852270581&QidianSigT=5CD3FAD9ED9A12B963FA07D21C30864EAE01DDA561AAC45BB5ADBF1CF6D3DED8B806A30AF433B8CC5EA5AFA7AB15609C356C55C7EA4F25954EE2AE835A1830F0AFE6DB9AD6592868928F5F74670D90AAE353CB84DB0654BD5D2DE8823492D13EA9642BD64C9C56E9F2B6187FAE672BB919533700A51BB91179B711428E2154B3&QidianKfUin=2852061114&rkey=ed71bbc21063ae66a51836c913383c4c&shouldReturnToRoot=NO">
                    <span class="iconfont icon-message_light"></span>
                </a>
            </div>
            <div class="searchbox" v-if="isShowSearchBar" @touchmove.stop.prevent>
                <div class="sb-search">
                    <form class="form" action="" v-on:submit.prevent="">
                        <input type="search" placeholder="搜索" maxlength="30" v-model="searchTxt" @keyup.enter="searchChar()">
                        <!-- <input type="reset" class="j_PopSearchClear dpn" title="重置搜索词"> -->
                    </form>
                    <button class="close" v-on:click="toggleSearch()"></button>
                </div>
                <div class="sb-content">
                    <div class="tit">
                        <i class="iconfont icon-favor_fill_light"></i>
                        <span>热门搜索</span>
                    </div>
                    <p class="items-line">暂无热门搜索</p>
                    <!-- a href="javascript:;" class="tags">衬衫</a>
                    <a href="javascript:;" class="tags">衬衫</a>-->
                </div>
            </div>
        </div>
        <!-- 轮播 -->
        <swipe class="mint-swipe my-swipe">
            <swipe-item class="slide1" v-for="(banner,index) in swipeInfo" :key="index">
                <a :href="banner.link">
                    <img :src="''+ banner.img" width="100%" height="200">
                </a>
            </swipe-item>
        </swipe>
        <!-- 二级分类 -->
        <div class="sort-line tac">
            <div class="flex-box">
                <router-link class="flex-item" to="/goodsList?planid=103">
                    <img src="../assets/index/s1.jpg" width="36" height="36">
                    <p>每周精选</p>
                </router-link>
                <router-link class="flex-item" to="/gobal">
                    <img src="../assets/index/s2.jpg" width="36" height="36">
                    <p>全球扫货</p>
                </router-link>
                <!-- <a class="flex-item" href="javascript:;" @click="offlineTips($event)">
                    <img src="../assets/index/s3).jpg" width="36" height="36">
                    <p>限时秒杀</p>
                </a>
                <a class="flex-item" href="javascript:;" @click="offlineTips($event)">
                    <img src="../assets/index/s4).jpg" width="36" height="36">
                    <p>全民团购</p>
                </a> -->
                <router-link class="flex-item" to="/goodsList?planid=100&colid=3492">
                    <img src="../assets/index/s5.jpg" width="36" height="36">
                    <p>生鲜水果</p>
                </router-link>
                <router-link class="flex-item" to="/goodsList?planid=100&colid=3449">
                    <img src="../assets/index/s7.jpg" width="36" height="36">
                    <p>节日问候</p>
                </router-link>
            </div>
            <div class="flex-box">
                <router-link class="flex-item" to="/goodsList?planid=100&colid=3588">
                    <img src="../assets/index/s6.jpg" width="36" height="36">
                    <p>企业服务</p>
                </router-link>
                <router-link class="flex-item" to="/goodsList?planid=100&colid=3437">
                <img src="../assets/index/s8.jpg" width="36" height="36">
                    <p>健康体检</p>
                </router-link>
                <router-link class="flex-item" to="/goodsList?planid=100&colid=3436">
                <img src="../assets/index/s10.jpg" width="36" height="36">
                    <p>畅游世界</p>
                </router-link>
                <router-link class="flex-item" to="/navSort" >
                    <img src="../assets/index/s9.jpg" width="36" height="36">
                    <p>商城分类</p>
                </router-link>
            </div>
        </div>
        <!-- 全球扫货 -->
        <div class="globuy mt10">
            <img class="banner-img" src="../assets/index/b2.jpg">
            <ul class="glo-top-list clearfix bgf">
                <li class="list-item">
                    <img class="l-img" src="../assets/index/bb.png">
                </li> 
                <li class="list-item" v-for="(global,globalIndex) in computedTopGoods">
                    <router-link :to="'/gobal/goods?planid=102&tid='+ global.Id">
                        <img class="ico-img" src="../assets/index/1.png" v-if="globalIndex == 0">
                        <img class="ico-img" src="../assets/index/2.png" v-if="globalIndex == 1">
                        <img class="ico-img" src="../assets/index/3.png" v-if="globalIndex == 2">
                        <img class="ico-img" src="../assets/index/4.png" v-if="globalIndex == 3">
                        <img class="ico-img" src="../assets/index/5.png" v-if="globalIndex == 4">
                        <img class="ico-img" src="../assets/index/6.png" v-if="globalIndex == 5">
                        <img class="ico-img" src="../assets/index/7.png" v-if="globalIndex == 6">
                        <img class="img" v-lazy="'http://msyc-img.oss-cn-shenzhen.aliyuncs.com' + global.Img">
                        <p class="txt ellipsis">{{global.Cname}}</p>
                        <div class="clearfix">
                            <span class="c58">{{global.Price | formatMoney(isLogin)}}</span>
                            <span class="go"></span>
                        </div>
                    </router-link>
                </li>
            </ul>
            <img src="../assets/index/banner.png">
            <slide-wrapper class="glo-slide-box">
                <slide class="slide-items" v-for="(slide,slidIndex) in 7" :key="slidIndex">
                    <ul class="glo-bot-list">
                        <li class="list-item" v-for="(global,globalIndex) in computedGlobalGoods" v-if="globalIndex > slidIndex*5 && globalIndex < slidIndex*5+6">
                            <router-link :to="'/gobal/goods?planid=102&tid='+ global.Id">
                                <img class="img" v-lazy="'http://msyc-img.oss-cn-shenzhen.aliyuncs.com' + global.Img">
                                <h4 class="txt ellipsis">{{global.Cname}}</h4>
                                <p class="price">{{global.Price | formatMoney(isLogin)}}</p>
                            </router-link>
                        </li>
                    </ul>
                </slide>
            </slide-wrapper>
        </div>
        <div class="floor" v-for="(item,index) in items">
            <h2 class="index-tit">
                {{item.FloorName}}
            </h2>
            <router-link class="goodsItem" 
            :to="'/goods?planid=' + item.PlanId + '&tid='+ goods.Id" 
            v-for="(goods,index) in item.GoodsList" :key="index">
                <img v-lazy="'http://www.fescomall.com' + goods.Img" width="124" height="124" large="true">
                <div class="con">
                    <h3 class="tit">
                        {{goods.Cname}}
                    </h3>
                    <div class="price-li">
                        <span class="price">
                            <i class="price-unit">积分:</i>
                            {{goods.Price | formatMoney(isLogin)}}
                        </span>
                        <span class="market-price">{{goods.Basisprice | formatMoney('')}}</span>
                    </div>
                </div>
            </router-link>
        </div>

        <div class="index-con" v-if="false">
            <!-- 精选商品 -->
            <div class="banner mt10">
                <img class="banner-img" src="../assets/index/b1.jpg">
            </div>
            <div class="floor" v-for="(item,index) in items" v-if="index == 0">
                <ul class="goods-card clearfix">
                    <li v-for="(goods,index) in item.GoodsList" v-if="index < 4">
                        <router-link :to="'/goods?tid='+ goods.Id" class="card-item">
                            <img class="item-pic" v-lazy="'http://www.fescomall.com'+ goods.Img">
                            <div class="item-info">
                                <h4 class="item-desc">
                                    {{goods.Cname}}
                                </h4>
                                <span class="item-price">
                                    <i class="price-unit">积分:</i>
                                    <span class="fz16">{{goods.Price | formatMoney('')}}</span>
                                    <!-- <span class="ml-3">.0</span> -->
                                </span>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <!-- 限时秒杀 -->
            <div class="deadLine" v-if="false">
                <img class="banner-img" src="../assets/index/b3.jpg">
                <div class="deadLine-left clearfix">
                    <img src="../assets/images/icon-list.png">
                    <div class="time-box">
                        距离结束时间:
                        <span>09:20:12</span>
                    </div>
                    <div class="bot-con fl clearfix">
                        <div class="fl">
                            <span class="price">99</span>
                            <del class="market-price">149</del>
                        </div>
                        <span class="fr">立即请购</span>
                    </div>
                </div>
                <div class="deadLine-field">
                    <ul class="top-bar">
                        <li class="time-item">
                            <i class="iconfont"></i>
                            <span>14:00</span>
                        </li>
                        <li class="time-item">
                            <i class="iconfont"></i>
                            <span>16:00</span>
                        </li>
                        <li class="time-item">
                            <i class="iconfont"></i>
                            <span>21:00</span>
                        </li>
                    </ul>
                    <div class="field-con clearfix">
                        <div class="fl field-item">
                            <img src="../assets/images/icon-list.png">
                            <h4 class="tit">全新的价格等你来买</h4>
                            <p>
                                <span class="price">
                                    429
                                    <i>起</i>
                                </span>
                                <del class='c9'>469</del>
                            </p>
                            <span class="btn">立即抢购</span>
                        </div>
                        <div class="fr field-item">
                            <img src="../assets/images/icon-list.png">
                            <h4 class="tit">全新的价格等你来买</h4>
                            <p>
                                <span class="price">
                                    429
                                    <i>起</i>
                                </span>
                                <del class='c9'>469</del>
                            </p>
                            <span class="btn">立即抢购</span>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 生鲜水果 -->
            <div class="fresh-fruit">
                <img class="banner-img" src="../assets/index/b4.jpg">
                <div class="fruit-img-box clearfix">
                    <img class="fl img" src="../assets/index/f1.png">
                    <img class="fr img" src="../assets/index/f2.png">
                </div>
                <div class="fruit-sort clearfix">
                    <div class="left-con rel">
                        <span class="ico-tit">天天特惠</span>
                        <img src="../assets/images/icon-list.png">
                    </div>
                    <div class="right-con">
                        <div class="top rel">
                            <span class="ico-tit">优品生活</span>
                            <img src="../assets/images/icon-list.png">
                        </div>
                        <div class="bot rel">
                            <span class="ico-tit">优选精品</span> 
                            <img src="../assets/images/icon-list.png">
                        </div>
                    </div>
                </div>
                <img src="../assets/index/banner2.jpg">
                <ul class="fruit-li">
                    <li class="li-item flex-box items-line">
                        <img class="fl" src="../assets/images/icon-list.png" width="124" height="124">
                        <div class="desc ofh rel flex-item">
                            <h4 class="tit">跨越半个地球的香甜可口</h4>
                            <p class="c9">泰国产品，专业进口产品</p>
                            <div class="bot-li">
                                <span class="ico-price">特惠</span>
                                <span class="price">109.00/斤</span>
                            </div>
                        </div>
                    </li>
                    <li class="li-item flex-box items-line">
                        <img class="fl" src="../assets/images/icon-list.png" width="124" height="124">
                        <div class="desc ofh rel flex-item">
                            <h4 class="tit">跨越半个地球的香甜可口</h4>
                            <p class="c9">泰国产品，专业进口产品</p>
                            <div class="bot-li">
                                <span class="ico-price">特惠</span>
                                <span class="price">109.00/斤</span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="bottom-line">
            <span>到达底线啦~</span>
        </div>
        <a class="back-img" href="javascript:scrollTo(0,0);">
            <img src="../assets/img/backtop.png">
        </a>
        <div class="footer-box">
            <div class="hr28"></div>
            <pageFooter></pageFooter>
        </div>
    </div>
</template>
<script>
    import Page from '../components/page'
    import Content from '../components/content'
    import { SlideWrapper, Slide } from '../components/slide'
    import Footer from '../components/footer/pageFooter.vue'
    require('vue-swipe/dist/vue-swipe.css');
    import { Swipe, SwipeItem } from 'vue-swipe';
    import apiList from "../apiList.js"  // api列表

    export default {
        name: 'index',
        components: {
            Page,
            'page-content': Content,
            'pageFooter': Footer,
            swipe: Swipe,
            'swipe-item': SwipeItem,
            SlideWrapper,
            Slide,
        },
        data () {
            return {
                items: [],
                globalItems: [],    //  全球购
                isShowBackTop: false,  // 是否显示返回顶部
                isShowSearchBar: false,    // 控制搜索框显示隐藏
                isHover: true,   // 搜索条背景颜色变化
                searchTxt: null,
                swipeInfo: [],   // 轮播图
                isLogin: true,         // 是否登录
            }
        },
        mounted: function () {
            this.$nextTick(function () { 
                // 中秋礼包跳转
                if (window.sessionStorage.fid_num39 == 39) {
                    this.$router.push("/midAutumn");
                }
                // 轮播图
                this.getBanner();

                // 获取数据
                this.getGoods();

                // 全球购
                this.getGlobalGoods();

                // 滑动改变搜索框颜色，修改初始化找不到元素的错误
                var that = this;
                setTimeout(function () {
                    that.toggleTopBar();
                }, 100)

                // 设置标题
                this.setTitle("首页");
            });
        },
        computed: {
            // 全球购滑动商品top7后面
            computedGlobalGoods: function () {
                return this.globalItems.slice(6);
            },
            // 全球购top7
            computedTopGoods: function () {
                return this.globalItems.slice(0, 7);
            }
        },
        methods: {
            getGoods: function () {
                if (window.localStorage.floorList) {
                    var floorData = JSON.parse(window.localStorage.floorList);
                    this.items = floorData.Data;
                    this.isLogin = !floorData.IsLogin;  // 取反值
                }
                var url = apiList.data.FloorList;
                this.$http.post(url).then(function (data) {
                    var oData = data.body;
                    this.items = oData.Data;
                    this.isLogin = !oData.IsLogin;  // 取反值
                    window.localStorage.floorList = window.JSON.stringify(oData);
                }, function (response) {
                    console.info(response);
                });
            },
            // 获取全球购内容
            getGlobalGoods: function () {
                if (window.localStorage.indexGlobalGoods) {
                    var data = JSON.parse(window.localStorage.indexGlobalGoods);
                    this.globalItems = data.data;
                }
                var url = apiList.data.GloGds;
                this.$http.post(url).then(function (data) {
                    var oData = data.body;
                    this.globalItems = oData.data;
                    window.localStorage.indexGlobalGoods = window.JSON.stringify(oData);
                }, function (response) {
                    console.info(response);
                });
            },
            // 轮播图
            getBanner: function () {
                if (window.localStorage.indexBanner) {
                    var indexBanner = JSON.parse(window.localStorage.indexBanner);
                    this.swipeInfo = indexBanner;
                }
                var url = apiList.data.GetBanner;
                this.$http.post(url).then(function (data) {
                    var oData = data.body;
                    this.swipeInfo = oData.data;
                    window.localStorage.indexBanner = window.JSON.stringify(oData.data);
                }, function (response) {
                    console.info(response);
                })
            },
            // 搜索框交替
            toggleSearch: function () {
                this.isShowSearchBar = !this.isShowSearchBar;
            },
            // 搜索条背景颜色变化
            toggleTopBar: function () {
                var that = this;
                document.addEventListener("scroll", function () {
                    var top = document.body.scrollTop;
                    that.isHover = top > 56;
                    that.isShowBackTop = top > 56;
                })
            },
            // 搜索关键字
            searchChar: function (value) {
                if (this.searchTxt) {
                    this.$router.push("/goodsList?searchar=" + this.searchTxt);
                }
            },
        },
    }
</script>
<style lang="less">
    .home-page{
        .sort-line{
            padding:10px 0;
            background-color: #fff;
            img{
                margin: 0.25rem 0;
                border-radius: 0.25rem;
            }
            p{
                line-height: 1.2rem;
            }
        }
        .goodsItem{
            position:relative;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            margin-bottom:5px;
            background-color: #fff;
            .tit{
                margin-top: 0.25rem;
                overflow: hidden;
                font-size: 16px;
                line-height: 1.2;
                color: #333;
            }
            .con{
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
                margin-left: 9px;
                padding-right: 9px;
            }
            .price-li{
                position:absolute;
                bottom:10px;
                .price{
                    font-size: 16px;
                    line-height: 16px;
                    font-weight: 700;
                    color: #DD2727;
                }
                .market-price{
                    font-size: 12px;
                    line-height: 16px;
                    color: #999;
                    text-decoration: line-through;
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
        }
        .my-page{
            background-color: #f0f0f0;
        }
        .mint-swipe{
            img{
                height:10.0rem;
            }
        }
        .nav{
            padding-left:0!important;
            background-color:transparent!important;
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
        }
        .fixed{
            position: fixed;
            top:0;
            max-width:640px;
            width: 100%;
            z-index: 999;
        }
        .search-bar{
            width:100%;
            padding:10px 0;
            color:#fff;
            background-color: #ec584e;
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-transition: background-color .2s linear;
            -moz-transition: background-color .2s linear;
            -o-transition: background-color .2s linear;
            transition: background-color .2s linear;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            opacity:.9;
            &.hoverbg{
                background-color: rgba(0,0,0,.3)!important;
                background: -webkit-linear-gradient(top,rgba(0,0,0,.7),rgba(0,0,0,0))!important;
                background: linear-gradient(top,rgba(0,0,0,.7),rgba(0,0,0,0))!important;
                
            }
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
            .signin{
                display: block;
                height: 1.6rem;
                line-height: 1.6rem;
                margin-right: 10px;
                color: #fff;
            }
            .icon-search{
                position: absolute;
                top: 0;
                right: 10px;
                width: 20px;
                height: 30px;
            }
        }
        .searchbox{
            max-width:640px;
            width: 100%;
            margin:0 auto;
            position: fixed;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            z-index: 999999;
            background-color: #eee;
            .sb-search {
                position: relative;
                height: 44px;
                background-color: rgba(0,0,0,.85);
                -webkit-box-shadow: 0 2px 2px rgba(0,0,0,.1);
                box-shadow: 0 2px 2px rgba(0,0,0,.1);
            }
            .form {
                position: relative;
                margin-left: 37px;
                margin-right: 10px;
                padding: 5px 0 5px 6px;
                height: 100%;
            }
            input[type=search] {
                padding-left: 10px;
                float: left;
                width: 100%;
                background: transparent;
                vertical-align: middle;
                height: 100%;
                box-shadow: none;
                -webkit-appearance: none;
                border: 0;
                outline: 0;
                color: #333;
                font-size: 14px;
                background-color: #FFF;
                border-radius: 2px;
                -webkit-border-radius: 2px;
                -moz-border-radius: 2px;
                -ms-border-radius: 2px;
                &::-webkit-search-cancel-button {
                    display: none
                }
            }
        }
        .searchbox .sb-search .close {
            padding: 8px;
            color: #666;
            border: 0;
            background: 0 0;
            position: absolute;
            left: 0;
            top: 9px;
            width: 40px;
            height: 25px;
            background: url(data:image/png;base64,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) center center no-repeat;
            background-size: contain;
        }
        .sb-content{
            background-color: #FFF;
            position: absolute;
            top: 44px;
            bottom: 0;
            width: 100%;
            padding: .6em .6em 0;
            font-size: 14px;
        }
        .tags{
            float: left;
            border: solid 1px #999;
            margin-right: 10px;
            margin-top: 10px;
            padding: 1px 5px;
            border-radius: 2px;
            color: #999;
        }
        .bottom-line{
            position:relative;
            padding-bottom: 1.0rem;
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
        .icon-message_light{
            font-size: 1.2rem;
        }
        .banner-img{
            width:100%;
            height:2.8rem;
        }
        .globuy{
            .glo-top-list{
                .list-item{
                    position:relative;
                    float:left;
                    width:25%;
                    height:5.4rem;
                    text-align: center;
                    border-bottom: 1px dashed #ddd;
                    font-size: 0.6rem;
                    overflow:hidden;
                    .txt{
                        height:0.75rem;
                    }
                    .ico-img{
                        position:absolute;
                        top:0;
                        left:0;
                        width:1.7rem;
                        height:1.25rem;
                    }
                    .l-img{
                      height:5.4rem;  
                    }
                    .img{
                        width:3.7rem;
                        height:3.7rem;
                    }
                }
                .price{
                    color:#f78ac1;
                }
                .go{
                    display:inline-block;
                    width:1.25rem;
                    height:0.6rem;
                    border-radius: 0.6rem;
                    font-size: 0.5rem;
                    color:#fff;
                    background: url(../assets/index/go1.png) no-repeat;
                    background-size: cover; 
                }
            }
            .glo-bot-list{
                width:100%;
                .list-item{
                    float:left;
                    width:25%;
                    height:7.25rem;
                    padding-bottom:0.5rem;
                    font-size: 14px;
                    text-align: center;
                    img{
                        width:4.6rem;
                        height:4.6rem;
                    }
                    .txt{
                        height:1.1rem;
                        line-height: 1.1rem;
                    }
                }
                .price{
                    font-size: 0.7rem;
                    color:#d8364b;
                }
                .market-price{
                    font-size: 10px;
                    -webkit-text-size-adjust:none;
                }
            }
        }
        .slide-items{
            height:7.15rem;
            min-height: auto!important;
        }
        .glo-slide-box{
            height:7.15rem;
            background-color: #fff;
        }
        /*显示抢购*/
        .deadLine{
            .deadLine-left{
                width:7.5rem;
                height:8.6rem;
                border-right:1px solid #dedede;
                border-bottom:1px solid #dedede;
                border-left:1px solid #dedede;
                img{
                    width:7.5rem;
                    height:7.5rem;
                }
                .bot-con{
                    position:relative;
                    height:1.15rem;
                    background-color: red;
                    &:before{
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 0;
                        right: auto;
                        top: auto;
                        height: 1px;
                        width: 100%;
                        background-color: #e7e7e7;
                        display: block;
                        z-index: 1;
                        -webkit-transform-origin: 50% 100%;
                        -webkit-transform: scaleY(0.5);
                        transform-origin: 50% 100%;
                        transform: scaleY(0.5);
                    }
                }
                .price{
                    padding-left: 0.5rem;
                    color:#ff7f1a;
                    line-height:1.15rem;
                }
                .market-price{
                    display:inline-block;
                    color:#999;
                    -webkit-transform:scale(0.8);
                    transform:scale(0.8);
                }
                .time-box{
                    padding:0 3px;
                    line-height:1.15rem;
                    font-size: 0.6rem;
                    background-color: red;
                }
            }
        }
        /*生鲜水果*/
        .fresh-fruit{
            text-align: center;
            .ico-tit{
                position:absolute;
                top:0;
                left:0;
                width:3.5rem;
                height:1.25rem;
                line-height: 1.25rem;
                color:#fff;
                background-color: #ff3737;
                border-radius: 0 0 10px 0;
            }
            .fruit-img-box{
                margin-bottom: 0.5rem;
                .img{
                    width:9.25rem;
                    height:4.75rem;
                }
            }
            .left-con{
                float: left;
                width: 49.333%;
                height:11.25rem;
                margin-bottom: 3px;
                background-color: #fff;
            }
            .right-con{
                float: right;
                width: 49.333%;
                margin-bottom: 3px;
                .top{
                    height:5.5rem;
                    margin-bottom: 0.25rem;
                    background-color: #fff;
                }
                .bot{
                    height:5.5rem;
                    background-color: #fff;
                }
            }
            .ico-price{
                display:inline-block;
                width:1.9rem;
                height:0.85rem;
                border-radius: .85rem;
                text-align: center;
                line-height: .85rem;
                font-size: 0.6rem;
                color:#fff;
                background-color: #ff3533;
            }
            .fruit-li{
                .li-item{
                    margin-top: 5px;
                    text-align: left;
                }
                .desc{
                    padding-left: 10px;
                }
                .tit{
                    color:#46c401;
                    font-size: 0.8rem;
                }
                .bot-li{
                    position: absolute;
                    bottom: 10px;
                }
                .price{
                    color:#ff3533;
                }
            }
        }
    }

    .home-page .floor {
        position:relative;
        padding-top:1.3rem;
        &:before{
            position:absolute;
            content:"";
            width: 40%;
            left:50%;
            top:0;
            margin-top: 1.25rem;
            -webkit-transform:translate(-50%);
            transform:translate(-50%);
            border-top:1px solid red;
        }
        .index-tit{
            position: relative;
            top:-0.65rem;
            display: block;
            text-align: center;
            width: 100px;
            margin: 0 auto;
            line-height: 1.2rem;
            color:#FF8000;
            background-color: #f0f0f0;
            font-size: 16px;
        }
    }
</style>
