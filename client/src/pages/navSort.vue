<template>
<div class="navSort-page">
    <simple-header class="fixed" title="商品分类" :back-link="true"></simple-header>
    <div class="page-content bgf">
        <div class="sort-box clearfix">
            <nav class="sort-nav">
                <ul>
                    <li class="item bor-bottom" 
                    v-for="(floorItem,index) in items"
                    :class="{active: curIndex == index}" 
                    :data-index="index"
                    @click="toggleNav(index)" v-if="floorItem.ChildCol.length">
                        {{floorItem.FloorName}}
                    </li>
                </ul>
            </nav>
            <article class="sort-li">
                <div class="item clearfix" 
                    v-for="(floorItem,floorItemIndex) in items" 
                    :class="{show: curIndex == floorItemIndex}">
                    <div class="sort-box" v-for="menuItem in floorItem.ChildCol">
                        <h3 class="items-line" @click="slideToggle($event)" v-if="menuItem.childMenus.length">
                            {{menuItem.Cname}}
                            <span class="link-arrow icon icon-link"></span>
                        </h3>
                        <!-- 没有二级 -->
                        <router-link class="items-line dpb" :to="'/GoodsList?planid='+ floorItem.PlanId +'&colid='+ menuItem.Id" v-if="!menuItem.childMenus.length">
                            {{menuItem.Cname}}
                        </router-link>
                        <ul class="sort-item clearfix dpn">
                            <li v-for="(childMenu,childIndex) in menuItem.childMenus">
                                <router-link class="ellipsis" :to="'/GoodsList?planid='+ floorItem.PlanId +'&colid='+ childMenu.Id" :key="childIndex">
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
    import Content from '../components/content'
    import { SimpleHeader } from '../components/header'
    import Footer from '../components/footer/pageFooter.vue'
    import apiList from "../apiList.js"  // api列表

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
                this.setTitle("商品分类");
            })
        },
        methods: {
            getGoods: function () {
                if (window.localStorage.floorList) {
                    var navData = JSON.parse(window.localStorage.floorList);
                    this.items = navData.Data;
                }
                var url = apiList.data.FloorList;
                this.$http.post(url).then(function (data) {
                    var oData = data.body;
                    this.items = oData.Data;
                    window.localStorage.floorList = window.JSON.stringify(oData);
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
                var oParent = event.target.parentNode;
                var oChild = oParent.parentNode.children;
                
                if (oParent.className.indexOf("active") == -1) {
                    oParent.classList.add("active");
                } else {
                    oParent.classList.remove("active");
                }

                // 兄弟元素清除active
                for (var i = 0; i < oChild.length; i++) {
                    if (oChild[i] != oParent) {
                        oChild[i].classList.remove("active");
                    }
                }
            }
        }
    }
</script>
<style lang="less">
    .navSort-page{
        .page-content{
            bottom:2.8rem;
        }
        .sort-nav{
            position:relative;
            float:left;
            width:4.5rem;
            z-index: 100;
            background-color: #f7f6fb;
            .item{
                position:relative;
                text-align: center;
                line-height: 2.6rem;
                color:#222;
                border-right:1px solid #e6e6e6;
                &.active{
                    color: #e40601;
                    background-color: #fff;
                    border-right-color: #fff;
                    border-left: 2px solid #e40601;
                }
            }
        }
        .sort-li{
            float:left;
            width:13.8rem;
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
            .sort-box{
                &.active{
                    .link-arrow{
                        -webkit-transform:rotate(-90deg);
                        transform:rotate(-90deg);
                    }
                    .sort-item{
                        display:block;
                    }
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
                -webkit-transform:rotate(90deg);
                transform:rotate(90deg);
            }
            .sort-item{
                padding-left:0.5rem;
                background-color: #f5f5f5;
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
