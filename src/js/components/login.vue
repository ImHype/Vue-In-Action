<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <!--<div class="topBar">-->
    <!--<h1><a href="javascript:history.back(-1);" class="backHistory"><</a>个人中心</h1>-->
    <!--</div>-->
    <header-component
            title="手机登录"
    ></header-component>
    <div>
        <div class="formWrap">
            <div class="formBox">
                <div class="formLine">
                    <div>
                        <input type="text" placeholder="手机号：" v-model="phone">
                    </div>
                </div>
                <div class="formLine right_btn" style=" margin-bottom:0;">
                    <div>
                        <input type="text" placeholder="输入验证码：" v-model="code">
                    </div>
                    <code-component></code-component>
                </div>

            </div>
        </div>
        <div class="formWrap u-fixed FixedBottomBox">
            <div class="formBox u-noBg">
                <a href="javascript:void(0)" class="btn btnPrimary" v-on:click="loginAction">登录</a>
            </div>
        </div>
    </div>

    <toast-component></toast-component>
</template>
<style>
    .sendBtn{
        width: 100%;
        text-align: center;
    }

</style>
<script>
    import HeaderComponent from './header.vue';
    import CodeComponent from './code.vue';
    import ToastComponent from "./toast.vue";
    let api = require("../api");
    export default{
        data(){
            return{

            }
        },
        components:{
            HeaderComponent,
            CodeComponent,
            ToastComponent
        },
        methods: {
            loginAction(){
                let $data = this.$data;
                let _this = this;

                api.User.login({
                    phone:$data.phone,
                    code:$data.code,
                },function(){
                    _this.$dispatch("showToast","登录成功");
                    setTimeout(function(){
                        location.href="#/";
                    },1500);
                });
            }
        },
        events:{
            showToast(msg){
                this.$broadcast("showToast",msg);
            },
            askPhone(){
                this.$broadcast('getPhone',this.$data.phone);
            }
        }
    }
</script>