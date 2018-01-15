<template>
    <div class="wrap">
        <h1>{{date}}</h1>
    </div>
</template>
<script>
    import { SimpleHeader } from '../components/header'
    import Content from '../components/content'
    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
        },
        data () {
            return {
                goodsData: [],
                date: new Date()
            }
        },
        mounted: function () {
            this.$nextTick(function () {
            })
        },
        computed: {

        },
        methods: {
            
        }
    }
</script>
<style lang="less">
    
</style>
