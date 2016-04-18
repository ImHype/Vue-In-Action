<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
    <header-component
            title="医生简介"
    ></header-component>
    <div v-if="hasLoad">
        <div class="doctorDesc clearfix">
            <div class="doctorHeadBox">
                <div class="doctorHead">
                    <div class="headBox">
                        <img v-bind:src="doctor.icon" alt="">
                    </div>
                </div>
            </div>
            <div class="doctorDescBox">
                <div class="doctorIdentity">
                    <span>{{doctor.name}}</span>
                    <span>{{doctor.title.name}}</span>
                </div>
                <div class="doctorSpace">
                    <div>{{doctor.city.name}}</div>
                    <div>{{doctor.hospital.name}}</div>
                </div>
                <div class="userControl">

                    <a href="javascript:void(0)" class="btn btnSuccess" v-on:click="followDoctor" v-if="!doctor.followed">关注</a>
                    <a href="javascript:void(0)" class="btn btnSuccess" v-on:click="unFollowDoctor" v-else>取消关注</a>
                    <a href="#/worktime/{{doctor.id}}" class="btn btnWarning" v-on:click="bookDoctor">预约</a>
                </div>
            </div>
        </div>
        <div class="doctorDescBody">
            <div class="doctorDescBox">
                <div class="doctorBoxHead">
                    擅长项目
                </div>
                <div class="doctorBoxContent">
					<span class="successColor" v-for="tagItem in doctor.tag">
						<!--发烧、感冒、咳嗽、头痛、头晕背痛、颈椎病、-->
                        {{tagItem.name}}、
					</span>
                </div>
            </div>
            <div class="doctorDescBox">
                <div class="doctorBoxHead">
                    名医简介
                </div>
                <div class="doctorBoxContent " style="min-height: 2rem;">
                    {{doctor.summary}}
                </div>
            </div>
        </div>
    </div>
    <loader-component v-else></loader-component>

    <toast-component></toast-component>
</template>
<style>

</style>
<script>
    import HeaderComponent from './header.vue';
    import BottomComponent from './bottom.vue';
    import ToastComponent from "./toast.vue";
    import CodeComponent from './code.vue';
    import LoaderComponent from './loader.vue';

    let api = require("../api");

    export default{
        data(){
            return{
                doctor:{},
                hasLoad:false
            }
        },
        ready(){
            let arr = window.location.hash.split('/');
            let doctorId = arr[arr.length-1];
            this.$data.doctorId = doctorId;
            api.Index.getDoctor({
                id:doctorId
            },function(res){
                this.$data.doctor = res.data;

                setTimeout(function(){
                    this.$data.hasLoad = true;
                }.bind(this),500);

            }.bind(this));
        },
        methods:{
            followDoctor(){
                let doctorId = this.$data.doctorId;
                api.Doctor.follow({
                    id:doctorId
                },function(res){
                    this.$data.doctor.followed = true;
                    this.$broadcast("showToast","关注成功");
                }.bind(this));
            },
            unFollowDoctor(){
                var result = window.confirm("您确认取消关注吗");
                if(!result){ return; }

                let doctorId = this.$data.doctorId;
                api.Doctor.unFollow({
                    id:doctorId
                },function(res){
                    this.$data.doctor.followed = false;
                }.bind(this));
            },
            bookDoctor(){
                let doctorId = this.$data.doctorId;
            }
        },
        components:{
            HeaderComponent,
            BottomComponent,
            ToastComponent,
            CodeComponent,
            LoaderComponent
        }
    }
</script>