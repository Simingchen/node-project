<template>
    <div class="page signup-page" ref="noMove">
        <simple-header title="VIP邀请码注册" :back-link="true"></simple-header>
        <form class="signup-form">
            <div class="input-row has_line">
                <label class="label" for="signupUserName">手机号</label>
                <input type="text" placeholder="请输入注册手机号" id="signupUserName" name="signupUserName" v-model="user" pattern="[0-9]*">
                <span class="iconfont icon-delete"></span>
            </div>
            <div class="input-row">
                <label class="label" for="signupPassword">设置密码</label>
                <input type="password" placeholder="请输入注册密码" id="signupPassword" name="signupPassword" autocapitalize="off" v-model="password">
                <span class="iconfont icon-browse_fill" v-on:click="showPassword(inputType)"></span>
            </div>
            <div class="input-row rel">
                <label class="label" for="verifyCode">验证码</label>
                <input type="text" placeholder="请输入验证码" id="verifyCode" name="verifyCode" autocapitalize="off" v-model="verifyCode">
                <input id="verify-btn" type="button" value="获取短信验证码" v-on:click="getVerifyCode()">
            </div>
            <div class="input-row">
                <label class="label" for="inviteCode">邀请码</label>
                <input type="text" placeholder="请输入邀请码" id="inviteCode" name="inviteCode" autocapitalize="off" v-model="inviteCode">
                <span @click="$refs.p1.open()">什么是邀请码？</span>
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
        <!-- 邀请码弹窗 -->
        <popup ref="p1" title="什么是邀请码？" closeButtonText="关闭">
            <h2 class="demos-sub-title"></h2>
            <div class="content-padded">
                邀请码，是世华汇商城面向VIP用户发放的一串字符编码，用于识别VIP身份，并赠送一定数量积分；邀请码印刷在世华汇商城发布的VIP积分卡背面，需要刮开保密涂层才能识别和使用；邀请码只能使用一次；且超过有效期后的邀请码自动失效，请在期限内注册使用。
            </div>
        </popup>
    </div>
</template>
<script>
    import { SimpleHeader } from '../components/header'
    import { Alert} from '../components/modal'
    import Popup from '../components/popup'
    import apiList from "../apiList.js"  //api列表

    export default {
        name: 'signup',
        components: {
            SimpleHeader,
            Alert,
            Popup,
        },
        data () {
            return {
                isCheck:false,
                user:"",       //用户名
                password:"",      //密码
                verifyCode:"",      //短信验证码
                inviteCode:"",      //邀请码
                errorTit:"温馨提示",       //报错弹窗标题
                errorMsg:"请输入账号！",       //报错弹窗信息
                inputType:1,      //密码输入框类型
                popMsg:{
                    isShowMsg: false,     //是否显示弹窗错误信息
                    errorMsg:"",         //弹窗错误信息
                },
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                //设置标题
                this.setTitle("vip注册");
                this.stopMove();
            });
        },
        methods:{
            signup:function(type){
                //清除字符两边空格
                var password = this.password.toString().trim();
                var user = this.user.toString().trim();
                var verifyCode = this.verifyCode.toString().trim();
                var inviteCode = this.inviteCode.toString().trim();
                
                if(!user){
                    this.errorMsg = "请输入注册手机号！"
                    //弹窗
                    this.$refs.alert.open();
                    return false;
                }
                var phoneReg = /^1\d{10}$/;
                if(!phoneReg.test(user)){
                    this.errorMsg = "手机号格式错误！"
                    //弹窗
                    this.$refs.alert.open();
                    return false;
                }
                if(!password){
                    this.errorMsg = "请输入密码！"
                    //弹窗
                    this.$refs.alert.open();
                    return false;
                }
                var passwordReg = /^(?![^a-zA-Z]+$)(?!\D+$)/;
                if(!passwordReg.test(password)){
                    this.errorMsg = "密码由6-12位,字母开头加数字组成";
                    //弹窗
                    this.$refs.alert.open();
                    return false;
                }
                if(!verifyCode){
                    this.errorMsg = "请输入短信验证码！"
                    //弹窗
                    this.$refs.alert.open();
                    return false;
                }
                var verifyCodeReg = /\d+/;
                if(!verifyCodeReg.test(verifyCode)){
                    this.errorMsg = "短信验证码为纯数字！"
                    //弹窗
                    this.$refs.alert.open();
                    return false;
                }
                if(!inviteCode){
                    this.errorMsg = "请输入邀请码！"
                    //弹窗
                    this.$refs.alert.open();
                    return false;
                }

                //禁止按钮
                this.isCheck = true;
                
                var url = apiList.data.SimpRegister;
                this.$http.post(url,{
                    phone: this.user,
                    password: this.password,
                    code: this.verifyCode,
                    inviteCode: this.inviteCode,
                }).then(function(data){
                    this.isCheck = false;
                    var oData = data.body;
                    if(oData.Result == 1){
                        this.popMsg.isShowMsg = true;
                        this.popMsg.errorMsg= oData.Message;
                        var that = this;
                        setTimeout(function(){
                            that.$router.push("/login");
                        },1e3);
                    }else{
                        this.errorMsg = data.body.Message;
                        //弹窗
                        this.$refs.alert.open();
                    }
                }, function(data){
                    // 响应错误回调
                    this.isCheck = false;
                });
            },
            //获取验证码
            getVerifyCode:function(){
                //清除字符两边空格
                var user = this.user.toString().trim();
                if(!user){
                    this.errorMsg = "请先输入手机号！"
                    //弹窗
                    this.$refs.alert.open();
                    return false;
                }
                var phoneReg = /^1\d{10}$/;
                if(!phoneReg.test(user)){
                    this.errorMsg = "手机号格式错误！"
                    //弹窗
                    this.$refs.alert.open();
                    return false;
                }

                var oBtn = this.$el.querySelector("#verify-btn");
                oBtn.setAttribute("disabled", "disabled");
                if(user){
                    var url = apiList.data.GetSMSCode;
                    this.$http.post(url,{
                        phone: this.user,
                        smstpcode:5         //5为注册验证
                    }).then(function(data){
                        var  oData = data.body;
                        if(oData.Result){
                            var times = 60;
                            var that = this;
                            setTime(times);
                            
                            //验证码定时器
                            function setTime(){
                                if (times > 0) {
                                    oBtn.className = "disable";
                                    oBtn.value = times + "秒后重新获取";
                                    times--;
                                    setTimeout(function(){
                                        setTime();
                                    }, 1000);
                                }else {
                                    oBtn.className = "";
                                    oBtn.value="获取短信验证码";
                                    oBtn.removeAttribute("disabled");
                                }
                            }
                        }else{
                            this.errorMsg = oData.Error;
                            //弹窗
                            this.$refs.alert.open();
                            oBtn.removeAttribute("disabled");
                            return false;
                        }
                    }, function(data){
                        // 响应错误回调
                        this.isCheck = false;
                    });
                }
            },
            //显示密码
            showPassword:function(type){
                var oType = this.$el.querySelector("#signupPassword");
                if(type == 1){
                    oType.type = "text";
                    this.inputType = 0;
                }else{
                    oType.type = "password";
                    this.inputType = 1;
                }   
            },
            //禁止滚动
            stopMove:function(){
                this.$refs.noMove.ontouchmove=function(e){
                    e.preventDefault();
                    e.stopPropagation();
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
