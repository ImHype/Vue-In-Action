<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
    <header-component
            title="我的预约" back="#/userCenter"
    ></header-component>
    <div v-if="hasLoad &&bookList.length==0" class="u-noData">
        暂无预约
    </div>
    <div v-if="hasLoad" class="bottomSpace">
        <div class="doctorList preAppointList">
            <div class="doctors">
                <ul>
                    <li class="clearfix preAppointItem" v-for="item in bookList">
                        <a href="#/doctor/{{item.doctor.id}}">
                            <div class="headContainer">
                                <div class="headBox">
                                    <img v-bind:src="item.doctor.icon" alt="">
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
                                <div class="doctorAssess">
                                    <div class="content clearfix">
                                        <span>介绍: </span>
                                        <div>
                                            {{item.doctor.summary}}
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </a>
                        <div>
                            <i class="clearfix"></i>
                            <div class="preAppointDesc">
                                <!--<div>-->
                                    <!--时间: {{item.date}} {{item.time.name}}-->
                                <!--</div>-->
                                <div v-if="item.date=='2020-12-31'">
                                    时间： 待定
                                </div>
                                <div v-else>
                                    {{item.date}} {{item.weekday}}
                                </div>
                                <div>
                                    地址：
                                    <!--北京市第三人民医院 307室-->

                                    <span v-if="item.date=='2020-12-31'">
                                        待定
                                    </span>
                                    <span v-else>
                                        {{item.doctor.hospital.name }}
                                    </span>
                                </div>
                                <a href="javascript:void(0)" class="btn btnDelPreAppoint" v-on:click="unbook(item.id,$index)">取消预约</a>
                            </div>
                        </div>
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
                bookList:[],
                hasLoad:false
            }
        },
        ready(){
            let _this = this;
            api.User.getBookList(function(res){
                this.$data.bookList = res.data;
                setTimeout(function(){
                    this.$data.hasLoad = true;
                }.bind(this),500);
            }.bind(this));
        },
        methods:{
            unbook(id,index){
                var result = window.confirm("您确认取消预约吗");
                if(!result){ return; }

                api.Doctor.unBook({id:id},function(res){
                    this.$broadcast("showToast",res.message);
                    this.$data.bookList.splice(index,1);
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