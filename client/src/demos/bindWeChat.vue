<template>
    <div class="page bindWechat-page">
        <simple-header title="绑定微信" :back-link="true"></simple-header>
        <page-content>
            <form class="signup-form">
                <div class="input-row has_line">
                    <label class="label" for="signupUserName">手机号</label>
                    <input type="text" placeholder="请输入已注册手机号" id="signupUserName" name="signupUserName" v-model="user" pattern="[0-9]*">
                    <span class="iconfont icon-delete"></span>
                </div>
                <div class="input-row rel">
                    <label class="label" for="verifyCode">验证码</label>
                    <input type="text" placeholder="请输入验证码" id="verifyCode" name="verifyCode" v-model="verifyCode">
                    <input id="verify-btn" type="button" value="获取短信验证码" v-on:click="getVerifyCode()">
                </div>
                <button type="button" class="signup_btn" id="signupUser" :disabled="isCheck" @click="bindWeChat()">绑定</button>
            </form>
            <!-- 弹窗 -->
            <alert :title="errorTit" :content="errorMsg" ref="alert"></alert>
        </page-content>
        <!-- 弹窗错误信息 -->
        <div class="notify" v-if="popMsg.isShowMsg">
            <div class="txt">{{popMsg.errorMsg}}</div>
        </div>
    </div>
</template>
<script>
    import { SimpleHeader } from '../components/header'
    import Content from '../components/content'
    import { Alert} from '../components/modal'
    import apiList from "../apiList.js"  //api列表

    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
            Alert
        },
        data () {
            return {
                user:"",
                verifyCode:"",
                errorTit:"温馨提示",       //报错弹窗标题
                errorMsg:"请输入账号！",       //报错弹窗信息
                isCheck:false,          //注册按钮是否可选
                popMsg:{
                    isShowMsg: false,     //是否显示弹窗错误信息
                    errorMsg:"",         //弹窗错误信息
                },
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                
                //设置标题
                this.setTitle("绑定微信");
            })
        },
        methods: {
            //获取验证码
            getVerifyCode:function(){
                //清除字符两边空格
                var user = this.user.toString().trim();
                if(!user){
                    this.errorMsg = "请输入绑定手机号！"
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
                        smstpcode:1,   //身份验证
                    }).then(function(data){
                        console.log(data.status)
                        if(data.status == 200){
                            var times = 60;
                            var that = this;
                            setTime(times)
                            
                            //验证码定时器
                            function setTime(){
                                if (times > 0) {
                                    oBtn.className = "disable";
                                    oBtn.value = times + "秒后重新获取";
                                    times--;
                                    setTimeout(function(){
                                        setTime()
                                    }, 1000);
                                }else {
                                    oBtn.className = "";
                                    oBtn.value="获取短信验证码";
                                    oBtn.removeAttribute("disabled");
                                }
                            }
                        }
                    }, function(data){
                        // 响应错误回调
                        this.isCheck = false;
                    });
                }
            },
            bindWeChat:function(){
                //清除字符两边空格
                var user = this.user.toString().trim();
                var verifyCode = this.verifyCode.toString().trim();
                
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
                
                var url = apiList.data.BindWechat;
                this.$http.post(url,{
                    phone:this.user,
                    smsCode:this.verifyCode
                }).then(function(data){ 
                    var oData = data.body;
                    if(oData.Result == 1){
                        this.popMsg.isShowMsg = true;
                        this.popMsg.errorMsg= "绑定微信成功";
                        var that = this;
                        setTimeout(function(){
                            that.popMsg.isShowMsg = false;
                            that.$router.push("/home");
                        },1e3)
                    }else{
                        this.popMsg.isShowMsg = true;
                        this.popMsg.errorMsg= oData.Message;
                        var that = this;
                        setTimeout(function(){
                            that.popMsg.isShowMsg = false;
                        },1e3)
                    }
                },function(response){
                    console.info(response);
                })
            }
        }
    }
</script>
<style lang="less">
    .bindWechat-page{
        .content-padded{
            padding:5px 10px;
            text-indent:2em;
            font-size: 16px;
        }
        .signup-form{
            margin-top:.2rem;
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
        .notify {
            position: fixed;
            top: 35%;
            left: 50%;
            width: 220px;
            padding: 0;
            margin: 0 0 0 -110px;
            z-index: 9999;
            background: rgba(0,0,0,.8);
            color: #fff;
            line-height: 1.5em;
            border-radius: 6px;
            -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2);
            box-shadow: 0 1px 2px rgba(0,0,0,.2);
            .txt {
                padding: 10px;
                text-align: center;
                word-wrap: break-word;
            }
        }
    }
    
</style>
