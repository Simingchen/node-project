<template>
<div class="pageCon bgf useInfo-page">
    <simple-header title="用户信息" :back-link="true"></simple-header>
    <form-list class="formList">
        <form-item>
            <div class="item-content">
                <div class="item-title label">用户名:</div>
                <div class="item-input">
                    <input type="text" placeholder="请输入用户名" maxlength="10" v-model.trim="items.Usedname" readonly>
                </div>
            </div>
        </form-item>
        <form-item>
            <div class="item-content">
                <div class="item-title label">公司名称:</div>
                <div class="item-input">
                    <input type="text" placeholder="请输入公司名称" maxlength="20" v-model.trim="items.Fname" readonly>
                </div>
            </div>
        </form-item>
        <form-item>
            <div class="item-content">
                <div class="item-title label">真实姓名:</div>
                <div class="item-input">
                    <input type="text" placeholder="请输入真实姓名" maxlength="6" v-model.trim="items.Cname">
                </div>
            </div>
        </form-item>
        <form-item>
            <div class="item-content">
                <div class="item-title label">身份证:</div>
                <div class="item-input">
                    <input  type="text" placeholder="请输入身份证号码" maxlength="20" v-model.trim="items.Cardid" >
                </div>
            </div>
        </form-item>
        <form-item>
            <div class="item-content">
                <div class="item-title label">性别:</div>
                <div class="item-input">
                    <select v-model="items.Sex">
                        <option>男</option>
                        <option>女</option>
                    </select>
                </div>
            </div>
        </form-item>
        <form-item>
            <div class="item-content">
                <div class="item-title label tag">手机号码:</div>
                <div class="item-input rel">
                    <input type="text" placeholder="请输入手机号码" maxlength="12" v-model.trim="items.Mobile" readonly>
                    <router-link class="verify-code" to="/mine/modifyPhone">修改</router-link>
                </div>
            </div>
        </form-item>
        <form-item>
            <div class="item-content">
                <div class="item-title label tag">邮箱:</div>
                <div class="item-input">
                    <input type="email" placeholder="请输入邮箱" maxlength="20" v-model.trim="items.Email">
                </div>
            </div>
        </form-item>
        <form-item>
            <div class="item-content">
                <div class="item-title label">出生日期:</div>
                <div class="item-input">
                    <input id='datetime-picker' type="text" 
                    placeholder="请输入出生日期" 
                    :value="items.Borth | formatDate('')"
                    readonly @click="getDate()">
                </div>
            </div>
        </form-item>
    </form-list>
    <div class="bot">
        <span class="button button-large" id="save-btn" size="large" @click="saveUserInfo()">保存</span>
    </div>
    <!-- 弹窗错误信息 -->
    <div class="notify" v-if="popMsg.isShowMsg">
        <div class="txt">{{popMsg.errorMsg}}</div>
    </div>
</div>
</template>

<script>
    import { SimpleHeader } from '../components/header'
    import { Button } from '../components/buttons'
    import Content from '../components/content'
    import { Form, FormItem } from '../components/form'
    import apiList from "../apiList.js"  // api列表

    // 引入基于JQ的jquery-weui
    import $ from '../directives/jquery-vendor.js'
    import '../directives/jquery-weui.js'

    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
            'm-button': Button,
            'form-list': Form,
            FormItem
        },
        data () {
            return {
                popMsg: {
                    isShowMsg: false,     // 是否显示弹窗错误信息
                    errorMsg: "",         // 弹窗错误信息
                },
                items: {},
                birthday: "",    
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getUserInfo();
                
                // 设置标题
                this.setTitle("用户信息");
            })
        },
        methods: {
            getUserInfo: function () {
                var url = apiList.data.UserInfo;
                this.$http.post(url, {
                }).then(function (data) {
                    var oData = data.body;
                    if (oData.Result == 1) {
                        this.items = oData.User;
                    }
                    if (oData.Result == -1) {
                        this.$router.push("/login");
                        return false;
                    }
                }, function (data) {
                    console.info(data);
                });
            },
            saveUserInfo: function () {
                var reg;
                var isTrue;
                // if (!this.items.Fname.trim()) {
                //     this.verifyError("请输入公司名")
                //     return false;
                // }
                // if (!this.items.Cname.trim()) {
                //     this.verifyError("请输入名字")
                //     return false;
                // }
                // if (this.items.Cardid) {
                //     reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                //     isTrue = reg.test(this.items.Cardid);
                //     if (!isTrue) {
                //         this.verifyError("身份证格式错误");
                //         return false;
                //     }
                // }
                if (!this.items.Mobile) {
                    this.verifyError("请输入手机号")
                    return false;
                } else {
                    reg = /^1\d{10}$/;
                    isTrue = reg.test(this.items.Mobile);
                    if (!isTrue) {
                        this.verifyError("手机号格式错误");
                        return false;
                    }
                }
                if (this.items.Email) {
                    reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                    isTrue = reg.test(this.items.Email);
                    if (!isTrue) {
                        this.verifyError("邮箱格式错误");
                        return false;
                    }
                }
                
                this.birthday = document.querySelector("#datetime-picker").value;
                // 禁止按钮
                this.isCheck = true;
                var oBtn = this.$el.querySelector("#save-btn");
                oBtn.innerHTML = "提交中...";

                var url = apiList.data.EditUserInfo;
                this.$http.post(url, {
                    realname: this.items.Cname,
                    flyname: this.items.Fname,
                    cardid: this.items.Cardid,
                    sex: this.items.Sex,
                    phone: this.items.Mobile,
                    email: this.items.Email,
                    borth: this.birthday,
                }).then(function (data) {
                    this.isCheck = false;
                    var oData = data.body;
                    var that = this;
                    if (oData.Result == 1) {
                        this.popMsg.isShowMsg = true;
                        this.popMsg.errorMsg = "信息修改成功";
                        
                        setTimeout(function () {
                            that.popMsg.isShowMsg = false;
                            that.$router.push("/mine");
                        }, 1e3)
                    }
                    if (oData.Result == -1) {
                        // 弹窗
                        this.verifyError(oData.Message);
                        setTimeout(function () {
                            that.$router.push("/login");
                        }, 1e3)
                        return false;
                    }
                    // 按钮还原
                    oBtn.innerHTML = "提交";
                }, function (data) {
                    console.info(data);
                });
            },
            // 获取日期组件
            getDate: function () {
                $("#datetime-picker").datetimePicker({
                    times: function () {},
                    value: document.querySelector("#datetime-picker").value,
                    min: "1960-12-12",
                    max: "2016-12-12",
                    onChange: function (picker, values, displayValues) {
                        document.querySelector("#datetime-picker").value = values[0] + "-" + values[1] + "-" + values[2];
                    }
                });
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
    .useInfo-page{
        .formList{
            padding-top:2.2rem;
            margin:0;
        }
        .bot{
            padding:0 10px 10px;
        }
        .verify-code {
            display: block;
            position: absolute;
            right: 0.5rem;
            top: 50%;
            height: 1.5rem;
            line-height: 1.5rem;
            padding: 0 10px;
            margin-top: -0.75rem;
            color: #fff;
            background-color: #ec584e;
            border: none;
            margin-right: 3px;
            border-radius: 5px;
            font-family: Georgia,Tahoma,Arial;
            letter-spacing: 2px;
            z-index: 10;
        }
    }
    .picker-items-col-divider{
        display: none!important;

    }
    .tag{
        position:relative;
        &:before{
            position:absolute;
            content:"*";
            color:#ec584e;
            left:-0.5rem;
        }
    }
</style>
