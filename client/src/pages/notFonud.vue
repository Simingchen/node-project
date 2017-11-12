<template>
<div class="page bgf" ref="noMove">
    <simple-header class="fixed" title="404" :back-link="true" backText="返回"></simple-header>
    <div class="con">
        <p class="tit">页面挤爆了</p>
        <img class="img" src="../assets/img/notFound.png">
        <p class="txt">请求过于拥挤，<br>程序猿正在努力疏通中，请稍后重试！</p>
        <p class="txt"></p>
    </div>
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
        mounted: function () {
            this.$nextTick(function () {
                // 设置标题
                this.setTitle("404");
                this.stopMove();
            })
        },
        methods: {
            // 禁止滚动
            stopMove: function () {
                this.$refs.noMove.ontouchmove = function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .con{
        padding-top:5.0rem;
    }
    .tit{
        color:#b5b5b5;
        text-align: center;
        font-size: .9rem;
        font-weight: 600;
        line-height: 3.2rem;
    }
    .img{
        display: block;
        width:6rem;
        margin:0 auto;
    }
    .txt{
        margin-top:2rem;
        line-height: 1.2rem;
        text-align: center;
        color:#999;
        font-size: 16px;
    }
</style>

