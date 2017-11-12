<template>
    <div class="page modifyPhone-page" ref="noMove">
        <simple-header title="手机号修改" :back-link="true"></simple-header>
        <form class="signup-form">
            <div class="input-row has_line">
                <label class="label" for="phone">手机号</label>
                <input type="text" placeholder="请输入手机号" id="phone" name="phone" v-model.trim="userPhone" pattern="[0-9]*">
                <span class="iconfont icon-delete"></span>
            </div>
            <div class="input-row rel">
                <label class="label" for="verifyCode">验证码</label>
                <input type="text" placeholder="请输入验证码" id="verifyCode" name="verifyCode" autocapitalize="off" v-model="verifyCode">
                <input id="verify-btn" type="button" value="获取短信验证码" v-on:click="getVerifyCode()">
            </div>
            <button type="button" class="signup_btn" id="signupUser" :disabled="isCheck" @click="savePhone()">保存</button>
        </form>
        <!-- 弹窗 -->
        <alert :title="errorTit" :content="errorMsg" ref="alert"></alert>
        <!-- 弹窗错误信息 -->
        <div class="notify" v-if="popMsg.isShowMsg">
            <div class="txt">{{popMsg.errorMsg}}</div>
        </div>
    </div>
</template>
<script>
    import { SimpleHeader } from '../components/header'
    import { Alert } from '../components/modal'
    import Popup from '../components/popup'
    import apiList from "../apiList.js"  // api列表

    export default {
        components: {
            SimpleHeader,
            Alert,
            Popup,
        },
        data () {
            return {
                isCheck: false,
                userPhone: "",       // 用户名手机号
                verifyCode: "",      // 短信验证码
                errorTit: "温馨提示",       // 报错弹窗标题
                errorMsg: "请输入账号！",       // 报错弹窗信息
                inputType: 1,      // 密码输入框类型
                popMsg: {
                    isShowMsg: false,     // 是否显示弹窗错误信息
                    errorMsg: "",         // 弹窗错误信息
                },
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                // 设置标题
                this.setTitle("手机号修改");
            });
        },
        methods: {
            savePhone: function () {
                if (!this.userPhone) {
                    this.errorMsg = "请输入手机号！"
                    this.$refs.alert.open();
                    return false;
                }
                var phoneReg = /^1\d{10}$/;
                if (!phoneReg.test(this.userPhone)) {
                    this.errorMsg = "手机号格式错误！"
                    this.$refs.alert.open();
                    return false;
                }
                if (!this.verifyCode) {
                    this.errorMsg = "请输入短信验证码！"
                    this.$refs.alert.open();
                    return false;
                }
                var verifyCodeReg = /\d+/;
                if (!verifyCodeReg.test(this.verifyCode)) {
                    this.errorMsg = "短信验证码为纯数字！"
                    this.$refs.alert.open();
                    return false;
                }

                // 禁止按钮
                this.isCheck = true;
                var oBtn = this.$el.querySelector(".signup_btn");
                oBtn.innerHTML = "保存中...";
                
                var url = apiList.data.EditUserPhone;
                this.$http.post(url, {
                    newphone: this.userPhone,
                    code: this.verifyCode                
                }).then(function (data) {
                    var oData = data.body;
                    if (oData.Result == 1) {
                        this.popMsg.isShowMsg = true;
                        this.popMsg.errorMsg = oData.Message;
                        var that = this;
                        setTimeout(function () {
                            that.$router.push("/mine/userInfo");
                        }, 1e3);
                    } else {
                        this.errorMsg = data.body.Message;
                        this.$refs.alert.open();
                    }

                    // 按钮还原
                    this.isCheck = false;
                    oBtn.innerHTML = "保存";
                }, function (data) {
                    console.info(data);
                });
            },
            // 获取验证码
            getVerifyCode: function() { 
                if (!this.userPhone) {
                    this.errorMsg = "请先输入手机号！"
                    this.$refs.alert.open();
                    return false;
                }
                var phoneReg = /^1\d{10}$/;
                if (!phoneReg.test(this.userPhone)) {
                    this.errorMsg = "手机号格式错误！"
                    this.$refs.alert.open();
                    return false;
                }

                var oBtn = this.$el.querySelector("#verify-btn");
                oBtn.setAttribute("disabled", "disabled");
                if (this.userPhone) {
                    var url = apiList.data.GetSMSCode;
                    this.$http.post(url, {
                        phone: this.userPhone,
                        smstpcode: 8                // 8修改重要信息
                    }).then(function (data) {
                        var oData = data.body;
                        if (oData.Result) {
                            // 提示信息
                            this.popMsg.isShowMsg = true;
                            this.popMsg.errorMsg = "短信验证码已经发送，注意查收，长时间未收到短信，请点击重新发送";
                            var that = this;
                            setTimeout(function () {
                                that.popMsg.isShowMsg = false;
                            }, 2e3);

                            var times = 60;
                            setTime(times);
                            
                            // 验证码定时器
                            function setTime() {
                                if (times > 0) {
                                    oBtn.className = "disable";
                                    oBtn.value = times + "秒后重新获取";
                                    times--;
                                    setTimeout(function() { 
                                        setTime();
                                    }, 1000);
                                } else {
                                    oBtn.className = "";
                                    oBtn.value = "获取短信验证码";
                                    oBtn.removeAttribute("disabled");
                                }
                            }
                        } else {
                            this.errorMsg = oData.Error;
                            // 弹窗
                            this.$refs.alert.open();
                            oBtn.removeAttribute("disabled");
                            return false;
                        }
                    }, function (data) {
                        console.info(data)
                    });
                }
            },
        }
    }

</script>
<style lang="less">
    .modifyPhone-page{
        .content-padded{
            padding:5px 10px;
            text-indent:2em;
            font-size: 16px;
        }
        .signup-form{
            margin-top:3.2rem;
        }
        .head {
            width: 100%;
            height: 3.87rem;
            margin-bottom: 1.524rem;
            line-height: 3.87rem;
            border-bottom: 1px solid #c8c8c8;
            color: #000;
            text-align: center;
            font-size: 1.463rem;
            background-color: #f7f7f8;
        }
        .input-row{
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            border-bottom: 1px solid #ddd;
            padding: .75rem 0.853rem;
            color: #6c6c6c;
            background-color: #fff;
            text-align: left;
            .label{
                width:4rem;
                font-size: .875rem;
            }
            input{
                -webkit-appearance: none;
                width: 100%;
                padding: 0;
                border: 0;
                font-size: .875rem;
                background-color: transparent;
                display: block;
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
            }
        }
        .signup_btn {
            display: block;
            width: 95%;
            height: 2.5rem;
            margin: 1.585rem auto 0;
            line-height: 2.5rem;
            border: 1px solid #c40000;
            border-radius: 5px;
            color: #fff;
            background-color: #c40000;
            text-align: center;
            font-size: .875rem;
            
        }
        .link{
            display:block;
            float: right;
            margin-top:1.31rem;
            margin-right:1.31rem;
            color: #c40000;
            font-size: .875rem; 
        }
        #verify-btn{
            position: absolute;
            right: 15px;
            top: 50%;
            margin-top:-0.65rem;
            width:auto!important;
            padding:0 10px!important;
            height:1.3rem;
            background-color: #ec584e;
            color: #fff;
            border: none;
            font-size: 0.7rem!important;
            padding: 5px 8px;
            margin-right: 3px;
            border-radius: 5px;
            &.disable{
                background-color:#9a8887;
            }
        }
    }
</style>
