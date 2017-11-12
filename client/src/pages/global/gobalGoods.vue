<template>
    <div class="page gobalGoods-page">
        <!-- <simple-header class="fixed" title="商品详情" :back-link="true"></simple-header> -->
        <div class="rel">
            <span class="home-menu" id="edit">
                <i class="iconfont icon-caidan"></i>
            </span>
            <slide-wrapper class="bgf">
                <slide>
                    <img class="slide-img" :src="'http://msyc-img.oss-cn-shenzhen.aliyuncs.com' + curImg" />
                </slide>
            </slide-wrapper>
        </div>
        <div class="con">
            <h1>
                {{items.Goods.Cname}}
            </h1>
            <div class="price-li">
                <p class="price">
                    {{items.Tail.Price | formatMoney("")}}
                </p>
                <!-- <p class="market-price">市场价：<del>{{items.Tail.Basisprice | formatMoney("")}}</del></p> -->
            </div>
            <div class="status-li">
                <span>快递：0.00</span>
                <span class="tac">销量：{{items.Tail.RelSale + items.Tail.RndSale}}</span>
                <span class="tar">{{items.Goods.Product}}</span>
            </div>
        </div>
        <div class="gobal-about mt10 bgf">
            <h3 class="tit">全球购 • 海外直购</h3>
            <div class="items-line rel" @click="$refs.p1.open()">
                海外全球购小贴士
                <span class="link-arrow icon icon-link"></span>
            </div>
        </div>
        <div class="field">
            <h2 class="line-tit">主要参数 <span class="c9">Product Description</span></h2>
            <table>
                <tbody>
                    <tr>
                        <th>外语名</th>
                        <td>{{items.Goods.Ename}}</td>
                    </tr>
                    <tr>
                        <th>产地</th>
                        <td>{{items.Goods.Product}}</td>
                    </tr>
                    <tr>
                        <th>品牌</th>
                        <td>{{items.Goods.Mcname}}</td>
                    </tr>
                    <tr>
                        <th>介绍</th>
                        <td>{{items.Goods.Jianj}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="goods-li">
            <h2 class="line-tit">商品图片 <span class="c9">Product Detail</span></h2>
            <img :src="'http://msyc-img.oss-cn-shenzhen.aliyuncs.com' + item" v-for="item in filterGoodsImg">
        </div>
        <div class="instruction">
            <h2 class="line-tit">商品说明 <span class="c9">Product Instruction</span></h2>
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
        <div class="footer-box">
            <div class="hr28"></div>
            <footer class="footer">
                <div class="item-box">
                    <a class="cell tac" href="https:// webpage.qidian.qq.com/2/chat/h5/index.html?kfuin=2852061114&kfext=2852270580&visitorId=186970112&visitorid=186970112&fid=10&key=a6a79e787d55c66d6b5081a9d5e7e5cb&cate=1&type=4&ftype=1&pid=tuc47i.ow8cd9.j27defb9&clickid=m2gjls.kyc9zy.j27df6re&tpForm=1&qid=4nxycg.79aokz.j27bxwob&env=1&eptype=2&clickType=1&tptype=2&roleKey=roleQQ&roleValue=&roleUin=2852270582&roleData=2852270582&cb=JSONP_CB_3&linkType=1">
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
                <span class="item cart" @click="addCart()">加入购物车</span>
                <span class="item buy" @click="buyNow()">立即购买</span>
            </footer>
        </div>
        <popup class="shop-msg" title="" ref="p3">
            <div class="msg-con">
                <div class="summary">
                    <div class="img">
                        <img :src="'http://msyc-img.oss-cn-shenzhen.aliyuncs.com' + curImg" width="100" height="100">
                    </div>
                    <div class="main">            
                        <p class="price">积分:{{items.Tail.Price}}</p> 
                        <div class="stock-control">
                            <label class="label">库存:</label>{{items.Tail.Kucun}}
                            <span class="limitTip"></span>
                        </div>            
                        <div class="sku-dtips">已选择: 
                            <span>{{items.Tail.Ys1name}}</span>
                        </div>         
                    </div>
                </div>
                <div class="sku-con">
                    <div class="sku-group">
                        <!-- 第1组 -->
                        <div class="sku">
                            <h3 class="tit">{{items.Goods.Ysname}}</h3>
                            <ul class="sku-li clearfix">
                                <li class="checked" v-for="(item,index) in items.Ys1List">
                                    {{item.Name}}
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
                <span class="sku-ok" @click="skuOk()">确定</span>
            </div>
        </popup>
        <!-- 返回顶部 -->
        <span class="back-img" @click="backTop()"></span>
        <!-- 邀请码弹窗 -->
        <popup ref="p1" title="海外全球购小贴士">
            <div class="content-padded">
                为帮助您更好地选购境外商品，麻烦您在购买前务必认真、详细阅读并完全理解本告知书的全部内容，并对自身风险承担做出客观判断。同意本文所告知内容后再进行下单购买：
                <ul>
                    <li>
                        <span class="fl">1、</span>
                        <p class="ofh">您在海外全球购上购买的境外商品等同于原产地直接销售商品，因此商品本身可能未加贴中文标签，如果需要，您可以通过网站查看相关商品标签中文翻译或联系客服。</p>
                    </li>
                    <li>
                        <span class="fl">2、</span>
                        <p class="ofh">根据相关法律政策，您选购的境外商品仅限于个人自用，不得进行二次销售，并且需要提供身份证号码与姓名（收货人与身份证姓名一致）。</p>
                    </li>
                    <li>
                        <span class="fl">3、</span>
                        <p class="ofh">您购买的境外商品符合原产地有关品质、健康、标识的相关标准，与我国质量安全标准或有所不同，所以在使用过程中可能产生的危害或损失以及其他风险，将由您个人承担。</p>
                    </li>
                    <li>
                        <span class="fl">4、</span>
                        <p class="ofh">本商城海外全球购并非商品售卖方，商品均由商家向您提供，由商家承担其商品的质量保证责任。</p>
                    </li>
                    <li>
                        <span class="fl">5、</span>
                        <p class="ofh">由于海外全球购商品均由海外发货，所有包裹到国内都需经过海关进行清关，因此清关费用统一按照每个订单收取25元/订单。</p>
                    </li>
                    <li>
                        <span class="fl">6、</span>
                        <p class="ofh">由于跨境电商的特殊性，海外全球购商品全由海外发货的，所有包裹到国内都需经过海关进行清关，一般到达消费者手上可能需要7-10个工作日，假如碰上海关周末和法定假日休息，您的包裹会自动依时顺延，请耐心等候。</p>
                    </li>
                    <li>
                        <span class="fl">7、</span>
                        <p class="ofh">为了方便您对跨境电商模式的理解，可搜索“跨境电商消费常识”了解更多详情。海外全球购精选全球好货，严控每一个环节，为顾客提供正品保障。</p>
                    </li>
                </ul>
            </div>
        </popup>
        <alert :title="'提示'" :content="tipsContent" :on-ok="log" ref="alert"></alert>
        <!-- 弹窗错误信息 -->
        <div class="notify" v-if="popMsg.isShowMsg">
            <div class="txt">{{popMsg.errorMsg}}</div>
        </div>
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
    </div>
</template>

<script>
    import Content from '../../components/content'
    import { SimpleHeader } from '../../components/header'
    import { SlideWrapper, Slide } from '../../components/slide'
    import { Footer, Item } from '../../components/footer'
    import Popup from '../../components/popup'
    import {Popover, PopoverItem} from '../../components/popover'
    import { Alert } from '../../components/modal'   // 成功后弹窗
    import apiList from "../../apiList.js"  // api列表

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
                isEnoughPay: false,      // 是否足够积分支付
                tipsContent: "",        // 弹窗提示内容
                apiType: 0,           // 判断是加入购物车还是立即购买 0加入购物车 1购买
                skuProps: {},            // sku属性需要传给api使用
                productQuantity: 1,         // 选定商品数量
                apiUrl: "",   // 加入购物车或购买的API点击的时候自定义
                items: {     // 后台传过来数据(初始化下报错)
                    Goods: {
                        Cname: ""
                    },
                    Tail: {
                        Price: ""
                    }
                }, 
                curImg: "",      // 选定的当前产品图,作为sku第1行参数
                curImgs: "",     // 选定的当前产品图数组,作为slide详情图
                curTid: "",     // 选定的当前Tid，作为sku第2行参数
                curSku1: "",     // 选定的当前sku
                curSku2: "",     // 选定的当前sku
                curStock: "",    // 选定的当前库存
                curPrice: "",    // 选定的当前价格
                curSkuList: "",   // 弹窗显示的子规格
                isCanSelectSku: false,   // 是否可选子规格
            }
        },
        computed: {
            // 处理详情图
            filterGoodsImg: function () {
                var reg = /\/product(.*?).jpg/g;
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
            },
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
                this.$http.post(url, {
                    planid: oQuery.planid,
                    tid: oQuery.tid
                }).then(function (data) {
                    var oData = data.body;
                    // 用户为空下跳转登录
                    if (!oData.User) {
                        this.$router.push("/login");
                        return false;
                    }
                    
                    this.items = oData;
                    this.curImg = oData.Ys1.Img;

                    this.curTid = oData.Tail.Id;
                    // 子规格由Tail的默认Ys1值决定数组
                    var oldArr = this.items.Tails;
                    var newArr = [];
                    for (var i = 0; i < oldArr.length; i++) {
                        if (oldArr[i].Ys1 == this.items.Tail.Ys1) {
                            newArr.push(oldArr[i]);
                        }
                    }
                    this.curSkuList = newArr;
                }, function (response) {
                    console.info(response);
                })
            },
            // 立即购买
            buyNow: function () {
                this.apiUrl = apiList.data.PlaceOrder;
                this.apiType = 1;
                this.$refs.p3.open();
            },
            // 加入购物车
            addCart: function () {
                this.apiUrl = apiList.data.AddToShoppingCard;
                
                this.apiType = 0;
                this.$refs.p3.open();
            },
            // 确定选定sku参数
            skuOk: function () {
                var type = this.apiType;
                var url = this.apiUrl;
                var that = this;
                if (type == 0) {      // 加入购物车
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
                }
                if (type == 1) {  // 立即购买
                    // type = 2 为立即购买结算到订单
                    this.$router.push({ path: '/order?type=2&num=' + this.productQuantity + '&goods=' + this.curTid })  
                }
            },
            // 点击加减  数量不应大于库存量
            changeMoney: function (type) {
                if (type == 0) {
                    this.productQuantity > 1 ? this.productQuantity-- : this.productQuantity = 1;
                }
                if (type == 1) {
                    if (this.productQuantity < this.items.Tail.Kucun) {
                        this.productQuantity ++;
                    }
                }
            },
            // 弹窗确定
            log: function (m) {
                //  console.log(m)
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
            
        },
        filters: {
            formatMoney (value) {
                if (!value) return;
                return value.toFixed(2)
            },
        },
    }
</script>
<style lang="less">
    .gobalGoods-page{
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
                -webkitbox-shadow: 0 1px 0 rgba(0,0,0,.05),0 .5px 0 rgba(0,0,0,.09);
                box-shadow: 0 1px 0 rgba(0,0,0,.05), 0 0.5px 0 rgba(0,0,0,.09);
                padding: .625rem;
                height: 100px;
                background-color: #fff;
                font-size: 14px;
                .price{
                    color: #DD2727;
                }
            }
            .img{
                position: relative;
                top: -32px;
                background-color: #fff;
                z-index: 10;
                padding: 2px;
                border: 1px solid #ddd;
                -moz-border-radius: 4px;
                border-radius: 4px;
                -webkit-border-radius: 4px;
                float: left;
                margin-right: 1em;
                height: 100px;
                width: 100px;
                display: -webkit-box;
                -webkit-box-align: center;
                -webkit-box-pack: center;
                display: -ms-flexbox;
                -ms-flex-pack: center;
                -ms-flex-align: center;
                img{
                    max-width: 100%;
                    max-height: 100%;
                    display: block;
                    -moz-border-radius: 4px;
                    border-radius: 4px;
                    -webkit-border-radius: 4px;
                }
            }
            .sku-con{
                padding:0rem 1rem 3.5rem;
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
        .slide-img{
            height:12rem;
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
                background-color: #7a45e5;
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
                color: #7a45e5;
            }
            .market-price{
                font-size: 10px;
                color: #888;
            }
        }
        .status-li{
            padding:0 10px;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            line-height: 30px;
            color: #999;
            font-size: 12px;
            span{
                -webkit-box-flex: 1;
                -webkit-flex: 1;
                flex: 1;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }
        .field{
            padding-bottom: 20px;
            margin-top:10px;
            background-color: #fff;
            font-size: 14px;
            th{
                width: 2.5rem;
                word-break: break-all;
                color: #999;
                font-weight: 400;
                vertical-align: top;
            }
        }
        .goods-li{
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
            margin:10px 0;
            color:#7a45e5;
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
        .back-img{
            position:fixed;
            bottom:20%;
            right:20px;
            width:2rem;
            height:2rem;
            background-color: rgba(0,0,0,0.7);
            -webkit-border-radius: 50%;
            border-radius: 50%;
            background-image: url(../../assets/top.png);
            background-position: center center;
            background-repeat: no-repeat;
            background-size:55% 55%;
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
        .content-padded{
            padding:0.5rem;
            height:15rem;
            overflow-y:scroll;
            -webkit-overflow-scrolling: touch; 
        }
        .gobal-about{
            .tit{
                padding-top:0.5rem;
                padding-left:0.5rem;
                color: #7a45e5;
                font-size: 1.2rem;
                font-weight: 700;
            }
            .items-line{
                color:#666;
            }
        }
    }

</style>
