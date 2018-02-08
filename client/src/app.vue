<template>
    <div id="app">
        <div class="loading" :class="{on: isLoading}">加载中</div>
        <!-- slide -->
        <transition name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    import { mapState } from "vuex"
    export default {
        computed: {
            ...mapState({
                isLoading: state => state.isLoading
            })
        }
    }
</script>
<style lang="less">
    /*全局样式*/
    @import "./components/page/page.less";
    @import "./components/page/style.less";
    @import "./components/icons/iconfont.less";
    .loading{
        display: none;
        position:fixed;
        top:50%;
        left:50%;
        width:4rem;
        height:4rem;
        transform: translate(-50%, -60%);
        text-align: center;
        line-height: 6.2rem;
        color:#fff;
        background: rgba(0,0,0,.4) url(https://img.alicdn.com/tps/TB1R5zYKVXXXXb7XVXXXXXXXXXX-32-32.gif) center .9rem no-repeat;
        background-size:30%;
        border-radius: 0.5rem;
        z-index: 1000;
        &.on{
            display:block;
        }
    }
</style>
