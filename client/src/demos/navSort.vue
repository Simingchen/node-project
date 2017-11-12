<template>
<div class="navSort-page">
    <simple-header class="fixed" title="商品分类" :back-link="true"></simple-header>
    <page-content class="bgf">
        <div class="sort-box">
            <div class="sort-nav">
                <ul>
                    <li class="item bor-bottom" :class="{active:curIndex == 1}" @click="toggleNav(1)">一级测试</li>
                    <li class="item bor-bottom" :class="{active:curIndex == 2}" @click="toggleNav(2)">一级测试</li>
                    <li class="item bor-bottom">一级测试</li>
                    <li class="item bor-bottom">一级测试</li>
                    <li class="item bor-bottom">一级测试</li>
                </ul>
            </div>
            <div class="sort-li">
                <router-link class="item clearfix" to="/">
                    <img class="fl img" src="../assets/images/icon-list.png">
                    <div class="con ofh">
                        <h2>家居家纺&gt;</h2>
                        <div class="desc">
                            <span>被子/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                        </div>
                    </div>
                </router-link>
                <router-link class="item clearfix" to="/">
                    <img class="fl img" src="../assets/images/icon-list.png">
                    <div class="con ofh">
                        <h2>家居家纺&gt;</h2>
                        <div class="desc">
                            <span>被子/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                            <span>凉席/</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </page-content>
    <pageFooter></pageFooter>
</div>
</template>

<script>
    import Content from '../components/content'
    import { SimpleHeader } from '../components/header'
    import Footer from '../components/footer/pageFooter.vue'
    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
            'pageFooter': Footer,
        },
        data(){
            return{
                items:[],
                curIndex:1,
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                //设置标题
                this.setTitle("商品分类");
            })
        },
        methods:{
            //导航切换
            toggleNav:function(index){
                this.curIndex = index;
                console.log(this.curIndex)
            }
        }
    }
</script>
<style lang="less">
    .navSort-page{
        .sort-box{
            
        }
        .sort-nav{
            position:fixed;
            top:2.2rem;
            width:4.5rem;
            z-index: 100;
            .item{
                position:relative;
                text-align: center;
                line-height: 2.6rem;
                color:#222;
                border-right:1px solid #e6e6e6;
                &.active{
                    color:#e40601;
                    border-right-color:#fff;
                    border-left:2px solid #e40601;
                }
            }
        }
        .sort-li{
            margin-left:4.5rem;
            padding-left:0.25rem;
            .item{
                display:block;
                padding:5px 5px 5px 0;
                border-bottom: 1px dashed #e2e2e2;
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
        }
    }
</style>
