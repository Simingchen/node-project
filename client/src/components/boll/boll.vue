<template>
    <a href="javascript:" id="ball" class="ball">拖我</a>
</template>

<script>
    import Inertia from '../../directives/Inertia.js'

    export default {
        components: {
        }
    }
    new Inertia(document.getElementById('ball'));
</script>
<style land="less" scoped>
    .ball {
        position: absolute;
        line-height: 2.75rem;
        width: 2.75rem;
        height: 2.75rem;
        text-align: center;
        border-radius: 99px;
        color: #fff;
        /*border: 1rem solid transparent;*/
        background-color: #ed424b;
        background-clip: padding-box;
        text-decoration: none;
        z-index: 100;
    }
</style>
