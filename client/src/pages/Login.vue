<template>
     <div class="page login-page">
        <simple-header title="账户登录" ></simple-header>
        <form class="login-form">
            <div class="input-row has_line">
                <label class="label" for="loginUserName">账户</label>
                <input type="text" placeholder="请输入邮箱/手机" id="loginUserName" autocapitalize="off" name="loginUserName" v-model.trim="user">
            </div>
            <div class="input-row">
                <label class="label" for="loginPassword">登录密码</label>
                <input type="password" placeholder="请输入密码" id="loginPassword" autocapitalize="off" name="loginPassword" v-model.trim="password">
                <span class="iconfont icon-browse_fill" v-on:click="showPassword(inputType)"></span>
            </div>
            <button type="button" class="login_btn" id="loginUser" :disabled="isCheck" @click="login()">登录</button>
            <div class="p10 clearfix">
                <router-link class="fl link" to="/signUp">
                    邀请码注册
                </router-link>
                <router-link class="fr link" to="/forget">
                    忘记密码?
                </router-link>
            </div>
        </form>
        <alert :title="errorTit" :content="errorMsg" ref="alert"></alert>
    </div>
</template>
<script>
    import { SimpleHeader } from '../components/header'
    import { Alert } from '../components/modal'
    import apiList from "../apiList.js"  // api列表 

    export default {
        name: 'login',
        components: {
            SimpleHeader,
            Alert
        },
        data () {
            return {
                isCheck: false,  // 按钮是否禁止
                user: "",        // 用户名
                password: "",    // 密码
                errorTit: "温馨提示",    // 弹窗错误提示信息
                errorMsg: "请输入账号！",
                inputType: 1,      // 密码输入框类型
            }
        },
        mounted () {
            this.$nextTick(function () {
                // 设置标题
                this.setTitle("用户登录");

                this.setCookieUser();
            });
        },
        methods: {
            login: function (type) {
                // 清除字符两边空格
                if (!this.user) {
                    this.errorMsg = "请输入账号！"
                    // 弹窗
                    this.$refs.alert.open();
                    return false;
                }
                if (!this.password) {
                    this.errorMsg = "请输入密码！"
                    // 弹窗
                    this.$refs.alert.open();
                    return false;
                }

                // 禁止按钮
                this.isCheck = true;
                var oBtn = this.$el.querySelector("#loginUser");
                oBtn.innerHTML = "登录中...";
                oBtn.classList.add("disabled");

                var url = apiList.data.Login;
                this.$http.post(url, {
                    username: this.user,
                    password: this.password
                }).then(function (data) {
                    if (data.body.Result == 1) {
                        //  store存储用户信息
                        const userState = {
                            userType: data.body.Fid
                        };
                        this.$store.dispatch('saveUserType', userState);

                        window.sessionStorage.fid_num39 = data.body.Fid;

                        var oPrePath = this.$router.previousPath;
                        // 判定路由中是否有上一个路由路径如果是上一页面是注册页则跳转到首页，防止循环跳转
                        var preUrl = oPrePath == undefined || oPrePath.fullPath == "/signup" || oPrePath.fullPath == "/forget" || oPrePath.fullPath == "/goods" ? "/" : oPrePath.fullPath;
                        this.setCookie("nosdacno_12", this.user, 7);
                        // this.$router.push(preUrl);
                        // 直接url替换防止返回登录页循环错误
                        window.location.replace("/#" + preUrl);
                    } else {
                        // 弹窗
                        this.errorMsg = data.body.Message;
                        this.$refs.alert.open();
                    }

                    // 按钮还原
                    this.isCheck = false;
                    oBtn.innerHTML = "登录";
                    oBtn.classList.remove("disabled");
                }, function (data) {
                    // 响应错误回调
                    this.isCheck = false;
                });
            },
            // 显示密码
            showPassword: function (type) {
                var oType = this.$el.querySelector("#loginPassword");
                if (type == 1) {
                    oType.type = "text";
                    this.inputType = 0;
                } else {
                    oType.type = "password";
                    this.inputType = 1;
                }   
            },
            // 设置cookie账号
            setCookieUser: function () {
                // 有cookie下设置
                var name = this.getCookie("nosdacno_12");
                name ? this.user = name : "";
            },
            // 微信账号绑定授权
            getWeChat: function () {
                var ua = window.navigator.userAgent.toLowerCase(); 
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    // 判定路由中是否有上一个路由路径
                    var oPrePath = this.$router.previousPath;
                    var preUrl = oPrePath == undefined || oPrePath.fullPath == "/signup" || oPrePath.fullPath == "/forget" ? "/" : oPrePath.fullPath;
                    var redirect = "/#" + preUrl;
                    var url = apiList.data.Authorize;
                    this.$http.post(url, {
                        url: redirect
                    }).then(function (data) { 
                        //  window.location.href = data.body;
                    }, function (response) {
                        console.info(response);
                    });
                }
                return false;
            },
            // 设置cookie
            setCookie: function (name, value, expires) {
                var oDate = new Date();
                oDate.setDate(oDate.getDate() + expires)
                document.cookie = name + "=" + escape(value) + ((expires == null) ? "" : ";expires=" + oDate.toGMTString())
            },
            // 获取cookie
            getCookie: function (name) {
                if (document.cookie.length > 0) {
                    var start = document.cookie.indexOf(name + "=");
                    if (start != -1) { 
                        start = start + name.length + 1 
                        var end = document.cookie.indexOf(";", start);
                        if (end == -1) {
                            end = document.cookie.length
                        }
                        return unescape(document.cookie.substring(start, end))
                    } 
                } else {
                    return ""
                }
            }
        }
    }
</script>
<style lang="less">
    .login-page{
        .login-form{
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
        .login_btn {
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
            color: #c40000;
            font-size: .875rem; 
        }
        .icon-browse_fill{
            font-size: 20px;
            color:#999;
        }
        .sign-btn{

        }
    }
</style>
