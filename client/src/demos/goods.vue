<template>
    <div class="page goods-page">
        <!-- <simple-header class="fixed" title="商品详情" :back-link="true"></simple-header> -->
        <div class="rel">
            <router-link class="home-icon" to="/">
                <i class="iconfont icon-31shouye"></i>
            </router-link>
            <slide-wrapper>
                <slide v-for="(img,index) in curImgs" :key="index" v-if="img">
                    <img class="slide-img" :src="'http://www.shihuamall.com/Thumbnail/BusGoodsList' + img" />
                </slide>
            </slide-wrapper>
        </div>
        <div class="con">
            <h1>
                {{items.Goods.Cname}}
            </h1>
            <div class="price-li">
                <p class="price">{{items.Tail.Price | formatMoney("")}}</p>
                <p class="market-price">市场价：<del>{{items.Tail.Basisprice | formatMoney("")}}</del></p>
            </div>
            <div class="status-li">
                <span>快递：0.00</span>
                <span class="tac">销量：{{items.Tail.RelSale + items.Tail.RndSale}}</span>
                <span class="tar">{{items.Goods.Product}}</span>
            </div>
        </div>
        <div class="field">
            <h2 class="line-tit">主要参数</h2>
            <table>
                <tbody>
                    <tr>
                        <th>暂无参数</th>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="goods-li">
            <h2 class="line-tit">商品图片</h2>
            <img v-lazy="'http://www.shihuamall.com/' + item" v-for="item in filterGoodsImg">
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
                    <a class="cell tac" href="https://webpage.qidian.qq.com/2/chat/h5/index.html?kfuin=2852061114&kfext=2852270580&visitorId=186970112&visitorid=186970112&fid=10&key=a6a79e787d55c66d6b5081a9d5e7e5cb&cate=1&type=4&ftype=1&pid=tuc47i.ow8cd9.j27defb9&clickid=m2gjls.kyc9zy.j27df6re&tpForm=1&qid=4nxycg.79aokz.j27bxwob&env=1&eptype=2&clickType=1&tptype=2&roleKey=roleQQ&roleValue=&roleUin=2852270582&roleData=2852270582&cb=JSONP_CB_3&linkType=1">
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
                        <img :src="'http://www.shihuamall.com' + curImg" width="100" height="100">
                    </div>
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
                                @click="checkedSku(0,item)">
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
                                @click="checkedSku(1,item)">
                                    {{item.Name}}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="shop-num">
                        <h3 class="tit">数量</h3>
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

        <alert :title="'提示'" :content="tipsContent" :on-ok="log" ref="alert"></alert>
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
    import { Alert } from '../components/modal'   //成功后弹窗
    import apiList from "../apiList.js"  //api列表

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
        },
        data(){   //sku中第一行选定颜色类型，第二行选定tid
            return {  
                popMsg:{
                    isShowMsg: false,     //是否显示弹窗错误信息
                    errorMsg:"",         //弹窗错误信息
                },
                isWeChatBrowser:false,    //是否为微信浏览器
                isEnoughPay:false,      //是否足够积分支付
                tipsContent:"",        //弹窗提示内容
                apiType:0,           //判断是加入购物车还是立即购买 0加入购物车 1购买
                skuProps:{},            //sku属性需要传给api使用
                productQuantity:1,         //选定商品数量
                apiUrl:"",   //加入购物车或购买的API点击的时候自定义
                items:{},       //后台传过来数据
                curImg:"",      //选定的当前产品图,作为sku第1行参数
                curImgs:"",     //选定的当前产品图数组,作为slide详情图
                curTid:"",     //选定的当前Tid，作为sku第2行参数
                curSku1:"",     //选定的当前sku
                curSku2:"",     //选定的当前sku
                curStock:"",    //选定的当前库存
                curPrice:"",    //选定的当前价格
                curSkuList:"",   //弹窗显示的子规格
                isCanSelectSku:false,   //是否可选子规格
            }
        },
        computed:{
            //处理详情图
            filterGoodsImg:function(){
                var reg = /\/Uploads(.*?).jpg/g;
                return this.items.Goods.Content.match(reg);
            },
        },
        watch:{

        },
        mounted:function() {
            this.$nextTick(function(){
                this.getGoods();

                //访问详情返回顶部
                this.backTop();

                this.isWeChat();

                //设置标题
                this.setTitle("商品详情");
            });
        },
        methods: {
            getGoods:function(){     //列表数据请求
                
                var url = apiList.data.Goods;
                var oQuery = this.$route.query;
                this.$http.post(url,{
                    planid:oQuery.planid,
                    tid:oQuery.tid
                }).then(function(data){
                    var oData = data.body;
                    //用户为空下跳转登录
                    if(!oData.User){
                        this.$router.push("/login");
                        return false;
                    }
                    
                    this.items = oData;
                    this.curImg = oData.Ys1.Img;
                    this.curImgs = oData.Ys1.Imgs.split("、");

                    //子规格
                    this.curSkuList = oData.Ys2List.slice(0,2);

                    
                },function(response){
                    console.info(response);
                })
            },
            //立即购买
            buyNow:function(){
                this.apiUrl = apiList.data.PlaceOrder;
                this.apiType = 1;
                this.$refs.p3.open();
            },
            //加入购物车
            addCart:function(){
                this.apiUrl = apiList.data.AddToShoppingCard;
                
                this.apiType = 0;
                this.$refs.p3.open();
            },
            //确定选定sku参数
            skuOk:function(){
                var type = this.apiType;
                var url = this.apiUrl;
                var that = this;
                if(!this.curSku1){
                    //跳出弹窗1000毫秒关闭
                    this.popMsg.isShowMsg = true;
                    this.popMsg.errorMsg = "请选择"+ this.items.Goods.Ysname;
                    setTimeout(function(){
                        that.popMsg.isShowMsg = false;
                    },1e3)
                    return false;
                }
                if(!this.curSku2){
                    //跳出弹窗1000毫秒关闭
                    this.popMsg.isShowMsg = true;
                    this.popMsg.errorMsg = "请选择"+ this.items.Goods.Ysname2;
                    setTimeout(function(){
                        that.popMsg.isShowMsg = false;
                    },1e3)
                    return false;
                }
                if(type == 0){      //加入购物车
                    alert(this.curTid)
                    this.$http.post(url,{
                       nums:this.productQuantity,   //数量
                       tid:this.curTid              //tid
                    }).then(function(data){
                        this.$refs.p3.close();
                        if(data.body.Result == 1){
                            this.tipsContent = "加入购物车成功";
                            that.$refs.alert.open();
                            return false;
                        }else if(data.body.Result == -2){
                            this.tipsContent = data.body.Message;
                            that.$refs.alert.open();
                            return false;
                        }else{
                            this.$router.push("/login");
                        }
                    }),function(response){
                        console.info(response);
                    }
                }
                if(type == 1){  //立即购买
                    //判断是否是微信浏览器
                    if(this.isWeChatBrowser){
                        //判断是否积分足够
                        var url = apiList.data.UserAccount;
                        this.$http.post(url,{
                        }).then(function(data){ 
                            var oData = data.body;
                            if(oData.Result == 1){
                                //总额大于积分需要唤起微信支付
                                if(this.productQuantity * this.items.Tail.Price > oData.Accountlist[0].Fencur){
                                    this.getWeChat('/order?type=2&num='+ this.productQuantity + '&goods='+this.curTid);
                                }else{
                                    //type = 2 为立即购买结算到订单
                                    this.$router.push({ path: '/order?type=2&num='+ this.productQuantity + '&goods='+this.curTid })  
                                }
                            }
                        },function(response){
                            console.info(response);
                        });
                        
                    }else{
                        //type = 2 为立即购买结算到订单
                        this.$router.push({ path: '/order?type=2&num='+ this.productQuantity + '&goods='+this.curTid })  
                    }
                }    
            },
            //选择sku中具体项，添加设置每个skuItem的值
            checkedSku:function(type,item,enevt){
                //选定第1行sku
                if(type == 0){
                    this.curImg = item.Img;    //选定第一行sku项时图片对应索引号
                    this.curSku1 = item.Name;   //显示第一个参数

                    //选定主规格后对应显示子规格
                    var oldArr = this.items.Ys2List;
                    var newArr = [];
                    for(var i=0;i<oldArr.length;i++){
                        if(oldArr[i].Pid == item.Id){
                            newArr.push(oldArr[i]);
                        }
                    }
                    this.curSkuList = newArr;

                    //清空子规格选定样式
                    var subList = this.$el.querySelectorAll("#sku-sub-prop li");
                    for(var i=0;i<subList.length;i++){
                        subList[i].setAttribute("class","");
                    }

                    //清空选定参数
                    this.curTid = "";
                    this.curSku2 = "";      //显示第二个参数
                    this.curPrice = "";     //显示价格
                    this.curStock = "";     //显示库存

                    //可以选定子规格
                    this.isCanSelectSku = true;

                    //设置样式
                    var curNode = event.currentTarget;
                    var childList = curNode.parentNode.childNodes;
                    for(var i=0;i<childList.length;i++){
                        childList[i].setAttribute("class","");
                    }
                    event.currentTarget.setAttribute("class","checked");
                }

                //选定第2行sku,才决定tid(包含所有参数),传参给接口的tid
                if(type == 1 && this.isCanSelectSku){
                    this.curTid = item.Id;              //选定tid
                    this.curSku2 = item.Name;           //显示第二个参数
                    this.curPrice = item.Costprice;     //显示价格
                    this.curStock = item.Kucun;         //显示库存

                    //设置样式
                    var curNode = event.currentTarget;
                    var childList = curNode.parentNode.childNodes;
                    for(var i=0;i<childList.length;i++){
                        childList[i].setAttribute("class","");
                    }
                    event.currentTarget.setAttribute("class","checked");
                }
                
                
            },
            //点击加减  数量不应大于库存量
            changeMoney:function(type){
                if(type == 0){
                    this.productQuantity>1 ? this.productQuantity-- : this.productQuantity = 1;
                }
                if(type == 1){
                    if(this.productQuantity < this.curStock){
                        this.productQuantity ++;
                    }
                }
            },
            //弹窗确定
            log:function(m){
                // console.log(m)
            },
            //收藏商品
            collect:function(){
                var url = apiList.data.AjaxShouCang;
                var that = this;
                this.$http.post(url,{
                   tid:this.items.Tail.Id
                }).then(function(data){
                    that.tipsContent = "收藏成功";
                    that.$refs.alert.open();
                }),function(response){
                }
            },
            //微信账号绑定
            getWeChat:function(path){
                var ua = window.navigator.userAgent.toLowerCase(); 
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    var url = apiList.data.Authorize;
                    this.$http.post(url,{
                        url:path
                    }).then(function(data){ 
                        window.location.href = data.body;
                    },function(response){
                        console.info(response);
                    });
                }
                return false;
            },
            //判断是否是微信浏览器，是的才有在提交订单中积分不足下唤起微信支付
            isWeChat:function(){
                var ua = window.navigator.userAgent.toLowerCase(); 
                if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                    this.isWeChatBrowser = true;
                }
            },
            //返回顶部
            backTop:function(){
                document.body.scrollTop = 0;
            },
            
        },
        filters: {
            formatMoney(value){
                if(!value) return;
                return value.toFixed(2)
            },
        },
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
                display: inline-block;
                vertical-align: middle;
                border: 1px solid #b3b3b3;
                -webkit-border-radius: 3px;
                border-radius: 3px;
                letter-spacing: 0;
                height: 2rem;
                line-height: 2rem;
                overflow: hidden;
                text-align: center;
                .decrease,.increase {
                    font-size: 1.5rem;
                    font-weight: 700;
                    display: block;
                    width: 2rem;
                    line-height: 2.0rem;
                    background-color: #fff;
                    color: #5f646e;
                    float: left;
                    
                }
                .decrease {
                    border-right: 1px solid #b3b3b3;
                }
                .increase {
                    border-left: 1px solid #b3b3b3;
                }
                .num {
                    height: 100%;
                    min-width: 2.18rem;
                    max-width: 3.43rem;
                    padding: .125rem;
                    border: none;
                    float: left;
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
                    font-size: .81rem;
                    &.checked{
                        border-color: #b10000;
                        color: #000;
                    }
                    &.disable{
                        color:#e5e5e5;
                    }
                }
            }
        }
        .shopMsg{
            position:absolute;
            top:0;
            right:0;
            bottom:0;
            left:0;
            z-index: 100;
            /*-webkit-transform: translate3d(100%,0,0);
            transform: translate3d(100%,0,0);
            -webkit-transition: -webkit-transform .2s cubic-bezier(0,0,.25,1);
            transition: transform .2s cubic-bezier(0,0,.25,1);
            -webkit-transform: translate3d(0,100%,0);
            transform: translate3d(0,100%,0);
            &.show{
                transform: translate3d(0,0,0);
            }*/
            .msg-con{
                position:absolute;
                top: 20%;
                width:100%;
                height:80%;
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
            .close-shopMsg{
                display: block;
                position:absolute;
                right:.625rem;
                top:.625rem;
                font-size:1.3rem;
                color:#999;
            }
            .sku-con{
                padding:1rem;
                overflow-y:scroll;
                position: absolute;
                top: 100px;
                bottom:3rem;
                left: 0;
                right: 0;
                width:100%;
                height:; 
                .tit{
                    color: #666;
                    margin-bottom: 10px;
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
                display: inline-block;
                vertical-align: middle;
                border: 1px solid #b3b3b3;
                -webkit-border-radius: 3px;
                border-radius: 3px;
                letter-spacing: 0;
                height: 2.25rem;
                line-height: 2.25rem;
                overflow: hidden;
                text-align: center;
                .decrease,.increase {
                    font-size: 1.5rem;
                    font-weight: 700;
                    display: block;
                    width: 2rem;
                    background-color: #fff;
                    color: #5f646e;
                    float: left;
                    
                }
                .decrease {
                    border-right: 1px solid #b3b3b3;
                }
                .increase {
                    border-left: 1px solid #b3b3b3;
                }
                .num {
                    height: 100%;
                    min-width: 2.18rem;
                    max-width: 3.43rem;
                    padding: .125rem;
                    border: none;
                    float: left;
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
                    padding: 3px 8px;
                    margin: 0 10px 10px 0;
                    max-width: 100%;
                    text-align: center;
                    font-size: .81rem;
                    &.checked{
                        border-color: #b10000;
                        color: #000;
                    }
                }
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
            height: 42px;
            font-size: 16px;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            word-wrap: break-word;
            overflow: hidden;
            -webkit-box-pack: center;
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
                width: 8em;
                word-break: break-all;
                color: #999;
                font-weight: 400;
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
        .back-img{
            position:fixed;
            bottom:20%;
            right:20px;
            width:2rem;
            height:2rem;
        }
        .home-icon{
            position:absolute;
            top:10px;
            left:10px;
            display:block;
            width:2.0rem;
            height:2.0rem;
            color:#fff;
            background-color: rgba(0,0,0,.6);
            border-radius: 100%;
            text-align: center;
            line-height: 2.0rem;
            z-index: 100;
        }
        .slide-img{
            width:18.75rem;
        }
    }

</style>
