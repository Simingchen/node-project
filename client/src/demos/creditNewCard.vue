<template>
<div class="creditNewCard-page">
    <simple-header class="fixed" title="添加信用卡(只支持本人)" :back-link="true" backText="取消"></simple-header>
    <page-content class="bgf" id="noMove">
        <ul>
            <li class="flex-box bor-bottom rel">
                <label class="lab" for="cardNo">卡号</label>
                <input class="flex-item" id="cardNo" name="cardNo" type="text" v-model="cardNum" placeholder="信用卡号" maxlength="25" pattern="[0-9]*" @keydown="inputCardNum()">
            </li>
            <li class="flex-box bor-bottom rel toActive" @click="$refs.p1.open()">
                <label class="lab">银行</label>
                <input class="flex-item" type="text" v-model="cardName" placeholder="选择发卡银行" readonly>
                <span class="link-arrow icon icon-link"></span>
            </li>
            <li class="flex-box bor-bottom rel">
                <label class="lab" for="bank">姓名</label>
                <input class="flex-item" id="bank" name="bank" type="text" v-model="cardMaster" maxlength="6" placeholder="持卡人姓名">
            </li>
            <li>
                <a class="btn on" href="javascript:;" @click="addNewCard()">确定</a>
            </li>
        </ul>
    </page-content>
    <!-- 弹窗错误信息 -->
    <div class="notify" v-if="popMsg.isShowMsg">
        <div class="txt">{{popMsg.errorMsg}}</div>
    </div>
    <!-- 弹窗 -->
    <popup ref="p1" title="发卡银行">
        <ul class="card-list">
            <li class="items-line bor-bottom toActive" @click="selectCard('广州银行')">
                <img src="" alt="">
                广州银行
            </li>
            <li class="items-line bor-bottom toActive" @click="selectCard('工商银行')">
                <img src="" alt="">
                工商银行
            </li>
        </ul>
    </popup>
</div>
</template>

<script>
    import Content from '../components/content'
    import { SimpleHeader } from '../components/header'
    import Popup from '../components/popup'

    export default {
        components: {
            SimpleHeader,
            'page-content': Content,
            Popup,
        },
        data(){
            return{
                popMsg:{
                    isShowMsg: false,     //是否显示弹窗错误信息
                    errorMsg:"",         //弹窗错误信息
                },
                cardNum:"",     //卡号
                cardName:"",    //卡名
                cardMaster:"",    //卡持有人
            }
        },
        mounted:function(){
            this.$nextTick(function(){
                //禁止滚动
                this.stopMove();
                //设置标题
                this.setTitle("添加信用卡");
            })
        },
        methods:{
            //禁止滚动
            stopMove:function(){
                this.$el.querySelector("#noMove").ontouchmove=function(e){
                    e.preventDefault();
                    e.stopPropagation();
                }
            },
            inputCardNum:function(){
                this.cardNum = this.cardNum.replace(/(\d{4})(?=[^\s])/,'$1 ');//替换空格前4位数字为4位数字加空格
            },
            //选择卡
            selectCard:function(name){
                this.cardName = name;
                this.$refs.p1.close();
            },
            //确定添加
            addNewCard:function(){
                if(!this.cardNum.trim()){
                    this.verifyError("请填入信用卡号");
                    return false;
                }else{
                    var cardString = this.cardNum.replace(/\s/g,"");
                }
                if(!this.cardName.trim()){
                    this.verifyError("请发卡银行!");
                    return false;
                }
                if(!this.cardMaster.trim()){
                    this.verifyError("请输入持有人姓名!");
                    return false;
                }
            },
            //验证报错函数
            verifyError:function(msg){
                this.popMsg.isShowMsg = true;
                this.popMsg.errorMsg= msg;
                var that = this;
                setTimeout(function(){
                    that.popMsg.isShowMsg = false;
                },1e3)
            },
        }
    }
</script>
<style lang="less">
    .creditNewCard-page{
        .lab{
            width:4.0rem;
            text-align: center;
            line-height: 2.5rem;
            font-size: 16px;
            color:#222;
            font-weight: 700;
        }
        .flex-item{
            border:0;
            background-color: transparent;
        }
        .link-arrow{
            font-size: .7rem;
            position: absolute;
            right: .3rem;
            top: 50%;
            height: 1rem;
            width: .8rem;
            color: #c7c7c7;
            margin-top: -0.5rem;
        }
        .btn{
            display:block;
            width:85%;
            height:2.3rem;
            margin:20px auto;
            text-align: center;
            line-height: 2.3rem;
            color:#c5c5c5;
            background-color: #ddd;
            border-radius: 5px;
            font-size: 16px;
            &.on{
                color:#fff;
                background-color: #ec584e;
            }
        }
        .card-list{
            height:300px;
            overflow-y:scroll; 
            -webkit-overflow-scrolling: touch;
        }
        #cardNo{
            letter-spacing: 1px;
        }
    }
</style>
