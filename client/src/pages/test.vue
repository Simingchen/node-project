<template>
    <div class="page">
        <simple-header title="Toast" :back-link="true"></simple-header>
        <page-content>
            <ul id="hewenqi" class="hewenqi">
                <li>
                    <input type="text" v-model="user">
                </li>
                <li>
                    <input type="text" placeholder="请输入验证码" id="verifyCode" name="verifyCode" v-model="verifyCode">
                    <input id="verify-btn" type="button" value="获取短信验证码" v-on:click="getVerifyCode()">
                </li>
                <li>
                    <input type="button" value="确认" @click="bindWeChat()">
                </li>
            </ul>
        </page-content>
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
                user: "",
                verifyCode: "",
            }
        },
        mounted: function () {
            this.$nextTick(function () {
            })
        },
        methods: {
            
        }
    }
</script>
<style lang="less">
    
</style>
