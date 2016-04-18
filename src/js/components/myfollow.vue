<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
    <header-component
            title="我的关注"
    ></header-component>
    <div v-if="hasLoad && followList.length==0" class="u-noData">
        暂无关注
    </div>
    <div v-if="hasLoad" class="bottomSpace">
        <div class="doctorList foucusOnList">
            <div class="doctors">
                <ul>
                    <li class="clearfix" v-for="(index,item) in followList">
                        <a href="#/doctor/{{item.doctor.id}}">
                            <div class="headContainer">
                                <div class="headBox">
                                    <img v-bind:src="item.doctor.icon" alt=""/>
                                </div>
                            </div>
                            <div class="doctorIntroduce">
                                <div class="doctorIdentity">
                                    <span>{{item.doctor.name}}</span>
                                    <span>{{item.doctor.title.name}}</span>
                                </div>
                                <div class="doctorSpace">
                                    <span>{{item.doctor.city.name}}</span>
                                    <span>{{item.doctor.hospital.name}}</span>
                                </div>
                                <div class="doctorMaster">
                                    <ul class="clearfix">
                                        <li v-for="tagItem in item.doctor.tag">{{tagItem.name}}</li>
                                    </ul>
                                </div>
                                <button href="javascript:void(0)" class="btn btnUnFoucus"  v-on:click="unFollowDoctor($event,index,item.doctor.id)">取消关注</button>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <loader-component v-else></loader-component>


    <bottom-component active=3></bottom-component>
    <toast-component></toast-component>
</template>
<style>

</style>
<script>
    import HeaderComponent from './header.vue';
    import BottomComponent from './bottom.vue';
    import ToastComponent from "./toast.vue";
    import LoaderComponent from './loader.vue';

    let api = require("../api");

    export default{
        data(){
            return{
                followList:[],
                hasLoad:false
            }
        },
        ready(){
            let _this = this;
            api.User.getFollowList(function(res){
                this.$data.followList = res.data;
                setTimeout(function(){
                    this.$data.hasLoad = true;
                }.bind(this),500);
            }.bind(this));
        },
        methods:{
            unFollowDoctor($event,index,doctorId){
                $event.preventDefault();
                var result = window.confirm("您确认取消关注吗");
                if(!result){ return; }

                api.Doctor.unFollow({
                    id:doctorId
                },function(res){
                    this.$data.followList.splice(index,1);
                }.bind(this));
                return false;
            }
        },
        components:{
            HeaderComponent,
            BottomComponent,
            ToastComponent,
            LoaderComponent
        }
    }
</script>