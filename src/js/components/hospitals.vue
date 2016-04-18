<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <header-component
            title="推荐医院" index=true
    ></header-component>
    <div class="hospitals bottomSpace" v-if="hasLoad">
        <ul>
            <li v-for="hospital in hospitals">
                <a href="#/hospital/doctors?id={{hospital.id}}&&name={{hospital.name}}">
                    <div class="hospital">
                        <div class="hospital_img_box">
                            <div class="hospital_img">
                                <img v-bind:src="hospital.icon" alt="">
                            </div>
                        </div>
                        <div class="hospital_desc">
                            <div class="hospital_info">
                                <div class="hospital_name">{{hospital.name}}</div>
                            </div>
                            <div class="hospital_kind">{{hospital.level}}</div>
                            <div class="hospital_address">{{hospital.city}}</div>
                        </div>
                    </div>
                </a>
            </li>
        </ul>
    </div>
    <loader-component v-else></loader-component>

    <bottom-component  active=2></bottom-component>
    <toast-component></toast-component>
</template>
<style>

</style>
<script>
    import HeaderComponent from './header.vue';
    import BottomComponent from './bottom.vue';
    import ToastComponent from "./toast.vue";
    import LoaderComponent from "./loader.vue";
    let api = require("../api");

    export default{
        data(){
            return{
                hasLoad:false,
                hospitals:null
            }
        },
        ready(){
            let _this = this;
            api.Index.getHospitals(function(res){
                this.$data.hospitals = res.data;
                setTimeout(function(){
                    this.$data.hasLoad = true;
                }.bind(this),500)
            }.bind(this));
        },
        components:{
            HeaderComponent,
            BottomComponent,
            ToastComponent,
            LoaderComponent
        }
    }
</script>