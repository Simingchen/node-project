<template>
<div class="pageCon bgf useInfo-page">
    <simple-header title="用户信息" :back-link="true"></simple-header>
    <form-list class="formList">
        <form-item>
            <div class="item-content">
                <div class="item-title label">用户名:</div>
                <div class="item-input">
                    <input type="text" placeholder="请输入用户名" maxlength="10" v-model="items.Usedname" readonly>
                </div>
            </div>
        </form-item>
        <form-item>
            <div class="item-content">
                <div class="item-title label">公司名称:</div>
                <div class="item-input">
                    <input type="text" placeholder="请输入公司名称" maxlength="20" v-model="items.Fname" readonly>
                </div>
            </div>
        </form-item>
        <form-item>
            <div class="item-content">
                <div class="item-title label">真实姓名:</div>
                <div class="item-input">
                    <input type="text" placeholder="请输入真实姓名" maxlength="6" v-model="items.Cname">
                </div>
            </div>
        </form-item>
        <form-item>
            <div class="item-content">
                <div class="item-title label">证件类型:</div>
                <span>身份证</span>
                <!-- <div class="item-input">
                    <select v-model="items.Cardtype">
                        <option>身份证</option>
                        <option>护照</option>
                    </select>
                </div> -->
            </div>
        </form-item>
        <form-item>
            <div class="item-content">
                <div class="item-title label">证件号码:</div>
                <div class="item-input">
                    <input  type="text" placeholder="请输入证件号码" maxlength="20" v-model="items.Cardid" >
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
                <div class="item-title label">手机号码:</div>
                <div class="item-input">
                    <input type="text" placeholder="请输入手机号码" maxlength="12" v-model="items.Mobile" readonly>
                </div>
            </div>
        </form-item>
        <form-item>
            <div class="item-content">
                <div class="item-title label">邮箱:</div>
                <div class="item-input">
                    <input type="email" placeholder="请输入邮箱" maxlength="20" v-model="items.Email">
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
        <span class="button button-large" size="large" @click="saveUserInfo()">保存</span>
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
    import apiList from "../apiList.js"  //api列表

    //引入基于JQ的jquery-weui
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
        data(){
            return {
                popMsg:{
                    isShowMsg: false,     //是否显示弹窗错误信息
                    errorMsg:"",         //弹窗错误信息
                },
                items:{},
                birthday:"",    
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                this.getUserInfo();
                
                //设置标题
                this.setTitle("用户信息");
            })
        },
        methods:{
            getUserInfo:function(){
                var url = apiList.data.UserInfo;
                this.$http.post(url,{
                }).then(function(data){
                    var oData = data.body;
                    if(oData.Result == 1){
                        this.items = oData.User;
                    }
                    if(oData.Result == -1){
                        this.$router.push("/login");
                        return false;
                    }
                }, function(data){
                    // 响应错误回调
                    this.isCheck = false;
                });
            },
            saveUserInfo:function(){
                if(!this.items.Fname.trim()){
                    this.verifyError("请输入公司名")
                    return false;
                }
                if(!this.items.Cname.trim()){
                    this.verifyError("请输入名字")
                    return false;
                }
                if(this.items.Cardid){
                    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                    var isTrue = reg.test(this.items.Cardid);
                    if (!isTrue) {
                        this.verifyError("身份证格式错误");
                        return false;
                    }
                }
                if(!this.items.Mobile.trim()){
                    this.verifyError("请输入手机号")
                    return false;
                }else{
                    var reg = /^1\d{10}$/;
                    var iso = reg.test(this.items.Mobile);
                    if (!iso) {
                        this.verifyError("手机号格式错误");
                        return false;
                    }
                }
                if(this.items.Email){
                    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                    var isTrue = reg.test(this.items.Email);
                    if (!isTrue) {
                        this.verifyError("邮箱格式错误");
                        return false;
                    }
                }
                
                var url = apiList.data.EditUserInfo;
                this.birthday = document.querySelector("#datetime-picker").value
                this.$http.post(url,{
                    realname: this.items.Cname,
                    flyname: this.items.Fname,
                    cardid: this.items.Cardid,
                    sex: this.items.Sex,
                    phone: this.items.Mobile,
                    email: this.items.Email,
                    borth: this.birthday,
                }).then(function(data){
                    this.isCheck = false;
                    var oData = data.body;
                    if(oData.Result == 1){
                        this.popMsg.isShowMsg = true;
                        this.popMsg.errorMsg= "信息修改成功";
                        var that = this;
                        setTimeout(function(){
                            that.popMsg.isShowMsg = false;
                            that.$router.push("/mine");
                        },500)
                    }
                    if(oData.Result == -1){
                        //弹窗
                        this.verifyError(oData.Message);
                        return false;
                    }
                }, function(data){
                    // 响应错误回调
                    this.isCheck = false;
                });
            },
            //获取日期组件
            getDate:function(){
                $("#datetime-picker").datetimePicker({
                    times: function () {},
                    value: document.querySelector("#datetime-picker").value,
                    min:"1950-12-12",
                    max:"2016-12-12",
                    onChange: function (picker, values, displayValues) {
                        document.querySelector("#datetime-picker").value = values[0]+"-"+ values[1] + "-" + values[2];

                    }
                });

                $(".picker-item").css({
                    textAlign:"center!important"
                })
            },
            //验证函数报错弹窗
            verifyError:function(msg){
                this.popMsg.isShowMsg = true;
                this.popMsg.errorMsg= msg;
                var that = this;
                setTimeout(function(){
                    that.popMsg.isShowMsg = false;
                },1e3)
            },
        },
        filters:{
            //日期过滤器
            formatDate:function(value){
                //转换需要的方法
                String.prototype.ToString = function (format){
                    var dateTime = new Date(parseInt(this.substring(6, this.length - 2)));
                    var monthVal = dateTime.getMonth() + 1;
                    monthVal = monthVal < 10 ? "0"+ monthVal : monthVal;
                    format = format.replace("yyyy", dateTime.getFullYear());
                    format = format.replace("yy", dateTime.getFullYear().toString().substr(2));
                    format = format.replace("MM", monthVal)
                    format = format.replace("dd", dateTime.getDate());
                    format = format.replace("hh", dateTime.getHours());
                    format = format.replace("mm", dateTime.getMinutes());
                    format = format.replace("ss", dateTime.getSeconds());
                    format = format.replace("ms", dateTime.getMilliseconds())
                    return format;
                };
                //调用
                return value.ToString("yyyy-MM-dd ");
            }
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
    }
    .picker-items-col-divider{
        display: none!important;

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
</style>
