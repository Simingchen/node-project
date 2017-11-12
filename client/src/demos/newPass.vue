<template>
<div class="pageCon newPass-page" ref="noMove">
    <simple-header title="修改支付密码" :back-link="true"></simple-header>
    <page-content>
        <div class="items-line bor-bottom flex-box">
            <label for="oldPass">设置密码</label>
            <input type="password" class="flex-item" id="oldPass" name="oldPass" placeholder="设置密码" autocapitalize="off" v-model="oldPass" maxlength="20">
        </div>
        <div class="items-line bor-bottom mt10 flex-box">
            <label for="newPass">确认密码</label>
            <input type="password" class="flex-item" id="newPass" name="newPass" placeholder="确认密码" autocapitalize="off" v-model="newPass" maxlength="20">
        </div>
        <p class="tip">
            密码由6-12位英文字母开头,数字或符号组成
        </p>
        <div class="content-block content-padded">
            <span class="button" size="large" @click="submitForm()">保存</span>
        </div>
    </page-content>
    <!-- 弹窗错误信息 -->
    <div class="notify" v-if="isShowMsg">
        <div class="txt">{{errorMsg}}</div>
    </div>
</div>
</template>

<script>
    import Content from '../components/content'
    import { SimpleHeader } from '../components/header'
    import { Button } from '../components/buttons'
    import apiList from "../apiList.js"  //api列表

    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
            'm-button': Button,
        },
        data(){
            return{
                oldPass:"",  //原密码
                newPass:"",  //新密码
                errorMsg:"",  //提示信息
                isShowMsg:false
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                //设置标题
                this.setTitle("修改支付密码");
                this.stopMove();
            })
        },
        methods:{
            submitForm:function(){
                var oldPass = this.oldPass.trim()
                var newPass = this.newPass.trim()
                if(!oldPass){
                    this.isShowMsg = true;
                    this.errorMsg = "设置密码不能为空";
                    var that = this;
                    setTimeout(function(){
                        that.isShowMsg = false;
                    },1e3)
                    return false;
                }
                var reg = /^[a-zA-Z]\w{5,12}$/;
                if(!reg.test(oldPass)){
                    this.isShowMsg = true;
                    this.errorMsg = "密码由6-12位英文字母开头,数字或符号组成";
                    var that = this;
                    setTimeout(function(){
                        that.isShowMsg = false;
                    },1e3)
                    return false;
                }
                if(!newPass){
                    this.isShowMsg = true;
                    this.errorMsg = "确认密码不能为空";
                    var that = this;
                    setTimeout(function(){
                        that.isShowMsg = false;
                    },1e3)
                    return false;
                }
                if(newPass !== oldPass){
                    this.isShowMsg = true;
                    this.errorMsg = "两次输入不一致";
                    var that = this;
                    setTimeout(function(){
                        that.isShowMsg = false;
                    },1e3)
                    return false;
                }
                
                var url = apiList.data.Regnewpaypass;
                this.$http.post(url,{
                    newpass: this.oldPass,
                }).then(function(data){
                    if(data.body.Result == 1){
                        this.isShowMsg = true;
                        this.errorMsg = "修改支付密码成功";
                        var that = this;
                        setTimeout(function(){
                            that.isShowMsg = false;
                            that.$router.push({path:"/mine"})
                        },1e3)
                    }else{
                        this.isShowMsg = true;
                        this.errorMsg = data.body.Message;
                        var that = this;
                        setTimeout(function(){
                            that.$router.push("/login");
                            that.isShowMsg = false;
                        },1e3)
                    }
                },function(response){
                    console.info(response);
                })
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
    .newPass-page{
        .items-line{
            margin-top:5px;
            line-height: 1.25rem;
            label{
                display:block;
                width:3rem;
            }
            input{
                border:0;
            }
        }
        .mt10{
            margin-top:10px;
        }
        .tip{
            line-height: 1.5rem;
        }
        .notify {
            position: fixed;
            top: 35%;
            left: 50%;
            width: 220px;
            padding: 0;
            margin: 0 0 0 -110px;
            z-index: 9999;
            color: #fff;
            background: rgba(0,0,0,.8);
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
