<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div class="bottomBar" >
        <ul class="clearfix">
            <li>
                <a href="#/" class="indexIcon" v-bind:class="{active:active==1}"></a>
            </li>
            <li>
                <a href="#/hospitals" class="doctorIcon" v-bind:class="{active:active==2}"></a>
            </li>
            <li>
                <a href="#/userCenter" class="userIcon" v-bind:class="{active:active==3}"></a>
            </li>
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return{
            }
        },
        ready(){

        },
        props:['active'],
        methods:{

        },
        components:{
        }
    }
</script>

<style>
    .indexIcon{
        background-image: url("/image/indexIcon.png");
    }
    .doctorIcon{
        background-image: url("/image/doctorIcon.png");
    }
    .userIcon{
        background-image: url("/image/userIcon.png");
    }

    .indexIcon.active{
        background-image: url("/image/indexIconActive.png");
    }

    .doctorIcon.active{
        background-image: url("/image/doctorIconActive.png");
    }

    .userIcon.active{
        background-image: url("/image/userIconActive.png");
    }
</style>
