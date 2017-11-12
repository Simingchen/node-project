<template>
<div class="pageCon">
    <simple-header class="fixed" title="我的积分" :back-link="true"></simple-header>
    <page-content>
        <div v-for="(item,index) in items.Accountlist" v-if="index<2">
            <div class="top">
                <span>可用积分</span>
                <h3>{{item.Fencur}}</h3>
            </div>
            <ul class="account">
                <li class="items-line bor-bottom flex-box">
                    <label for="">所在公司：</label>
                    <span class="flex-item">{{items.User.Fname}}</span>
                </li>
                <li class="items-line bor-bottom flex-box">
                    <label for="">账户名称：</label>
                    <span class="flex-item">{{items.User.Usedname}}</span>
                </li>
                <li class="items-line bor-bottom flex-box">
                    <label for="">积分类型：</label>
                    <span class="flex-item">{{item.Fentypename}}</span>
                </li>
                <li class="items-line bor-bottom flex-box">
                    <label for="">使用期限：</label>
                    <span class="flex-item">{{item.Fenlimit | formatDate(false)}}</span>
                </li>
            </ul>
        </div>
        <router-link class="items-line bor-bottom dpb mt10 toActive" :to="'/integralList?id='+ accountId + '&code='+ accountNo" >
            <p>积分明细</p>
            <span class="link-arrow icon icon-link"></span>
        </router-link>
        <router-link class="items-line bor-bottom dpb toActive" to="/recharge" v-if="isWeChatBrowser">
            <p>微信充值</p>
            <span class="link-arrow icon icon-link"></span>
        </router-link>
        <router-link class="items-line bor-bottom dpb toActive" to="/rechargeVoucher">
            <p>积分卡充值</p>
            <span class="link-arrow icon icon-link"></span>
        </router-link>
    </page-content>
</div>
</template>

<script>
    import { SimpleHeader } from '../components/header'
    import Content from '../components/content'
    import apiList from "../apiList.js"  // api列表

    export default {
        name: "UserAcount",
        components: {
            SimpleHeader,
            'page-content': Content
        },
        data () {
            return {
                items: {},
                integral: {},
                accountId: "",       // 账户ID
                accountNo: "",       // 账户No
                isWeChatBrowser: false,     // 判断是否为微信
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.getUserAcount();
                this.isWeChat();
                
                this.setTitle("账户信息");
            })
        },
        methods: {
            // 获取账号信息
            getUserAcount: function () {
                if (window.sessionStorage.UniUserInfo) {
                    var lData = JSON.parse(window.sessionStorage.UniUserInfo);
                    
                    var oData0 = lData.Accountlist[0]
                    this.items = lData;

                    this.accountId = oData0.Id;
                    this.accountNo = oData0.Uno;
                }
                var url = apiList.data.UniUserInfo;
                this.$http.post(url, {
                }).then(function (data) {
                    var oData = data.body;
                    if (oData.Result == 1) {
                        var oData0 = oData.Accountlist[0]
                        this.items = oData;

                        this.accountId = oData0.Id;
                        this.accountNo = oData0.Uno;
                        window.sessionStorage.UniUserInfo = window.JSON.stringify(oData);
                    }
                    if (oData.Result == -1) {
                        //  this.$router.push("/login")
                        return false;
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 获取积分明细
            getIntegral: function (index, id, no) {
                var url = apiList.data.JifenDetail;
                this.$http.post(url, {
                    pindex: index,
                    aid: id,
                    uno: no,
                    start: "",
                    end: "",
                }).then(function (data) {
                    var oData = data.body;
                    if (oData.Result == 1) {
                        this.items = ""
                    }
                    if (oData.Result == -1) {
                        //  this.$router.push("/login")
                        return false;
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 微信账号绑定
            getWeChat: function () {
                var ua = window.navigator.userAgent.toLowerCase(); 
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    var url = apiList.data.Authorize;
                    this.$http.post(url, {
                    }).then(function (data) { 
                        var oData = data.body;
                        window.location.href = oData;
                    }, function (response) {
                        console.info(response);
                    });
                }
                return false;
            },
            isWeChat: function () {
                var ua = window.navigator.userAgent.toLowerCase(); 
                if (ua.match(/MicroMessenger/i) == 'micromessenger') {
                    this.isWeChatBrowser = true;
                }
            },
        }
    }
</script>
<style lang="less" scoped>
    .top{
        height:5.0rem;
        padding-top:1.0rem;
        color:#fff;
        text-align: center;
        line-height: 1;
        background: #53bd47 url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAAmCAMAAACs5+4IAAAA5FBMVEX///////////////////////////////////9MaXH///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9Gsex0AAAATHRSTlMtQikYSyJEJRoAPAIBJBsSESMXIQ0eHAwZIAUEBwkIFRYPFAMGEwsfJg4QHSwKKi8oOTQ/Njs9STI1PjdKRy4zMTA6Q0YnQUA4K0hF11x+lAAABExJREFUeNrt29d24kgQgOEGIdMglFFCgAJBCJFzsE3w4DDz/u+zDQ5ndpmdYb1ghKjvinv+rlNKKPVnmUyG2ZMhUgBcFFQX+Ipr2RKl65hT1UBRPMOQZZmmRZFl2eSfsKwoijQty4bnKUGgchzWKcm23AovCI6f1aqFYr6cKzFwOMDZoeSXYUVyJAIOU7ZVEeq+1iySUwCHAEQg94OxtKGoukROgEMOAPQPopz7PlEm+dsuqb9QNiF+EN3c94lGwFEW72jFHJMCIKq572NlhZNcwW/mYeUBEc59H70tv05mPoQPopv7PtrjpApZdmDPB5HOfX/i65aQLcDAB5HOfb97bEP34CdMKZcvVDWUjDI5oNx6NV9KgSvEmKTwrMO7NoXfoOQ1ED1s89mimQKRx+TyzWydtyS8j+R+TViDI9kX4Ko2ejLmtvKKreN3kPtP2Usw7aOhVG5mBVfC7yD3f8V62Ba0PDyvvUSlfNXnP6Y55H44UdFdp1qGHeciZHKFrGC9dw65f5qsSrxfMMP5J5fMXL7YrGq+8/GNwscnCp6x+0KB3UkStVfkF0uIBC0bnqIEKoexTkmWWxHqzvZrhEt6DZuETgY6fgW5H2/Hsern2nEYs1xsZh2hYkkUVhVDFpObeKuBTqrR6tRY2lACjrIrgq8V8iYTsivRQpaX8A7kfhp0QFX8Qi5z4nvDmiO4kq4qMlvrkK7DotHasLKyex+1es73UZlyte7qeAty/6Lbl4JWLB1pJ3m7YaYaYi3eQBej0WHlQLd5/wsf2zH5j5EOuZ/jgrb+mQtaptz0BYtSPbHWQlFA0vc4ifebZeZ0pWtvpUPu5yWrB+w4GbOYFVxKNdhOA0VYK/n6DOOIEz9T1oTX0iH3ENl7VrXbM53KtvE4ujYvNVmVBO1/3s01C46FtyD3kGI9DusY66qcbCGAOmJA8Z/IPkMWdQoTkHs4dRqraXcWu0vs3H576A/nixUCOxuZs5ziYct96X2oQ+7h02ovntOxb7eJX7q9e+inn6dLBLbiomr5v6vebNZtTEDuocu81x3FvicONL55nK0HizYCCG0MXNFyqX/IVQUKE5B7iHTQZJ4mO8sn3d7d9NPdwQS6Ry2Rc7Nv0ZvV11Udcg+L+H2vO7sZJ46EbPfQPfHCeorKYQJyD4UO6bz/4zZxImTeP86G897yHl2f9nT4FCNm81Wc5iD3c6o1JvPRwzjxVcZk4I/Wg94SXYX7Rbcf+5t0r8GqkPs5Bvrw8S5xLiT8m6fZ8Hka3VVn8jyK/dpoimoK5P414qtBmtxvCY/xj4en0XA+naxQVKwGw8fY780GKBlA7icUb5PQx4kQIzP/sZ9eX3T694t1P3agUa8hcpD7sW3up9uJflHGdzex/mjYJZt+G12K5XwU+6+Gk7hxotzpq7NBi/XTzaWLPc3Sa1L+YtluvMTDqdWertOf1F3GZZ06NpQC4Gr8BT5GSMz2Eue5AAAAAElFTkSuQmCC) center 110% no-repeat;
        h3{
            font-size: 1.5rem;
            line-height: 1.5rem;
            margin-top: 0.75rem;
        }
    }
    .integral{
        height:2.5rem;
        text-align: center;
        line-height: 2.5rem;
        font-size: 16px;
    }
    .account{
        label{
            display:block;
            width:3.6rem; 
        }
        span{
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
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
</style>
