<template>
    <nav class="nav" @touchmove.stop.prevent>
        <slot></slot>
    </nav>
</template>

<script>
    export default {
    }
</script>

<style lang="less">
    @import './header.less';
</style>
