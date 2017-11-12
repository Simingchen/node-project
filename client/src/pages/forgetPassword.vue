<template>
    <div class="page forget-page" @touchmove.stop.prevent>
        <simple-header title="忘记密码" :back-link="true"></simple-header>
        <form class="forget-form">
            <div class="input-row has_line">
                <label class="label" for="forgetUserName">手机号</label>
                <input type="text" placeholder="请输入注册手机号" id="forgetUserName" name="forgetUserName" v-model.trim="user">
            </div>
            <div class="input-row rel">
                <label class="label" for="verifyCode">验证码</label>
                <input  type="text" placeholder="请输入验证码" id="verifyCode" name="verifyCode" v-model.trim="verifyCode">
                <input id="verify-btn" type="button" value="获取验证码" v-on:click="getVerifyCode()">
            </div>
            <button type="button" class="forget_btn" :disabled="isCheck" @click="forget()">提交</button>
            <span class="link" @click="$refs.p1.open()">忘记账号或没有手机号？</span>
        </form>
        <alert :title="errorTit" :content="errorMsg" ref="alert"></alert>
        <!-- 邀请码弹窗 -->
        <popup ref="p1" title="忘记账号？">
            <div class="content-padded">
                温馨提示：
                如果忘记用户名和注册邮箱，请注明姓名、唯一号和身份证号 发邮件
                至  <a href="mailto:jyiqi@gzshengjian.net">jyiqi@gzshengjian.net</a>  进行客服查询。
            </div>
        </popup>
    </div>
</template>
<script>
    import { SimpleHeader } from '../components/header'
    import { Alert } from '../components/modal'
    import Popup from '../components/popup'
    import apiList from "../apiList.js"  // api列表

    export default {
        name: 'forget',
        components: {
            SimpleHeader,
            Alert,
            Popup,
        },
        data () {
            return {
                isCheck: false,  // 按钮是否禁止
                user: "",        // 用户名
                verifyCode: "",    // 验证码
                errorTit: "温馨提示",    // 弹窗错误提示信息
                errorMsg: "请输入账号！",
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                // 设置标题
                this.setTitle("忘记密码");
            });
        },
        methods: {
            forget: function (type) {
                // 清除字符两边空格
                if (!this.user) {
                    this.errorMsg = "请输入手机号！"
                    this.$refs.alert.open();
                    return false;
                } else {
                    var reg = /^1\d{10}$/;
                    var isTrue = reg.test(this.user);
                    if (!isTrue) {
                        this.errorMsg = "手机号格式错误！"
                        this.$refs.alert.open();
                        return false;
                    }
                }

                if (!this.verifyCode) {
                    this.errorMsg = "请输入密码！"
                    this.$refs.alert.open();
                    return false;
                }

                // 禁止按钮
                this.isCheck = true;
                var oBtn = this.$el.querySelector(".forget_btn");
                oBtn.innerHTML = "提交中...";

                var url = apiList.data.LoginPassword;
                this.$http.post(url, {
                    phone: this.user,
                    code: this.verifyCode
                }).then(function (data) {
                    this.isCheck = false;
                    var oData = data.body;
                    // 弹窗
                    this.errorMsg = oData.Message;
                    this.$refs.alert.open();
                    this.code = "";
                    if (oData.Result) {
                        this.$router.push("/login");
                    }

                    // 按钮还原
                    oBtn.innerHTML = "提交";
                }, function (data) {
                    console.info(data)
                });
            },
            // 获取验证码
            getVerifyCode: function () {
                // 清除字符两边空格
                if (!this.user) {
                    this.errorMsg = "请输入手机号！"
                    this.$refs.alert.open();
                    return false;
                } else {
                    var reg = /^1\d{10}$/;
                    var isTrue = reg.test(this.user);
                    if (!isTrue) {
                        this.errorMsg = "手机号格式错误！"
                        this.$refs.alert.open();
                        return false;
                    }
                }

                // 纽铵禁止
                var oBtn = this.$el.querySelector("#verify-btn");
                oBtn.setAttribute("disabled", "disabled");
                
                if (this.user) {
                    var url = apiList.data.GetSMSCode;
                    this.$http.post(url, {
                        phone: this.user,
                        smstpcode: 7,   // 修改登录密码验证
                    }).then(function (data) {
                        if (data.status == 200) {
                            var times = 60;
                            setTime(times)
                            
                            // 验证码定时器
                            function setTime () {
                                if (times > 0) {
                                    oBtn.className = "disable";
                                    oBtn.value = times + "秒后重新获取";
                                    times--;
                                    setTimeout(function () {
                                        setTime()
                                    }, 1000);
                                } else {
                                    oBtn.className = "";
                                    oBtn.value = "获取短信验证码";
                                    oBtn.removeAttribute("disabled");
                                }
                            }
                        }
                    }, function (data) {
                        console.info(data);
                    });
                }
            },
        }
    }
</script>
<style lang="less">
    .forget-page{
        .content-padded{
            padding:5px 10px;
            text-indent:2em;
            font-size: 16px;
        }
        .forget-form{
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
                border: 0;
                font-size: .875rem;
                display: block;
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
            }
        }
        .forget_btn {
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
