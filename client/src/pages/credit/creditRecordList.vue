<template>
<div class="page creditRecordList-page">
    <simple-header class="fixed" title="还款记录" :back-link="true"></simple-header>
    <div class="empty" v-if="!items.length">
        <p class="txt">当前的列表为空~  T.T</p>
        <!-- <p class="subTxt">快去充值吧</p> -->
    </div>
    <page-content v-if="items.length">
        <scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
            <ul class="listCon bgf">
                <li class="items-line bor-bottom" v-for="(item,index) in items">
                    <i class="iconfont icon-daichuli fl" v-if="0 == 0"></i>
                    <i class="iconfont icon-yizhuanzhangjine fl" v-if="1 == 1"></i>
                    <i class="iconfont icon-shibai fl" v-if="2 == 2"></i>
                    <i class="iconfont icon-bohui fl" v-if="3 == 3"></i>
                    <div class="ofh">
                        <h4 vif="0">
                            待处理<span class="total">200</span>
                        </h4>
                        <!-- <h4 vif="1">转账成功</h4>
                        <h4 vif="2">转账失败</h4>
                        <h4 vif="3">驳回/撤销</h4> -->
                        <p class="fr momey">
                            <span>总额：200</span>
                            <span class="cf1">
                               (服务费：200)
                            </span>
                        </p>
                        <p class="time c9 fs12">item.Opertime | formatDate("")}}</p>
                    </div>
                </li>
            </ul>
        </scroll>
    </page-content>
</div>
</template>

<script>
    import Content from '../../components/content'
    import Scroll from '../../components/scroll'
    import { SimpleHeader } from '../../components/header'
    import apiList from "../../apiList.js"  // api列表

    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
            Scroll
        },
        data () {
            return {
                items: ["1", "2"],
                totalPages: 0,           // 所有页数
                curPage: 0,           // 当前页数
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                //  this.initGetList(1);

                 // 设置标题
                this.setTitle("还款记录");
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
                    done() //  执行完毕
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
    .creditRecordList-page{
        .icon-daichuli{
            color:#ffd931;
        }
        .icon-yizhuanzhangjine{
            color:#0ba35a;
        }
        .icon-shibai{
            color:#e9a828;
        }
        .icon-bohui{
            color:#ed0408;
        }
        .listCon{
            padding:0 10px;
            .iconfont{
                margin-right:15px;
                font-size: 24px;
            }
            .total{
                margin-left: 0.5rem;
            }
        }
        .cf1{
            color:#ec584e;
            font-size: 0.6rem;
        }
        .momey{
            font-weight: 600;
        }
    }
    
</style>
