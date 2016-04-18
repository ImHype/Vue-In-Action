<template>
    <header-component
            title="上传病例"
    ></header-component>

    <bottom-component></bottom-component>
    <toast-component></toast-component>
</template>
<style>

</style>
<script>
    import HeaderComponent from './header.vue';
    import BottomComponent from './bottom.vue';
    import ToastComponent from "./toast.vue";
    let api = require("../api");

    export default{
        data(){
            return{
            }
        },
        ready(){
            let _this = this;

        },
        components:{
            HeaderComponent,
            BottomComponent,
            ToastComponent
        }
    }
</script>