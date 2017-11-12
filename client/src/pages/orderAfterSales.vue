<template>
<div class="page afterSales-page bgf">
    <simple-header class="fixed" title="申请售后" :back-link="true"></simple-header>
    <page-content>
        <list>
            <div slot="title">选择申请售后的商品</div>
            <list-item :checkbox="true" v-for="(order,index) in items.Tails" :key="index">
                <input type="checkbox" name="name" :value="order.Id" v-model="orderIds">
                <div class="item-media">
                    <img class="img fl" :src="'/Thumbnail/BusGoodsList' + order.Thumbnail" width="90" height="90" v-if="order.Planid != 102">
                    <img class="img fl" :src="'http://msyc-img.oss-cn-shenzhen.aliyuncs.com' + order.Thumbnail" width="90" height="90" v-if="order.Planid == 102">
                </div>
                <div class="item-content">
                    <div class="item-title-row">
                        <div class="item-title">{{order.Hname}}</div>
                    </div>
                </div>
            </list-item>
        </list>
        <dl class="applyType p10">
            <dt class="tit">服务类型：</dt>
            <dd class="clearfix pl10">
                <span class="return-type" :class="{on: returnType == 0}" v-on:click="returnTypeToggle(0)">退款</span>
                <span class="return-type" :class="{on: returnType == 1}" v-on:click="returnTypeToggle(1)">退货</span>
                <span class="return-type" :class="{on: returnType == 2}" v-on:click="returnTypeToggle(2)">换货</span>
            </dd>
        </dl>
        <dl class="question-line p10">
            <dt class="tit">问题描述：</dt>
            <dd class="ofh">
                <textarea class="text" placeholder="请输入你的问题（10-300字）" maxlength="300" v-on:input="checkNum()" v-model="textVal"></textarea>
            </dd>
            <span class="showCount">{{strLength}}</span>
            <span class="errorMsg" v-if="errorMsg">{{errorMsg}}</span>
        </dl>
    </page-content>
    <div class="footer-box">
        <div class="hr28"></div>
        <div class="footer flex-box tac">
            <span class="sure flex-item" @click="certainBackGoods()">确定</span>
            <span class="cancle flex-item" @click="backPrevious()">取消</span>
        </div>
    </div>
    <!-- 弹窗错误信息 -->
    <div class="notify" v-if="popMsg.isShowMsg">
        <div class="txt">{{popMsg.errorMsg}}</div>
    </div>
</div>
</template>

<script>
    import Content from '../components/content'
    import { SimpleHeader } from '../components/header'
    import { List, ListItem } from '../components/list'
    import apiList from "../apiList.js"  // api列表

    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
            List,
            ListItem,
        },
        data () {
            return {
                items: [],
                popMsg: {
                    isShowMsg: false,     // 是否显示弹窗错误信息
                    errorMsg: "",         // 弹窗错误信息
                },
                orderIds: [],    // check选择的订单商品ID
                returnType: 0,   // 退换货类型
                textVal: "",     // 退换货问题描述
                strLength: 300,   // 问题描述字符长度
                curTid: "",          // 退换货当前tid
                errorMsg: ""       // 退换货报错信息
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getOrderDetail();
                // 设置标题
                this.setTitle("申请售后");
            })
        },
        methods: {
            getOrderDetail: function () {
                var url = apiList.data.MyOrderdetail;
                var oQuery = this.$route.query;
                this.$http.post(url, {
                    danid: oQuery.id,
                }).then(function (data) {
                    var oData = data.body;
                    if (oData.Result == 1) {
                        this.items = oData;
                    } else {
                        // this.$router.push("/login");
                        return false;
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 服务类型
            returnTypeToggle: function (type) {
                this.returnType = type;
            },
            // 检索输入框字数
            checkNum: function () {
                if (this.strLength) {
                    this.strLength = 300 - this.textVal.length;
                }
            },
            // 返回上一层
            backPrevious: function () {
                window.history.back();
            },
            // 确定退换货
            certainBackGoods: function () {
                if (!this.orderIds.length) {
                    this.verifyError("请选择需要售后的商品");
                    return false;
                }
                if (!this.textVal.length) {
                    this.verifyError("问题描述不能为空哦");
                    return false;
                }
                if (this.textVal.length < 10) {
                    this.verifyError("问题描述太少了哦");
                    return false;
                }
                var url = apiList.data.MyOrderdetail;
                this.$http.post(url, {
                    type: this.returnType,
                    question: this.textVal,
                    tid: this.orderIds,
                }).then(function (data) {
                    var oData = data.body;
                    if (oData.Status == 1) {
                        this.verifyError("已提交申请，请注意最近的信息反馈...");
                        this.$router.push("/orderList?type=0");
                    } else {
                        this.verifyError(oData.Message);
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 验证函数报错弹窗
            verifyError: function (msg) {
                var that = this;
                that.popMsg.isShowMsg = true;
                that.popMsg.errorMsg = msg;
                setTimeout(function () {
                    that.popMsg.isShowMsg = false;
                }, 1e3)
            },
        }
    }
</script>
<style lang="less">
    .afterSales-page{
        .return-type{
            float: left;
            width: 4.0rem;
            height: 1.5rem;
            margin-right: 10px;
            text-align: center;
            line-height: 1.5rem;
            border: 0.05rem solid #999;
            cursor: pointer;
            &.on{
                border: 0.1rem solid #ec584e;
                line-height: 1.4rem;
                background: url(http://www.shihuamall.com/images/gou.png) right bottom no-repeat;
            }
        }
        .tit{
            font-size: .8rem;
            color: #999;
            padding: .2rem .75rem;
        }
        .text{
            width:100%;
            padding:0.25rem;
            min-height: 5.0rem;
            border:1px solid #999;
            resize:none;
        }
        .question-line{
            position:relative;
            .showCount{
                position:absolute;
                right:1rem;
                bottom:1rem;
                font-family: Georgia,Tahoma,Arial;
            }
            .errorMsg{
                position:absolute;
                left:70px;
                bottom:-30px;
                color:#ec584e;
            }
        }
        .pl10{
            padding-left: 0.5rem;
        }
        .footer-box{
            line-height: 2.8rem;
            .sure{
                color:#fff;
                background-color:#ec584e;
            }
            .cancle{
                color:#fff;
                background-color:#999;
            }
        }
    }
</style>
