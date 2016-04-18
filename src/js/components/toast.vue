<template>
    <div v-if="isShow" class="toast">
        <div class="toastContent">
            {{ msg }}
        </div>
    </div>
</template>
<style>
    .toast{

        position: fixed;
        bottom: 15%;

        width:100%;
        text-align: center;

        color: #fff;
    }
    .toastContent{
        display: inline-block;
        padding: 15px;
        background: rgba(0,0,0,0.8);
        border-radius: 5px;
    }
</style>
<script>
    export default{
        data(){
            return{
                msg:"",
                isShow:false
            }
        },
        default(){
            alert(0)
        },
        components:{
        },
        events:{
            showToast(msg){
                let $data = this.$data;
                $data.msg = msg||"连接失败";
                $data.isShow=true;
                setTimeout(function(){
                    $data.isShow=false;
                },1500);
            }
        }

    }
</script>