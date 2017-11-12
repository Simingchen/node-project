<template>
<div class="my-page order-page">
    <!-- <simple-header title="我的订单" :back-link="true"></simple-header> -->
    <div>
        <div class="address-box bgf" >
            <div class="empty" v-if="!isEmptyaddress" @click="addNewAddr()">
                <p>新增收货地址</p>
                <span class="link-arrow icon icon-link"></span>
            </div>
            <div class="addr-li" 
                 @click="sclectAddr()" 
                 v-for="(address,index) in items.Addrs" 
                 v-if="isEmptyaddress && address.Isdefault">
                <div class="name-tel">
                    <span>收货人：{{address.Shouman}}</span>
                    <span>{{address.Mobile}}</span>
                </div>
                <div class="addr-detail">收货地址：{{address.Prov}}{{address.Xian}}{{address.Town}}{{address.Addr}}
                </div>
                <span class="link-arrow icon icon-link"></span>
            </div>
        </div>
        <list class="goods-li bgf">
            <!-- 购物车结算过来的订单 -->
            <list-item class="item" v-for="(item,index) in items.Sels" :key="index" v-if="orderType == 1">   
                <img v-lazy="'http://www.shihuamall.com'+item.Thumbnail" width="90" height="90">
                <div class="item-content">
                    <div class="item-title-row">
                        <div class="item-title">
                            {{item.Hname}}
                        </div>
                    </div>
                    <div class="item-subtitle sku-box">
                        <p>{{item.Ys1typename}}{{item.Ys1name}}</p>
                        <p>{{item.Ys2typename}}{{item.Ys2name}}</p>
                        <div class="num">×<span class="num-txt">{{item.Nums}}</span></div>
                    </div>
                </div>
            </list-item>
            <list-item class="item" :key="1" v-if="orderType == 2">
                <!-- 立即购买过来的订单 -->
                <img v-lazy="'http://www.shihuamall.com'+items.Sels.Thumbnail" width="90" height="90">
                <div class="item-content">
                    <div class="item-title-row">
                        <div class="item-title">
                            {{items.Sels.Hname}}
                        </div>
                    </div>
                    <div class="item-subtitle sku-box">
                        <p>{{items.Sels.Ys1typename}}{{items.Sels.Ys1name}}</p>
                        <p>{{items.Sels.Ys2typename}}{{items.Sels.Ys2name}}</p>
                        <div class="num">×<span class="num-txt">{{items.Sels.Nums}}</span></div>
                    </div>
                </div>
            </list-item>
        </list>
        <div class="items-line deliver-box rel p10 clearfix bgf bor-bottom" @click="deliveType()">
            <p class="fl">配送方式</p>
            <div class="deliver-msg fr">
                <p class="money">0.00</p>
                <p>快递发货</p>
            </div>
            <span class="link-arrow icon icon-link"></span>
        </div>
        <div class="items-line leave-msg bor-bottom">
            <span class="txt">买家留言：</span>
            <textarea placeholder="选填:对本次交易的说明" maxlength="100" v-model="leaveMsg"></textarea>
        </div>
        <div class="invoice-box items-line bor-bottom">
            <div class="clearfix">
                <span class="fl lh52">索要发票</span>
                <span class="fr" @click="getInvoice()">
                    <input class="invisible" type="checkbox" v-model="getInvoiceChecked">
                    <switcher></switcher>
                </span>
            </div>
            <div class="items-line" v-show="getInvoiceChecked">
                <div>
                    <label for="">发票抬头</label>
                    <input class="input" type="text" placeholder="发票抬头" v-model="invoiceTxt">
                </div>
                <div>
                    <label for="invoiceType">发票类型</label>
                    <input class="input" type="text" id="invoiceType" placeholder="发票类型" readonly>
                </div>
            </div>
        </div>
        <!-- <div class="items-line total-price clearfix bor-bottom">
            <span class="fl">合计</span>
            <span class="money fr">{{totalMoney | formatMoney("")}}</span>
        </div> -->
        <!-- <div class="items-line discount-msg clearfix bor-bottom" @click="discountType()">
            <span class="fl">优惠</span>
            <span class="use fr">使用优惠</span>
            <span class="link-arrow icon icon-link"></span>
        </div> -->
        <!-- <div class="items-line sms-msg clearfix bor-bottom">
            <span class="fl">短信通知收件人</span>
            <switcher class="fr"></switcher>
        </div> -->
        <div class="items-line all-msg clearfix bor-bottom mt10">
            <div class="line clearfix">
                <span class="fl">商品金额</span>
                <span class="fr">{{totalMoney | formatMoney("")}}</span>
            </div>
            <div class="line clearfix">
                <span class="fl">运费</span>
                <span class="fr">0.00</span>
            </div>
        </div>
    </div>
    <popup class="receiver-msg" title="新增收货地址" ref="p1">
        <ul>
            <li class="items-line bgf bor-bottom">
                <label for="receiver">收货人</label>
                <input id="receiver" type="text" placeholder="名字(必填)" maxlength="10" v-model="receiverMsg.name">
            </li>
            <li class="items-line bgf bor-bottom">
                <label for="receiver">身份证</label>
                <input id="receiver" type="text" placeholder="身份证,作为全球购身份验证(选填)" maxlength="25" v-model="receiverMsg.identity">
            </li>
            <li class="items-line bgf bor-bottom">
                <label for="phone">手机号</label>
                <input id="phone" type="text" placeholder="手机号(必填)" maxlength="12" v-model="receiverMsg.phone" pattern="[0-9]*">
            </li>
            <li class="items-line bgf bor-bottom">
                <label for="phone">固定电话号</label>
                <input id="phone" type="text" placeholder="固定电话号(选填)" maxlength="20" v-model="receiverMsg.tell">
            </li>
            <li class="items-line bgf bor-bottom">
                <label for="area">选择地区</label>
                <input id="area" type="text" placeholder="选择地区(必填)" readonly @click="cityPicker()">
            </li>
            <li class="items-line bgf bor-bottom">
                <label for="address">详细地址</label>
                <input id="address" type="text" placeholder="如街道,楼层,门牌号等(必填)" maxlength="20" v-model="receiverMsg.address">
            </li>
            <li class="items-line bgf bor-bottom">
                <label for="zipCode">邮政编码</label>
                <input id="zipCode" type="text" placeholder="邮政编码(选填)" maxlength="10" v-model="receiverMsg.zipCode" pattern="[0-9]*">
            </li>
            <li class="items-line bgf bor-bottom">
                <label for="zipCode">邮件</label>
                <input id="zipCode" type="mail" placeholder="邮件(选填)" maxlength="10" v-model="receiverMsg.email">
            </li>
            <li class="bgf">
                <input class="save-btn" type="button" value="保存" @click="saveReceiverMsg()">
            </li>
        </ul>
    </popup>
    <popup class="addr-msg" title="选择收货地址" ref="p2">
        <div class="ofh bgf">
            <list class="addr-select-box">
                <list-item :checkbox="true" v-for="(address,index) in items.Addrs" :key="index">
                    <input type="checkbox" name="name" v-on:click="setDefaultAddr(address)" :checked="address.Isdefault">
                    <div class="item-content">
                        <div class="item-subtitle">
                            {{address.Shouman}}，{{address.Mobile}}
                        </div>
                        <div class="addr-detail">
                            收货地址：{{address.Prov}}{{address.Xian}}{{address.Town}}{{address.Addr}}
                        </div>
                    </div>
                </list-item>
            </list>
            <div class="addNew items-line" @click="addNewAddr()" v-if="isAddNewAddr">
                <span>新增地址</span>
                <span class="link-arrow icon icon-link"></span>
            </div>
        </div>
    </popup>
    <popup class="addr-msg" title="配送方式" ref="p3" closeButtonText="关闭">
        <div class="ofh bgf">
            <list class="addr-select-box">
                <list-item :checkbox="true">
                    <input type="checkbox" name="name" value="A">
                    <div class="item-content">
                        <div class="item-subtitle">
                            快递发货，￥0.00
                        </div>
                        <div class="addr-detail">
                            由商家选择合作快递为您服务
                        </div>
                    </div>
                </list-item>
            </list>
        </div>
    </popup>
    <footer class="footer">
        <div class="item">
            合计：<span>{{totalMoney | formatMoney("")}}</span>
        </div>
        <input class="submit-order" type="button" value="提交订单" @click="payPop()">
    </footer>
    <!-- 弹窗错误信息 -->
    <div class="notify" v-if="popMsg.isShowMsg">
        <div class="txt">{{popMsg.errorMsg}}</div>
    </div>
    <!-- 输入密码弹窗 -->
    <prompt title="请输入支付密码(默认123456)" :on-ok="applyOrder" ref="prompt">sdf sg</prompt>
</div>
</template>
<script>

    import Content from '../components/content'
    import { SimpleHeader } from '../components/header'
    import { List, ListItem } from '../components/list'
    import Switcher from '../components/switcher'
    import Popup from '../components/popup'
    import { Prompt } from '../components/modal'
    import apiList from "../apiList.js"  //api列表

    //引入基于JQ的jquery-weui
    import $ from '../directives/jquery-vendor.js'
    import '../directives/jquery-weui.js'
    import '../directives/city-picker.js'

    
    // import "../directives/jweixin-1.0.0.js";
    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
            List,
            ListItem,
            Switcher,
            Popup,
            Prompt
        },
        data(){
            return{
                orderType:0,             //订单类型从购物车过来还是立即购买
                isEmptyaddress:false,    //地址是否为空
                isAddNewAddr:true,       //是否显示添加地址按钮,超过7条不显示
                popMsg:{
                    isShowMsg: false,     //是否显示弹窗错误信息
                    errorMsg:"",         //弹窗错误信息
                },
                receiverMsg:{           //收货人信息
                    name:"",
                    phone:"",
                    area:"",
                    address:"",
                    zipCode:""
                },
                items:{},           //订单数据
                totalMoney:0,    //总金额
                leaveMsg:"",    //留言
                paypass:"",     //支付
                getInvoiceChecked:false,  //是否获取发票
                invoiceTxt:"",          //  发票抬头
                paytype:"",         //支付类型：0积分支付(积分足够，不用补差支付),4银联,8微信,10支付宝
                orderId:"",         //立即购买过来
                oQuery:this.$route.query,   //路由参数
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                this.getMsg();
                //设置标题
                this.setTitle("我的订单");
            })
        },
        methods:{
            //获取信息
            getMsg:function(){
                var oQuery = this.$route.query;
                if(oQuery.type == 1){  //购物车结算到订单有多个商品
                    this.orderType = 1;
                    this.getOrder();
                }
                if(oQuery.type == 2){  //立即购买结算到订单单个商品
                    this.orderType = 2;
                    this.buyNowOder(oQuery.num,oQuery.goods);
                }
            },
            //获取订单信息
            getOrder:function(){
                var oQuery = this.$route.query;
                var url = apiList.data.ShowOrderdetail;

                this.$http.post(url,{
                    selGds: oQuery.goods
                }).then(function(data){ 
                    var oData = data.body;
                    if(oData.Result == 1){
                        this.items = oData;
                        //判断是否为空地址
                        this.isEmptyaddress = oData.Addrs.length>0? true : false;
                        //是否显示添加地址按钮,超过7条不显示
                        this.isAddNewAddr = oData.Addrs.length>=7? false : true;

                        //计算总金额
                        var money=0;
                        oData.Sels.forEach(function(item,index){
                            money+=item.Price*item.Nums;
                        })
                        this.totalMoney = money;

                        //支付类型,只能是0积分与8微信支付
                        this.paytype = oData.Needmny == 0? 0 : 8;
                    }
                    if(oData.Result == -1){
                        this.$router.push({ path: '/login' })  
                        return false;
                    }
                    if(oData.Result == -3){ //商品已下架
                        var that = this;
                        this.popMsg.isShowMsg = true;
                        this.popMsg.errorMsg= oData.Message;
                        setTimeout(function(){
                            that.$router.push("/orderList?type=0");
                        },1e3)
                        return false;
                    }
                },function(response){
                    console.info(response);
                })
            },
            //立即过来的订单
            buyNowOder:function(num,id){
                var url = apiList.data.PlaceOrder;

                this.$http.post(url,{
                   nums:num,   //数量
                   tid:id  //tid
                }).then(function(data){
                    var oData = data.body;
                    if(oData.Result == 1){
                        this.items = oData;
                        //判断是否为空地址
                        this.isEmptyaddress = oData.Addrs.length>0? true : false;
                        //是否显示添加地址按钮,超过7条不显示
                        this.isAddNewAddr = oData.Addrs.length>=7? false : true;

                        //计算总金额
                        this.totalMoney = oData.Sels.Price*oData.Sels.Nums;

                        //支付类型,只能是0积分与8微信支付
                        this.paytype = oData.Needmny == 0? 0 : 8;

                        this.orderId = oData.Sels.Id;
                    }else if(data.body.Result == -2){
                    }else{
                        // this.$router.push("/login");
                    }
                }),function(response){
                    console.info(response);
                }
            },
            //添加收货地址
            addNewAddr:function(){
                this.$refs.p2.close();
                this.$refs.p1.open();
            },
            //设置为默认地址
            setDefaultAddr:function(address){
                var url = apiList.data.AjaxIsdefault;
                this.$http.post(url,{
                    id: address.Id,
                }).then(function(data){ 
                    var oData = data.body;
                    if(oData.Result == 1){      //成功
                        this.$refs.p2.close();
                        this.verifyError(oData.Message)
                        this.getMsg();
                        return false;
                    }
                    if(oData.Result == 0){  //失败
                        this.$refs.p2.close();
                        this.verifyError(oData.Message)
                        return false;
                    }
                    if(oData.Result == -1){     //未登录
                        this.$router.push({ path: '/login' })  
                        return false;
                    }
                },function(response){
                    console.info(response);
                })
            },
            //保存收货地址
            saveReceiverMsg:function(){
                if(!this.receiverMsg.name.trim()){
                    this.verifyError("请输入名字")
                    return false;
                }
                if(this.receiverMsg.identity){
                    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                    var isTrue = reg.test(this.receiverMsg.identity);
                    if (!isTrue) {
                        this.verifyError("身份证格式错误");
                        return false;
                    }
                }
                if(!this.receiverMsg.phone.trim()){
                    this.verifyError("请输入手机号")
                    return false;
                }else{
                    var reg = /^1\d{10}$/;
                    var iso = reg.test(this.receiverMsg.phone);
                    if (!iso) {
                        this.verifyError("手机号格式错误");
                        return false;
                    }
                }
                if(this.receiverMsg.tell){
                    var reg = /\d{3}-\d{8}|\d{4}-\d{7}/;
                    var isTrue = reg.test(this.receiverMsg.tell);
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
                if(!this.receiverMsg.address.trim()){
                    this.verifyError("请输入详细地址")
                    return false;
                }
                if(this.receiverMsg.zipCode){
                    var reg = /^[1-9][0-9]{5}$/
                    var isTrue = reg.test(this.receiverMsg.zipCode);
                    if (!isTrue) {
                        this.verifyError("邮政编码格式错误");
                        return false;
                    }
                }
                if(this.receiverMsg.mail){
                    var reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                    var isTrue = reg.test(this.receiverMsg.mail);
                    if (!isTrue) {
                        this.verifyError("邮箱格式错误");
                        return false;
                    }
                }
                
                var url = apiList.data.SaveShouAdress;

                var provice = area.getAttribute("data-code0");
                var city = area.getAttribute("data-code1");
                var county = area.getAttribute("data-code2");
                this.$http.post(url,{
                    shouman:this.receiverMsg.name,
                    cardid:this.receiverMsg.identity,
                    phone:this.receiverMsg.phone,
                    area:area.value,
                    addrdetial:this.receiverMsg.address,
                    postcode:this.receiverMsg.zipCode,
                    email:this.receiverMsg.email,
                    addrtag:"",
                    provid :provice,
                    xianid:city,
                    townid:county,
                }).then(function(data){   //依赖vue-resource
                    if(data.body.Result == 1){
                        this.verifyError(data.body.Message);
                        //重新加载订单
                        this.getMsg();
                        //关闭弹窗
                    }else{
                    }
                },function(response){
                    console.info(response);
                })
                
                this.$refs.p1.close();
            },
            //选择收货地址
            sclectAddr:function(){
                this.$refs.p2.open();
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
            //地址选择器
            cityPicker:function(){
                $("#area").cityPicker({});
            },
            //配送方式
            deliveType:function(){
                this.$refs.p3.open();
            },
            //提交订单前弹出密码框
            payPop:function(){
                //空地址时提示添加
                if(!this.isEmptyaddress){
                    this.verifyError("请添加收货地址");
                    return false;
                }
                this.$refs.prompt.open();
            },
            //提交订单
            applyOrder:function(){
                var oQuery = this.$route.query;
                //发票类型
                var invoiceType = this.$el.querySelector("#invoiceType").value;
                
                //获取地址id
                var addressId = "";
                this.items.Addrs.forEach(function(item,index){
                    if(item.Isdefault){
                        addressId = item.Id;
                    }
                })
                var ordersId = oQuery.goods;
                //如果是立即购买的，为订单id
                if(this.orderType == 2){
                    ordersId = this.orderId;
                }

                var url = apiList.data.CreateOrder;
                this.$http.post(url,{
                    paypass: this.$children[5].mutableInput,
                    liuyan: this.leaveMsg,
                    danid: 0,
                    selcrds: "",       //优惠卷
                    selGds: ordersId,
                    seladdr: addressId,
                    paytype: this.paytype,
                    ispiao: this.getInvoiceChecked,
                    piaotitle: this.invoiceTxt,
                    piaouse: invoiceType,
                    danextid: "",       //保险
                }).then(function(data){ 
                    if(data.status == 200){ //成功
                        var oData = data.body;
                        var oResult = oData.Result;
                        var that = this;

                        if(oResult != 8 && oResult != -99){ //不在触发微信支付下弹出,防止阻碍微信
                            if(oResult != 1){
                                this.popMsg.isShowMsg = true;
                                this.popMsg.errorMsg= oData.Message;
                            }
                        }

                        setTimeout(function(){
                            that.popMsg.isShowMsg = false;
                            // if(oResult == -1){  //-1未授权登录
                            //     that.$router.push({ path: '/login' }) 
                            //     return false;
                            // }
                            if(oResult == 1){   //积分购买成功调回订单列表，type=0为全部订单
                                that.$router.push("/orderList?type=0");
                                return false;
                            }
                        },1e3)
                        if(oResult == 8 || oResult == -99){   //购买不足积分，唤起微信支付
                            var oParame =  oData.Data;
                            var appid = oParame.appId;
                            var timeStamp = oParame.timeStamp;
                            var nonce_str = oParame.nonceStr;
                            var prepay_id = oParame.package;
                            var paySign = oParame.paySign;
                            var signtype = oParame.signType;
                            //微信支付
                            WeixinJSBridge.invoke(
                                'getBrandWCPayRequest', {
                                   "appId" : appid,     //公众号名称，由商户传入     
                                   "timeStamp": timeStamp,         //时间戳，自1970年以来的秒数     
                                   "nonceStr" :nonce_str, //随机串     
                                   "package" :prepay_id,     
                                   "signType" :signtype,         //微信签名方式:    
                                   "paySign" :paySign //微信签名 
                                },
                                function(res){     
                                    if (res.err_msg == "get_brand_wcpay_request:ok") { //成功后返回全部订单列表
                                        that.$router.push("/orderList?type=0");
                                        return false; 
                                    } 
                                    if (res.err_msg == 'get_brand_wcpay_request:cancel') { //取消后返回全部订单列表
                                        that.$router.push("/orderList?type=0");
                                        return false;
                                    } 
                                    if (res.err_msg == 'get_brand_wcpay_request:fail') { //支付失败后返回全部订单列表
                                        that.$router.push("/orderList?type=0");
                                        return false;
                                    } 
                               }
                            ); 
                        }

                        
                    }
                    
                },function(response){
                    console.info(response);
                })
            },
            //索要发票
            getInvoice:function(){
                this.getInvoiceChecked = ! this.getInvoiceChecked
                if(this.getInvoiceChecked){
                    $("#invoiceType").select({
                        title: "选择发票类型",
                        items: [
                            {
                              title: "办公用品",
                              value: "001",
                            },
                            {
                              title: "礼品",
                              value: "002",
                            },
                            {
                              title: "配件",
                              value: "003",
                            }
                            
                          ]
                    });
                }
            },
        },
        filters:{
            formatMoney:function(value){
                if(!value){return ""};
                return value.toFixed(2);
            }
        }
    }
</script>
<style lang="less">
    .order-page{
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
        .addr-msg{
            .ofh{
                padding-bottom: 20px;
            }
            .addr-select-box{
                margin:0;
            }
            .addr-detail{
               font-size: 12px;
               color:#999; 
            }
            .addNew{
                padding-left: .75rem;
                &:active{
                    -webkit-transition: 0ms;
                    transition: 0ms;
                    background-color: #d9d9d9;
                }
            }
        }
        .addr-li{
            min-height: 3.5rem;
            padding:15px 18px 15px 25px;
            &:active{
                -webkit-transition: 0ms;
                transition: 0ms;
                background-color: #d9d9d9;
            }
            .name-tel{
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;
                span{
                    -webkit-box-flex: 1;
                    -webkit-flex: 1;
                    flex: 1;
                }
            }
            .addr-detail{
                padding-right:15px;
                margin-top: 2px;
                font-size: 12px;
                line-height: 16px;
                color: #666;
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
        .link-arrow {
            font-size: .7rem;
            position: absolute;
            right: .3rem;
            top: 50%;
            height: 1rem;
            width: .8rem;
            color: #c7c7c7;
            margin-top: -0.5rem;
        }
        .address-box{
            position:relative;
            &:after {
                content: '';
                display: block;
                height: 2px;
                background-image: url(https://b.yzcdn.cn/v2/image/wap/address/border2@2x.png);
                background-size: 34px 2px;
            }
            .empty{
                position: relative;
                padding: 16px 10px 16px 60px;
                background-color: #fff;
                font-size: 14px;
                color: #333;
                background: url(https://b.yzcdn.cn/v2/image/wap/address/add@2x.png) no-repeat;
                background-size: 40px 40px;
                background-position: 10px center;
                p{
                    line-height: 40px;
                }
                &:active{
                    -webkit-transition: 0ms;
                    transition: 0ms;
                    background-color: #d9d9d9;
                }
            }
            
        }
        .goods-li{
            min-height: 6.0rem;
            margin:0;
            .item{
                padding:10px 0;
            }
            img{
                margin-right:10px;
            }
            .item-title{
                font-size: 0.75rem;
                max-height: 2.0rem;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                color:#333;
            }
            .item-subtitle{
                margin-top:10px;
                font-size: 0.6rem;
                color:#666;
            }
        }
        .deliver-box{
            &:active{
                -webkit-transition: 0ms;
                transition: 0ms;
                background-color: #d9d9d9;
            }
        }
        .deliver-msg{
            font-size: 12px;
            margin-right:15px;
        }
        .leave-msg{
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            textarea{
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
                border:0;
                -webkit-transition:height;
                transition:height;
                vertical-align: top;
                height:1.1rem;
                &:focus{
                    height:2.4rem;
                }
            }
        }
        .total-price{
            .money{
                color:#F44;
            }
        }
        .discount-msg{
            margin:10px 0;
            &:active{
                -webkit-transition: 0ms;
                transition: 0ms;
                background-color: #d9d9d9;
            }
            .use{
                margin-right: 14px;
            }
        }
        .sms-msg{
            margin:10px 0;
            span{
                line-height: 32px;
            }
        }
        .all-msg{
            .line{
                line-height: 26px;
            }
        }
        .footer{
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            background: #fff;
            line-height: 2.8rem;
            .item{
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
                display: block;
                padding-right:10px;
                text-align: right;
                color:#666;
                font-size: 15px;
                span{
                    color:#f44;
                }
            }
            .submit-order{
                width:100px;
                border:0;
                color: #fff;
                background-color: #f44;
            }
        }
        .sku-box{
            position: relative;
            .num{
                position: absolute;
                top:10px;
                right:10px;
            }
        }
        .invoice-box{
            .lh52{
                line-height: 32px;
            }
            .input{
                padding: 0 10px;
                border:0;
            }
        }
        .invisible{
            visibility:hidden;
        }
    }
</style>
