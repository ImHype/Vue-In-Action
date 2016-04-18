<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
    <header-component
            title="首页" index=true
    ></header-component>

    <div v-if="hasLoad" class="bottomSpace">
        <div class="searchBar">
            <div class="searchBox">
                <div class="search_input">
                    <div v-on:click="toShowCate($event)">
                        搜索名医
                    </div>
                </div>
                <div class="search_button">
                    <a href="javascript:void(0)" class="btn" v-on:click="toShowCate">搜索</a>
                </div>
            </div>
        </div>
        <div class="doctorList">
            <div class="doctorListTitle">
                名医推荐
            </div>
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

    <bottom-component
            active=1></bottom-component>
    <toast-component></toast-component>
</template>
<script>
    import HeaderComponent from './header.vue';
    import BottomComponent from './bottom.vue';
    import ToastComponent from './toast.vue';
    import LoaderComponent from './loader.vue';

    let api = require("../api");

    export default{
        data(){
            return{
                doctorList:[],
                keyword:"",
                hasLoad:false
            }
        },
        ready(){
            let _this = this;
            let hash = window.location.hash;
//            console.log(hash);
            if(hash==""){
                location.href="#/"
            }
            api.Index.recommend(function(res){
                this.$data.doctorList = res.data;
                setTimeout(function(){
                    this.$data.hasLoad = true;
                }.bind(this),500);
            }.bind(this));
        },
        methods:{
            toShowCate($event){
                $event.preventDefault();
                location.href="#/searchCategory";
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