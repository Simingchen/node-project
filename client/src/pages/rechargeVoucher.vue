<template>
<div class="page voucher-page">
    <simple-header class="fixed" title="积分卡充值" :back-link="true"></simple-header>
    <page-content>
        <ul class="con">
            <li class="flex-box form-list bor-bottom rel bgf">
                <label class="lab" for="cardNo">账号</label>
                <div class="flex-item">
                    <input id="cardNo" type="text" width="100%" v-model.trim="cardNo" pattern=[0-9]* maxlength="15" placeholder="请输入您的账号">
                </div>
            </li>
            <li class="flex-box form-list bor-bottom rel bgf">
                <label class="lab" for="inviteCode">邀请码</label>
                <div class="flex-item">
                    <input id="inviteCode" type="text" width="100%" v-model.trim="inviteCode" maxlength="15" placeholder="请输入邀请码">
                </div>
            </li>
            <li class="flex-box form-list bor-bottom rel bgf">
                <label class="lab" for="verify">验证码</label>
                <div class="flex-item rel">
                    <input id="verify" type="text" width="100%" v-model.trim="verify" maxlength="15" placeholder="请输入验证码">
                    <span class="verify-code" @click="createCode()">{{verifyCode}}</span>
                </div>
            </li>
            <li class="bot">
                <span class="button button-large" @click="recharge()">充值</span>
            </li>
            <li class="clearfix p10">
                <span class="fr c6" @click="$refs.voucher.open()">什么是积分卡？</span>
            </li>
        </ul>
    </page-content>
    <!-- 弹窗 -->
    <alert title="提示" :content="errorMsg" ref="alert"></alert>
    <popup class="" title="积分卡" ref="voucher">
        <div class="p10">
            积分卡是分享汇商城发布的VIP积分卡背面，需要刮开保密涂层才能识别和使用；刮开相应位置查看卡号和邀请码，用户输入积分卡号、邀请码后提交验证，验证通过即充入相应积分，邀请码只能使用一次；且超过有效期后的邀请码自动失效，请在期限内注册使用.
        </div>
    </popup>
</div>
</template>

<script>
    import Content from '../components/content'
    import { SimpleHeader } from '../components/header'
    import Popup from '../components/popup'
    import { Alert } from '../components/modal'
    import apiList from "../apiList.js"  // api列表

    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
            Alert,
            Popup
        },
        data () {
            return {
                cardNo: "",        // 卡号
                inviteCode: "",  // 邀请
                verify: "",      // 验证码输入
                verifyCode: "",  // 验证码
                errorMsg: "请输入账号！",       // 报错弹窗信息
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                // 产生验证码
                this.createCode();

                // 设置标题
                this.setTitle("积分卡充值");
            })
        },
        methods: {
            recharge: function () {
                if (!this.cardNo) {
                    this.tips("请输入卡号！");
                    return false;
                }
                if (!this.inviteCode) {
                    this.tips("请输入邀请码！");
                    return false;
                }
                if (!this.verify) {
                    this.tips("请输入验证码！");
                    return false;
                }
                if (this.verify.toUpperCase()) {
                    if (this.verifyCode != this.verify.toUpperCase()) {
                        this.tips("验证码错误！");
                        // 产生验证码
                        this.createCode();
                        return false;
                    }
                }
                var url = apiList.data.Recharge;
                this.$http.post(url, {
                    type: 9,
                    cardno: this.cardNo,
                    code: this.inviteCode,
                    amount: 12
                }).then(function (data) {
                    var oData = data.body;
                    this.tips(oData.Message);
                    if (oData.Result == 1) {
                        this.$router.push("/mine/userAcount");
                    } else {
                        if (oData.Result == -1) {
                            this.$router.push("/login");
                        }
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 产生验证码 
            createCode: function () {  
                var code = "";   
                var codeLength = 4;// 验证码的长度  
                var random = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; // 随机数  
                for (var i = 0; i < codeLength; i++) {     // 循环操作  
                    var index = Math.floor(Math.random() * 36);     // 取得随机数的索引（0~35）  
                    code += random[index];          // 根据索引取得随机数加到code上  
                }  
                this.verifyCode = code;     // 把code值赋给验证码  
            },
            // alert提示
            tips: function (txt) {
                this.errorMsg = txt;
                this.$refs.alert.open();
            }
        }
    }
</script>
<style lang="less">
    .voucher-page{
        .con{
            margin-top:1.0rem;
            .flex-box{
                padding-left: .75rem;
            }
            .lab{
                width: 3.0rem;
                line-height: 2.15rem;
            }
            .bot{
                padding:0 10px 10px;
                margin-top:20px;
            }
            .verify-code{
                display:block;
                position: absolute;
                right: 15px;
                top: 50%;
                height: 1.5rem;
                line-height: 1.5rem;
                padding: 0 10px;
                margin-top: -.75rem;
                color: #fff;
                background-color: #ec584e;
                border: none;
                margin-right: 3px;
                border-radius: 5px;
                font-family: Georgia,Tahoma,Arial;
                letter-spacing: 2px;
            }
            .verify-code{

            }
        }
    }
</style>
