<template>
<div class="page recharge-page">
    <simple-header class="fixed" title="积分充值" :back-link="true"></simple-header>
    <page-content>
        <div class="">
            <h2 class="p10">固定积分<span class="fs12">(单位:积分)</span></h2>
            <ul class="flex-box tac ">
                <li class="flex-item" @click="chargeUp(10, 1)">
                    <h4>10.00</h4>
                    <p>售价:10.00元</p>
                </li>
                <li class="flex-item" @click="chargeUp(30, 1)">
                    <h4>30.00</h4>
                    <p>售价:30.00元</p>
                </li>
                <li class="flex-item" @click="chargeUp(50, 1)">
                    <h4>50.00</h4>
                    <p>售价:50.00元</p>
                </li>
            </ul>
            <ul class="flex-box tac">
                <li class="flex-item" @click="chargeUp(100, 1)">
                    <h4>100.00</h4>
                    <p>售价:100.00元</p>
                </li>
                <li class="flex-item" @click="chargeUp(200, 1)">
                    <h4>200.00</h4>
                    <p>售价:200.00元</p>
                </li>
                <li class="flex-item" @click="chargeUp(300, 1)">
                    <h4>300.00</h4>
                    <p>售价:300.00元</p>
                </li>
            </ul>
            <h2 class="p10">自定义积分<span class="fs12">(单位:积分)</span></h2>
            <input class="charge-input fl" type="text" pattern="[0-9]*" v-model="curNum" maxlength="5" placeholder="请输入充值额度">
            <input class="charge-btn fl" type="button" value="去充值" @click="chargeUp(curNum,2)">
        </div>
        <!-- 弹窗错误信息 -->
        <div class="notify" v-if="popMsg.isShowMsg">
            <div class="txt">{{popMsg.errorMsg}}</div>
        </div>
    </page-content>
</div>
</template>

<script>
    import Content from '../components/content'
    import { SimpleHeader } from '../components/header'
    import apiList from "../apiList.js"  // api列表

    export default {
        components: {
            SimpleHeader,
            'page-content': Content
        },
        data () {
            return {
                popMsg: {
                    isShowMsg: false,     // 是否显示弹窗错误信息
                    errorMsg: "",         // 弹窗错误信息
                },
                curNum: "",          // 当前自定义额度
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                // 微信授权
                this.getWeChat('/recharge');

                this.setTitle("积分充值");
            })
        },
        methods: {
            chargeUp: function (num, type) {
                var oBtn = document.querySelector(".charge-btn");
                if (type == 1) {
                    this.popMsg.isShowMsg = true;
                    this.popMsg.errorMsg = "触发微信支付中...";
                }
                if (type == 2) {  // type 2自定义积分
                    var reg = /^[1-9]\d*$/;
                    var that = this;
                    if (!reg.test(num) || !num) {
                        this.popMsg.isShowMsg = true;
                        this.curNum = "";
                        if (!reg.test(num)) {
                            this.popMsg.errorMsg = "您输入额度有误";
                        }
                        if (!num.trim()) {
                            this.popMsg.errorMsg = "请输入充值额度";
                        }
                        setTimeout(function() {
                            that.popMsg.isShowMsg = false;
                        }, 1e3)
                        return false;
                    }
                    // 按钮禁止
                    oBtn.setAttribute("disabled", true);
                    oBtn.value = "充值中...";
                }

                var url = apiList.data.Recharge;
                this.$http.post(url, {
                    amount: num
                }).then(function (data) { 
                    var oData = data.body;
                    var oResult = oData.Result;
                    if (oResult == 1) {   // 购买不足积分，唤起微信支付
                        // 关闭提示
                        this.popMsg.isShowMsg = false;

                        var oParame = oData.Message;
                        var appid = oParame.appId;
                        var timeStamp = oParame.timeStamp;
                        var nonceStr = oParame.nonceStr;
                        var prepayId = oParame.package;
                        var paySign = oParame.paySign;
                        var signtype = oParame.signType;
                        // 微信支付
                        /* global WeixinJSBridge */
                        WeixinJSBridge.invoke('getBrandWCPayRequest', {
                            "appId": appid,            // 公众号名称，由商户传入     
                            "timeStamp": timeStamp,         // 时间戳，自1970年以来的秒数     
                            "nonceStr": nonceStr,          // 随机串     
                            "package": prepayId,     
                            "signType": signtype,         // 微信签名方式:    
                            "paySign": paySign          // 微信签名 
                        }, function (res) {     
                            if (res.err_msg == "get_brand_wcpay_request:ok") { // 成功后返回
                                that.$router.push("/mine/userAcount");
                                return false; 
                            } 
                            if (res.err_msg == 'get_brand_wcpay_request:cancel') { // 取消后返回
                                that.$router.push("/recharge");
                                // 按钮还原
                                oBtn.removeAttribute("disabled");
                                oBtn.value = "去充值";
                                return false;
                            } 
                            if (res.err_msg == 'get_brand_wcpay_request:fail') { // 支付失败后返回
                                that.$router.push("/mine/userAcount");
                                return false;
                            } 
                        }); 
                    } else {
                        var that = this;
                        this.popMsg.isShowMsg = true;
                        this.popMsg.errorMsg = oData.Message;
                        setTimeout(function () {
                            that.popMsg.isShowMsg = false;
                            if (oResult == -1) {
                                that.$router.push("/login");
                            }
                        }, 1e3);
                    }

                    // 按钮还原
                    oBtn.removeAttribute("disabled");
                    oBtn.value = "去充值";
                }, function (response) {
                    console.info(response);
                });
            },
        }
    }
</script>
<style lang="less">
    .recharge-page{
        .flex-item{
            padding:3px 10px;
            margin:0.5rem;
            color:#1d88df;
            border-radius:5px;
            border:1px solid #1d88df;
            p{
                color:#79b4e4;
                font-size: 0.5rem;
            }
        }
        .fixed{
            position: fixed;
            top: 0;
            width: 100%;
            max-width: 640px;
            height: 2.2rem;
            background-color: #EFEFF4;
        }
        .charge-btn{
            display:block;
            padding:0 10px;
            margin-left:10px;
            border:0;
            color:#fff;
            text-align: center;
            line-height: 1.7rem;;
            background-color: #ec584e;
            border-radius:5px;
        }
        .charge-input{
            border:1px solid #ddd;
            border-radius: 5px;
            padding:0 10px;
            margin-left:10px;
            line-height: 1.7rem;
        }
    }
</style>
