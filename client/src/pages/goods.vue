<template>
    <div class="page goods-page">
        <!-- <simple-header class="fixed" title="商品详情" :back-link="true"></simple-header> -->
        <div class="rel">
            <span class="home-menu" id="edit">
                <i class="iconfont icon-caidan"></i>
            </span>
            <!-- 多图 -->
            <slide-wrapper ref="slide" v-if="isShowImgs">
                <slide v-for="(img,index) in curImgs" :key="index">
                    <img class="slide-img" :src="'http://www.fescomall.com/Thumbnail/BusGoodsList' + img" />
                </slide>
            </slide-wrapper>
            <!-- 单图分开防止多次渲染滑动效果失败 -->
            <div v-if="!isShowImgs">
                <slide-wrapper>
                    <slide>
                        <img :src="'http://www.fescomall.com/Thumbnail/BusGoodsList' + items.Ys1.Img">
                    </slide>
                </slide-wrapper>
            </div>
        </div>
        <div class="con">
            <div class="featured-goods-box" v-if="items.Tail.Planid == 103">
                <!-- 此商品为每周精选商品，享受优惠，请尽快购买哦~ -->
                <del class="lab">{{items.Tail.Basisprice | formatMoney("")}}</del>
                <span class="price">{{formatFeaturedMoney1}}</span>
                <span class="price2">{{formatFeaturedMoney2}}</span>
                <span class="price3">每周精选</span>
                <div class="left-timebox fr">
                    距离结束还剩
                    <p>
                        <span class="num">{{weekLeftTime}}</span>
                        天
                    </p>
                </div>
            </div>
            <div class="featured-goods-box" v-if="userFid == 39">
                <!-- 此商品为每周精选商品，享受优惠，请尽快购买哦~ -->
                <!-- <del class="lab">{{items.Tail.Basisprice | formatMoney("")}}</del> -->
                <span class="price">{{formatFeaturedMoney1}}</span>
                <span class="price2">{{formatFeaturedMoney2}}</span>
                <span class="price3">中秋礼包</span>
                <div class="left-timebox fr">
                    距离结束还剩
                    <p>
                        <span class="num">{{autumnLeftTime}}</span>
                        天
                    </p>
                </div>
            </div>
            <h1>
                {{items.Goods.Cname}}
            </h1>
            <div class="price-li" v-if="items.Tail.Planid != 103 && userFid != 39">
                <p class="price">{{items.Tail.Price | formatMoney("")}}</p>
                <p class="market-price">市场价：<del>{{items.Tail.Basisprice | formatMoney("")}}</del></p>
            </div>
            <div class="status-li items-line flex-box c9">
                <span class="flex-item ellipsis tal">快递：0.00</span>
                <span class="flex-item ellipsis tac">销量：{{items.Tail.RelSale + items.Tail.RndSale}}</span>
                <span class="flex-item ellipsis tac">库存：{{items.Tail.Kucun}}</span>
                <span class="flex-item ellipsis tar">产地：{{items.Goods.Product}}</span>
            </div>
        </div>
        <!-- 主要参数 -->
        <div class="field">
            <h2 class="line-tit">主要参数</h2>
            <table class="wp100">
                <tbody>
                    <tr>
                        <th>{{items.Goods.Ysname}}</th>
                        <td v-for="(item,index) in items.Ys1List">
                            {{item.Name}}
                        </td>
                    </tr>
                    <tr>
                        <th>{{items.Goods.Ysname2}}</th>
                        <td v-for="(item,index) in curSkuList">
                            {{item.Ys2name}}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!-- 选择规格 -->
        <div class="gobal-about mt10 bgf">
            <div class="items-line rel" @click="selectSku()">
                请选择
                {{items.Goods.Ysname}}
                <i v-if="items.Goods.Ysname2">/ {{items.Goods.Ysname2}}</i>
                <span class="link-arrow icon icon-link"></span>
            </div>
        </div>
        <!-- 商品推荐 -->
        <div class="mt10" v-if="false">
            <h2 class="line-tit">商品推荐</h2>
            <slide-wrapper ref="slide">
                <slide v-for="(goods,index) in 3" :key="index">
                    <ul class="flex-box wp100 tac">
                        <li class="flex-item" v-for="(goods,index) in 3">
                            <router-link to="'/gobal/goods?planid=102&tid='+ global.Id">
                                <img class="img" src="'http://msyc-img.oss-cn-shenzhen.aliyuncs.com' + global.Img">
                                <h4 class="txt ellipsis">测试标题</h4>
                                <p class="price">测试价格</p>
                            </router-link>
                        </li>
                    </ul>
                </slide>
            </slide-wrapper>
        </div>
        <!-- 商品图片 -->
        <div class="goods-li">
            <h2 class="line-tit">商品图片</h2>
            <img v-lazy="'http://www.fescomall.com/' + item" v-for="item in filterGoodsImg">
        </div>
        <div class="instruction">
            <h2 class="line-tit">商品说明</h2>
            <div class="txt">
                1.提交订单后，将在2个工作日内为您进行分拣并发货（节假日顺延），如因特殊情况造成发货延迟，商城客服会主动与会员联系，还请您谅解<br>
                2. 一旦签收，视为已经确认好货品的质量及数量。<br>
                3. 如有质量问题，请您自签收商品之日起7个工作日内，致电客服中心联系或办理换货手续。<br>
                4. 食品类产品开袋，密封产品原包装打开，一次性封贴或胶条破损，我们有权不予办理换货。<br>
                5. 换货时，商品的外包装、附件、赠品/券和商品配送单（客户联），需与主商品一起退还，请于购买商品后妥善保管，如因客户原因无法退回的，将可能导致无法进行换货，因此而产生的不利后果，将会由您承担。<br>
                6. 生鲜类商品（以商品具体说明为准），我们只受理当场投诉，一旦签收，我们将不再接受换货要求。<br>
                7. 化妆品及个人护理用品，商品一经使用将不予办理换货。<br>
                8. 服装类商品，因不同的计量方法，尺寸可能存在误差，此状况并非质量问题。<br>
                9. 图片及信息仅供参照，商品将以实物为准。因拍摄灯光及不同显示器色差等问题可能造成商品图片与实物有一定色差，不属质量问题。<br>
                10. 如若您提供的联系方式和联系地址不正确（不详细），将会影响我们配送的速度。为了加快为您配送的速度请提供详细地址和正确的联系方式。<br>
                11. 建议您本人先验货再签收，如无法亲自签收，请在配送员与您联系时告知配送人员指定代收人姓名及联系方式并验货。<br>
            </div>
        </div>
        <!-- 返回顶部 -->
        <img class="back-img" src="../assets/img/backtop.png" v-on:touchstart="backTop()">
        <div class="footer-box">
            <div class="hr28"></div>
            <footer class="footer">
                <div class="item-box">
                    <a class="cell tac" href="https://admin.qidian.qq.com/template/blue/wpa/launch-mobile-qq.html?kfuin=2852061114&kfext=2852270580&visitorId=8679600128&visitorid=8679600128&fid=1&key=2c6693033018c081cc24d0a604ad7ff6&cate=1&type=2&ftype=1&pid=ckxq95.5bxqdx.j6mxh4k3&clickid=qcg4c6.bdrkcr.j6mxi5pu&tpForm=1&qid=5fonsq.64e2jv.j6mxh4k8&env=1&eptype=2&clickType=1&tptype=2&roleKey=roleQQ&roleValue=&roleUin=2852270581&roleData=2852270581&isKfuin=&cb=JSONP_CB_2&protocol=mqqwpa://im/chat?sigt=5CD3FAD9ED9A12B963FA07D21C30864EAE01DDA561AAC45BB5ADBF1CF6D3DED8B806A30AF433B8CC5EA5AFA7AB15609C356C55C7EA4F25954EE2AE835A1830F0AFE6DB9AD6592868928F5F74670D90AAE353CB84DB0654BD5D2DE8823492D13EA9642BD64C9C56E9F2B6187FAE672BB919533700A51BB91179B711428E2154B3&chat_type=crm&uin=2852270581&version=1&src_type=web&web_src=1&wpaType=2&assignId=2852270581&QidianSigT=5CD3FAD9ED9A12B963FA07D21C30864EAE01DDA561AAC45BB5ADBF1CF6D3DED8B806A30AF433B8CC5EA5AFA7AB15609C356C55C7EA4F25954EE2AE835A1830F0AFE6DB9AD6592868928F5F74670D90AAE353CB84DB0654BD5D2DE8823492D13EA9642BD64C9C56E9F2B6187FAE672BB919533700A51BB91179B711428E2154B3&QidianKfUin=2852061114&rkey=ed71bbc21063ae66a51836c913383c4c&shouldReturnToRoot=NO">
                        <span class="iconfont icon-message_light c58"></span>
                        <p>客服</p>
                    </a>
                    <a class="cell tac" href="javascript:;" @click="collect()">
                        <span class="iconfont icon-favor_light"></span>
                        <p>收藏</p>
                    </a>
                    <router-link class="cell tac bgea" to="/shopCart">
                        <span class="iconfont icon-31gouwuche"></span>
                        <p>购物车</p>
                    </router-link>
                </div>
                <span class="item cart" @click="operateGoods(1)">加入购物车</span>
                <span class="item buy" @click="operateGoods(2)">立即购买</span>
            </footer>
        </div>
        <popup class="shop-msg" title="" ref="p3">
            <div class="msg-con">
                <div class="summary">
                    <img class="img" :src="'http://www.fescomall.com/Thumbnail/BusGoodsList' + curImg" width="100" height="100">
                    <div class="main">            
                        <p class="price">积分:{{curPrice}}</p> 
                        <div class="stock-control">
                            <label class="label">库存:</label>{{curStock}}
                            <span class="limitTip"></span>
                        </div>            
                        <div class="sku-dtips">已选择: 
                            <span>{{curSku1}}</span>
                            <span>{{curSku2}}</span>
                        </div>         
                    </div>
                </div>
                <div class="sku-con">
                    <div class="sku-group">
                        <!-- 第1组 -->
                        <div class="sku">
                            <h3 class="tit">{{items.Goods.Ysname}}</h3>
                            <ul class="sku-li clearfix">
                                <li v-for="(item,index) in items.Ys1List"
                                @click="checkedSku(0,item,$event)">
                                    {{item.Name}}
                                </li>
                            </ul>
                        </div>
                        <!-- 第2组 -->
                        <div class="sku">
                            <h3 class="tit">{{items.Goods.Ysname2}}</h3>
                            <ul class="sku-li clearfix" id="sku-sub-prop">
                                <li v-for="(item,index) in curSkuList"
                                :class="{disable: !isCanSelectSku}"
                                @click="checkedSku(1,item,$event)">
                                    {{item.Ys2name}}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="shop-num clearfix">
                        <h3 class="tit fl">购买数量</h3>
                        <div class="mui-number">
                            <span class="decrease" @click="changeMoney(0)">-</span>
                            <input type="number" class="num" v-model="productQuantity">
                            <span class="increase" @click="changeMoney(1)">+</span>
                        </div>
                    </div>
                </div>
                <div class="sku-ok" @click="skuOk()" v-if="!isSelectSku">
                    <div class="" @click="addCart()" v-if="operateType == 1">加入购物车</div>
                    <div class="" @click="buyNow()" v-if="operateType == 2">立即购买</div>
                </div>
                <div class="operate-sku-bar flex-box tac" v-if="isSelectSku">
                    <div class="flex-item cart" @click="addCart()">加入购物车</div>
                    <div class="flex-item" @click="buyNow()">立即购买</div>
                </div>
            </div>
        </popup>
        <!-- 菜单面板 -->
        <popover class="menu-panel" trigger="#edit">
            <popover-item>
                <router-link class="rel bor-bottom" to="/">
                    <i class="iconfont icon-31shouye"></i>
                    商城首页
                </router-link>
            </popover-item>
            <popover-item>
                <router-link class="rel bor-bottom" to="/gobal">
                    <i class="iconfont icon-icon1"></i>
                    全球购
                </router-link>
            </popover-item>
            <popover-item>
                <router-link class="rel bor-bottom" to="/mine">
                    <i class="iconfont icon-31wode"></i>
                    个人中心
                </router-link>
            </popover-item>
        </popover>
        <alert :title="'提示'" :content="tipsContent" ref="alert"></alert>
        <!-- 弹窗错误信息 -->
        <div class="notify" v-if="popMsg.isShowMsg">
            <div class="txt">{{popMsg.errorMsg}}</div>
        </div>
    </div>
</template>

<script>
    import Content from '../components/content'
    import { SimpleHeader } from '../components/header'
    import { SlideWrapper, Slide } from '../components/slide'
    import { Footer, Item } from '../components/footer'
    import Popup from '../components/popup'
    import { Popover, PopoverItem } from '../components/popover'
    import { Alert } from '../components/modal'   // 成功后弹窗
    import apiList from "../apiList.js"  // api列表

    export default {
        components: {
            'page-content': Content,
            SimpleHeader,
            'page-footer': Footer,
            'footer-item': Item,
            SlideWrapper,
            Slide,
            Popup,
            Alert,
            Popover,
            PopoverItem
        },
        data () {   // sku中第一行选定颜色类型，第二行选定tid
            return {  
                popMsg: {
                    isShowMsg: false,     // 是否显示弹窗错误信息
                    errorMsg: "",         // 弹窗错误信息
                },
                weekLeftTime: 0,         // 每周精选所剩时间
                isEnoughPay: false,      // 是否足够积分支付
                tipsContent: "",        // 弹窗提示内容
                skuProps: {},            // sku属性需要传给api使用
                productQuantity: 1,         // 选定商品数量
                items: {     // 添加json结构，解决初始化渲染错误
                    Goods: {
                        Cname: ""
                    },
                    Tail: {
                        Planid: "",
                    },
                    Ys1: {
                        Imgs: []
                    }
                },       // 后台传过来数据
                curImg: "",      // 选定的当前产品图,作为sku第1行参数
                curImgs: ["", "", ""],     // 选定的当前产品图数组,作为slide详情图
                isShowImgs: true,      // 是否显示顶部多图片
                isSelectSku: false,     // 是否从选择sku条进入
                operateType: 1,        // 操作类型 1为购物车，2为立即购买
                curTid: "",     // 选定的当前Tid，作为sku第2行参数
                curSku1: "",     // 选定的当前sku
                curSku2: "",     // 选定的当前sku
                curStock: "",    // 选定的当前库存
                curPrice: "",    // 选定的当前价格
                curSkuList: "",   // 弹窗显示的子规格
                isCanSelectSku: false,   // 是否可选子规格
                autumnLeftTime: "",      // 中秋剩下时间
                userFid: "",             // 用户类型
            }
        },
        computed: {
            // 处理详情图
            filterGoodsImg: function () {
                var reg = /\/Uploads(.*?).jpg/g;
                if (this.items.Goods.Content) {
                    return this.items.Goods.Content.match(reg);
                }
            },
            formatFeaturedMoney1: function () {
                var value = this.items.Tail.Price;
                var i = String(value).indexOf(".");
                if (i != -1) {
                    return String(value).substring(0, i); 
                }
                return value;
            },
            formatFeaturedMoney2: function () {
                var value = this.items.Tail.Price;
                var i = String(value).indexOf(".");
                if (i != -1) {
                    return String(value).slice(i); 
                }
                return ".0";
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getGoods();

                // 访问详情返回顶部
                this.backTop();

                // 设置标题
                this.setTitle("商品详情");
            });
        },
        methods: {
            getGoods: function () {     // 列表数据请求                
                var url = apiList.data.Goods;
                var oQuery = this.$route.query;
                if (oQuery.tid == 13955 || oQuery.tid == 13956) {
                    this.tipsContent = "手机暂时不开放该商品购买";
                    this.$refs.alert.open();
                    var that = this;
                    setTimeout(function () {
                        that.$router.push("/");
                    }, 1e3)
                }
                // 秒杀
                var goodsId = oQuery.tid == 13956 ? 0 : oQuery.tid;
                this.$http.post(url, {
                    planid: oQuery.planid,
                    tid: goodsId
                }).then(function (data) {
                    var oData = data.body;
                    this.items = oData;
                    // 用户为空下跳转登录
                    if (!oData.User) {
                        this.$router.push("/login");
                        return false;
                    }
                    
                    this.curImg = oData.Ys1.Img;
                    let oImgs = this.items.Ys1.Imgs;
                    if (!oImgs) {
                        this.isShowImgs = false;
                    } else {
                        // 过滤图片，字符串、分割不规整进行过来
                        this.curImgs = oImgs.split("、").filter((item) => {
                            return item != "";
                        });
                        this.isShowImgs = true;
                    }

                    // 子规格由Tail的默认Ys1值决定数组
                    var oldArr = this.items.Tails;
                    var newArr = [];
                    for (var i = 0; i < oldArr.length; i++) {
                        if (oldArr[i].Ys1 == this.items.Tail.Ys1) {
                            newArr.push(oldArr[i]);
                        }
                    }
                    this.curSkuList = newArr;

                    //  每周精选计算所剩时间
                    if (oQuery.planid == 103) {
                        var oDate = new Date();
                        var day = oDate.getDay();
                        if (day == 6) {
                            this.weekLeftTime = day;
                        }
                        if (day == 0) {
                            this.weekLeftTime = 5;
                        }
                        if (day > 0 && day < 6) {
                            this.weekLeftTime = 5 - day; 
                        }
                    }

                    // 迈普用户处理
                    this.userFid = window.sessionStorage.fid_num39;
                    if (this.userFid == 39) {
                        var startTime = this.formatDate(oData.TimeLimit.start);
                        var endTime = this.formatDate(oData.TimeLimit.end);

                        //  给日期类对象添加日期差方法，返回日期与diff参数日期的时间差，单位为天
                        Date.prototype.diff = function (start, end) {
                            return (end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000);
                        }
                        //  构造两个日期，分别是系统时间和2013/04/08 12:43:45
                        var start = new Date(startTime);
                        var end = new Date(endTime);
                        //  调用日期差方法，求得参数日期与系统时间相差的天数
                        var diff = new Date().diff(start, end);
                        //  打印日期差
                        this.autumnLeftTime = parseInt(diff);
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 选择sku弹窗从选择条进入
            selectSku: function () {
                this.isSelectSku = true;
                this.$refs.p3.open();
            },
            // 选择sku弹窗从底部操作条进入
            operateGoods: function (type) {
                this.isSelectSku = false;
                this.operateType = type;
                this.$refs.p3.open();
            },
            // 立即购买
            buyNow: function () {
                var that = this;
                if (!this.curSku1) {
                    // 跳出弹窗1000毫秒关闭
                    this.popMsg.isShowMsg = true;
                    this.popMsg.errorMsg = "请选择" + this.items.Goods.Ysname;
                    setTimeout(function () {
                        that.popMsg.isShowMsg = false;
                    }, 1e3)
                    return false;
                }
                if (!this.curSku2) {
                    // 跳出弹窗1000毫秒关闭
                    this.popMsg.isShowMsg = true;
                    this.popMsg.errorMsg = "请选择" + this.items.Goods.Ysname2;
                    setTimeout(function () {
                        that.popMsg.isShowMsg = false;
                    }, 1e3)
                    return false;
                }
                // type = 2 为立即购买结算到订单
                this.$router.push({ path: '/order?type=2&num=' + this.productQuantity + '&goods=' + this.curTid })  
            },
            // 加入购物车
            addCart: function () {
                var url = apiList.data.AddToShoppingCard;
                var that = this;
                if (!this.curSku1) {
                    // 跳出弹窗1000毫秒关闭
                    this.popMsg.isShowMsg = true;
                    this.popMsg.errorMsg = "请选择" + this.items.Goods.Ysname;
                    setTimeout(function () {
                        that.popMsg.isShowMsg = false;
                    }, 1e3)
                    return false;
                }
                if (!this.curSku2) {
                    // 跳出弹窗1000毫秒关闭
                    this.popMsg.isShowMsg = true;
                    this.popMsg.errorMsg = "请选择" + this.items.Goods.Ysname2;
                    setTimeout(function () {
                        that.popMsg.isShowMsg = false;
                    }, 1e3)
                    return false;
                }
               
                this.$http.post(url, {
                    nums: this.productQuantity,   // 数量
                    tid: this.curTid              // tid
                }).then(function (data) {
                    this.$refs.p3.close();
                    var oData = data.body;
                    // Result结果说明:-1未登录或者登陆超时，-2获取商品信息失败，-3加入购物车失败，1成功
                    if (oData.Result == 1) {
                        this.tipsContent = "加入购物车成功";
                        that.$refs.alert.open();
                        return false;
                    } else {
                        this.tipsContent = oData.Message;
                        that.$refs.alert.open();
                        if (oData.Result == -1) {
                            this.$router.push("/login");
                        }
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 选择sku中具体项，添加设置每个skuItem的值
            checkedSku: function (type, item, event) {
                // 选定第1行sku
                var curNode = event.currentTarget;
                var childList = curNode.parentNode.childNodes;
                if (type == 0) {
                    this.curImg = item.Img;    // 选定第一行sku项时图片对应索引号
                    this.curSku1 = item.Name;   // 显示第一个参数

                    // 选定主规格后对应显示子规格
                    var oldArr = this.items.Tails;
                    var newArr = [];
                    for (var i = 0; i < oldArr.length; i++) {
                        if (oldArr[i].Ys1 == item.Id) {
                            newArr.push(oldArr[i]);
                        }
                    }
                    this.curSkuList = newArr;

                    // 清空子规格选定样式
                    var subList = this.$el.querySelectorAll("#sku-sub-prop li");
                    for (var z = 0; z < subList.length; z++) {
                        subList[z].setAttribute("class", "");
                    }

                    // 清空选定参数
                    this.curTid = "";
                    this.curSku2 = "";      // 显示第二个参数
                    this.curPrice = "";     // 显示价格
                    this.curStock = "";     // 显示库存

                    // 可以选定子规格
                    this.isCanSelectSku = true;

                    // 设置样式
                    for (var n = 0; n < childList.length; n++) {
                        childList[n].setAttribute("class", "");
                    }
                    event.currentTarget.setAttribute("class", "checked");
                }

                // 选定第2行sku,才决定tid(包含所有参数),传参给接口的tid
                if (type == 1 && this.isCanSelectSku) {
                    this.curTid = item.Id;              // 选定tid
                    this.curSku2 = item.Ys2name;        // 显示第二个参数
                    this.curPrice = item.Price;         // 显示价格
                    this.curStock = item.Kucun;         // 显示库存

                    // 设置样式
                    for (var j = 0; j < childList.length; j++) {
                        childList[j].setAttribute("class", "");
                    }
                    event.currentTarget.setAttribute("class", "checked");
                }
            },
            // 点击加减  数量不应大于库存量
            changeMoney: function (type) {
                if (type == 0) {
                    this.productQuantity > 1 ? this.productQuantity-- : this.productQuantity = 1;
                }
                if (type == 1) {
                    if (this.productQuantity < this.curStock) {
                        this.productQuantity ++;
                    }
                }
            },
            // 收藏商品
            collect: function () {
                var url = apiList.data.AjaxShouCang;
                var that = this;
                this.$http.post(url, {
                    tid: this.items.Tail.Id
                }).then(function (data) {
                    that.tipsContent = "收藏成功";
                    that.$refs.alert.open();
                }, function (response) {
                    console.info(response);
                })
            },
            // 返回顶部
            backTop: function () {
                document.body.scrollTop = 0;
            },
            // 日期过滤器
            formatDate: function (value) {
                // 转换需要的方法
                String.prototype.ToString = function (format) {
                    var dateTime = new Date(parseInt(this.substring(6, this.length - 2)));
                    format = format.replace("yyyy", dateTime.getFullYear());
                    format = format.replace("yy", dateTime.getFullYear().toString().substr(2));
                    format = format.replace("MM", dateTime.getMonth() + 1)
                    format = format.replace("dd", dateTime.getDate());
                    format = format.replace("hh", dateTime.getHours());
                    format = format.replace("mm", dateTime.getMinutes());
                    format = format.replace("ss", dateTime.getSeconds());
                    format = format.replace("ms", dateTime.getMilliseconds())
                    return format;
                };
                // 调用
                return value.ToString("yyyy-MM-dd  hh:mm:ss");
            }
            
        },
        filters: {
            formatMoney (value) {
                if (!value) return;
                return value.toFixed(2)
            },
        }
    }
</script>
<style lang="less">
    .goods-page{
        .bgea{
            background-color: #eae9ee;
        }
        .mark{
            position:absolute;
            top:0;
            right:0;
            bottom:0;
            left:0;
            z-index: 10000; 
            background-color: rgba(0,0,0,.6);
            display:none;
            &.show{
                display:block;
            }
        }
        .shop-msg{
            z-index: 10000!important;
            max-width: 640px;
            margin:0 auto;
            position:relative;
            .msg-con{
                width:100%;
                background-color: #fff;
            }
            .summary {
                position: relative;
                top: 0;
                left: 0;
                width: 100%;
                min-height: 5.0rem;
                background-color: #fff;
                font-size: 14px;
                -webkitbox-shadow: 0 1px 0 rgba(0,0,0,.05),0 .5px 0 rgba(0,0,0,.09);
                box-shadow: 0 1px 0 rgba(0,0,0,.05), 0 0.5px 0 rgba(0,0,0,.09);
                .price{
                    color: #DD2727;
                }
            }
            .img{
                position: absolute;
                top: -1.3rem;
                left:.625rem;
                height: 5.0rem;
                width: 5.0rem;
                border: 1px solid #ddd;
                border-radius: 4px;
                z-index: 10;
            }
            .main{
                padding:0.5rem 0 .5rem 6.5rem;
            }
            .sku-con{
                padding:.5rem 1rem 3.5rem;
                overflow-y:scroll;
                width:100%;
                height:13.5rem;
                .tit{
                    margin-bottom:5px;
                    color: #666;
                }
            }
            .sku-ok{
                position: fixed;
                bottom:0;
                display:block;
                width:100%;
                height:3rem;
                font-size: 16px;
                text-align: center;
                line-height: 3rem;
                color:#fff;
                background-color: #DD2727;
            }
            .mui-number{
                float:right;
                margin-top:0.5rem;
                margin-right:0.5rem;
                border: 1px solid #b3b3b3;
                border-radius: 3px;
                letter-spacing: 0;
                height: 2rem;
                overflow: hidden;
                text-align: center;
                .decrease,.increase {
                    float: left;
                    font-size: 1.5rem;
                    font-weight: 700;
                    display: block;
                    width: 2rem;
                    height: 1.9rem;
                    line-height: 1.8rem;
                    background-color: #fff;
                    color: #5f646e;
                }
                .decrease {
                    border-right: 1px solid #b3b3b3;
                }
                .increase {
                    border-left: 1px solid #b3b3b3;
                }
                .num {
                    float: left;
                    height: 100%;
                    min-width: 2.18rem;
                    max-width: 3.43rem;
                    padding: .125rem;
                    border: none;
                    text-align: center;
                    font-weight: 700;
                    color: #3d4245;
                    font-size: 16px;
                }
            }
            .sku-group{
                li{
                    float:left;
                    border: 1px solid #e5e5e5;
                    -webkit-border-radius: 3px;
                    border-radius: 3px;
                    background-color: #fff;
                    min-width: 2em;
                    padding: 6px 8px;
                    margin: 0 10px 10px 0;
                    max-width: 100%;
                    text-align: center;
                    line-height: 1;
                    &.checked{
                        border-color: #b10000;
                        color: #000;
                    }
                    &.disable{
                        color:#e5e5e5;
                    }
                }
            }
            .shop-num{
                height: 3.1rem;
                line-height: 3.1rem;
                border-top:1px solid #ddd;
                border-bottom:1px solid #ddd;
            }
        }
        .page-content{
            margin-bottom:2.8rem;
        }
        .footer-box{
            .hr28{
                height:2.8rem;
                background-color: #fff;
            }
        }
        .footer{
            background: #fff;
            line-height: 2.8rem;
            .item-box{
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;
                -webkit-box-flex: 4;
                -webkit-flex: 4;
                flex: 4;
            }
            .item{
                -webkit-box-flex: 3;
                -webkit-flex: 3;
                flex: 3;
                display: block;
                text-align: center;
                color:#fff;
                font-size: 15px;
            }
            .cell{
                display:block;
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
                padding-top:.5rem;
                line-height:1.2;
                border-right:1px solid #ddd;
                .iconfont{
                    font-size: 20px;
                }
                p{
                    font-size: 10px;
                }
            }
            .cart{
                background-color: #FF9500;
            }
            .buy{
                background-color: #DD2727;
            }
        }
        .page-content{
           background-color: #f4f4f4; 
        }
        .con{
            background-color: #fff;
            overflow:hidden;
        }
        h1{
            padding: 0 10px;
            margin-top:10px;
            line-height: 1.35em;
            font-size: 16px;
            color: #051B28;
        }
        .price-li{
            padding:0 10px;
            .price{
                font-size: 24px;
                color: #dd2727;
            }
            .market-price{
                font-size: 10px;
                color: #888;
            }
        }
        .status-li{
            font-size: 0.6rem;
        }
        .field{
            padding-bottom: 20px;
            margin-top:10px;
            background-color: #fff;
            font-size: 14px;
            overflow: hidden;
            th{
                min-width: 4.0rem;
                word-break: break-all;
                color: #999;
                font-weight: 400;
            }
            td{
                word-wrap:break-word
            }
            .line-tit{
                margin:10px 0;
            }
        }
        .goods-li{
            .line-tit{
                margin:10px 0;
            }
            img{
                width:100%;
            }
        }
        .line-tit{
            background: #FFF;
            height: 34px;
            line-height: 34px;
            position: relative;
            padding-left: 12px;
            font-size: 14px;
            color: #666;
        }
        .instruction{
            .line-tit{
                margin:10px 0;
            }
            .txt{
                padding:10px;
                font-size: 12px;
                line-height: 26px;
                background-color: #fff;
            }
        }
        .notify {
            position: fixed;
            top: 37%;
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
            z-index: 10000;
            .txt {
                padding: 10px;
                text-align: center;
                word-wrap: break-word;
            }
        }
        .operate-sku-bar{
            position: fixed;
            bottom: 0;
            width: 100%;
            height: 3rem;
            font-size: 16px;
            text-align: center;
            line-height: 3rem;
            color: #fff;
            background-color: #DD2727;
            .cart{
                background-color: #FF9500;
            }
        }
        .back-img{
            position:fixed;
            bottom:20%;
            right:20px;
            width:2rem;
            height:2rem;
        }
        .home-menu{
            position:absolute;
            top:10px;
            right:10px;
            display:block;
            width:2.0rem;
            height:2.0rem;
            color:#fff;
            background-color: rgba(0,0,0,.7);
            border-radius: 100%;
            text-align: center;
            line-height: 2.0rem;
            z-index: 100;
        }
        .featured-goods-box{
            position:relative;
            height:3.0rem;
            padding-left:1.25rem;
            background-color: #f61d4a;
            .lab{
                position:absolute;
                top:0.4rem;
                left:5.75rem;
                color:#fff;
                opacity:.8;
            }
            .price{
                color:#fff;
                font-size: 1.9rem;
            }
            .price2{
                margin-left:-0.2rem;
                color:#fff;
                font-size: 1rem;
            }
            .price3{
                margin-left:10px;
                color:#fff;
            }
        }
        .left-timebox{
            position:relative;
            width:6.5rem;
            height: 3.0rem;
            padding-top: 0.25rem;
            color:#f61d4a;
            background-color: #ffe644;
            text-align: center;
            line-height: 1.2rem;
            &:before{
                position:absolute;
                top:0;
                left:-0.75rem;
                content: "";
                height: 0;
                width: 0;
                line-height: 0;
                font-size: 0;
                overflow: hidden;
                border-right: 0.75rem solid #ffe644;
                border-top: 1.5rem solid transparent;
                border-bottom: 1.5rem solid transparent;
            }   
            .num{
                display: inline-block;
                width:1.2rem;
                height:1.2rem;
                text-align: center;
                line-height: 1.2rem;
                color:#fff;
                background-color: #643113;
                border-radius: 3px;

            } 
        }
    }

</style>
