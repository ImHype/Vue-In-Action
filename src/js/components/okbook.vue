<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <header-component
            title="确认预约"
    ></header-component>
    <div class="preAppoint" v-if="hasLoad">
        <div class="formWrap">
            <div class="formBox u-rela">
                <div class="doctors">
                    <ul>
                        <li class="clearfix">
                            <div class="headContainer">
                                <div class="headBox">
                                    <img v-bind:src="doctor.icon" alt="">
                                </div>
                            </div>
                            <div class="doctorIntroduce">
                                <div class="doctorIdentity">
                                    <span>{{doctor.name}}</span>
                                    <span>{{doctor.title.name}}</span>
                                </div>
                                <div class="doctorSpace">
                                    <span>{{doctor.city.name}}</span>
                                    <span>{{doctor.hospital.name}}</span>
                                </div>
                                <div class="doctorMaster">
                                    <ul class="clearfix">
                                        <li v-for="tagItem in doctor.tag">{{tagItem.name}}</li>
                                    </ul>
                                </div>
                                <div class="doctorAssess">
                                    <div class="content clearfix">
                                        <span>介绍: </span>
                                        <div>
                                            {{doctor.summary}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="formLine">
                    <div>
                        时间：待定
                    </div>
                </div>
                <div class="formLine">
                    地址：待定
                    <!--{{bookTime.hospital.name}}-->
                </div>
                <!--<div class="formLine">-->
                    <!--可预约数：2 费用：50元/人-->
                <!--</div>-->
            </div>
        </div>
        <div class="formWrap u-fixed FixedBottomBox">
            <div class="formBox u-noBg">
                <a href="javascript:void(0)" class="btn btnPrimary" v-on:click="book">确认预约</a>
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
    import LoaderComponent from './loader.vue';


    let api = require("../api");

    export default{
        data(){
            return{
                doctor:null,
                bookTime:null,
                hasLoad:false
            }
        },
        ready(){
            let _this = this;
            let arr = window.location.hash.split('/');
            let doctorId = arr[arr.length-2];
            let bookTimeIndex = arr[arr.length-1];
            this.$data.doctorId = doctorId;
            api.Doctor.getBookTime({
                id:doctorId
            },function(res){
                var dayList = [
                    "一",
                    "二",
                    "三",
                    "四",
                    "五",
                    "六",
                    "日"
                ];
                var timeList = res.data;
                var bookTimeList = [];

                for (var i=0;i< timeList.length;i++){
                    for(var j =0;j<timeList[i].time.length;j++){
                        var bookTimeTemp = {};
                        bookTimeTemp.date = timeList[i].date;
                        bookTimeTemp.hospital = timeList[i].hospital;
                        bookTimeTemp.weekday  = "星期"+ dayList[new Date(timeList[i].date).getDay()];
                        bookTimeTemp.time = timeList[i].time[j];
                        bookTimeList.push( bookTimeTemp );
                    }
                }
                this.$data.bookTime = bookTimeList[bookTimeIndex];

                api.Index.getDoctor({id:doctorId},function(res){
                    this.$data.doctor = res.data;
                    setTimeout(function(){
                        this.$data.hasLoad = true;
                    }.bind(this),500);
                }.bind(this));
            }.bind(this));
        },
        methods:{
            book(){
                api.Doctor.book({
                    id: this.$data.doctorId,
                    date: this.$data.bookTime.date,
                    time: this.$data.bookTime.time.id,
                    hospital: this.$data.bookTime.hospital.id
                },function (res){
                    if(res.result_code==200){
                        this.$broadcast("showToast","你的预约信息已提交，稍后客服会与您联系！");
                        setTimeout(function(){{
                            location.href="#/myBook";
                        }},2000);
                    }

                }.bind(this))
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