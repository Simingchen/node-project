<template>
<div class="pageCon newPass-page" ref="noMove">
    <simple-header title="修改支付密码" :back-link="true"></simple-header>
    <page-content>
        <div class="items-line bor-bottom flex-box">
            <label for="oldPass">设置密码</label>
            <input type="password" class="flex-item" id="oldPass" name="oldPass" placeholder="设置密码" autocapitalize="off" v-model.trim="oldPass" maxlength="20">
        </div>
        <div class="items-line bor-bottom mt10 flex-box">
            <label for="newPass">确认密码</label>
            <input type="password" class="flex-item" id="newPass" name="newPass" placeholder="确认密码" autocapitalize="off" v-model.trim="newPass" maxlength="20">
        </div>
        <p class="tip">
            密码由6-12位英文字母开头,数字或符号组成
        </p>
        <div class="content-block content-padded">
            <span class="button" id="save-btn" size="large" @click="submitForm()">保存</span>
        </div>
    </page-content>
    <!-- 弹窗错误信息 -->
    <div class="notify" v-if="popMsg.isShowMsg">
        <div class="txt">{{popMsg.errorMsg}}</div>
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
                popMsg: {
                    isShowMsg: false,     // 是否显示弹窗错误信息
                    errorMsg: "",         // 弹窗错误信息
                },
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                // 设置标题
                this.setTitle("修改支付密码");
                this.stopMove();
            })
        },
        methods: {
            submitForm: function () {
                if (!this.oldPass) {
                    this.verifyError("设置密码不能为空");
                    return false;
                }
                var reg = /^[a-zA-Z]\w{5,12}$/;
                if (!reg.test(this.oldPass)) {
                    this.verifyError("密码由6-12位英文字母开头,数字或符号组成");
                    return false;
                }
                if (!this.newPass) {
                    this.verifyError("确认密码不能为空");
                    return false;
                }
                if (this.newPass !== this.oldPass) {
                    this.verifyError("两次输入不一致");
                    return false;
                }
                
                // 按钮禁止
                var oBtn = this.$el.querySelector("#save-btn");
                oBtn.innerHTML = "提交中...";

                var url = apiList.data.Regnewpaypass;
                this.$http.post(url, {
                    newpass: this.oldPass,
                }).then(function (data) {
                    var that = this;
                    if (data.body.Result == 1) {
                        this.isShowMsg = true;
                        this.errorMsg = "修改支付密码成功";
                        setTimeout(function () {
                            that.isShowMsg = false;
                            that.$router.push("/mine")
                        }, 1e3)
                    } else {
                        this.isShowMsg = true;
                        this.errorMsg = data.body.Message;
                        setTimeout(function () {
                            that.$router.push("/login");
                            that.isShowMsg = false;
                        }, 1e3)
                    }

                    // 按钮还原
                    oBtn.innerHTML = "提交";
                }, function(response) {
                    console.info(response);
                })
            },
            // 验证函数报错弹窗
            verifyError: function (msg) {
                this.popMsg.isShowMsg = true;
                this.popMsg.errorMsg = msg;
                var that = this;
                setTimeout(function () {
                    that.popMsg.isShowMsg = false;
                }, 1e3)
            },
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
    }
</style>
