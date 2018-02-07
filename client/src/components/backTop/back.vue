<template>
    <div class="backtop" :class="{on: show}" @click.stop="backtop">
        <slot v-if="!!$slots.default"></slot>
        <template v-else></template>
    </div>
</template>

<script>
    import { scrollTop, getScrollview } from './assist.js';

    export default {
        data () {
            return {
                show: false
            }
        },
        mounted () {
            this.scrollView = getScrollview(this.$el);

            this.scrollView.addEventListener('scroll', this.throttledCheck, false);
            this.scrollView.addEventListener('resize', this.scrollHandler, false);
        },
        destroyed () {
            this.scrollView.removeEventListener('scroll', this.throttledCheck, false);
            this.scrollView.removeEventListener('resize', this.scrollHandler, false);
        },
        methods: {
            backtop () {
                let top = 0;
                if (this.scrollView === window) {
                    if (document.documentElement && document.documentElement.scrollTop) {
                        top = document.documentElement.scrollTop;
                    } else {
                        top = document.body.scrollTop;
                    }
                } else {
                    top = this.scrollView.scrollTop
                }

                scrollTop(this.scrollView, top, 0);
            },
            scrollHandler () {
                let offsetTop = window.pageYOffset;
                let offsetHeight = window.innerHeight;

                if (this.scrollView !== window) {
                    offsetTop = this.scrollView.scrollTop;
                    offsetHeight = this.scrollView.offsetHeight;
                }

                this.show = offsetTop >= offsetHeight / 2;
            },
            throttle (method, context) {
                clearTimeout(method.tId);
                method.tId = setTimeout(() => {
                    method.call(context);
                }, 50);
            },
            throttledCheck () {
                this.throttle(this.scrollHandler);
            }
        }
    }
</script>

<style lang="less">
    .backtop {
        position:fixed;
        bottom:20%;
        right: -2.8rem;
        width:2.5rem;
        height:2.5rem;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.5) url(../../assets/top.png) center center no-repeat;
        background-size: 55% 55%;
        z-index: 100;
        &.on{
            right:1rem;
            -webkit-transition: .5s right;
            transition: .5s right;
        }
    }
</style>
