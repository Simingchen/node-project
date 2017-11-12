<template>
<div class="page integralList-page">
    <simple-header class="fixed" title="积分明细" :back-link="true"></simple-header>
    <div class="empty" v-if="!items.length">
        <p class="txt">当前的列表为空~  T.T</p>
        <p class="subTxt">快去充值吧</p>
        <!-- <router-link class="btn toActive" to="/goodsList">充值</router-link> -->
    </div>
    <page-content v-if="items.length">
        <scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
            <ul class="listCon bgf">
                <li class="items-line bor-bottom" v-for="(item,index) in items">
                    <i class="iconfont icon-chongzhi fl" v-if="item.Causeid == 10"></i>
                    <i class="iconfont icon-xiaofei fl" v-if="item.Causeid == 20"></i>
                    <i class="iconfont icon-fanhui fl" v-if="item.Causeid == 30"></i>
                    <i class="iconfont icon-fanhui fl" v-if="item.Causeid == 40"></i>
                    <div class="ofh">
                        <h4>{{item.Cause}}</h4>
                        <p class="fr momey">
                            <span class="cf1" v-if="item.Causeid == 10 || item.Causeid == 30 || item.Causeid == 40">
                                +{{item.Fen | formatMoney("")}}
                            </span>
                            <span v-if="item.Causeid == 20">-{{item.Fen | formatMoney("")}}</span>
                        </p>
                        <p class="time c9 fs12">{{item.Opertime | formatDate("")}}</p>
                    </div>
                </li>
            </ul>
        </scroll>
    </page-content>
</div>
</template>

<script>
    import Content from '../components/content'
    import Scroll from '../components/scroll'
    import { SimpleHeader } from '../components/header'
    import apiList from "../apiList.js"  // api列表

    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
            Scroll
        },
        data () {
            return {
                items: [],
                totalPages: 0,           // 所有页数
                curPage: 0,           // 当前页数
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                this.initGetList(1);

                // 设置标题
                this.setTitle("积分明细");
            })
        },
        methods: {
            getMsg: function (id, no, index, start, end) {
                var url = apiList.data.JifenDetail;
                this.$http.post(url, {
                    aid: id,
                    uno: no,
                    pindex: index,
                    start: start,
                    end: end,
                }).then(function (data) {
                    var oData = data.body;
                    // 用户为空下跳转登录
                    if (oData.Result == 1) {
                        // 如果页码为1，不进行列表叠加
                        if (index == 1) {
                            this.items = oData.Jifenlist;
                        } else {
                            this.items = this.items.concat(oData.Jifenlist);
                        }
                        this.totalPages = oData.Pcount;
                        this.curPage = oData.Pindex;

                        // 只有一页时隐藏加载条
                        if (this.curPage >= this.totalPages) {
                            var that = this;
                            setTimeout(function () {
                                that.$el.querySelector(".infinite-layer").style.display = "none";
                            }, 0)
                        }
                    } else {
                        this.$router.push("/login");
                    }
                }, function (response) {
                    console.info(response);
                })
            },
            // 初始化列表
            initGetList: function () {
                var oQuery = this.$route.query;
                var id = oQuery.id;
                var code = oQuery.code;
                this.getMsg(id, code, 1);
            },
            // 下拉更新指定第一页,保持积分类型
            onRefresh: function (done) {
                var that = this;
                var oQuery = this.$route.query;
                var id = oQuery.id;
                var code = oQuery.code;
                setTimeout(function () {
                    that.getMsg(id, code, 1);
                    done()//  执行完毕
                }, 1000)
            },
            // 滚动加载
            onInfinite: function (done) {
                var that = this;

                // 滚动到最后一页隐藏加载条
                if (this.curPage >= this.totalPages) {
                    this.$el.querySelector(".infinite-layer").style.display = "none";
                    return false;
                }

                // 刷新加载
                var oQuery = this.$route.query;
                var id = oQuery.id;
                var code = oQuery.code;
                setTimeout(function () {
                    that.curPage = that.curPage + 1;
                    that.getMsg(id, code, that.curPage);
                    done()//  call done()执行完毕
                }, 1000)
            },
        },
        filters: {
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
        }
    }
</script>
<style lang="less">
    .integralList-page{
        .empty{
            padding-top:4.4rem;
            text-align: center;
            .txt{
                font-size: 16px;
                margin-bottom: 5px;
                color: #666;
            }
            .subTxt{
                margin-bottom:20px;
                color:#999;
            }
            .btn{
                display: block;
                width:5.2rem;
                height:1.8rem;
                border: 1px solid #ec584e;
                border-radius: 3px;
                text-align: center;
                line-height: 1.8rem;
                margin: 0 auto;
                color: #ec584e;
                font-size: 12px;
                &:active{

                }
            }
        }
        .listCon{
            padding:0 10px;
            .iconfont{
                margin-right:15px;
                font-size: 24px;
                color:#ec584e;
            }
        }
        .cf1{
            color:#f1a81a;
        }
        .momey{
            font-weight: 600;
        }
    }
    
</style>
