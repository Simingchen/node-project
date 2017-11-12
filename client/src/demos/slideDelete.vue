<template>
    <div class="page">
        <simple-header title="Toast" :back-link="true"></simple-header>
        <page-content>
            <ul id="hewenqi" class="hewenqi">
                <li class="deletedItem">
                    <div class="hewenqi-con">
                        hewenqi插件是一个javascript插件。
                    </div>
                    <div class="deletedItem-btn">删除</div>
                </li>
                <li class="deletedItem">
                    <div class="hewenqi-con">
                        hewenqi插件是一个javascript插件。
                    </div>
                    <div class="deletedItem-btn">删除</div>
                </li>
            </ul>
        </page-content>
    </div>
</template>
<script>
    import { SimpleHeader } from '../components/header'
    import Content from '../components/content'
    import $ from '../directives/jquery-vendor.js'
    import '../directives/jquery-weui.js'
    import '../directives/city-picker.js'
    import swipeDeleted from'../directives/swipe-deleted.js'
    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
        },
        data () {
            return {
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                this.getArea()
            })
        },
        methods: {
            getArea:function(){
                console.log()
                swipeDeleted("hewenqi")
                // $Hewenqi.Set({id:"hewenqi"});//指定ul的id，如果id为hewenqi的话可以屏蔽这条语句。
                // $Hewenqi.Hewenqi();//执行滑动删除等功能。
                // area1.init({
                //     'trigger': '#demo1', //触发选择控件的文本框，同时选择完毕后name属性输出到该位置
                //     'valueTo': '#value1', //选择完毕后id属性输出到该位置
                //     'keys': {
                //         id: 'id',
                //         name: 'name'
                //     }, //绑定数据源相关字段 id对应valueTo的value属性输出 name对应trigger的value属性输出
                //     'type': 1, //数据源类型
                //     'data': areaData //数据源
                // });
                // area1.value=[1,13,3];//控制初始位置，注意：该方法并不会影响到input的value
            } 
        }
    }
</script>
<style lang="less">
    .hewenqi{
        overflow:hidden;
        margin:0px;
        padding:0px;
    }
    .hewenqi * {
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .hewenqi li{
        line-height: 60px;
        border-bottom: 1px solid #fcfcfc;
        position: relative;
        padding: 0 12px;
        color: #666;
        background: #f2f2f2;
    }
    .deletedItem-btn{
        position: absolute;
        top: 0;
        right: -80px;
        text-align: center;
        background: #ffcb20;
        color: #fff;
        width: 80px;
    }
</style>
