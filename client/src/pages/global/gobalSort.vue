<template>
<div class="gobalSort-page">
    <simple-header class="fixed" title="全球购分类" :back-link="true"></simple-header>
    <div class="page-content bgf">
        <div class="sort-box clearfix">
            <nav class="sort-nav">
                <ul>
                    <li class="item bor-bottom" 
                    v-for="(floorItem,index) in items"
                    :class="{active: curIndex == index}" 
                    :data-index="index"
                    @click="toggleNav(index)">
                        {{floorItem.Cname}}
                    </li>
                    
                </ul>
            </nav>
            <article class="sort-li">
                <div class="item clearfix" 
                    v-for="(floorItem,floorItemIndex) in items" 
                    :class="{show: curIndex == floorItemIndex}">
                    <!-- <img class="fl img" v-lazy="'http:// www.shihuamall.com:8080'+ floorItem.FloorImg" width="36" height="36">
                    <div class="con ofh">
                        <h2>{{floorItem.Cname}}  &gt;</h2>
                        <div class="desc" v-if="false">
                            <span>被子/</span>
                            <span>凉席/</span>
                        </div>
                    </div> -->
                    <div class="sort-box" v-for="menuItem in floorItem.childMenus">
                        <h3 class="items-line rel" @click="slideToggle($event)" v-if="menuItem.childMenus.length">
                            {{menuItem.Cname}}
                            <span class="link-arrow icon icon-link"></span>
                        </h3>
                        <!-- 没有二级 -->
                        <router-link class="items-line rel dpb" :to="'/gobal/GoodsList?planid=102&colid='+ menuItem.Id" v-if="!menuItem.childMenus.length">
                            {{menuItem.Cname}}
                            <span class="link-arrow icon icon-link"></span>
                        </router-link>
                        <ul class="sort-item clearfix dpn">
                            <li v-for="(childMenu,childIndex) in menuItem.childMenus">
                                <router-link class="ellipsis" :to="'/gobal/GoodsList?planid=102&colid='+ childMenu.Id" :key="childIndex">
                                    {{childMenu.Cname}}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </article>
        </div>
    </div>
    <div class="footer-box">
        <div class="hr28"></div>
        <pageFooter></pageFooter>
    </div>
</div>
</template>

<script>
    import Content from '../../components/content'
    import { SimpleHeader } from '../../components/header'
    import Footer from '../../components/footer/pageFooter.vue'
    import apiList from "../../apiList.js"  // api列表

    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
            'pageFooter': Footer,
        },
        data () {
            return {
                items: [],
                curIndex: 0,
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getGoods();
                // 设置标题
                this.setTitle("全球购分类");
            })
        },
        methods: {
            getGoods: function () {
                if (window.localStorage.GlobuyIndex) {
                    var GlobuyIndex = window.JSON.parse(window.localStorage.GlobuyIndex);
                    this.items = GlobuyIndex.Data;
                }
                var url = apiList.data.GlobuyIndex;
                this.$http.post(url).then(function (data) {
                    var oData = data.body;
                    this.items = oData.Data;
                    window.localStorage.GlobuyIndex = window.JSON.stringify(oData);
                }, function (response) {
                    console.info(response);
                })
            },
            // 导航切换
            toggleNav: function (index) {
                this.curIndex = index;
            },
            // 子菜单下拉
            slideToggle: function (event) {
                var itemArr = document.querySelectorAll(".sort-item");
                for (var i = 0; i < itemArr.length; i++) {
                    itemArr[i].classList.add("dpn");
                }
                var oSibling = event.target.nextElementSibling;
                if (oSibling.className.indexOf("dpn") != -1) {
                    oSibling.className = "sort-item clearfix";
                } else {
                    oSibling.className = "sort-item clearfix dpn";
                }
            }
        }
    }
</script>
<style lang="less">
    .gobalSort-page{
        .page-content{
            bottom:2.8rem;
        }
        .sort-nav{
            position:relative;
            float:left;
            width:4.5rem;
            z-index: 100;
            background-color: #fff;
            .item{
                position:relative;
                text-align: center;
                line-height: 2.6rem;
                color:#222;
                border-right:1px solid #e6e6e6;
                &.active{
                    color:#fff;
                    background-color: #7a45e5;
                }
            }
        }
        .sort-li{
            float:left;
            width:14.25rem;
            padding-left:0.25rem;
            .item{
                display:block;
                height:3.5rem;
                padding:5px 5px 5px 0;
                display:none;
                &.show{
                    display:block;
                }
                .img{
                    width:3.0rem;
                    height:3.0rem;
                }
            }
            .con{
                padding-left:5px;
            }
            .desc{
                height:1.8rem;
                overflow: hidden;
                text-overflow:ellipsis;
                -webkit-line-clamp:2;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                font-size: 12px;
                color:#999;
            }
            .link-arrow{
                font-size: .7rem;
                position: absolute;
                right: .3rem;
                top: 50%;
                height: 1rem;
                width: .8rem;
                color: #c7c7c7;
                margin-top: -0.5rem;
            }
            .sort-item{
                padding-left:0.5rem;
                li{
                    float: left;
                }
                a{
                    display:block;
                    width: 5.7rem;
                    line-height: 1.7rem;
                    color: #666;
                }
            }
        }
    }
</style>
