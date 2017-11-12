<template>
    <div class="page signup-page" @touchmove.stop.prevent>
        <simple-header title="用户注册" :back-link="true"></simple-header>
        <form class="signup-form">
            <div class="input-row has_line">
                <label class="label" for="signupUserName">手机号</label>
                <input type="text" placeholder="请输入注册手机号" id="signupUserName" name="signupUserName" v-model.trim="user" pattern="[0-9]*">
                <span class="iconfont icon-delete"></span>
            </div>
            <div class="input-row">
                <label class="label" for="signupPassword">设置密码</label>
                <input type="password" placeholder="请输入注册密码" id="signupPassword" name="signupPassword" autocapitalize="off" v-model.trim="password">
                <span class="iconfont icon-browse_fill" v-on:click="showPassword(inputType)"></span>
            </div>
            <button type="button" class="signup_btn" id="signupUser" :disabled="isCheck" @click="signup()">注册</button>
            <router-link class="link" to="/login">
                已有账号?去登录
            </router-link>
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
    import { Alert, Confirm } from '../components/modal'
    import Popup from '../components/popup'
    import apiList from "../apiList.js"  // api列表

    export default {
        name: 'signup',
        components: {
            SimpleHeader,
            Alert,
            Confirm,
            Popup,
        },
        data () {
            return {
                isCheck: false,
                user: "",       // 用户名
                password: "",      // 密码
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
                this.setTitle("用户注册");
            });
        },
        methods: {
            signup: function (type) {
                // 清除字符两边空格
                var user = this.user;
                var password = this.password;
                
                if (!user) {
                    this.errorMsg = "请输入注册手机号！"
                    // 弹窗
                    this.$refs.alert.open();
                    return false;
                }
                var phoneReg = /^1\d{10}$/;
                if (!phoneReg.test(user)) {
                    this.errorMsg = "手机号格式错误！"
                    // 弹窗
                    this.$refs.alert.open();
                    return false;
                }
                if (!password) {
                    this.errorMsg = "请输入密码！"
                    // 弹窗
                    this.$refs.alert.open();
                    return false;
                }
                // var passwordReg = /^(?![^a-zA-Z]+$)(?!\D+$)/;
                // if (!passwordReg.test(password)) {
                //     this.errorMsg = "密码由6-12位,字母开头加数字组成";
                //     // 弹窗
                //     this.$refs.alert.open();
                //     return false;
                // }

                // 禁止按钮
                this.isCheck = true;
                
                var url = apiList.data.SimpRegister;
                this.$http.post(url, {
                    phone: this.user,
                    password: this.password,
                }).then(function (data) {
                    this.isCheck = false;
                    var oData = data.body;
                    if (oData.Result == 1) {
                        this.popMsg.isShowMsg = true;
                        this.popMsg.errorMsg = oData.Message;
                        var that = this;
                        setTimeout(function () {
                            that.$router.push("/login");
                        }, 1e3);
                    } else {
                        this.errorMsg = data.body.Message;
                        // 弹窗
                        this.$refs.alert.open();
                    }
                }, function (data) {
                    //  响应错误回调
                    this.isCheck = false;
                });
            },
            // 显示密码
            showPassword: function (type) {
                var oType = this.$el.querySelector("#signupPassword");
                if (type == 1) {
                    oType.type = "text";
                    this.inputType = 0;
                } else {
                    oType.type = "password";
                    this.inputType = 1;
                }   
            }
        }
    }

</script>
<style lang="less">
    .signup-page{
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
