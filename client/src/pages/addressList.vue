<template>
<div class="addrList-con">
    <div class="addrCon">
        <simple-header class="fixed" title="管理收货地址" :back-link="true" backText="返回"></simple-header>
        <div class="empty" v-if="isEmpty">
            <p class="txt">当前的收货地址为空~  T.T</p>
            <p class="subTxt">快去添加您的收货地址吧</p>
            <button class="btn toActive" :class="{disabled : isAddNew}" :disabled="isAddNew" @click="addNewAddr()">添加新地址</button>
        </div>
        <div v-if="!isEmpty">
            <ul class="con">
                <li class="mb10" v-for="(item,index) in items">
                    <div class="top-li clearfix items-line">
                        <span class="fl">{{item.Shouman}}</span>
                        <span class="fr">{{item.Mobile}}</span>
                    </div>
                    <div class="addr-detail rel bor-bottom items-line">
                        {{item.Prov}} {{item.Xian}} {{item.Town}} {{item.Addr}}
                    </div>
                    <div class="addr-edit items-line clearfix">
                        <div class="fl" v-if="item.Isdefault">
                            <span class="form-checkbox checked"></span>
                            <span>默认地址</span>
                        </div>
                        <div class="fl" v-if="!item.Isdefault" @click="setDefault(item)">
                            <span class="form-checkbox"></span>
                            <span>设为默认</span>
                        </div>
                        <div class="fr">
                            <router-link class="mr10" :to="'/mine/editAddress?code=' + item.Id">
                                <i class="iconfont icon-edit_light"></i>
                                编辑
                            </router-link>
                            <span @click="delBtn(item)">
                                <i class="iconfont icon-delete_light"></i>
                                删除
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
            <p class="tip p10">
                已保存了<b class="c58">{{items.length}}</b>条地址，还能保存<b class="c58">{{7-items.length}}</b>条地址
            </p>
            <button class="addNew" @click="addNewAddr()" v-if="!isAddNew">添加新地址</button>
        </div>
        <!-- 弹窗错误信息 -->
        <div class="notify" v-if="popMsg.isShowMsg">
            <div class="txt">{{popMsg.errorMsg}}</div>
        </div>
        <confirm title="提示" :content="popMsg.errorMsg" :on-ok="DeleteOk" ref="confirm" cancelText="取消" okText="确定"></confirm>
        <popup class="receiver-msg" title="新增收货地址" ref="p1" closeButtonText="关闭">
            <ul>
                <li class="items-line bgf bor-bottom">
                    <label for="receiver">收货人</label>
                    <input id="receiver" type="text" placeholder="名字(必填)" maxlength="10" v-model.trim="receiverMsg.name">
                </li>
                <li class="items-line bgf bor-bottom">
                    <label for="receiver">身份证</label>
                    <input id="receiver" type="text" placeholder="身份证,作为全球购身份验证(选填)" maxlength="25" v-model.trim="receiverMsg.identity">
                </li>
                <li class="items-line bgf bor-bottom">
                    <label for="phone">手机号</label>
                    <input id="phone" type="text" placeholder="手机号(必填)" maxlength="11" v-model.trim="receiverMsg.phone" pattern="[0-9]*">
                </li>
                <li class="items-line bgf bor-bottom">
                    <label for="phone">固定电话号</label>
                    <input id="phone" type="text" placeholder="固定电话号(选填)" maxlength="20" v-model.trim="receiverMsg.tell">
                </li>
                <li class="items-line bgf bor-bottom">
                    <label for="area">选择地区</label>
                    <input id="area" type="text" placeholder="选择地区(必填)" readonly @click="cityPicker()">
                </li>
                <li class="items-line bgf bor-bottom">
                    <label for="address">详细地址</label>
                    <input id="address" type="text" placeholder="如街道,楼层,门牌号等(必填)" maxlength="20" v-model.trim="receiverMsg.address">
                </li>
                <li class="items-line bgf bor-bottom">
                    <label for="zipCode">邮政编码</label>
                    <input id="zipCode" type="text" placeholder="邮政编码(选填)" maxlength="10" v-model.trim="receiverMsg.zipCode" pattern="[0-9]*">
                </li>
                <li class="items-line bgf bor-bottom">
                    <label for="email">邮件</label>
                    <input id="email" type="email" placeholder="邮件(选填)" maxlength="10" v-model.trim="receiverMsg.email">
                </li>
                <li class="bgf">
                    <input class="save-btn" type="button" value="保存" @click="saveReceiverMsg()">
                </li>
            </ul>
        </popup>
    </div>
</div>
</template>

<script>
    import Content from '../components/content'
    import { SimpleHeader } from '../components/header'
    import { Confirm } from '../components/modal'
    import Popup from '../components/popup'
    import apiList from "../apiList.js"  // api列表

    // 引入基于JQ的jquery-weui
    // import $ from '../directives/jquery-vendor.js'
    // import '../directives/jquery-weui.js'
    // import '../directives/city-picker.js'

    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
            Confirm,
            Popup
        },
        data () {
            return {
                isEmpty: "",
                items: [],           // 地址数据
                isAddNew: false,   // 是否显示添加按钮
                curItem: "",        // 删除选定当前
                popMsg: {
                    isShowMsg: false,     // 是否显示弹窗错误信息
                    errorMsg: "",         // 弹窗错误信息
                },
                receiverMsg: {           // 收货人信息
                    name: "",
                    identity: "",
                    phone: "",
                    tell: "",
                    area: "",
                    address: "",
                    zipCode: "",
                    email: ""
                },
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getAddressList();
                
                // 设置标题
                this.setTitle("地址列表");
            })
        },
        methods: {
            // 获取地址数据
            getAddressList: function () {
                var url = apiList.data.ShouAddrList;
                this.$http.post(url, {
                    //  type: index
                }).then(function (data) {
                    if (data.body.Result == 1) {
                        this.items = data.body.Shouaddrlist;
                        // 地址长度大于7禁止添加
                        this.verifyLength();
                    } else {
                        this.$router.push("/login");
                    }
                }, function (response) {
                    console.info(response);
                });
            },
            // 设置默认地址
            setDefault: function (item) {
                var url = apiList.data.AjaxIsdefault;
                this.$http.post(url, {
                    id: item.Id
                }).then(function (data) {
                    var oData = data.body;
                    
                    this.popMsg.isShowMsg = true;
                    this.popMsg.errorMsg = oData.Message;
                    var that = this;
                    setTimeout(function () {
                        that.popMsg.isShowMsg = false;
                    }, 1e3);

                    if (oData.Result == 1) {
                        this.items.forEach((item1, index) => {
                            if (item.Id == item1.Id) {
                                item1.Isdefault = true;
                            } else {
                                item1.Isdefault = false;
                            }
                        })
                    }
                }, function (response) {
                    console.info(response);
                });
            },
            // 删除按钮
            delBtn: function (item) {
                this.$refs.confirm.open();
                this.popMsg.errorMsg = "删除所选项吗？";
                this.curItem = item;
            },
            // 确认删除
            DeleteOk: function() {
                var url = apiList.data.AddrDelete;
                this.$http.post(url, {
                    id: this.curItem.Id
                }).then(function (data) {
                    if (data.body.Result == 1) {
                        var index = this.items.indexOf(this.curItem);
                        this.items.splice(index, 1);

                        // 如果删除项是默认地址，那默认第一项为默认地址
                        if (this.curItem.Isdefault && this.items.length) {
                            this.setDefault(this.items[0]);
                        }
                        // 关闭弹窗
                        this.$refs.confirm.close();
                        // 地址长度大于7禁止添加
                        this.verifyLength();
                    } else {
                        this.popMsg.errorMsg = data.body.Message;
                        this.$refs.confirm.open();
                    }
                }, function (response) {
                    console.info(response);
                });
            },
            // 添加新地址
            addNewAddr: function () {
                this.$refs.p1.open();
            },
            // 保存收货地址
            saveReceiverMsg: function () {
                var reg;
                if (!this.receiverMsg.name) {
                    this.verifyError("请输入名字")
                    return false;
                }
                if (this.receiverMsg.identity) {
                    reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                    var isIdent = reg.test(this.receiverMsg.identity);
                    if (!isIdent) {
                        this.verifyError("身份证格式错误");
                        return false;
                    }
                }
                if (!this.receiverMsg.phone.trim()) {
                    this.verifyError("请输入手机号")
                    return false;
                } else {
                    reg = /^1\d{10}$/;
                    var iso = reg.test(this.receiverMsg.phone);
                    if (!iso) {
                        this.verifyError("手机号格式错误");
                        return false;
                    }
                }
                if (this.receiverMsg.tell) {
                    reg = /\d{3}-\d{8}|\d{4}-\d{7}/;
                    var isTell = reg.test(this.receiverMsg.tell);
                    if (!isTell) {
                        this.verifyError("电话格式错误");
                        return false;
                    }
                }
                var area = document.querySelector("#area");
                if (!area.value.trim()) {
                    this.verifyError("请输入地区")
                    return false;
                }
                if (!this.receiverMsg.address.trim()) {
                    this.verifyError("请输入详细地址")
                    return false;
                }
                if (this.receiverMsg.zipCode) {
                    reg = /^[1-9][0-9]{5}$/
                    var isZip = reg.test(this.receiverMsg.zipCode);
                    if (!isZip) {
                        this.verifyError("邮政编码格式错误");
                        return false;
                    }
                }
                if (this.receiverMsg.mail) {
                    reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                    var isMall = reg.test(this.receiverMsg.mail);
                    if (!isMall) {
                        this.verifyError("邮箱格式错误");
                        return false;
                    }
                }
                
                var provice = area.getAttribute("data-code0");
                var city = area.getAttribute("data-code1");
                var county = area.getAttribute("data-code2");

                // 按钮禁止
                var oBtn = this.$el.querySelector(".save-btn");
                oBtn.value = "保存中...";

                var url = apiList.data.SaveShouAdress;
                this.$http.post(url, {
                    shouman: this.receiverMsg.name,
                    cardid: this.receiverMsg.identity,
                    phone: this.receiverMsg.phone,
                    area: area.value,
                    addrdetial: this.receiverMsg.address,
                    postcode: this.receiverMsg.zipCode,
                    email: this.receiverMsg.email,
                    addrtag: "",
                    provid: provice,
                    xianid: city,
                    townid: county,
                }).then(function (data) {
                    if (data.body.Result == 1) {
                        // 重新加载地址列表
                        this.getAddressList();
                        // 地址长度大于7禁止添加
                        this.verifyLength();
                        this.verifyError("保存成功");
                        // 地址长度大于7禁止添加
                        this.verifyLength();
                    } else {
                        this.popMsg.errorMsg = data.body.Message;
                        this.$refs.confirm.open();
                    }
                    // 按钮还原
                    oBtn.value = "保存";
                }, function (response) {
                    console.info(response);
                })
                
                this.$refs.p1.close();
            },
            // 验证函数
            verifyError: function (msg) {
                this.popMsg.isShowMsg = true;
                this.popMsg.errorMsg = msg;
                var that = this;
                setTimeout(function () {
                    that.popMsg.isShowMsg = false;
                }, 1e3)
            },
            // 地址选择器
            cityPicker: function () {
                /* global $ */
                $("#area").cityPicker({});
            },
            // 检验列表长度
            verifyLength: function () {
                this.isAddNew = this.items.length >= 7;
                this.isEmpty = this.items.length < 1;
            }
        }
    }
</script>
<style lang="less">
    .addrList-con{
        padding-top:2.2rem;
        max-width: 640px;
        margin:0 auto;
        .tip{
           padding-bottom:5.2rem; 
        }
        .addr-detail{
            padding-top:0;
        }
        .form-checkbox{
            border-radius: 100%;
            display: inline-block;
            vertical-align: middle;
            line-height: 3.0rem;
            width: 0.9rem;
            height: 0.9rem;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAVFBMVEUAAACampqioqKZmZmampqampqampqampqcnJyqqqqampqampqampqampqbm5v///+ZmZn5+fn09PTw8PDm5ubR0dHPz8/Jycm7u7uxsbGdnZ3d3d2KAK0RAAAAD3RSTlMAvRDz2cWQUTsDXdaioVxmAFd6AAAA6klEQVQ4y42UWRaEIAwEEfeVxn25/z2H6OhTB5jUdz9SBBJxRzZ1EIVhFNSNFHbSADeC1BLJYryIs1ckT0AsQ99p3fXDAiLJHzJUaZ20utDTSjXlLVMCmFv1oJ0BlFcqp3NG9cNIZ50VyWdTFjby+t7rPMd+1nHH2PgoB8Yr3nsIrK0r1K4AddVYT8rJZNzN9QFod0gDkKIAFuVhAQpRAYMvNAAVKfW+UE9SEdD5Qh0QiXD39pqHrBCrHE+8/t+CmtPMhvUsnAdmfRXOp2N9X84gsEaKM5ycMWcvDP7q4S8xQhbVsQ6r4iHzAbrdPVnePehPAAAAAElFTkSuQmCC);
            background-repeat: no-repeat;
            background-size: 0.9rem;
            &.checked{
                background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAS1BMVEUAAAAzhPszhPoyhPsyhPozg/s0hPwyhPw0hvs8h/9Aj/8yg/syg/ozhPsyg/r///+wz/2RvfxTl/pup/vT5P3U5f16r/u91/18sPvWF+94AAAADnRSTlMAvdnFopBcUTsREPPW8utY9+UAAADeSURBVDjLlZTrDoMgDIWpIoqX1svm9v5PumRGD7Aq7vtH8iWnFFoT4p2lousKss4bnZo4gGpFaUpOKJvUqVihipSWWIXawOn5hB4W8Smk16PX1fAl2x3La6n89pA1lpV36rOqJ5ElqN1rziwi7+PkjdOkp8gDJ2esHiYzjtaQHjZFDS2O+yxxGChMtzsiYxQGOjNAkhFhIQPixs1CWBBHHFkIA2QsR9YLYUELHMcWwoJmeo4shAGfPPCIMJT081XWlVPqm58u/31vD0J+pPLDeXPM8wsjv3r+XWL5dfgBB3w3WcIaGhAAAAAASUVORK5CYII=);
            }
        }
        
        .addNew{
            position:fixed;
            bottom:0;
            width:100%;
            max-width:640px;
            height:2.2rem;
            text-align: center;
            line-height: 2.2rem;
            color:#fff;
            background-color: #ec584e;
            font-size: 16px;
            z-index: 5;
            border:0;
            margin:0 auto;
            &.disabled{
                color:#fff;
                background-color: #999; 
            }
        }
        .fixed{
            position: fixed;
            width:100%;
            top:0;
            max-width: 640px;
            margin:0 auto;
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
        .receiver-msg{
            li{
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;
                height:2.4rem;
                line-height: 1.4rem;
                &:last-child{
                    height:3.0rem;
                }
                input{
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    flex: 1;
                    border:0;
                }
                label{
                    width:90px;
                }
            }
            .save-btn{
                color: #fff;
                background-color: #f6383a;
                border-radius: .25rem;
                line-height: 2rem;
                appearance: none;
                padding: 0 .8rem;
                margin:10px;
                height: 2rem;
                font-size: .8rem;
            }
        }
        .empty{
            padding-top:50px;
            text-align: center;
            .txt{
                font-size: 16px;
                margin-bottom: 5px;
                color: #666;
            }
            .subTxt{
                margin-bottom:20px;
                color:#999;
            }
            .btn{
                display: block;
                width:5.2rem;
                height:1.8rem;
                margin: 0 auto;
                border: 1px solid #ec584e;
                border-radius: 3px;
                text-align: center;
                line-height: 1.8rem;
                color: #ec584e;
                background-color: transparent;
                font-size: 12px;
            }
        }
        .mr10{
            margin-right:10px;
        }
    }
</style>
<style lang="less"> 
    /*地址选择器*/
    @import "../assets/css/cityPicker.less";
</style>
