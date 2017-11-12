<template>
<div class="my-page editAddress-page">
    <simple-header title="编辑收货地址" :back-link="true" backText="返回"></simple-header>
    <page-content>
        <ul class="receiver-msg">
            <li class="items-line bgf bor-bottom">
                <label for="receiver">收货人</label>
                <input id="receiver" type="text" placeholder="名字(必填)" maxlength="10" v-model="items.Shouman">
            </li>
            <li class="items-line bgf bor-bottom">
                <label for="receiver">身份证</label>
                <input id="receiver" type="text" placeholder="身份证,作为全球购身份验证(选填)" maxlength="25" v-model="items.Cardid">
            </li>
            <li class="items-line bgf bor-bottom">
                <label for="phone">手机号</label>
                <input id="phone" type="text" placeholder="手机号(必填)" maxlength="11" v-model="items.Mobile" pattern="[0-9]*">
            </li>
            <li class="items-line bgf bor-bottom">
                <label for="phone">固定电话号</label>
                <input id="phone" type="text" placeholder="固定电话号(选填)" maxlength="20" v-model="items.Tel">
            </li>
            <li class="items-line bgf bor-bottom">
                <label for="area">选择地区</label>
                <input id="area" type="text" placeholder="选择地区(必填)" readonly @click="cityPicker()" :value="items.Prov+' '+items.Xian+' '+items.Town">
            </li>
            <li class="items-line bgf bor-bottom">
                <label for="address">详细地址</label>
                <input id="address" type="text" placeholder="如街道,楼层,门牌号等(必填)" maxlength="20" v-model="items.Addr">
            </li>
            <li class="items-line bgf bor-bottom">
                <label for="zipCode">邮政编码</label>
                <input id="zipCode" type="text" placeholder="邮政编码(选填)" maxlength="10" v-model="items.Postcode" pattern="[0-9]*">
            </li>
            <li class="items-line bgf bor-bottom">
                <label for="zipCode">邮件</label>
                <input id="zipCode" type="email" placeholder="邮件(选填)" maxlength="10" v-model="items.Email">
            </li>
            <li class="bgf">
                <input class="save-btn" type="button" value="保存" @click="saveReceiverMsg()">
            </li>
        </ul>
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
    import apiList from "../apiList.js"  //api列表

    export default {
        components: {
            SimpleHeader,
            'page-content': Content
        },
        data(){
            return{
                items:{},
                popMsg:{
                    isShowMsg: false,     //是否显示弹窗错误信息
                    errorMsg:"",         //弹窗错误信息
                },
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                this.getAddress();
                
                //设置标题
                this.setTitle("编辑收货地址");
            })
        },
        methods:{
            getAddress:function(){
                var code = this.$route.query.code;
                var url = apiList.data.ShouAddressdetail;

                this.$http.post(url,{
                    id:code
                }).then(function(data){   //依赖vue-resource
                    var oData = data.body;
                    if(oData.Result == 1){
                        this.items = oData.Shouaddr;
                    }else{
                        this.$router.push("/login");
                    }
                },function(response){
                    console.info(response);
                })
            },
            //保存收货地址
            saveReceiverMsg:function(){
                if(!this.items.Shouman.trim()){
                    this.verifyError("请输入名字")
                    return false;
                }
                if(this.items.Cardid){
                    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                    var isTrue = reg.test(this.items.identity);
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
                if(this.items.Tel){
                    var reg = /\d{3}-\d{8}|\d{4}-\d{7}/;
                    var isTrue = reg.test(this.items.Tel);
                    if (!isTrue) {
                        this.verifyError("电话格式错误");
                        return false;
                    }
                }
                var area = document.querySelector("#area");
                if(!area.value.trim()){
                    this.verifyError("请输入地区")
                    return false;
                }
                if(!this.items.Addr.trim()){
                    this.verifyError("请输入详细地址")
                    return false;
                }
                if(this.items.Postcode){
                    var reg = /^[1-9][0-9]{5}$/
                    var isTrue = reg.test(this.items.zipCode);
                    if (!isTrue) {
                        this.verifyError("邮政编码格式错误");
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
                var url = apiList.data.SaveShouAdress;

                var provice = "";
                var city = "";
                var county = "";

                //如果未做修改继续使用接口数据
                if(area.getAttribute("data-code0")){
                    provice = area.getAttribute("data-code0");
                    city = area.getAttribute("data-code1");
                    county = area.getAttribute("data-code2");
                }else{
                    provice = this.items.Provid;
                    city = this.items.Xianid;
                    county = this.items.TownId;
                }
                
                this.$http.post(url,{
                    Id:this.items.Id,
                    shouman:this.items.Shouman,
                    cardid:this.items.Cardid,
                    phone:this.items.Mobile,
                    area:area.value,
                    addrdetial:this.items.Addr,
                    postcode:this.items.Postcode,
                    email:this.items.Email,
                    addrtag:"",
                    provid :provice,
                    xianid:city,
                    townid:county,
                }).then(function(data){   //依赖vue-resource
                    if(data.body.Result == 1){
                        this.popMsg.isShowMsg = true;
                        this.popMsg.errorMsg= "地址修改成功";
                        var that = this;
                        setTimeout(function(){
                            that.popMsg.isShowMsg = false;
                            that.$router.push("/mine/addressList");
                        },500)
                    }else{

                    }
                },function(response){
                    console.info(response);
                })
            },
            
            //验证函数
            verifyError:function(msg){
                this.popMsg.isShowMsg = true;
                this.popMsg.errorMsg= msg;
                var that = this;
                setTimeout(function(){
                    that.popMsg.isShowMsg = false;
                },1e3)
            },
            //地址选择器
            cityPicker:function(){
                $("#area").cityPicker({});
            },
            // 禁止首页touchmove
            stopMove:function(){
                this.$el.querySelector(".login-page").addEventListener("touchmove",function(e){
                    e.preventDefault();
                    e.stopPropagation();
                },false);
            },
        }
    }
</script>
<style lang="less">
    .editAddress-page{
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
    }
    
</style>