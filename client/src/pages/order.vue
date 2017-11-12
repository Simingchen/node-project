<template>
<div class="my-page order-page">
    <!-- <simple-header title="我的订单" :back-link="true"></simple-header> -->
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
            <img v-lazy="'/Thumbnail/BusGoodsList'+item.Thumbnail" width="90" height="90" v-if="item.Planid != 102">
            <!-- 102全球购 -->
            <img v-lazy="'http://msyc-img.oss-cn-shenzhen.aliyuncs.com'+item.Thumbnail" width="90" height="90" v-if="item.Planid == 102">
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
            <img v-lazy="'/Thumbnail/BusGoodsList'+items.Sels.Thumbnail" width="90" height="90" v-if="items.Sels.Planid != 102">
            <!-- 102全球购 -->
            <img v-lazy="'http:// msyc-img.oss-cn-shenzhen.aliyuncs.com'+items.Sels.Thumbnail" width="90" height="90" v-if="items.Sels.Planid == 102">
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
    <!-- <div class="items-line clearfix bor-bottom">
        <span class="fl">中秋礼包短信</span>
        <span @click="getCheckVal()">
            <switcher ref="midAutumn" class="fr midAutomn"></switcher>
        </span>
    </div> -->
    <div class="invoice-box items-line bor-bottom dpn">
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
    <!-- <div class="items-line clearfix bor-bottom">
        <span class="fl">短信通知收件人</span>
        <switcher class="fr"></switcher>
    </div> -->
    <div class="gobal-tips items-line clearfix bor-bottom" @click="$refs.p4.open()" v-if="items.Fare > 0">
        <span class="fl">全球购小贴士</span>
        <span class="link-arrow icon icon-link"></span>
    </div>
    <div class="items-line all-msg clearfix bor-bottom mt10">
        <div class="line clearfix">
            <span class="fl">商品金额</span>
            <span class="fr">{{totalMoney0 | formatMoney("")}}</span>
        </div>
        <div class="line clearfix">
            <span class="fl">运费</span>
            <span class="fr">0.00</span>
        </div>
        <div class="line clearfix" v-if="items.Fare > 0">
            <span class="fl">全球购清关费用</span>
            <span class="fr">{{items.Fare | formatMoney("")}}</span>
        </div>
    </div>
    <footer class="footer">
        <div class="item">
            合计：<span>{{totalMoney | formatMoney("")}}</span>
        </div>
        <input class="submit-order" type="button" value="提交订单" @click="payPop()" v-if="!isShowTipsBtn">
        <input class="submit-order" type="button" value="提交订单" @click="$refs.alert.open()" v-if="isShowTipsBtn" title="积分不足">
    </footer>
    <!-- 弹窗错误信息 -->
    <div class="notify" v-if="popMsg.isShowMsg">
        <div class="txt">{{popMsg.errorMsg}}</div>
    </div>
    <!-- 输入密码弹窗 -->
    <prompt title="请输入支付密码(默认123456)" :on-ok="applyOrder" ref="prompt"></prompt>
    <alert title="温馨提示" content="您的当前积分不足,请在微信浏览器下提交订单触发微信支付进行支付或者移步至pc端进行充值后再支付，谢谢谅解" ref="alert"></alert>
    <popup class="receiver-msg" title="新增收货地址" ref="p1">
        <ul>
            <li class="items-line bgf bor-bottom">
                <label class="label" for="receiver">收货人</label>
                <input id="receiver" type="text" placeholder="名字(必填)" maxlength="10" v-model="receiverMsg.name">
            </li>
            <li class="items-line bgf bor-bottom">
                <label class="label" for="receiver">身份证</label>
                <input id="receiver" type="text" placeholder="身份证,作为全球购身份验证(选填)" maxlength="25" v-model="receiverMsg.identity">
            </li>
            <li class="items-line bgf bor-bottom">
                <label class="label" for="phone">手机号</label>
                <input id="phone" type="text" placeholder="手机号(必填)" maxlength="12" v-model="receiverMsg.phone" pattern="[0-9]*">
            </li>
            <li class="items-line bgf bor-bottom">
                <label class="label" for="phone">固定电话号</label>
                <input id="phone" type="text" placeholder="固定电话号(选填)" maxlength="20" v-model="receiverMsg.tell">
            </li>
            <li class="items-line bgf bor-bottom">
                <label class="label" for="area">选择地区</label>
                <input id="area" type="text" placeholder="选择地区(必填)" readonly @click="cityPicker()">
            </li>
            <li class="items-line bgf bor-bottom">
                <label class="label" for="address">详细地址</label>
                <input id="address" type="text" placeholder="如街道,楼层,门牌号等(必填)" maxlength="20" v-model="receiverMsg.address">
            </li>
            <li class="items-line bgf bor-bottom">
                <label class="label" for="zipCode">邮政编码</label>
                <input id="zipCode" type="text" placeholder="邮政编码(选填)" maxlength="10" v-model="receiverMsg.zipCode" pattern="[0-9]*">
            </li>
            <li class="items-line bgf bor-bottom">
                <label class="label" for="zipCode">邮件</label>
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
    <!-- 全球购说明弹窗 -->
    <popup ref="p4" title="全球购小贴士">
        <div class="content-padded">
            为帮助您更好地选购境外商品，麻烦您在购买前务必认真、详细阅读并完全理解本告知书的全部内容，并对自身风险承担做出客观判断。同意本文所告知内容后再进行下单购买：
            <ul>
                <li>
                    <span class="fl">1、</span>
                    <p class="ofh">您在购买海外商品时，由于国家有关政策，需要您提供收货人的真实姓名和身份证信息用于海关清关。请注意：身份证信息必须与收货人保持一致。</p>
                </li>
                <li>
                    <span class="fl">2、</span>
                    <p class="ofh">全球购的商品根据国家法规规定需要个人买家提供身份证信息来完成海关清关流程，身份证信息必须和收货人信息保持一致，若您填写的收货人姓名有误，将会影响海关正常清关，如遇此情况，建议您可尝试联系商城沟通协助您进行修改，若商城无法操作更改收货人信息，建议您此笔订单申请退款重拍哦。</p>
                </li>
                <li>
                    <span class="fl">3、</span>
                    <p class="ofh">您购买的境外商品符合原产地有关品质、健康、标识的相关标准，与我国质量安全标准或有所不同，所以在使用过程中可能产生的危害或损失以及其他风险，将由您个人承担。</p>
                </li>
                <li>
                    <span class="fl">4、</span>
                    <p class="ofh">全球购的商品需要统一按照每个订单<span class="c58">25元清关费用</span>，根据商场1积分=1元(人民币)的折算，已合算在支付汇总里面，如有疑问请联系客服人员。</p>
                </li>
                <li>
                    <span class="fl">5,</span>
                    <p class="ofh">
                        您在购买全球购的商品<span class="c58">6个小时后暂时不可退款与退货</span>，如有疑问请联系客服人员。
                    </p>
                </li>
            </ul>
        </div>
    </popup>
    <!-- 中秋短信 -->
    <popup class="fall-msg-box receiver-msg" title="中秋短信" ref="p5">
        <ul>
            <li class="items-line bgf bor-bottom">
                <label class="label" for="receiver">发送人</label>
                <input id="receiver" type="text" placeholder="名字(必填)" maxlength="10" v-model="fallMsg.name">
            </li>
            <li class="items-line bgf bor-bottom">
                <label class="label" for="receiver">接收人</label>
                <input id="receiver" type="text" placeholder="接收人" maxlength="10" v-model="fallMsg.receiver">
            </li>
            <li class="items-line bgf bor-bottom">
                <label class="label" for="phone">手机号</label>
                <input id="phone" type="text" placeholder="手机号(必填)" maxlength="12" v-model="fallMsg.phone" pattern="[0-9]*">
            </li>
            
        </ul>
        <list class="fallMsg-select-box">
            <list-item :radio="true">
                <input type="radio" name="fall" value="1">
                <div class="item-content">
                    兜一缕秋风，愿您心情能够秋高气爽；送一份佳礼，愿您的家庭圆圆满满，中秋将至，但愿人长久，千里共婵娟。
                </div>
            </list-item>
            <list-item :radio="true">
                <input type="radio" name="fall" value="2">
                <div class="item-content">
                    月圆情圆人团圆，人满福满酒杯满，花香景美心情美，你乐我乐全家乐，佳节喜闹大团圆，万事顺畅皆圆满。中秋将至，祝您中秋快乐，幸福美满!
                </div>
            </list-item>
            <list-item :radio="true">
                <input type="radio" name="fall" value="3">
                <div class="item-content">
                    中秋将至，美丽的夜空是我对您无尽的牵挂，温柔的月光是对您的深深祝福。祝您中秋节快乐，佳节多好运，月圆人圆事事圆！
                </div>
            </list-item>
            <list-item :radio="true">
                <input type="radio" name="fall" value="4">
                <div class="item-content">
                    一轮明月，两束清风，三棵桂树，四杯好酒，五盏灯笼，六柱弥香，七枚月饼，八人对月，九九归一，十分美满。祝您中秋节快乐，人月两团圆！
                </div>
            </list-item>
            <list-item :radio="true">
                <input type="radio" name="fall" value="5">
                <div class="item-content">
                    中秋迈着优雅的步伐，从皎洁的月光中走来，哼着团圆吉祥的调子，唱着幸福安康的歌词，真心为您演奏着一句最真诚的祝福：花好月圆，快乐平安。
                </div>
            </list-item>
        </list>
        <li class="bgf">
            <input class="save-btn" type="button" value="保存" @click="saveFallMsg()">
        </li>
    </popup>
</div>
</template>
<script>
    import Content from '../components/content'
    import { SimpleHeader } from '../components/header'
    import { List, ListItem } from '../components/list'
    import Switcher from '../components/switcher'
    import Popup from '../components/popup'
    import { Prompt, Alert } from '../components/modal'
    import apiList from "../apiList.js"  // api列表

    // 引入基于JQ的jquery-weui
    import $ from '../directives/jquery-vendor.js'
    import '../directives/jquery-weui.js'
    import '../directives/city-picker.js'
    
    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
            List,
            ListItem,
            Switcher,
            Popup,
            Alert,
            Prompt
        },
        data () {
            return {
                isWeChatBrowser: false,     // 判断是否为微信
                orderType: 0,             // 订单类型从购物车过来还是立即购买
                isEmptyaddress: false,    // 地址是否为空
                isAddNewAddr: true,       // 是否显示添加地址按钮,超过7条不显示
                tipsContent: "",        // 弹窗提示内容
                popMsg: {
                    isShowMsg: false,     // 是否显示弹窗错误信息
                    errorMsg: "",         // 弹窗错误信息
                },
                receiverMsg: {           // 收货人信息
                    name: "",
                    phone: "",
                    area: "",
                    address: "",
                    zipCode: ""
                },
                fallMsg: {
                    name: "",
                    receiver: "",
                    phone: "",
                },
                items: {},           // 订单数据
                totalMoney: 0,       // 总金额
                totalMoney0: 0,    // 总金额（不加运费）
                leaveMsg: "",    // 留言
                paypass: "",     // 支付
                getInvoiceChecked: false,  // 是否获取发票
                invoiceTxt: "",              //   发票抬头
                paytype: "",                 // 支付类型：0积分支付(积分足够，不用补差支付),4银联,8微信,10支付宝
                orderId: "",                 // 立即购买过来
                oQuery: this.$route.query,   // 路由参数
                isIncludeGobal: false,          // 是否选购了全球购商品默认未选定
                isShowTipsBtn: false,       // 如果需要补差金额且在非微信下提交按钮改变为提示去pc充值后支付
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.isWeChat();
                // 微信授权
                this.getWeChat(this.$route.fullPath);

                this.getMsg();
                // 设置标题
                this.setTitle("我的订单");
            })
        },
        methods: {
            // 获取信息
            getMsg: function () {
                var oQuery = this.$route.query;
                if (oQuery.type == 1) {  // 购物车结算到订单有多个商品
                    this.orderType = 1;
                    this.getOrder();
                }
                if (oQuery.type == 2) {  // 立即购买结算到订单单个商品
                    this.orderType = 2;
                    this.buyNowOder(oQuery.num, oQuery.goods);
                }
            },
            // 获取订单信息购物车过来信息
            getOrder: function () {
                var oQuery = this.$route.query;
                var url = apiList.data.ShowOrderdetail;

                this.$http.post(url, {
                    selGds: oQuery.goods
                }).then(function (data) { 
                    var oData = data.body;
                    if (oData.Result == 1) {
                        this.items = oData;
                        //  判断是否为空地址
                        this.isEmptyaddress = oData.Addrs.length > 0;
                        //  是否显示添加地址按钮,超过7条不显示
                        this.isAddNewAddr = oData.Addrs.length < 7;

                        //  计算总金额与确定是否选购了全球购商品
                        var money = 0;
                        oData.Sels.forEach(function (item, index) {
                            money += item.Price * item.Nums;
                        })
                        this.totalMoney = this.items.Fare + money;
                        this.totalMoney0 = money;

                        //  支付类型,只能是0积分支付与8微信支付（Needmny需要支付的额度）
                        this.paytype = oData.Needmny == 0 ? 0 : 8;

                        // 如果需要补差金额且在非微信下提交按钮改变为提示去pc充值后支付
                        if (oData.Needmny > 0 && !this.isWeChatBrowser) {
                            this.isShowTipsBtn = true;
                        }
                    }
                    if (oData.Result == -1) {
                        this.$router.push({ path: '/login' })  
                        return false;
                    }
                    if (oData.Result == -3) { //  商品已下架
                        var that = this;
                        this.popMsg.isShowMsg = true;
                        this.popMsg.errorMsg = oData.Message;
                        setTimeout(function () {
                            that.$router.push("/orderList?type=0");
                        }, 1e3)
                        return false;
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            //  立即购买过来的订单
            buyNowOder: function (num, id) {
                var url = apiList.data.PlaceOrder;
                this.$http.post(url, {
                    nums: num,   //  数量
                    tid: id  //  tid
                }).then(function (data) {
                    var oData = data.body;
                    
                    if (oData.Result == 1) {
                        this.items = oData;
                        //  判断是否为空地址
                        this.isEmptyaddress = oData.Addrs.length > 0;
                        //  是否显示添加地址按钮,超过7条不显示
                        this.isAddNewAddr = oData.Addrs.length < 7;

                        //  计算总金额
                        this.totalMoney = this.items.Fare + oData.Sels.Price * oData.Sels.Nums;
                        this.totalMoney0 = oData.Sels.Price * oData.Sels.Nums;

                        //  支付类型,只能是0积分与8微信支付
                        this.paytype = oData.Needmny == 0 ? 0 : 8;

                        // 如果需要补差金额且在非微信下提交按钮改变为提示去pc充值后支付
                        if (oData.Needmny > 0 && !this.isWeChatBrowser) {
                            this.isShowTipsBtn = true;
                        }
                        this.orderId = oData.Sels.Id;
                    }
                    if (oData.Result == 0) {
                        this.tipsContent = oData.message;
                        this.$refs.alert.open();
                    }
                    if (oData.Result == -1) {
                        this.$router.push("/login");
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            //  添加收货地址
            addNewAddr: function () {
                this.$refs.p2.close();
                this.$refs.p1.open();
            },
            //  设置为默认地址
            setDefaultAddr: function (address) {
                var url = apiList.data.AjaxIsdefault;
                this.$http.post(url, {
                    id: address.Id,
                }).then(function (data) { 
                    var oData = data.body;
                    if (oData.Result == 1) {      //  成功
                        this.$refs.p2.close();
                        this.verifyError(oData.Message)
                        this.getMsg();
                        return false;
                    }
                    if (oData.Result == 0) {  //  失败
                        this.$refs.p2.close();
                        this.verifyError(oData.Message)
                        return false;
                    }
                    if (oData.Result == -1) {     //  未登录
                        this.$router.push({ path: '/login' })  
                        return false;
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            //  保存收货地址
            saveReceiverMsg: function () {
                var reg;
                var isTrue;
                if (!this.receiverMsg.name.trim()) {
                    this.verifyError("请输入名字")
                    return false;
                }
                if (this.receiverMsg.identity) {
                    reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                    isTrue = reg.test(this.receiverMsg.identity);
                    if (!isTrue) {
                        this.verifyError("身份证格式错误");
                        return false;
                    }
                }
                if (!this.receiverMsg.phone.trim()) {
                    this.verifyError("请输入手机号")
                    return false;
                } else {
                    reg = /^1\d{10}$/;
                    isTrue = reg.test(this.receiverMsg.phone);
                    if (!isTrue) {
                        this.verifyError("手机号格式错误");
                        return false;
                    }
                }
                if (this.receiverMsg.tell) {
                    reg = /\d{3}-\d{8}|\d{4}-\d{7}/;
                    isTrue = reg.test(this.receiverMsg.tell);
                    if (!isTrue) {
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
                    isTrue = reg.test(this.receiverMsg.zipCode);
                    if (!isTrue) {
                        this.verifyError("邮政编码格式错误");
                        return false;
                    }
                }
                if (this.receiverMsg.mail) {
                    reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
                    isTrue = reg.test(this.receiverMsg.mail);
                    if (!isTrue) {
                        this.verifyError("邮箱格式错误");
                        return false;
                    }
                }
                
                var url = apiList.data.SaveShouAdress;
                var provice = area.getAttribute("data-code0");
                var city = area.getAttribute("data-code1");
                var county = area.getAttribute("data-code2");
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
                        this.verifyError(data.body.Message);
                        //  重新加载订单
                        this.getMsg();
                        //  关闭弹窗
                    } else {
                    }
                }, function (response) {
                    console.info(response);
                })
                
                this.$refs.p1.close();
            },
            //  选择收货地址
            sclectAddr: function () {
                this.$refs.p2.open();
            },
            //  验证函数报错弹窗
            verifyError: function (msg) {
                this.popMsg.isShowMsg = true;
                this.popMsg.errorMsg = msg;
                var that = this;
                setTimeout(function () {
                    that.popMsg.isShowMsg = false;
                }, 1e3)
            },
            //  地址选择器
            cityPicker: function () {
                $("#area").cityPicker({});
            },
            //  配送方式
            deliveType: function () {
                this.$refs.p3.open();
            },
            //  提交订单前弹出密码框
            payPop: function () {
                // 空地址时提示添加
                if (!this.isEmptyaddress) {
                    this.verifyError("请添加收货地址");
                    return false;
                }
                this.$refs.prompt.open();
            },
            //  提交订单
            applyOrder: function () {
                var oQuery = this.$route.query;
                //  发票类型
                var invoiceType = this.$el.querySelector("#invoiceType").value;
                
                //  获取地址id
                var addressId = "";
                this.items.Addrs.forEach(function (item, index) {
                    if (item.Isdefault) {
                        addressId = item.Id;
                    }
                })
                var ordersId = oQuery.goods;
                //  如果是立即购买的，为订单id
                if (this.orderType == 2) {
                    ordersId = this.orderId;
                }

                // 按钮禁止
                var oBtn = document.querySelector(".submit-order");
                oBtn.setAttribute("disabled", true);
                oBtn.value = "提交中...";

                var url = apiList.data.CreateOrder;
                this.$http.post(url, {
                    paypass: this.$refs.prompt.mutableInput,
                    liuyan: this.leaveMsg,
                    danid: 0,
                    selcrds: "",       //  优惠卷
                    selGds: ordersId,
                    seladdr: addressId,
                    paytype: this.paytype,
                    ispiao: this.getInvoiceChecked,
                    piaotitle: this.invoiceTxt,
                    piaouse: invoiceType,
                    danextid: "",       //  保险
                    fare: this.items.Fare,       //  运费(全球购为清关费用,其他包邮)
                }).then(function (data) { 
                    // Result=-1,表示操作失败；Result=1，下单成功(这是无需现金支付的前提下)，-2支付密码错误，-3意外错误，-4参数错误，-5数据错误，0下单失败，8需要现金补差的触发微信支付, -99未授权 -106没有兑换权限
                    var oData = data.body;
                    var oResult = oData.Result;
                    var that = this;
                    // 不在触发微信支付下弹出,防止阻碍微信
                    if (oResult != 8 && oResult != -99 && oResult != -106) {    
                        this.popMsg.isShowMsg = true;
                        this.popMsg.errorMsg = oData.Message;
                        setTimeout(function () {
                            that.popMsg.isShowMsg = false;
                            // -1未授权登录
                            if (oResult == -1) {
                                that.$router.push({ path: '/login' }) 
                                return false;
                            }
                            // 积分购买成功调回订单列表，type=0为全部订单
                            if (oResult == 1) {
                                that.$router.push("/orderList?type=0");
                                return false;
                            }
                        }, 2e3)
                    }
                    if (oResult == -106) {  // 后台返回没有兑换权限
                        this.popMsg.isShowMsg = true;
                        this.popMsg.errorMsg = "你已经确认订单,请在代订单中查看";
                        setTimeout(function () {
                            that.popMsg.isShowMsg = false;
                            that.$router.push("/orderList?type=0");  // type=0为待支付订单
                        }, 2e3) 
                    }
                    if (oResult == -99) {
                        this.popMsg.isShowMsg = true;
                        this.popMsg.errorMsg = "微信授权失败,未能触发微信支付,请在代付款订单中查看该订单进行支付";
                        setTimeout(function () {
                            that.popMsg.isShowMsg = false;
                            that.$router.push("/orderList?type=1000");  // type=0为待支付订单
                        }, 2e3)
                    }
                    if (oResult == 8) {   //  购买不足积分，唤起微信支付
                        var oParame = oData.Data;
                        var appid = oParame.appId;
                        var timeStamp = oParame.timeStamp;
                        var nonceStr = oParame.nonceStr;
                        var prepayId = oParame.package;
                        var paySign = oParame.paySign;
                        var signtype = oParame.signType;

                        // 微信支付
                        /* global WeixinJSBridge */
                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest', {
                                "appId": appid,     //  公众号名称，由商户传入     
                                "timeStamp": timeStamp,         //  时间戳，自1970年以来的秒数     
                                "nonceStr": nonceStr, //  随机串     
                                "package": prepayId,     
                                "signType": signtype,         //  微信签名方式:    
                                "paySign": paySign //  微信签名 
                            }, function (res) {     
                                if (res.err_msg == "get_brand_wcpay_request:ok") { //  成功后返回全部订单列表
                                    that.$router.push("/orderList?type=0");
                                    return false; 
                                } 
                                if (res.err_msg == 'get_brand_wcpay_request:cancel') { // 取消后返回全部订单列表
                                    that.$router.push("/orderList?type=0");
                                    return false;
                                } 
                                if (res.err_msg == 'get_brand_wcpay_request:fail') { // 支付失败后返回全部订单列表
                                    that.$router.push("/orderList?type=0");
                                    return false;
                                } 
                            }); 
                    }

                    // 按钮还原
                    var oBtn = document.querySelector(".submit-order");
                    oBtn.removeAttribute("disabled");
                    oBtn.value = "提交订单";
                }, function (response) {
                    console.info(response);
                })
            },
            //  索要发票
            getInvoice: function () {
                this.getInvoiceChecked = !this.getInvoiceChecked
                if (this.getInvoiceChecked) {
                    /* gobal $ */
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
            //  商品下架弹窗确定返回主页
            alertOk: function () {
                //  使用replace，清楚历史记录防止返回错误页面
                window.location.replace("/");
            },
            //  获取中秋短信选定
            getCheckVal: function () {
                var bool = this.$refs.midAutumn.mutableChecked
                if (!bool) {
                    this.$refs.p5.open();
                }
            },
            //  保存中秋短信
            saveFallMsg: function () {
                if (!this.fallMsg.name.trim()) {
                    this.verifyError("请输入名字");
                    return false;
                }
                if (!this.fallMsg.receiver.trim()) {
                    this.verifyError("请输入接收人");
                    return false;
                }
                if (!this.fallMsg.phone.trim()) {
                    this.verifyError("请输入手机号");
                    return false;
                } else {
                    var reg = /^1\d{10}$/;
                    var isTrue = reg.test(this.fallMsg.phone);
                    if (!isTrue) {
                        this.verifyError("手机号格式错误");
                        return false;
                    }
                }
                
                var url = apiList.data.SaveShouAdress;
                this.$http.post(url).then(function (data) {
                    if (data.body.Result == 1) {
                        this.verifyError(data.body.Message);
                        //  重新加载订单
                        this.getMsg();
                        //  关闭弹窗
                    } else {
                    }
                }, function (response) {
                    console.info(response);
                })
                this.$refs.p5.close();
            },
            // 判定是否为微信
            isWeChat: function () {
                var ua = window.navigator.userAgent.toLowerCase(); 
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    this.isWeChatBrowser = true;
                }
            },
        },
        filters: {
            formatMoney: function (value) {
                if (!value) { return "" };
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
            }
            .label{
                width:90px;
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
                background-image: url(https:// b.yzcdn.cn/v2/image/wap/address/border2@2x.png);
                background-size: 34px 2px;
            }
            .empty{
                position: relative;
                padding: 16px 10px 16px 60px;
                background-color: #fff;
                font-size: 14px;
                color: #333;
                background: url(https:// b.yzcdn.cn/v2/image/wap/address/add@2x.png) no-repeat;
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
        .gobal-tips{
            color:#7a45e5;
        }
        .fallMsg-select-box{
            max-height: 10.0rem;
            overflow-y:scroll;
            margin:0;
            background-color: #ddd;
            li{
                height:auto;
            }
            .item-content{
                font-size: .7rem;
                line-height: 1.0rem!important;
            }
            .save-btn{
                margin-top:0.5rem;
            }
        }
    }
</style>
