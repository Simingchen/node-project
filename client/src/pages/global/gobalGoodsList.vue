<template>
<div class="gobalGoodsList-page">
    <div class="flex-box topbar">
        <router-link class="cell icon icon-back" to="/gobal"></router-link>
        <h2 class="flex-item">商品列表</h2>
        <!-- <div :class="'search-bar ' + (focus ? 'focus' : '')" v-on:click="onClick">
            <form class="search-outer" action="" v-on:submit.prevent="">
                <div class="search-inner">
                    <i class="icon icon-search"></i>
                    <input type="search" class="search-input" maxlength="30" v-model="searchChar" blur="searchBlur()" @keyup.enter="getSearch()">
                    <a href="javascript:" class="icon icon-clear"  @click="searchClear()"></a>
                </div>
                <label for="search-input" class="search-text">
                    <i class="icon icon-search"></i>
                    <span>搜索</span>
                </label>
            </form>
            <a href="javascript:" class="search-cancel">取消</a>
        </div> -->
        <span class="home-menu cell" id="edit"> 
            <!-- <i class="iconfont icon-sort"></i> -->
            <i class="iconfont icon-caidan"></i>
        </span>
    </div>
    <div :class="'filter-bar' + (focus ? 'dpn' : '')">
        <div class="flex-box">
            <span class="item active" @click="integralToggle(isShowIntegral)">
                {{integralTxt}}
                <i class="iconfont icon-xialajiantouxiangshang fs12" v-if="isShowIntegral == false"></i>
                <i class="iconfont icon-xialajiantouxiangxia fs12" v-if="isShowIntegral == true"></i>
            </span>
            <!-- <span class="item ">综合</span> -->
            <!-- <span class="item">销量优先</span> -->
            <span class="item" v-on:click="showType(listType)">
                <i class="iconfont icon-pailiefangshi01" v-if="listType == 0"></i>
                <i class="iconfont icon-pailiefangshi02" v-if="listType == 1"></i>
            </span>
        </div>
        <ul class="integral-box" :class="{'showIntegral' : isShowIntegral}">
            <li class="li bor-bottom" :class="{'on': integralType == -1}" @click="intergralType(-1,'积分默认')">
                积分默认
                <span class="fr iconfont icon-gouxuan"></span>
            </li>
            <li class="li bor-bottom" :class="{'on': integralType == 1}" @click="intergralType(1,'积分：0~99')">
                积分：0~99
                <span class="fr iconfont icon-gouxuan"></span>
            </li>
            <li class="li bor-bottom" :class="{'on': integralType == 2}" @click="intergralType(2,'积分：100~299')">
                积分：100~299
                <span class="fr iconfont icon-gouxuan"></span>
            </li>
            <li class="li bor-bottom" :class="{'on': integralType == 3}" @click="intergralType(3,'积分：300~499')">
                积分：300~499
                <span class="fr iconfont icon-gouxuan"></span>
            </li>
            <li class="li bor-bottom" :class="{'on': integralType == 4}" @click="intergralType(4,'积分：500~799')">
                积分：500~799
                <span class="fr iconfont icon-gouxuan"></span>
            </li>
            <li class="li bor-bottom" :class="{'on': integralType == 5}" @click="intergralType(5,'积分：800~999')">
                积分：800~999
                <span class="fr iconfont icon-gouxuan"></span>
            </li>
            <li class="li bor-bottom" :class="{'on': integralType == 6}" @click="intergralType(6,'积分：1000+')">
                积分：1000+
                <span class="fr iconfont icon-gouxuan"></span> 
            </li>
        </ul>
    </div>
    <div class="page-content">
        <scroll id="scroll" :on-refresh="onRefresh" :on-infinite="onInfinite">
            <div class="bgee clearfix" :class="{ cardList: isCard ,goodsList:isList}">
                <router-link 
                class="goodsItem clearfix" 
                :to="'/gobal/goods?planid=' + item.Planid + '&tid='+ item.Id" 
                v-for="(item,index) in items" 
                :key="index" v-if="items.length">
                    <img class="img" v-lazy="'http://msyc-img.oss-cn-shenzhen.aliyuncs.com' + item.Img" width="124" height="124">
                    <div class="con">
                        <h3 class="tit">
                            {{item.Cname}}
                        </h3>
                        <div class="price-li">
                            <span class="price">
                                <i class="price-unit">积分:</i>
                                {{item.Price | formatMoney("")}}
                            </span>
                            <!-- <span class="market-price">{{item.Basisprice | formatMoney("")}}</span> -->
                        </div>
                    </div>
                </router-link>
                <div class="tac emptyList" v-if="!items.length">
                    <img src="../../assets/msg-null.png" @load="empty()">
                    <p>暂时没有符合的内容~</p>
                </div>
            </div>
        </scroll>
        <!-- 返回顶部 -->
        <span class="back-img" @click="backTop()"></span>
    </div>
    <popover class="menu-panel" trigger="#edit">
        <popover-item>
            <router-link class="rel bor-bottom" to="/">
                <i class="iconfont icon-31shouye"></i>
                商城首页
            </router-link>
        </popover-item>
        <popover-item>
            <router-link class="rel bor-bottom" to="/gobal">
                <i class="iconfont icon-icon1"></i>
                全球购
            </router-link>
        </popover-item>
        <popover-item>
            <router-link class="rel bor-bottom" to="/mine">
                <i class="iconfont icon-31wode"></i>
                个人中心
            </router-link>
        </popover-item>
    </popover>
</div>
</template>
<script>
    import { Header, SimpleHeader } from '../../components/header'
    import Scroll from '../../components/scroll'
    import Content from '../../components/content'
    import Searchbar from '../../components/searchbar'
    import {Popover, PopoverItem} from '../../components/popover'
    import apiList from "../../apiList.js"  // api列表
   
    export default {
        components: {
            'page-header': Header,
            SimpleHeader,
            'page-content': Content,
            Searchbar,
            Scroll,
            Popover,
            PopoverItem
        },
        data () {
            return {
                focus: false,             // 搜索框是否聚焦                
                isShowSearchCon: false,   // 是否显示搜索空白区
                isCard: false,            // 是否以卡片形式展示
                isList: true,            // 是否以卡片形式展示
                items: [],
                totalPages: 0,           // 所有页数
                curPage: 0,           // 当前页数
                listType: 0,             // 列表显示类型 0为卡片，1为列表
                integralTxt: "积分默认",         // 积分文字
                isShowIntegral: false,      // 是否显示积分下拉框
                integralType: -1,         // 积分类型 -1为默认
                searchChar: "",          // 搜索字符
                planid: "",          // planid
                colid: "",          // colid
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.initGoodsList();
                
                // 设置标题
                this.setTitle("商品列表");
            });
        },
        methods: {
            getGoodsList: function (planid, colid, pindex, jifen, searchar, pinpai, duoxuanpp) {     // 列表数据请求
                var url = apiList.data.GlobuyList;
                this.$http.post(url, {
                    planid: planid,
                    colid: colid,
                    pinpai: pinpai,
                    duoxuanpp: duoxuanpp,
                    searchar: searchar,
                    jifen: jifen,
                    pindex: pindex
                }).then(function (data) {
                    var oData = data.body;
                    // 用户为空下跳转登录
                    if (!oData.User) {
                        this.$router.push("/login");
                    }

                    // 如果页码为1，不进行列表叠加
                    if (pindex == 1) {
                        this.items = oData.Goodlist;
                    } else {
                        this.items = this.items.concat(oData.Goodlist);
                    }
                    this.totalPages = oData.Pcount;
                    this.curPage = oData.Pindex;

                    // 只有一页时隐藏加载条
                    var oLayer = this.$el.querySelector(".infinite-layer")
                    if (this.curPage >= this.totalPages && oLayer) {
                        setTimeout(function () {
                            oLayer.style.display = "none";
                        }, 100)
                    } else {
                        oLayer.style = "";
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 初始页面数据
            initGoodsList: function () {
                var oQuery = this.$route.query;
                this.searchChar = oQuery.searchar
                this.planid = 102;
                this.colid = oQuery.colid;
                // 如果是其他页面过来有搜索字眼执行搜索
                if (this.searchar) {
                    this.getGoodsList("", "", 1, -1, this.searchChar);
                    return false;
                }
                this.getGoodsList(this.planid, this.colid, 1, -1, this.searchChar);
            },
            // 返回顶部
            backTop: function () {
                this.$el.querySelector(".scroll").scrollTop = 0;
            },
            // 点击搜索框切换搜索页
            onClick: function (e) {
                const input = this.$el.querySelectorAll('.search-input')[0]
                if (e.target.className === 'search-cancel') {
                    this.focus = false;
                    this.isShowSearchCon = false;
                    input.blur()
                    return
                }
                this.focus = true
                input.focus();
                this.isShowSearchCon = true;
            },
            // 搜索框失去焦点
            searchBlur: function () {
            },
            // 搜索清除
            searchClear: function () {
                //  this.searchChar = '';
            },
            // 搜索
            getSearch: function () {
                if (this.searchChar) {
                    var that = this;
                    that.getGoodsList("", "", 1, this.integralType, this.searchChar);
                }
                
                const input = this.$el.querySelectorAll('.search-input')[0];
                this.focus = false;
                this.isShowSearchCon = false;
                input.blur();
                this.searchClear();
                return false;
            },
            // 下拉更新指定第一页,保持各种参数类型
            onRefresh: function (done) {
                var that = this;
                setTimeout(function () {
                    if (that.searchChar) {
                        that.getGoodsList("", "", 1, that.integralType, that.searchChar);
                    } else {
                        that.getGoodsList(that.planid, that.colid, 1, that.integralType, that.searchChar);
                    }
                    done()//  执行完毕
                }, 1000)
            },
            // 滚动加载
            onInfinite: function (done) {
                var that = this;
                // 滚动到最后一页隐藏加载条
                if (this.curPage >= this.totalPages) {
                    this.$el.querySelector(".infinite-layer").style.display = "none";
                    return false;
                }

                // 刷新加载
                setTimeout(function () {
                    that.curPage = that.curPage + 1;
                    that.getGoodsList(that.planid, that.colid, that.curPage, that.integralType, that.searchChar);
                    done()//  call done()执行完毕
                }, 1000)
            },
            // 改变显示类型
            showType: function (type) {
                if (type == 0) {
                    this.isCard = true;
                    this.isList = false;
                    this.listType = 1;
                }
                if (type == 1) {
                    this.isCard = false;
                    this.isList = true;
                    this.listType = 0;
                }
            },
            // 积分下拉切换
            integralToggle: function (bool) {
                this.isShowIntegral = !bool;
            },
            // 改变积分类型
            intergralType: function (type, txt) {
                this.getGoodsList(this.planid, this.colid, 1, type, this.searchChar);
                this.isShowIntegral = !this.isShowIntegral;
                this.integralTxt = txt;
                this.integralType = type;
            },
            // 加载为空的状态下
            empty: function () {
                this.$el.querySelector(".infinite-layer").style.display = "none";
                return false;
            },
        },
        filters: {
            formatMoney (value) {
                return value.toFixed(2);
            }
        },
    }
</script>
<style lang="less">
    @import '../../components/searchbar/searchbar.less';
    .gobalGoodsList-page{
        .topbar{
            position: fixed;
            top: 0;
            width: 100%;
            max-width: 640px;
            height:2.5rem;
            line-height: 2.5rem;
            text-align: center;
            background-color: #f7f7f7;
            z-index: 1000;
            border-bottom: 1px solid #ededed;
            .cell{
                display:block;
                width:2.5rem;
                height:2.5rem;
                color:#7a45e5;
                &:before{
                    font-size:1.0rem;
                }
            }
            .icon-sort{
                &:before{
                    font-size:1.4rem;
                }
            }
        }
        .page-content{
            top:4.4rem;
        }
        .header .icon-back{
            width:1.5rem;
            padding:10px 0;
            text-align: center;
            font-size: 0.8rem;
            color:#ec584e;
            line-height: 1.42rem;
        }
        .search-bar{
            z-index: 100;
            width: 100%;
            &.focus{
                padding-left:10px;
                .icon-back{
                    display:none;
                }
            }
            .search-text{
                height: 1.42rem;
                line-height: 1.42rem;
            }
        }
        .back-img{
            position:fixed;
            bottom:20%;
            right:20px;
            width:2rem;
            height:2rem;
            background-color: rgba(0,0,0,0.7);
            -webkit-border-radius: 50%;
            border-radius: 50%;
            background-image: url(../../assets/top.png);
            background-position: center center;
            background-repeat: no-repeat;
            background-size:55% 55%;
        }
        .search-con{
            background-color: #FFF;
            position: fixed;
            top: 2.2rem;
            bottom: 0;
            width:100%;
            max-width: 640px;
            padding: 0.5rem;
            margin:0 auto;
            z-index: 100;
        }
        .price-unit{
            font-size: 12px;
        }
        .bgee{
            background-color:#eee;
        }
        .filter-bar{
            position: fixed;
            width:100%;
            max-width:640px;
            margin:0 auto;
            top:2.5rem;
            line-height: 2rem;
            background-color: #f7f7f7;
            border-bottom: 1px solid #ddd;
            z-index: 3;
            .flex-box{
                height: 2rem;
            }
            .item{
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
                display: block;
                text-align: center;
                font-size: 15px;
                color: #999;
                &.active{
                    color: #DD2727;
                }
                .fs12{
                    font-size: 12px;
                }
            } 
        }
        .top{
            top:2.19rem;
            padding: 0;
        }
        .nav{
            position:fixed;
            max-width: 640px;
            margin:0 auto;
        }
       .goodsList .goodsItem{
            position:relative;
            display: block;
            margin-top:3px;
            background-color: #fff;
            border-bottom: 1px solid #eee;
            .tit{
                margin-top: 9px;
                margin-bottom:5px;
                font-size: 14px;
                line-height: 16px;
                color: #333;
            }
            .img{
                float:left;
                margin-right: 9px;
            }
            .con{
                padding-right: 9px;
                overflow:hidden;
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
       }
       .cardList .goodsItem{
            display: block;
            float:left;
            position: relative;
            margin-top: 3px;
            width:9.25rem;
            margin-right:0.25rem;
            background-color: #fff;
            overflow: hidden;
            &:nth-child(2n){
                margin-right:0;
            }
            img{
                width:100%;
                height:100%;
            }
            .tit{
                height: 32px;
                font-size: 14px;
                line-height: 16px;
                color: #333;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .con{
                height:70px;
                padding:9px;
            }
            .price-li{
                position:absolute;
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
        } 
        .search-cancel{
            color:#666;
        }
       .sb-content{
            background-color: #FFF;
            width: 100%;
            line-height: 1.1rem;
            .sh{
                float:left;
                display:block;
                margin-right: 0.1rem;
                height: 1.1rem;
                width: 0.8rem;
                vertical-align: middle;
                background: url(data:image/png;base64,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 tRAAAAAElFTkSuQmCC) center center no-repeat;
                background-size: contain;
            }
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
        .integral-box{
            position:relative;
            height:0;
            padding:0 10px;
            z-index: 100;
            background-color: #fff;
            overflow: hidden;
            &.showIntegral{
               height:auto; 
            }
            .li{
                position: relative;
                line-height: 40px;
                font-size: 15px;
                .iconfont{
                    display:none;
                }
                &.on{
                    color:#DD2727;
                    .iconfont{
                        display:block;
                    }
                }
            }
        }
        .emptyList{
            padding:1.5rem 0;
            background-color: #fff;
            img{
                width:6.0rem;
            }
        }
        .fixed{
            position: fixed;
            top: 0;
            width: 100%;
            max-width: 640px;
            height: 2.2rem;
            background-color: #EFEFF4;
            z-index: 1000;
        }
        .search-outer{
            height:1.6rem;
        }
        .featured-week{
            padding:3px 5px;
            margin-left:5px;
            color:#fff;
            border-radius: 3px;
            background-color: #f61d4a;
        }
    }
</style>
