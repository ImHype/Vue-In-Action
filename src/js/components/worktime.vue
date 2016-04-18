<template>
    <header-component
            title="预约"
    ></header-component>
    <div v-if="hasLoad" class="u-fullHeight">
        <div v-if="bookTimeList.length==0" class="u-noData">
            暂无可预约时间
        </div>
        <div class="booktime">
            <div v-for="bookTime in bookTimeList">
                <a href="#/okBook/{{doctorId}}/{{$index}}">
                    <ul>
                        <li>
                            <!--{{bookTime.date}}-->
                            <!--{{bookTime.weekday}}-->
                            <!--{{bookTime.time.name}}-->
                            时间：待定
                        </li>
                        <li>
                            地址：待定
                            <!--{{bookTime.hospital.name}}-->
                        </li>
                    </ul>
                    <div class="worktime_btn">
                        >
                    </div>
                </a>
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
    import LoaderComponent from "./loader.vue";
    import ToastComponent from "./toast.vue";
    var api = require("../api");

    export default{
        data(){
            return{
                bookTimeList:null,
                doctorId:0,
                hasLoad:false
            }
        },
        ready(){
            var _this = this;
            var arr = window.location.hash.split('/');
            var doctorId = arr[arr.length-1];
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

                this.$data.doctorId = doctorId;
                this.$data.bookTimeList = bookTimeList;
                setTimeout(function(){
                    this.$data.hasLoad = true;
                }.bind(this),500);
            }.bind(this));
        },
        components:{
            HeaderComponent,LoaderComponent,ToastComponent
        }
    }
</script>