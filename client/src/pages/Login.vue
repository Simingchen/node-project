<template>
    <div class="page login-page">
        <!-- <simple-header title="账户登录" ></simple-header> -->
        <div class="top-img tac">
            <h1>您的福利专注平台</h1>
            <p class="subTit">Welfare Platform</p>
        </div>
        <form class="login-form">
            <div class="input-row">
                <label class="label" for="loginUserName">
                    <img src="../assets/login/tag1.png" alt="账户">
                </label>
                <input type="text" placeholder="请输入邮箱/手机" id="loginUserName" autocapitalize="off" name="loginUserName" v-model.trim="user">
            </div>
            <div class="input-row">
                <label class="label" for="loginPassword">
                    <img class="tag-img2" src="../assets/login/tag2.png" alt="账户">
                </label>
                <input type="password" placeholder="请输入密码" id="loginPassword" autocapitalize="off" name="loginPassword" v-model.trim="password" @keyup.enter="login()">
                <span class="iconfont icon-browse_fill" @click="showPassword(inputType)"></span>
            </div>
            <button type="button" class="login_btn" id="loginUser" :disabled="isCheck" @click="login()">登录</button>
            <div class="p10 clearfix">
                <router-link class="fl link" to="/signup">
                    邀请码注册
                </router-link>
                <router-link class="fr link" to="/forget">
                    忘记密码?
                </router-link>
            </div>
            <p class="p10 yellow">
                <i class="iconfont icon-cuowutishi"></i>
                依据《网络安全法》，为保障您的账户安全和正常使用，请尽快完成手机号验证！
            </p>
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
                this.setCookieUser();
                
                // 设置标题
                this.setTitle("用户登录");

                this.setBg();
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
            },
            // setBg设置背景高度
            setBg: function () {
                let windowH = window.innerHeight;
                let oForm = this.$el.querySelector(".login-form");
                let oTop = this.$el.querySelector(".top-img");
                oForm.style.height = windowH - oTop.offsetHeight + "px"; 
            }
        }
    }
</script>
<style lang="less">
    .login-page{
        .top-img{
            height:11.3rem;
            padding-top:8.5rem;
            color:#e50405;
            background: #e6e6e6 url("../assets/login/login2.png") center 0.5rem no-repeat;
            background-size:100% 7.65rem;
            h1{
                font-size: 0.9rem;
                line-height: 1.3rem;
            }
            .subTit{
                color:#d0251d;
            }
        }
        .login-form{
            min-height: 300px;
            padding:1.5rem 1.0rem 0;
            background: #c654c6 url("../assets/login/login1.jpg") center 0 no-repeat;
            background-size:cover;
        }
        .input-row{
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            -webkit-box-align: center;
            -webkit-align-items: center;
            padding: .75rem 0.853rem;
            margin-bottom: 1.0rem;
            background-color: rgba(0,0,0,.2);
            border-radius: 0.4rem;
            .label{
                width:2.25rem;
            }
            img{
                height:1.2rem;
            }
            .tag-img2{
                margin-left: 0.25rem;
            }
            input{
                -webkit-appearance: none;
                width: 100%;
                padding: 0;
                border: 0;
                font-size: .875rem;
                color: #fff;
                background-color: transparent;
                display: block;
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
            }
        }
        .login_btn {
            display: block;
            width: 100%;
            height: 2.5rem;
            line-height: 2.5rem;
            border: 1px solid #8a4cdf;
            border-radius: 5px;
            color: #fff;
            background-color: #8a4cdf;
            text-align: center;
            font-size: .875rem;
            &.disabled{
                background-color: #7f39de;
            }
        }
        .link{
            color: #fff;
            font-size: .875rem; 
        }
        .icon-browse_fill{
            font-size: 20px;
            color:#999;
        }
        .yellow{
            color:#ffa258;
        }
    }
</style>
