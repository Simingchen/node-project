<template>
<div class="page customer-page">
    <simple-header class="fixed" title="客户服务" :back-link="true"></simple-header>
    <page-content class="bgf">
        <p class="p10">如果您在使用产品、登录网站遇到问题或是进行相关咨询，欢迎您来函来电垂询，我们将竭诚为您服务！ 节假日如有问题需要咨询，请发邮件至lsw@gzshengjian.net，我们会尽快为您答复，工作时间周一至周五：9:00--18:00(节假日除外)。</p>
        <div class="flex-box tac items-line">
            <div class="flex-item">
                <img src="../assets/center/kefu1.jpg" alt="客服" width="40" height="40">
                <h2>客服电话</h2>
                <p class="fz12">400 1125 110</p>
            </div>
            <div class="flex-item">
                <img src="../assets/center/kefu2.jpg" alt="客服" width="40" height="40">
                <h2>客服邮箱</h2>
                <p class="fz12">yu.peng3@fesco.com.cn</p>
            </div>
            <div class="flex-item">
                <img src="../assets/center/kefu3.jpg" alt="客服" width="40" height="40">
                <h2>工作时间</h2>
                <p class="fz12">周一至周五<br/>9:00-18:00</p>
            </div>
        </div>
        <div class="flex-box tac items-line bot-lines bor-bottom">
            <a class="flex-item" href="tel:4001125110">
                <i class="iconfont icon-bodadianhua"></i>
                拨打电话
            </a>
            <a class="flex-item" href="https://admin.qidian.qq.com/template/blue/wpa/launch-mobile-qq.html?kfuin=2852061114&kfext=2852270580&visitorId=8679600128&visitorid=8679600128&fid=1&key=2c6693033018c081cc24d0a604ad7ff6&cate=1&type=2&ftype=1&pid=ckxq95.5bxqdx.j6mxh4k3&clickid=qcg4c6.bdrkcr.j6mxi5pu&tpForm=1&qid=5fonsq.64e2jv.j6mxh4k8&env=1&eptype=2&clickType=1&tptype=2&roleKey=roleQQ&roleValue=&roleUin=2852270581&roleData=2852270581&isKfuin=&cb=JSONP_CB_2&protocol=mqqwpa:// im/chat?sigt=5CD3FAD9ED9A12B963FA07D21C30864EAE01DDA561AAC45BB5ADBF1CF6D3DED8B806A30AF433B8CC5EA5AFA7AB15609C356C55C7EA4F25954EE2AE835A1830F0AFE6DB9AD6592868928F5F74670D90AAE353CB84DB0654BD5D2DE8823492D13EA9642BD64C9C56E9F2B6187FAE672BB919533700A51BB91179B711428E2154B3&chat_type=crm&uin=2852270581&version=1&src_type=web&web_src=1&wpaType=2&assignId=2852270581&QidianSigT=5CD3FAD9ED9A12B963FA07D21C30864EAE01DDA561AAC45BB5ADBF1CF6D3DED8B806A30AF433B8CC5EA5AFA7AB15609C356C55C7EA4F25954EE2AE835A1830F0AFE6DB9AD6592868928F5F74670D90AAE353CB84DB0654BD5D2DE8823492D13EA9642BD64C9C56E9F2B6187FAE672BB919533700A51BB91179B711428E2154B3&QidianKfUin=2852061114&rkey=ed71bbc21063ae66a51836c913383c4c&shouldReturnToRoot=NO">
                <i class="iconfont icon-lianxikefulianxiqq"></i>
                QQ客服
        </a>
        </div>
    </page-content>
</div>
</template>

<script>
    import Content from '../components/content'
    import { SimpleHeader } from '../components/header'

    export default {
        components: {
            SimpleHeader,
            'page-content': Content
        },
        data () {
            return {

            }
        },
        mounted: function () {
            this.$nextTick(function () {
                // 设置标题
                this.setTitle("客户服务");
            })
        },
        methods: {
            
        }
    }
</script>
<style lang="less">
    .customer-page{
        .bot-lines{
            border-top:1px solid #e7e7e7;
            a{
                line-height: 1.5rem;
                &:first-child{
                    border-right:1px solid #e7e7e7;
                }
            }
            i{
                margin-right:0.25rem;
                vertical-align: middle;
                color:#0c98e3;
                font-size: 1.0rem;
            }
        }
        .fz12{
            font-size: 0.6rem;
        }
    }
</style>
