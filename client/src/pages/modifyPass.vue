<template>
<div class="pageCon modifyPass-page">
    <simple-header title="修改密码" :back-link="true"></simple-header>
    <page-content>
        <div class="items-line bor-bottom flex-box">
            <label for="oldPass">原密码</label>
            <input type="password" class="flex-item" id="oldPass" name="oldPass" placeholder="原密码" autocapitalize="off" v-model="oldPass" maxlength="20">
        </div>
        <div class="items-line bor-bottom mt10 flex-box">
            <label for="newPass">新密码</label>
            <input type="password" class="flex-item" id="newPass" name="newPass" placeholder="新密码" autocapitalize="off" v-model="newPass" maxlength="20">
        </div>
        <p class="tip">
            密码由6-12位英文字母,数字或符号组成
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
    import apiList from "../apiList.js"  // api列表

    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
            'm-button': Button,
        },
        data () {
            return {
                oldPass: "",  // 原密码
                newPass: "",  // 新密码
                errorMsg: "",  // 提示信息
                isShowMsg: false
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                // 设置标题
                this.setTitle("修改密码");
            })
        },
        methods: {
            submitForm: function () {
                var that = this;
                if (!this.oldPass.trim()) {
                    this.isShowMsg = true;
                    this.errorMsg = "原密码不能为空";
                    setTimeout(function () {
                        that.isShowMsg = false;
                    }, 1e3)
                    return false;
                }
                if (!this.newPass.trim()) {
                    this.isShowMsg = true;
                    this.errorMsg = "新密码不能为空";
                    setTimeout(function () {
                        that.isShowMsg = false;
                    }, 1e3)
                    return false;
                }
                
                var url = apiList.data.RegNewPass;
                this.$http.post(url, {
                    oldpass: this.oldPass,
                    newpass: this.newPass
                }).then(function (data) {
                    var oData = data.body;
                    var that = this;
                    if (oData.Result == 1) {
                        this.isShowMsg = true;
                        this.errorMsg = "修改密码成功";
                        
                        setTimeout(function () {
                            that.isShowMsg = false;
                            that.$router.push("/login");
                        }, 1e3)
                    } else {
                        this.isShowMsg = true;
                        this.errorMsg = oData.Message;
                        setTimeout(function () {
                            that.isShowMsg = false;
                            that.$router.push("/login");
                        }, 1e3)
                    }
                }, function (response) {
                    console.info(response);
                })
            }
        }
    }
</script>
<style lang="less">
    .modifyPass-page{
        .items-line{
            margin-top:5px;
            line-height: 1.25rem;
            label{
                display:block;
                width:2.5rem;
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
