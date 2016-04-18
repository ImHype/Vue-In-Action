<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <div>
        <a href="javascript:void(0)" class="btn btnActive sendBtn" v-on:click.stop.prevent="registAction"  >{{btnMsg}}</a>
    </div>
</template>
<style>

</style>
<script>
    let api = require("../api");
    export default{
        data(){
            return{
                msg:'hello vue',
                btnMsg:"获取验证码",
                canSend:true
            }
        },
        components:{

        },
        events:{
            getPhone(phone){
                var _this= this;
                var $data = this.$data;
                if(!this.$data.canSend){
                    this.$dispatch("showToast","已发送，请一分钟之后再试")
                    return;
                }
                if(!phone){
                    this.$dispatch("showToast","请输入手机号");
                    return;
                }
                api.User.getCode({
                    phone:phone
                },function(res){
                    $data.canSend=false;
                    _this.$dispatch("showToast",res.message);
                    setTimeout(function(){
                        $data.canSend=true;
                    },60000);
                });
            }
        },
        methods:{
            registAction:function(){

                this.$dispatch('askPhone');
                console.log("ask")
            }
        }
    }
</script>