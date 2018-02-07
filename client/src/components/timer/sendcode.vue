<!-- 父组件下改变v-model的布尔值，当前组件watch监听value值后执行倒计时函数 -->
<template>
    <button :disabled="start" :class="{disabled : start}">
        {{tmpStr}}
    </button>
</template>
<script>
    export default {
        data() {
            return {
                tmpStr: '获取短信验证码',
                timer: null,
                start: false,
                runSecond: this.second
            }
        },
        props: {
            initStr: String,   // 初始化按钮显示文本
            second: {       // 倒计时时长（秒）默认60秒
                default: 60,
                validator (val) {
                    return /^\d*$/.test(val);
                }
            },
            runStr: {     // 运行时显示文本
                type: String,
                default: '{%s}秒后重新获取'
            },
            resetStr: {   // 运行结束后显示文本
                type: String,
                default: '重新获取验证码'
            },
            // 这个是关键,父组件监听当前v-model的值如果为true,被watch监听后执行倒计时函数
            value: {
                type: Boolean,
                default: false
            },
            storageKey: {   // 储存倒计时剩余时间sessionStorage的键值，设置不为空后，刷新页面倒计时将继续,可以为空
                type: String
            }
        },
        methods: {
            run (lastSecond) {
                let second = !lastSecond ? this.runSecond : lastSecond;

                if (this.storageKey) {
                    const runSecond = new Date().getTime() + second * 1000;
                    window.sessionStorage.setItem(this.storageKey, runSecond);
                }

                if (!lastSecond) {
                    this.tmpStr = this.getStr(second);
                }

                this.timer = setInterval(() => {
                    second--;
                    this.tmpStr = this.getStr(second);
                    second <= 0 && this.stop();
                }, 1000);
            },
            // 清除定时器及重设初始化文字
            stop () {
                this.tmpStr = this.resetStr;
                this.start = false;
                this.$emit('input', false);
                clearInterval(this.timer);
            },
            getStr (second) {
                return this.runStr.replace(/\{([^{]*?)%s(.*?)\}/g, second);
            }
        },
        watch: {
            value (val) {
                this.start = val;
                val && this.run();
            }
        },
        // 页面初始化时查看存储的时间键是否存在及大于0，
        created () {
            // ~~ 利用符号进行的类型转换,转换成数字类型
            const lastSecond = ~~((window.sessionStorage.getItem(this.storageKey) - new Date().getTime()) / 1000);
            if (lastSecond > 0 && this.storageKey) {
                this.tmpStr = this.getStr(lastSecond);
                this.start = true;
                this.run(lastSecond);
            } else {
                // 初始化按钮显示文本
                if (this.initStr) {
                    this.tmpStr = this.initStr;
                };
            }
        },
        // 离开页面时有时间键时清除定时器
        destroyed () {
            !this.storageKey && this.stop();
        }
    }
</script>
