//
// 判断是否在开发状态下，开发状态下添加代理接口前缀
//

var isProduction = process.env.NODE_ENV === 'production'
var preUrl = isProduction ? "" : "/apiList";   //开发状态下添加代理接口前缀

const apiList = {
    FloorList: preUrl + "/GdsBase/FloorList",  //首页楼层列表
    MyOrderList: preUrl + "/MyAccount/MyOrderList",  //我的订单
    CreateOrder: preUrl + "/Order/CreateOrder",  //我的订单
    MyOrderdetail: preUrl + "/MyAccount/MyOrderdetail",  //订单详情
    Orderdetail: preUrl + "/MyAccount/_MyOrderdetail",  //订单详情2,读子订单详情
    OrderToCancel: preUrl + "/MyAccount/OrderToCancel",  //取消订单
    OrderToReceiving: preUrl + "/MyAccount/OrderToReceiving",  //确认收货
    SaveShouAdress: preUrl + "/MyAccount/SaveShouAdress",  //保存收货地址
    AjaxIsdefault: preUrl + "/MyAccount/AjaxIsdefault",  //设置为默认地址
    PlaceOrder: preUrl + "/Order/PlaceOrder",  //立即过来的订单
    ShowOrderdetail: preUrl + "/Order/ShowOrderdetail",  //获取订单信息
    ShouAddressdetail: preUrl + "/MyAccount/ShouAddressdetail",  //地址详情
    Login: preUrl + "/Home/Login",  //登录
    Authorize: preUrl + "/Wechat/Authorize",  //微信验证
    UniUserInfo: preUrl + "/MyAccount/UniUserInfo",  //个人中心
    ShouAddrList: preUrl + "/MyAccount/ShouAddrList",  //地址列表
    AddrDelete: preUrl + "/MyAccount/AddrDelete",  //删除地址  
    GetSMSCode: preUrl + "/Ajax/GetSMSCode",  //短信验证码  
    BindWechat: preUrl + "/Home/BindWechat",  //绑定微信 
    Regcang: preUrl + "/MyAccount/Regcang",  //收藏夹 
    DeleteRegCang: preUrl + "/MyAccount/DeleteRegCang",  //删除收藏夹
    GoodList: preUrl + "/GdsBase/GoodList",  //商品列表
    Logistics: preUrl + "/MyAccount/Logistics",  //物流列表
    RegNewPass: preUrl + "/MyAccount/RegNewPass",  //修改密码
    Regnewpaypass: preUrl + "/MyAccount/Regnewpaypass",  //修改支付密码
    AddToShoppingCard: preUrl + "/GdsBase/AddToShoppingCard",  //加入购物车
    ShoppingCard: preUrl + "/GdsBase/ShoppingCard",  //购物车列表
    DeleteFromShoppingCar: preUrl + "/Ajax/DeleteFromShoppingCar",  //删除购物车项
    ShoppingCarChangeNum: preUrl + "/Ajax/ShoppingCarChangeNum",  //改变购物车数量
    JifenDetail: preUrl + "/MyAccount/JifenDetail",  //积分列表
    UserInfo: preUrl + "/MyAccount/UserInfo",  //用户信息
    EditUserInfo: preUrl + "/MyAccount/EditUserInfo",  //编辑用户信息
    Goods: preUrl + "/GdsBase/Goods",  //商品详情
    AjaxShouCang: preUrl + "/MyAccount/AjaxShouCang",  //加入收藏
    RepayOrder: preUrl + "/Order/RepayOrder",  //在线支付
    Recharge: preUrl + "/Order/Recharge",  //在线充值
    UserAccount: preUrl + "/MyAccount/UserAccount",  //用户账户
    GetBanner: preUrl + "/GdsBase/GetBanner",  //首页banner
    Logout: preUrl + "/Home/Logout",  //退出登录
    GlobuyIndex: preUrl + "/Globuy/Indexdata",  //全球购
    GlobuyList: preUrl + "/GdsBase/GoodList",  //全球购
    LoginPassword: preUrl + "/MyAccount/LoginPassword",  //登录密码找回
    GloGds: preUrl + "/GdsBase/GloGds",  //首页全球购
    EditUserPhone: preUrl + "/MyAccount/EditUserPhone",  //修改手机号
    
    // 新改接口
    SimpRegister: preUrl + "/SimpRegister",  //注册
}

exports.data = apiList;