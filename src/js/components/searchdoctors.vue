<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
    <header-component
            title="搜索"
    ></header-component>
    <div v-if="hasLoad" class="u-fullHeight">

        <div class="searchBar">
            <div class="searchBox">
                <div class="search_input">
                    <input type="text" placeholder="搜索名医" v-model="keyword">
                </div>
                <div class="search_button">
                    <a href="javascript:void(0)" class="btn " v-on:click="searchDoctor">搜索</a>
                </div>
            </div>
        </div>
        <div class="doctorList u-fullHeight">


            <div class="u-noData" v-if="doctorList.length==0">
                没有搜索结果
            </div>
            <div v-else class="doctorListTitle">
                    名医推荐
            </div>

            <div class="doctors">
                <ul>
                    <li class="clearfix" v-for="item in doctorList.records">
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
                hasLoad:false
            }
        },
        ready(){
            let _this = this;
            let hash = location.hash;
            (/keyword=(\S{1,})/).test(hash);
            let keyword = decodeURI(RegExp.$1);

            api.Doctor.search({
                keyword:keyword
            },function(res){
                this.$data.doctorList = res.data;
                this.$data.keyword = keyword;
                setTimeout(function(){
                    this.$data.hasLoad = true;
                }.bind(this),500);

            }.bind(this));
        },
        methods:{
            searchDoctor(){
                api.Doctor.search({
                    keyword:this.$data.keyword
                },function(res){
                    this.$data.doctorList = res.data;
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