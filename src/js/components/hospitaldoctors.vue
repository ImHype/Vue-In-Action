<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
    <header-component
            :title="hospitalName"
    ></header-component>
    <div v-if="hasLoad" class="u-fullHeight">
        <div class="doctorList u-fullHeight hospital_doctors">
            <div class="u-noData" v-if="doctorList.length==0">
                该医院暂无医生资料
            </div>
            <!--<div v-else class="doctorListTitle">-->
                    <!--名医推荐-->
            <!--</div>-->
            <div class="doctors">
                <ul>
                    <li class="clearfix" v-for="item in doctorList">
                        <a href="#/doctor/{{item.id}}">
                            <div class="headContainer">
                                <div class="headBox">
                                    <img v-bind:src="item.icon" alt="">
                                </div>
                            </div>
                            <div class="doctorIntroduce">
                                <div class="doctorIdentity">
                                    <span>{{item.name}}</span>
                                    <span>{{item.title.name}}</span>
                                </div>
                                <div class="doctorSpace">
                                    <span>{{item.city.name}}</span>
                                    <span>{{item.hospital.name}}</span>
                                </div>
                                <div class="doctorMaster">
                                    <ul class="clearfix">
                                        <li v-for="tagItem in item.tag">{{tagItem.name}}</li>
                                    </ul>
                                </div>
                                <div class="doctorAssess">
                                    <div class="content clearfix">
                                        <span>介绍: </span>
                                        <div>
                                            {{item.summary}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <loader-component v-else></loader-component>
    <!--<bottom-component></bottom-component>-->
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
                keyword:"",
                doctorList:[],
                hasLoad:false,
                isLoading:false,
                hospitalName:false,
                isEnd:false,
                pageParam:{
                    hospital:0,
                    from:1,
                    count:8
                }
            }
        },
        ready(){
            let _this = this;
            let hash = location.hash;
            (/id=(\S{1,})&{2}/).test(hash);
            this.$data.pageParam.hospital = decodeURI(RegExp.$1);

            (/name=(\S{1,})/).test(hash);
            this.$data.hospitalName = decodeURI(RegExp.$1);

            console.log(this.$data.hospitalName)
            this.searchDoctor();

            window.onscroll = function(){
                console.log(($(document).scrollTop()+$(window).height() > $(document).height() - 200) && $(".hospital_doctors").length!=0);
                if(($(document).scrollTop()+$(window).height() > $(document).height() - 200) && $(".hospital_doctors").length!=0){
                    this.searchDoctor();
                }
            }.bind(this);
        },
        methods:{
            searchDoctor(){
                if(!this.$data.isLoading){
                    this.$data.isLoading = true;
                }else{
                    return 0;
                }
                if(this.$data.isEnd == true){
                    return 0;
                }
                api.Doctor.searchByHospitalId(this.$data.pageParam,function(res){
                    if(res.result_code == 404){
                        this.$broadcast("showToast","已无更多");
                        this.$data.isEnd = true;
                        return;
                    }
                    this.$data.doctorList = this.$data.doctorList.concat( res.data.records );
                    this.$data.isLoading = false;

                    setTimeout(function(){
                        this.$data.hasLoad = true;
                        this.$data.pageParam.from += this.$data.pageParam.count;
                    }.bind(this),500);
                }.bind(this));
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