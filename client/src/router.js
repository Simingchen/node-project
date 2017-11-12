import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

// pages
import test from './pages/test'     //测试页

import addressList from './pages/addressList'   //地址修改
import bindWeChat from './pages/bindWeChat'
import center from './pages/center'   //个人中心
import centerSet from './pages/centerSet'   //个人设置
import credit from './pages/credit/credit'   //信用卡还款
import creditCardList from './pages/credit/creditCardList'   //信用卡列表
import creditNewCard from './pages/credit/creditNewCard'   //信用卡添加新卡
import creditRecordList from './pages/credit/creditRecordList'   //信用卡还款记录
import creditRepay from './pages/credit/creditRepay'   //信用卡还款
import customerService from './pages/customerService'   //客户服务
import editAddress from './pages/editAddress'   //地址修改
import forgetPassword from './pages/forgetPassword'
import goods from './pages/goods.vue'
import goodsList from './pages/goodsList'
import goodsCollection from './pages/goodsCollection'
import gobal from './pages/global/gobal'   //全球购
import gobalHome from './pages/global/gobalHome'   //全球购
import gobalSort from './pages/global/gobalSort'   //全球购
import gobalGoodsList from './pages/global/gobalGoodsList'   //全球购
import gobalGoods from './pages/global/gobalGoods'   //全球购
import Home from './pages/Home'
import integralList from './pages/integralList'   //积分信息
import Login from './pages/Login'
import logistics from './pages/logistics'   //物流
import mine from './pages/mine.vue'
import modifyPass from './pages/modifyPass'   //密码修改
import modifyPhone from './pages/modifyPhone'   //手机修改
import midAutumn from './pages/other/midAutumn.vue'     //中秋
import newPass from './pages/newPass'   //支付密码修改
import navSort from './pages/navSort'
import notFonud from './pages/notFonud'
import order from './pages/order.vue'
import orderAfterSales from './pages/orderAfterSales'
import orderDetail from './pages/orderDetail'
import orderList from './pages/orderList'
import orderSuccess from './pages/orderSuccess'
import recharge from './pages/recharge'   //积分充值
import rechargeVoucher from './pages/rechargeVoucher'   //积分卡充值
import signUp from './pages/signUp'
import shopCart from './pages/shopCart'
import userAcount from './pages/userAcount'   //积分
import userInfo from './pages/userInfo'   //基本信息


//使用 AMD 风格的 require
// const test = resolve => require(['./pages/test.vue'], resolve);
// const Index = resolve => require(['./pages/Index.vue'], resolve);
// const Home = resolve => require(['./pages/Home.vue'], resolve);
// const notFonud = resolve => require(['./pages/notFonud.vue'], resolve);
// const Login = resolve => require(['./pages/Login.vue'], resolve);
// const bindWeChat = resolve => require(['./pages/bindWeChat.vue'], resolve);
// const signUp = resolve => require(['./pages/signUp.vue'], resolve);
// const forgetPassword = resolve => require(['./pages/forgetPassword.vue'], resolve);
// const goodsList = resolve => require(['./pages/goodsList.vue'], resolve);
// const goods = resolve => require(['./pages/goods.vue'], resolve);
// const shopCart = resolve => require(['./pages/shopCart.vue'], resolve);
// const goodsCollection = resolve => require(['./pages/goodsCollection.vue'], resolve);
// const mine = resolve => require(['./pages/mine.vue'], resolve);
// const order = resolve => require(['./pages/order.vue'], resolve);
// const orderList = resolve => require(['./pages/orderList.vue'], resolve);
// const orderDetail = resolve => require(['./pages/orderDetail.vue'], resolve);
// const orderSuccess = resolve => require(['./pages/orderSuccess.vue'], resolve);
// const center = resolve => require(['./pages/center.vue'], resolve);
// const userInfo = resolve => require(['./pages/userInfo.vue'], resolve);
// const userAcount = resolve => require(['./pages/userAcount.vue'], resolve);
// const integralList = resolve => require(['./pages/integralList.vue'], resolve);
// const modifyPass = resolve => require(['./pages/modifyPass.vue'], resolve);
// const newPass = resolve => require(['./pages/newPass.vue'], resolve);
// const addressList = resolve => require(['./pages/addressList.vue'], resolve);
// const editAddress = resolve => require(['./pages/editAddress.vue'], resolve);
// const logistics = resolve => require(['./pages/logistics.vue'], resolve);



export default new Router({
    // mode: 'history',    //url参数为虚拟  history模式需要后台支持指向该单页面
    routes: [
    {
        path: '/test',      //测试页
        name: 'test',
        component: test    
    },{
        path: '/midAutumn',      //中秋
        name: 'midAutumn',
        component: midAutumn    
    },{
        path: '*',
        name: 'notFonud',
        component: notFonud    //404  
    },{
        path: '/Home',
        name: 'Home',
        component: Home    //首页
    },{
        path: '/',
        name: 'Index',
        component: Home    //首页
    },{
        path: '/navSort',
        name: 'navSort',
        component: navSort    //分类
    }, {
        path: '/login',  //登录页  
        name: 'login',
        component: Login,
    }, {
        path: '/bindWeChat',  //绑定微信
        name: 'bindWeChat',
        component: bindWeChat
    }, {
        path: '/signup',  //注册页
        name: 'signUp',
        component: signUp
    }, {
        path: '/forget',  //忘记密码  
        name: 'forget',
        component: forgetPassword
    },{
        path: '/goodsList',  //商品列表页
        name: 'goodsList',
        component: goodsList
    }, {
        path: '/goods',  //商品详情页
        name: 'goods',
        component: goods
    }, {
        path: '/order',  //当前订单页
        name: 'order',
        component: order   
    }, {
        path: '/shopCart',  //购物车
        name: 'shopCart',
        component: shopCart   
    },  {
        path: '/goodsCollection',  //收藏夹
        name: 'goodsCollection',
        component: goodsCollection   
    },{
        path: '/mine',  //个人中心
        component:mine,    
        children: [      //子路由页面
            { path: '', component: center },    //中心页
            { path: 'centerSet', component: centerSet },    //中心设置
            { path: 'userAcount', component: userAcount },  //账户积分
            { path: 'userInfo', component: userInfo },     //基本信息
            { path: 'userAcount', component: userAcount },     //基本信息
            { path: 'modifyPass', component: modifyPass },     //登录密码修改
            { path: 'modifyPhone', component: modifyPhone },     //手机修改修改
            { path: 'newPass', component: newPass },     //支付密码修改
            { path: 'addressList', component: addressList },    //地址列表修改
            { path: 'editAddress', component: editAddress },    //修改具体地址
            { path: 'customerService', component: customerService },    //修改具体地址
        ]
    },{ 
        path: '/orderList',  //订单管理
        name: 'orderList',
        component: orderList,   
    },{  
        path: '/orderDetail',  //订单详情
        name: 'orderDetail',
        component: orderDetail,
    },{  
        path: '/orderAfterSales',  //订单详情
        name: 'orderAfterSales',
        component: orderAfterSales,
    },{  
        path: '/orderSuccess',  //收货成功状态
        name: 'orderSuccess',
        component: orderSuccess,   
    },{ 
        path: '/logistics',  //物流
        name: 'logistics',
        component: logistics,   
    },{ 
        path: '/integralList',  //积分
        name: 'integralList',
        component: integralList,  
    },{ 
        path: '/recharge',  //积分充值
        name: 'recharge',
        component: recharge,
    },{ 
        path: '/rechargeVoucher',  //积分卡充值
        name: 'rechargeVoucher',
        component: rechargeVoucher,
    },{ 
        path: '/credit',  //信用卡
        component:credit,
        children: [      //子路由页面
            { path: '', component: creditCardList },    //列表页
            { path: 'creditNewCard', component: creditNewCard }, 
            { path: 'creditRecordList', component: creditRecordList },
            { path: 'creditRepay', component: creditRepay }, 
        ]
    },{ 
        path: '/gobal',  //全球购
        component:gobal,
        children: [      //子路由页面
            { path: '', component: gobalHome },    
            { path: 'Sort', component: gobalSort }, 
            { path: 'GoodsList', component: gobalGoodsList },
            { path: 'Goods', component: gobalGoods },
        ]
    }

    ],
})

