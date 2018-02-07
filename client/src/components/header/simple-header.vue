<template>
    <page-header>
        <header-link v-if="backLink" :left="true" :edge="true" v-back-link>
            <!-- <icon icon="back"></icon> -->
            <i class="iconfont icon-fanhui1"></i>{{backText}}
        </header-link>
        <page-title>{{title}}</page-title>
        <slot></slot>
    </page-header>
</template>

<script>
    import Header from './header'
    import Title from './title'
    import Link from './link'
    import Icon from '../icons'

    export default {
        components: {
            'page-header': Header,
            'page-title': Title,
            'header-link': Link,
            Icon
        },
        props: {
            title: {
                type: String,
                required: true
            },
            backLink: {
                type: Boolean,
                default: false
            },
            backText: {
                type: String,
                default: '返回'
            }
        }
    }
</script>
<style>
    .icon-fanhui1{
        display:inline-block;
        /*float: left;*/
    }
</style>
