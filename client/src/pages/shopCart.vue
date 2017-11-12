<template>
<div class="pageCon shopCart-page">
    <div class="empty" v-if="isLogin">
        <p class="txt">当前没有登录哦~  T.T</p>
        <p class="subTxt">快去登录吧</p>
        <router-link class="btn toActive" to="/login">去登录</router-link>
    </div>
    <div v-if="!isLogin">
        <div class="empty" v-if="!cartItems.length">
            <p class="txt">当前的购物车为空~  T.T</p>
            <p class="subTxt">快去挑点商品吧</p>
            <router-link class="btn toActive" to="/goodsList">去逛逛</router-link>
        </div>
        <div class="edit-bar" v-if="cartItems.length">
            <div class="fl" @click="selectAllDeleted(isAllSelectDeleted)" v-if="isEditStatus">
                <span class="form-checkbox" :class="{checked : allSelectDeleted}"></span>
                <span>全选</span>
            </div>
            <div class="fl" @click="allSelect(isAllSelect)" v-if="!isEditStatus">
                <span class="form-checkbox" :class="{checked : allSelectBtn}"></span>
                <span>全选</span>
            </div>
            <div class="edit-btn fr" @click="changeEditStatue()">{{editTxt}}</div>
        </div>
        <div class="page-content" v-if="cartItems.length">
            <div class="listCon">
                <scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
                <div class="item-cart bor-bottom bgf" v-for="(item,index) in cartItems">
                    <!-- 非编辑状态 -->
                    <div class="check-container" @click="selectProduct(item)" v-if="!isEditStatus">
                        <span class="form-checkbox" :class="{checked : item.checked}"></span>
                    </div>
                    <!-- 编辑状态 -->
                    <div class="check-container" @click="selectDeleted(item)" v-if="isEditStatus">
                        <span class="form-checkbox" :class="{checked : item.deleted}"></span>
                    </div>
                    <div class="name-card clearfix">
                        <router-link :to="'/goods?planid=' + item.Planid + '&tid='+ item.Tid" v-if="item.Planid != 102">
                            <img class="thumb" v-lazy="'/Thumbnail/BusGoodsList'+item.Thumbnail" v-if="item.Planid != 102">
                            <img class="thumb" v-lazy="'http://msyc-img.oss-cn-shenzhen.aliyuncs.com'+item.Thumbnail" v-if="item.Planid == 102">
                        </router-link>
                        <!-- 102全球购 -->
                        <router-link :to="'/gobal/goods?planid=' + item.Planid + '&tid='+ item.Tid" v-if="item.Planid == 102">
                            <img class="thumb" v-lazy="'/Thumbnail/BusGoodsList'+item.Thumbnail" v-if="item.Planid != 102">
                            <img class="thumb" v-lazy="'http://msyc-img.oss-cn-shenzhen.aliyuncs.com'+item.Thumbnail" v-if="item.Planid == 102">
                        </router-link>
                        <div class="detail">
                            <h3 class="title">
                                <router-link :to="'/goods?planid=' + item.Planid + '&tid='+ item.Tid" v-if="!isEditStatus && item.Planid != 102">
                                    {{item.Hname}}
                                </router-link>
                                <!-- 102全球购 -->
                                <router-link :to="'/gobal/goods?planid=' + item.Planid + '&tid='+ item.Tid" v-if="!isEditStatus && item.Planid == 102">
                                    {{item.Hname}}
                                </router-link>
                            </h3>
                            <p class="sku ellipsis">
                                {{item.Ys1typename}}{{item.Ys1name}}
                            </p>
                            <p class="sku ellipsis">
                                <span>{{item.Ys2typename}}</span>{{item.Ys2name}}
                            </p>
                            <div class="num">
                                ×<span class="num-txt">{{item.Nums}}</span>
                            </div>
                            <div class="price">
                                <i class="price-unit">积分:</i>
                                <span>{{item.Price | formatMoney("")}}</span>
                            </div>
                        </div>
                    </div>
                    <div class="mui-number" v-if="isEditStatus">
                        <span class="decrease" @click="changeQuantity(item,-1)"></span>
                        <input type="number" class="num" v-model="item.Nums">
                        <span class="increase" @click="changeQuantity(item,1)"></span>
                    </div>
                    <div class="delete-btn" v-if="isEditStatus" @click="singleItemDeleted(item)">
                        删除
                    </div>
                </div>
                </scroll>
            </div>
            <div class="subfooter" v-if="isEditStatus">
                <div class="item clearfix">
                    <div class="fl" @click="selectAllDeleted(isAllSelectDeleted)">
                        <span class="form-checkbox" :class="{checked : allSelectDeleted}"></span>
                        <span>全选</span>
                    </div>
                </div>
                <button class="bill-btn" :class="{on : hoverBtn2}" :disabled="!hoverBtn2" @click="allItemDeleted()">
                    <span>删除</span>
                </button>
            </div>
            <div class="subfooter" v-if="!isEditStatus">
                <div class="item clearfix">
                    <div class="fl" @click="allSelect(isAllSelect)">
                        <span class="form-checkbox" :class="{checked : allSelectBtn}"></span>
                        <span>全选</span>
                    </div>
                    <div class="fr totalMoney">
                        <p>
                            合计：<span class="c58">{{totalMoney | formatMoney("")}}</span>
                        </p>
                        <span>
                            不含运费
                        </span>
                    </div>
                </div>
                <button class="bill-btn" :class="{on : hoverBtn}" :disabled="!hoverBtn" @click="goPay()">
                    <span>结算</span>
                    <span v-show="hoverBtn">({{totalNum}})</span>
                </button>
            </div>
        </div>
        <confirm :title="'提示'" :content="'删除所选项吗？'" :on-ok="DeleteOk" ref="confirm" cancelText="取消" okText="确定"></confirm>
        <alert :title="'提示'" :content="tipsContent"  ref="alert"></alert>
    </div>
    <pageFooter></pageFooter>
</div>
</template>
<script>
    import Content from '../components/content'
    import Scroll from '../components/scroll'
    import { SimpleHeader } from '../components/header'
    import Footer from '../components/footer/pageFooter.vue'
    import { Confirm, Alert } from '../components/modal'
    import apiList from "../apiList.js"  // api列表

    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
            'pageFooter': Footer,
            Confirm,
            Alert,
            Scroll,
        },
        data () {
            return {
                isLogin: false,
                cartItems: [],           // 购物车列表数据
                allSelectBtn: false,     // 选定所有商品
                totalMoney: 0,           // 选定总金额
                totalNum: 0,             // 选定商品数量
                isAllSelect: true,      // 是否全选还是取消全选
                hoverBtn: false,         // 结算按钮变化由数量监听控制
                isEditStatus: false,     // 是否在编辑状态
                allSelectDeleted: false,  // 选定所有删除项(编辑模式)
                isAllSelectDeleted: true, // 是否全选还是取消全选(编辑模式)
                hoverBtn2: false,        // 结算按钮变化由数量监听控制(编辑模式)
                totalNum2: 0,            // 选定删除商品数量(编辑模式)
                editTxt: "编辑",         // 编辑文字
                curProduct: "",          // 删除单选当前的选中商品
                isMultProduct: 1,       // 是否选中并删除多个商品
                tipsContent: "",         // 弹窗提示内容
                totalPages: 0,           // 所有页数
                curPage: 0,              // 当前页数
                isEnoughPay: false,      // 是否足够积分支付
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                // 获取购物车数据
                this.getCartItem(1);

                // 设置标题
                this.setTitle("我的购物车");
            });
        },
        watch: {
            // 监听是否选定了所有项,全选变为全不选
            allSelectBtn: function (val, oldVal) {
                this.isAllSelect = !val;
            },
            // 监听金额是否大于0,大于0,结算按钮变化
            totalNum: function (val, oldVal) {
                this.hoverBtn = val > 0;
            },
            // 监听是否选定了所有项,全选变为全不选(编辑模式)
            allSelectDeleted: function (val, oldVal) {
                this.isAllSelectDeleted = !val;
            },
            // 监听数量是否大于0,大于0,结算按钮变化(编辑模式)
            totalNum2: function(val, oldVal) {
                this.hoverBtn2 = val > 0;
            },
        },
        methods: {
            // 获取列表数据
            getCartItem: function (index) {
                var url = apiList.data.ShoppingCard;
                this.$http.post(url, {
                    pindex: index
                }).then(function (data) {
                    // 用户为空下跳转登录
                    var oData = data.body;
                    if (oData.Result == 1) {
                        // 如果页码为1，不进行列表叠加
                        if (index == 1) {
                            this.cartItems = oData.Goodlist;
                        } else {
                            this.cartItems = this.cartItems.concat(oData.Goodlist);
                        }
                        this.totalPages = oData.Pcount;
                        this.curPage = oData.Pindex;

                        // 只有一页时隐藏加载条
                        if (this.curPage >= this.totalPages) {
                            var that = this;
                            setTimeout(function () {
                                that.$el.querySelector(".infinite-layer").style.display = "none";
                            }, 0)
                        }
                    } else {
                        this.isLogin = true;
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 选择商品
            selectProduct: function (item) {
                if (typeof item.checked == "undefined") {
                    this.$set(item, 'checked', true);
                } else {
                    item.checked = !item.checked;
                };
               
                // 全部选中则全选点亮，相反
                var checkAllFlags = true;
                this.cartItems.forEach(function (value, index) {
                    checkAllFlags = checkAllFlags && value.checked;
                });
                this.allSelectBtn = checkAllFlags;
               
                // 计算总金额
                this.calTotalMoney();
            },
            // 计算总金额
            calTotalMoney: function () {
                this.totalMoney = 0;
                this.totalNum = 0;
                this.cartItems.forEach((item, index) => {
                    if (item.checked) {
                        this.totalMoney += item.Price * item.Nums;
                        // 计算商品数量
                        this.totalNum += 1;
                    }
                })
            },
            // 点击全选 flag:true 选中全选 false 取消全选
            allSelect: function (flag) {
                this.allSelectBtn = flag;
                this.cartItems.forEach((item, index) => {
                    if (typeof item.checked == "undefined") {
                        this.$set(item, 'checked', flag);
                    } else {
                        item.checked = this.allSelectBtn;
                    };
                })
                // 计算总金额
                this.calTotalMoney();
            },
            // 更改状态为编辑或完成
            changeEditStatue: function () {
                this.isEditStatus = !this.isEditStatus;
                if (this.isEditStatus) {
                    this.editTxt = "完成";
                } else {
                    this.editTxt = "编辑";
                }
            },
            // 加减商品数量
            changeQuantity: function (item, type) {
                if (type > 0) {
                    item.Nums++;
                } else {
                    item.Nums > 1 ? item.Nums-- : item.Nums = 1;
                }
                
                var url = apiList.data.ShoppingCarChangeNum;
                this.$http.post(url, {
                    id: item.Id,
                    nums: type,
                }).then(function (data) {
                    if (data.body.Result == 1) {
                        // 计算总金额
                        this.calTotalMoney(); 
                    } else {
                        this.tipsContent = data.body.Message;
                        this.$refs.alert.open();
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 选择勾选删除商品
            selectDeleted: function (item) {
                if (typeof item.deleted == "undefined") {
                    this.$set(item, 'deleted', true);
                } else {
                    item.deleted = !item.deleted;
                };
                // 全部选中则全选点亮，相反
                var checkAllFlags = true;
                this.cartItems.forEach(function (value, index) {
                    checkAllFlags = checkAllFlags && value.deleted;
                });
                this.allSelectDeleted = checkAllFlags;
                // 计算删除的商品总数量
                this.calTotalDeleted()
            },
            // 选择勾选所有删除项
            selectAllDeleted: function (flag) {
                this.allSelectDeleted = flag;
                this.cartItems.forEach((item, index) => {
                    if (typeof item.deleted == "undefined") {
                        this.$set(item, 'deleted', flag);
                    } else {
                        item.deleted = this.allSelectDeleted;
                    };
                })
                // 计算删除的商品总数量
                this.calTotalDeleted()
            },
            // 计算删除的商品总数量
            calTotalDeleted: function () {
                this.totalNum2 = 0;
                this.cartItems.forEach((item, index) => {
                    if (item.deleted) {
                        // 计算删除商品数量
                        this.totalNum2 += 1;
                    }
                })
            },
            // 删除单项,也要计算非编辑下的总金额,防止删除后还有默认数据被选中
            singleItemDeleted: function (item) {
                this.curProduct = item;
                // 弹窗确定为单个删除选中
                this.isMultProduct = 0;
                this.$refs.confirm.open()
            },
            // 删除所有项
            allItemDeleted: function () {
                // 弹窗确定为单个删除选中
                this.isMultProduct = 1;
                this.$refs.confirm.open()
                //  this.cartItems.splice(0,this.cartItems.length);
            },
            // 确定删除商品
            DeleteOk: function (m) {
                // 删除多项商品
                var url;
                if (this.isMultProduct == 1) {
                    url = apiList.data.DeleteFromShoppingCar;
                    var code = "";
                    this.cartItems.forEach((item, index) => {
                        if (item.deleted) {
                            // 计算商品数量
                            code += item.Id + ",";
                        }
                    })
                    this.$http.post(url, {
                        id: code
                    }).then(function (data) {
                        if (data.body.Result == 1) {
                            var arr = code.split(",");
                            for (var j = 0; j < this.cartItems.length; j++) {
                                for (var i = 0; i < arr.length; i++) {
                                    if (this.cartItems[j] && this.cartItems[j].Id == arr[i]) {
                                        this.cartItems.splice(j, 1);
                                    }
                                }
                            }  
                            // 计算总金额
                            this.calTotalMoney(); 
                            
                            // 计算删除的商品总数量
                            this.calTotalDeleted();
                            // 计算删除后商品数量是否为空,空的时候换界面
                            this.isEmpty = this.cartItems.length <= 0;
                        } else {  // 失败
                            this.tipsContent = data.body.Message;
                            this.$refs.alert.open();
                        }
                    }, function (response) {
                        console.info(response);
                    })
                }

                // 删除单项商品
                if (this.isMultProduct == 0) {
                    url = apiList.data.DeleteFromShoppingCar;
                    this.$http.post(url, {
                        id: this.curProduct.Id
                    }).then(function (data) {
                        if (data.body.Result == 1) {
                            var index = this.cartItems.indexOf(this.curProduct);
                            this.cartItems.splice(index, 1);
                            // 计算总金额
                            this.calTotalMoney();  
                            // 计算删除的商品总数量
                            this.calTotalDeleted();
                            // 计算删除后商品数量是否为空,空的时候换界面
                            this.isEmpty = this.cartItems.length <= 0;
                        } else {  // 失败
                            this.tipsContent = "删除失败";
                            this.$refs.alert.open();
                        }
                    }, function (response) {
                        console.info(response);
                    })
                }
            },
            // 下拉更新指定第一页,保持积分类型
            onRefresh: function (done) {
                var that = this;
                setTimeout(function () {
                    that.getCartItem(1);
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
                    that.getCartItem(that.curPage);
                    done()//  call done()执行完毕
                }, 1000)
            },
            // 结算商品，判断是否是微信浏览器，获取用户账户积分,提前作判断购物额是否大于积分额，会在提交订单页唤起微信支付
            goPay: function () {
                var selectGoods = "";
                this.cartItems.forEach((item, index) => {
                    if (item.checked) {
                        selectGoods += item.Id + ",";
                    }
                })
                // type =1 为购物车结算到订单 0是立即购买到订单
                this.$router.push({ path: '/order?type=1&goods=' + selectGoods }); 
            },
            // 微信账号绑定
            getWeChat: function (path) {
                var ua = window.navigator.userAgent.toLowerCase(); 
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    var url = apiList.data.Authorize;
                    this.$http.post(url, {
                        url: path
                    }).then(function (data) { 
                        var oData = data.body;
                        if (oData) {      // 微信授权如果返回有数据连接再请求进行微信授权
                            window.location.href = oData;
                        }
                    }, function (response) {
                        console.info(response);
                    });
                }
                return false;
            },
        },
    }
</script>
<style lang="less">
    .shopCart-page{
        .page-content{
            margin-top:2.2rem;
        }
        .edit-bar{
            position:fixed;
            top:0;
            width:100%;
            height:2.2rem;
            padding:0 10px;
            margin-bottom: 10px;
            line-height: 2.2rem;
            background-color: #eee;
            z-index: 100;
            .form-checkbox{
                margin-top:0;
            }
        }
        .subfooter{
            position: fixed;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            max-width:640px;
            margin:0 auto;
            bottom: 2.8rem;
            width: 100%;
            height: 2.4rem;
            line-height: 2.4rem;
            z-index: 5;
            background-color: #f7f7f8;
            .item{
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
                padding:0 10px;
            }
            .bill-btn{
                width:4.5rem;
                height:2.4rem;
                text-align: center;
                border:0;
                color:#999;
                background-color: #ddd;
                &.on{
                    color:#fff;
                    background-color: #ec584e;
                }
            }
            .totalMoney{
                margin-top: 0.2rem;
                line-height: 1.0rem;
                text-align: right;
            }
            .form-checkbox{
                margin-top:0;
            }
        }
        .item-cart{
            position: relative;
            padding-top:10px;
            padding-left:0.5rem;
            padding-bottom:0.5rem;
            margin-top:0.25rem;
            .check-container {
                float: left;
                height: 3.0rem;
                margin-left: -0.5rem;
                padding: 1.0rem 0.5rem;
                width:2.0rem;
               
            }
            .name-card {
                position: relative;
                margin-left: 0;
                width: auto;
                padding: 0.25rem 0.5rem .25rem 0;
                overflow: hidden;
            }
            .thumb{
                float:left;
                width:4.5rem;
                height:4.5rem;
            }
            .detail{
                position: relative;
                margin-left: 4.9rem;
                p {
                    position: relative;
                    height: .8rem;
                    padding-right: 1.0rem;
                    margin: 0 0 0.1rem;
                    font-size: 0.6rem;
                    line-height: .8rem;
                    color: #666;
                }
                .num {
                    float:right;
                    color: #222;
                    font-size: 0.7rem;
                }
                .price{
                    color:#dd2727;
                    font-weight: 500;
                    font-size: 16px;
                }
                .price-unit{
                    font-size: 12px;
                }
            }
            .title{
                font-size: 0.7rem;
                height: 2.0rem;
                overflow: hidden;
                line-height: 1.0rem;
            }
            .delete-btn {
                position: absolute;
                right: 0rem;
                top: -1px;
                width: 3.048rem;
                height: 100%;
                color: #fff;
                background-color: #ff4343;
                font-size: 16px;
                z-index: 2;
                text-align: center;
                line-height: 5.0rem;
            }
        }
        
        .form-checkbox{
            border-radius: 100%;
            display: inline-block;
            margin: 0.85rem 0 0;
            vertical-align: middle;
            line-height: 3.0rem;
            width: 0.9rem;
            height: 0.9rem;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAVFBMVEUAAACampqioqKZmZmampqampqampqampqcnJyqqqqampqampqampqampqbm5v///+ZmZn5+fn09PTw8PDm5ubR0dHPz8/Jycm7u7uxsbGdnZ3d3d2KAK0RAAAAD3RSTlMAvRDz2cWQUTsDXdaioVxmAFd6AAAA6klEQVQ4y42UWRaEIAwEEfeVxn25/z2H6OhTB5jUdz9SBBJxRzZ1EIVhFNSNFHbSADeC1BLJYryIs1ckT0AsQ99p3fXDAiLJHzJUaZ20utDTSjXlLVMCmFv1oJ0BlFcqp3NG9cNIZ50VyWdTFjby+t7rPMd+1nHH2PgoB8Yr3nsIrK0r1K4AddVYT8rJZNzN9QFod0gDkKIAFuVhAQpRAYMvNAAVKfW+UE9SEdD5Qh0QiXD39pqHrBCrHE+8/t+CmtPMhvUsnAdmfRXOp2N9X84gsEaKM5ycMWcvDP7q4S8xQhbVsQ6r4iHzAbrdPVnePehPAAAAAElFTkSuQmCC);
            background-repeat: no-repeat;
            background-size: 0.9rem;
            &.checked{
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAS1BMVEUAAAAzhPszhPoyhPsyhPozg/s0hPwyhPw0hvs8h/9Aj/8yg/syg/ozhPsyg/r///+wz/2RvfxTl/pup/vT5P3U5f16r/u91/18sPvWF+94AAAADnRSTlMAvdnFopBcUTsREPPW8utY9+UAAADeSURBVDjLlZTrDoMgDIWpIoqX1svm9v5PumRGD7Aq7vtH8iWnFFoT4p2lousKss4bnZo4gGpFaUpOKJvUqVihipSWWIXawOn5hB4W8Smk16PX1fAl2x3La6n89pA1lpV36rOqJ5ElqN1rziwi7+PkjdOkp8gDJ2esHiYzjtaQHjZFDS2O+yxxGChMtzsiYxQGOjNAkhFhIQPixs1CWBBHHFkIA2QsR9YLYUELHMcWwoJmeo4shAGfPPCIMJT081XWlVPqm58u/31vD0J+pPLDeXPM8wsjv3r+XWL5dfgBB3w3WcIaGhAAAAAASUVORK5CYII=);
            }
        }
        .pageCon{
            height:100%;
            background-color: #fff;
        }
        .topfixed{
            position:fixed;
            width:100%;
        }
        .mui-number{
            position:absolute;
            top:0.25rem;
            right: 3.2rem;
            border: 1px solid #b3b3b3;
            -webkit-border-radius: 3px;
            border-radius: 3px;
            letter-spacing: 0;
            height: 1.5rem;
            line-height: 1.5rem;
            overflow: hidden;
            text-align: center;
            .decrease,.increase {
                position:relative;
                display: block;
                width: 2.0rem;
                height:1.5rem;
                font-size: 1.5rem;
                background-color: #fff;
                color: #5f646e;
                float: left;
                
            }
            .decrease {
                border-right: 1px solid #b3b3b3;
                &:before{
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                    content: '';
                    width: 8px;
                    height: 2px;
                    background-color: #6c6c6c;
                }
            }
            .increase {
                border-left: 1px solid #b3b3b3;
                &:before {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                    content: '';
                    width: 8px;
                    height: 2px;
                    background-color: #6c6c6c;
                }
                &:after {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    margin: auto;
                    content: '';
                    width: 2px;
                    height: 8px;
                    background-color: #6c6c6c;
                }
            }
            .num {
                height: 100%;
                width:2.0rem;
                height:1.5rem;
                padding: .125rem;
                border: none;
                float: left;
                text-align: center;
                font-weight: 700;
                color: #3d4245;
                font-size: 16px;
            }
        }
    }
</style>
