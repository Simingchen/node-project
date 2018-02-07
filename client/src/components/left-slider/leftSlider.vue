<template>
    <div class="left-delete">
        <div class="move"
             @touchstart="_touchStart"
             @touchmove="_touchMove"
             @touchend="_touchEnd"
             :style="txtStyle">
            <slot></slot>
        </div>
        <div class="deleteIcon" :style="'width:'+ btnWidth/rootFont + 'rem'"  @click.prevent="deleteItem(index)">{{text}}</div>
    </div>
</template>

<script>
    export default {
        props: {
            // 点击删除索引
            index: {
                type: Number,
                default: 0
            },
            // 按钮文字
            text: {
                type: String,
                default: "删除"
            },
            // 删除按钮的px宽度
            btnWidth: {
                type: String,
                default: 40
            }
        },
        data () {
            return {
                startX: 0,       // 触摸位置
                moveX: 0,       // 滑动时的位置
                disX: 0,       // 移动距离
                txtStyle: '',
                delWidth: this.btnWidth,  // 删除按钮宽度
                top: '',
                zIndex: 'z-index:-1',
                rootFont: document.querySelector("html").style.fontSize.replace("px", ""),    // 根尺寸
                widthRem: this.btnWidth / document.querySelector("html").style.fontSize.replace("px", "")    // 按钮rem宽度
            }
        },
        methods: {
            _touchStart: function (ev) {
                // 如果刚开始在打开状态则关闭
                var oMoves = document.querySelectorAll(".left-delete");
                [].forEach.call(oMoves, (item) => {
                    item.querySelector(".move").style.marginLeft = "0rem";
                })

                if (ev.target.style.marginLeft == "-" + this.widthRem + "rem)") {
                    this.txtStyle = "margin-left:0rem";
                    return false;
                }
                // 获取点击的手指数量 为1
                if (ev.touches.length == 1) {
                    // 手指按下的时候记录按下的位置
                    this.startX = ev.touches[0].clientX;
                }
            },
            _touchMove: function (ev) {
                // 滑动的时候禁止滚动
                if (ev.touches.length == 1) {
                    // 滑动过程中的实时位置
                    this.moveX = ev.touches[0].clientX;
                    // 滑动过程中实时计算滑动距离
                    this.disX = this.startX - this.moveX;
                    // 如果是向右滑动或者只是点击，不改变滑动位置
                    if (this.disX < 0 || this.disX == 0) {
                        // console.log('没有移动');
                        this.txtStyle = "margin-left:0";
                    } else if (this.disX > 0) {
                        // 如果是向左滑动，则实时给这个根元素一个向左的偏移-left，当偏移量到达固定值delWidth时，固定元素的偏移量为 delWidth
                        this.txtStyle = "margin-left:-" + (this.disX / this.rootFont) + "rem";

                        if (this.disX >= parseFloat(this.delWidth)) {
                            this.txtStyle = "margin-left:-" + this.delWidth / this.rootFont + "rem";
                            // this.zIndex = "z-index:" + 10;
                        }
                    }
                }
            },
            _touchEnd: function (event) {
                // 滑动的时候禁止滚动
                if (event.changedTouches.length == 1) {
                    this.startX = 0;
                    this.zIndex = "z-index:" + -1;
                    // 手指移动结束后的水平位置
                    let endX = event.changedTouches[0].clientX;
                    // 触摸开始与结束,手指移动的距离
                    this.disX = this.startX - endX;
                    // 如果距离小于删除按钮的1/2，不显示删除按钮
                    var distance = event.target.style.marginLeft.replace(/rem/, "")
                    if (Math.abs(distance) < (this.delWidth / this.rootFont) / 2) {
                        this.txtStyle = "margin-left:0rem";
                    }

                    // // 如果距离大于删除按钮的1/2，显示删除按钮
                    if (Math.abs(distance) >= (this.delWidth / this.rootFont) / 2) {
                        this.txtStyle = "margin-left:-" + this.delWidth / this.rootFont + "rem";
                    }
                }
            },
            deleteItem: function (index) {
                this.$emit('deleteItem', index);
            }
        }
    }
</script>

<style lang="less" scoped>
    .left-delete{
        position:relative;
        width:100%;
        height:100%;
        z-index:2;
    }
    .move{
        position: absolute;
        width:100%;
        height:100%;
        top:0;
        left:0;
        background-color: #f5f5f5;
        -webkit-transition: margin-left .3s ease;
        transition: margin-left .3s ease;
        -webkit-user-select: none;
        user-select: none;
    }
    .deleteIcon{
        position: absolute;
        right:0;
        top:0;
        width: 2rem;
        height:100%;
        text-align: center;
        color:#fff;
        background-color:#ec584e;
        z-index: -1;
    }
</style>
