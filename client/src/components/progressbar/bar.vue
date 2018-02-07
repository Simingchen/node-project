<template>
    <span class="bar" :style="'width:'+ percentage">
        <em>{{percentage}}</em>
    </span>
</template>

<script>
    export default {
        props: {
            percentage: {
                default: 0
            }
        },
    }
</script>
<style lang="less" scoped>
    .bar{
        position: relative;
        float: left;
        height: 100%;
        line-height: 100%;
        text-align: right;
        background: #db3a27;
        border: 1px solid;
        border-color: #c73321 #b12d1e #8e2418;
        border-radius: 10px;
        background-image: -webkit-linear-gradient(top, #ea8a7e 0%, #e15a4a 70%, #db3a27 100%);
        background-image: -moz-linear-gradient(top, #ea8a7e 0%, #e15a4a 70%, #db3a27 100%);
        background-image: -o-linear-gradient(top, #ea8a7e 0%, #e15a4a 70%, #db3a27 100%);
        background-image: linear-gradient(to bottom, #ea8a7e 0%, #e15a4a 70%, #db3a27 100%);
        box-shadow: inset 0 1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2);
    }
    em {
        position: absolute;
        right: 0;
        padding: 0 5px;
        color: rgba(0, 0, 0, 0.7);
        text-shadow: 0 1px rgba(255, 255, 255, 0.4);
    }
</style>
