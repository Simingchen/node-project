<template>
<div class="page">
    <simple-header class="fixed" title="客户服务" :back-link="true"></simple-header>
    <page-content>
        
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
    .navSort-page{
        .sort-box{

        }
    }
</style>
