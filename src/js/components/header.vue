<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="topBar" >
        <h1><a href="{{back ? back:'javascript:history.back(-1);'}}" class="backHistory" v-if="!index"></a>{{title}}</h1>
    </div>
</template>
<style>

</style>
<script>
    export default{
        data(){
            return{
            }
        },
        ready(){
        },
        props:['title','index','back'],
        components:{
        }
    }
</script>