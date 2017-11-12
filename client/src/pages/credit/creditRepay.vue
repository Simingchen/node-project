<template>
<div class="creditNewCard-page bgf">
    <simple-header class="fixed" title="申请还款" :back-link="true"></simple-header>
    <page-content>
        <ul class="bgd">
            <li class="flex-box bor-bottom rel bgf">
                <label class="lab" for="bank">姓名</label>
                <input class="flex-item" id="bank" name="bank" type="text" v-model="cardMaster" maxlength="6" placeholder="持卡人姓名">
            </li>
            <li class="flex-box bor-bottom rel toActive bgf" @click="$refs.p1.open()">
                <label class="lab">卡号</label>
                <input class="flex-item" type="text" v-model="cardName" placeholder="选择信用卡号" readonly>
                <span class="link-arrow icon icon-link"></span>
            </li>
            <li class="money-line bor-bottom rel mt10 bgf">
                <label class="lab">金额</label>
                <span class="instruction" @click="$refs.p2.open()">限额说明</span>
            </li>
            <li class="amount-line flex-box bor-bottom rel bgf">
                <input class="flex-item" type="text" v-model="amount" placeholder="收取10%的手续费" maxlength="5" pattern="[0-9]*">
            </li>
            <li class="bgf ofh">
                <a class="btn on" href="javascript:;" @click="addNewCard()">确定</a>
            </li>
        </ul>
    </page-content>
    <!-- 弹窗错误信息 -->
    <div class="notify" v-if="popMsg.isShowMsg">
        <div class="txt">{{popMsg.errorMsg}}</div>
    </div>
    <!-- 弹窗 -->
    <popup ref="p1" title="发卡银行">
        <ul class="card-list">
            <li class="items-line bor-bottom toActive" @click="selectCard('广州银行')">
                <img src="" alt="">
                广州银行
            </li>
            <li class="items-line bor-bottom toActive" @click="selectCard('工商银行')">
                <img src="" alt="">
                工商银行
            </li>
        </ul>
    </popup>
    <popup ref="p2" title="限额说明">
        <ul class="p10 bgf">
            <li>
                <span class="fl">1.</span>
                <p class="ofh">信用卡还款不支持有效期已过或已作废的信用卡，请注意您信用卡卡面上的有效时间。</p>
            </li>
            <li>
                <span class="fl">2.</span>
                <p class="ofh">信用卡还款一旦成功提交，即表示已提交至银行处理，不可撤回和取消，敬请谅解。</p>
            </li>
            <li>
                <span class="fl">3.</span>
                <p class="ofh">信用卡还款到账时间为<b class="b c58">2~3</b>个工作日，以银行实际到账时间为准。</p>
            </li>
            <li>
                <span class="fl">4.</span>
                <p class="ofh">商城中申请转账还款，限额为<b class="b c58">45,000元/次</b>，每日限<b class="b c58">5</b>次，每帐户每月不超<b class="b c58">50万元</b>。</p>
            </li>
            <li>
                <span class="fl">5.</span>
                <p class="ofh">转账还款服务费为申请金额的<b class="b c58">10%（最低5元）</b>，所以实际到账金额会比申请金额少<b class="b c58">10%</b>，请合理安排好还款数额，以免转账金额不足以覆盖信用卡账单。</p>
            </li>
            <li>
                <span class="fl">6.</span>
                <p class="ofh">因卡号错误或卡片过期等用户原因造成的转账失败，服务费不予退还。</p>
            </li>
        </ul>
    </popup>

</div>
</template>

<script>
    import Content from '../../components/content'
    import { SimpleHeader } from '../../components/header'
    import Popup from '../../components/popup'

    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
            Popup,
        },
        data () {
            return {
                popMsg: {
                    isShowMsg: false,     // 是否显示弹窗错误信息
                    errorMsg: "",         // 弹窗错误信息
                },
                cardName: "",    // 卡名
                cardMaster: "",    // 卡持有人
                amount: "",         // 金额
            }
        },
        mounted: function () {
            this.$nextTick(function () {
                // 禁止滚动
                this.stopMove();
                // 设置标题
                this.setTitle("申请还款");
            })
        },
        methods: {
            // 选择卡
            selectCard: function (name) {
                this.cardName = name;
                this.$refs.p1.close();
            },
            // 确定添加
            addNewCard: function () {
                if (!this.cardNum) {
                    this.verifyError("请填入信用卡号");
                    return false;
                } else {
                    this.cardNum.replace(/\s/g, "");
                }
                if (!this.cardName) {
                    this.verifyError("请发卡银行!");
                    return false;
                }
                if (!this.cardMaster) {
                    this.verifyError("请输入持有人姓名!");
                    return false;
                }
            },
            // 验证报错函数
            verifyError: function (msg) {
                clearTimeout(timer);
                this.popMsg.isShowMsg = true;
                this.popMsg.errorMsg = msg;
                var that = this;
                var timer = setTimeout(function () {
                    that.popMsg.isShowMsg = false;
                }, 1e3);
            },
        }
    }
</script>
<style lang="less">
    .creditNewCard-page{
        .p5{
            padding:5px;
        }
        .bgd{
            background-color: #ddd;
        }
        .lab{
            width:4.0rem;
            text-align: center;
            line-height: 2.5rem;
            font-size: 16px;
            color:#222;
            font-weight: 700;
        }
        .flex-item{
            border:0;
            background-color: transparent;
        }
        .link-arrow{
            font-size: .7rem;
            position: absolute;
            right: .3rem;
            top: 50%;
            height: 1rem;
            width: .8rem;
            color: #c7c7c7;
            margin-top: -0.5rem;
        }
        .btn{
            display:block;
            width:85%;
            height:2.3rem;
            margin:20px auto;
            text-align: center;
            line-height: 2.3rem;
            color:#c5c5c5;
            background-color: #ddd;
            border-radius: 5px;
            font-size: 16px;
            &.on{
                color:#fff;
                background-color: #ec584e;
            }
        }
        .card-list{
            height:300px;
            overflow-y:scroll; 
            -webkit-overflow-scrolling: touch;
        }
        #cardNo{
            letter-spacing: 1px;
        }
        .money-line{
            padding:0 20px;
        }
        .instruction{
            float:right;
            line-height: 2.5rem;
            color:#3385ff;
            font-size: 0.6rem;
        }
        .amount-line{
            padding:0 20px;
            height: 2.5rem;
            line-height: 2.5rem;
        }
    }
</style>
