<template>
<div class="page collection-page">
    <simple-header class="fixed" title="我的收藏" :back-link="true"></simple-header>
    <page-content>
        <div class="empty" v-if="!items.length">
            <p class="txt">当前的收藏夹为空~  T.T</p>
            <p class="subTxt">快去挑点商品吧</p>
            <router-link class="btn toActive" to="/goodsList">去逛逛</router-link>
        </div>
        <scroll :on-refresh="onRefresh" :on-infinite="onInfinite"  v-if="items.length">
            <div class="bgee clearfix goodsList">
                <div class="clearfix bgf mb10" v-for="(item,index) in items">
                    <router-link class="goodsItem" :to="'/goods?planid=' + item.Planid + '&tid='+ item.Tid" >
                        <img v-lazy="'http://www.shihuamall.com' + item.Img" width="124" height="124">
                        <div class="con">
                            <h3 class="tit">
                                {{item.Cname}}
                            </h3>
                            <div class="item-subtitle sku-box">
                                <p class="ellipsis">{{item.Ys1typename}}{{item.Ys1name}}</p>
                                <p class="ellipsis">{{item.Ys2typename}}{{item.Ys2name}}</p>
                                <div class="num fr">×<span class="num-txt">1</span></div>
                            </div>
                            <div class="price-li">
                                <span class="price">
                                    <i class="price-unit fs12">积分:</i>
                                    {{item.Jifen | formatMoney("")}}
                                </span>
                                <span class="market-price">{{item.Basisprice | formatMoney("")}}</span>
                            </div>
                        </div>
                    </router-link>
                    <span class="delete-btn" @click="deleteItem(item)">删除收藏</span>
                </div>
            </div>
        </scroll>
    </page-content>
    <actions ref="actions">
        <action-group>
            <action-button class="color-danger" @click.native="certainDelete">删除</action-button>
        </action-group>
    </actions>
    <!-- 弹窗错误信息 -->
    <div class="notify" v-if="popMsg.isShowMsg">
        <div class="txt">{{popMsg.errorMsg}}</div>
    </div>
</div>
</template>

<script>
    import Content from '../components/content'
    import { SimpleHeader } from '../components/header'
    import Scroll from '../components/scroll'
    import { Actions, ActionButton, ActionGroup } from '../components/actions'
    import { Button } from '../components/buttons'
    import apiList from "../apiList.js"  //api列表

    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
            Scroll,
            Actions,
            ActionButton,
            ActionGroup,
            'm-button': Button,
        },
        data(){
            return {
                items:[],
                totalPages:0,           //所有页数
                curPage:0,           //当前页数
                curItem:"",         //选定当前的项目
                popMsg:{
                    isShowMsg: false,     //是否显示弹窗错误信息
                    errorMsg:"",         //弹窗错误信息
                },
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                //初始化页面为1第一页
                this.getCollection(1);

                //设置标题
                this.setTitle("我的收藏");
            })
        },
        methods:{
            getCollection:function(index){
                var url = apiList.data.Regcang;
                var oQuery = this.$route.query;
                this.$http.post(url,{
                    pindex: index,
                }).then(function(data){
                    var oData = data.body;
                    if(oData.Result == 1){
                        //如果页码为1，不进行列表叠加
                        if(index == 1){
                            this.items = oData.Canglist;
                        }else{
                            this.items = this.items.concat(oData.Canglist);
                        }

                        this.totalPages = oData.Pcount;
                        this.curPage = oData.Pindex;

                        if(oData.Pcount == 1){
                            var that = this;
                            setTimeout(function(){
                                that.$el.querySelector(".infinite-layer").style.display = "none";
                            },100)
                        }
                    }else{
                        // this.$router.push("/login");
                        return false;
                    }
                    
                },function(response){
                    console.info(response);
                })
            },
            //下拉更新指定第一页
            onRefresh:function(done) {
                var that = this;
                setTimeout(function (){
                    that.getCollection(1);
                    done()// 执行完毕
                }, 1000)
            },
            //滚动加载
            onInfinite:function(done) {
                var that = this;
                
                //滚动到最后一页隐藏加载条
                if(this.curPage >= this.totalPages){
                    this.$el.querySelector(".infinite-layer").style.display = "none";
                    return false;
                }
                setTimeout(function () {
                    that.curPage = that.curPage+1;
                    that.getCollection(that.curPage);
                    done()// call done()执行完毕
                }, 1000)
            },
            //删除单项收藏
            deleteItem:function(item){
                this.curItem = item;
                this.$refs.actions.open();
            },
            //确定删除
            certainDelete:function(){
                this.$refs.actions.close();
                var url = apiList.data.DeleteRegCang;
                this.$http.post(url,{
                    id: this.curItem.Id,
                }).then(function(data){
                    var oData = data.body;
                    if(oData.Result == 0){
                        this.popMsg.isShowMsg = true;
                        this.popMsg.errorMsg= "删除成功";
                        //重新进入列表
                        this.getCollection(1);
                        var that = this;
                        setTimeout(function(){
                            that.popMsg.isShowMsg = false;
                        },1e3)
                    }
                },function(response){
                    console.info(response);
                })
            }
        },
        filters:{
            formatMoney:function(value){
                if(!value){return 0.00};
                return parseFloat(value).toFixed(2);
            },
        }
    }
</script>
<style lang="less">
    .collection-page{
        .goodsList .goodsItem{
            position:relative;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            background-color: #fff;
            border-bottom: 1px solid #eae9ee;
            .tit{
                height: 32px;
                margin-top: 9px;
                overflow: hidden;
                font-size: 14px;
                line-height: 16px;
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

       }
       .delete-btn {
            display: block;
            float: right;
            width: 3.75rem;
            height: 1.2rem;
            margin-top: 10px;
            margin-right: 20px;
            margin-bottom: 10px;
            line-height: 1.2rem;
            text-align: center;
            border: 1px solid #999;
            border-radius: 0.15rem;
            font-size: 0.7rem;
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
        .fixed{
            position: fixed;
            top: 0;
            width: 100%;
            max-width: 640px;
            height: 2.2rem;
        }
    }
</style>
