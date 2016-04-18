<template xmlns:v-on="http://www.w3.org/1999/xhtml">
    <header-component
            title="搜索"
    ></header-component>
    <div v-show="hasLoad">
        <div class="searchBar">
            <div class="searchBox">
                <div class="search_input">
                    <input type="text" placeholder="搜索名医" v-model="keyword">
                </div>
                <div class="search_button">
                    <a href="javascript:void(0)" class="btn" v-on:click="searchDoctor">搜索</a>
                </div>
            </div>
        </div>
        <div class="doctorSearchList">
            <div class="doctorSearchListTitle">
                常见搜索
            </div>
            <div class="doctorSearchs">
                <ul>
                    <li class="clearfix" v-for="search_recommend_item in search_recommend">
                        <div class="doctorSearchTitle">{{search_recommend_item.name}}</div>
                        <div class="doctorSearchContent">
                            <ul>
                                <li v-for=" tag in search_recommend_item.tags">
                                    <a href="#/searchDoctors?keyword={{tag.name}}">{{tag.name}}</a>
                                </li>
                            </ul>
                        </div>
                    </li>
                </ul>
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
    import LoaderComponent from "./loader.vue";
    let api = require("../api");

    export default{
        data(){
            return{
                keyword:"",
                search_recommend:[],
                hasLoad:false
            }
        },
        ready(){
            let _this = this;
            api.Doctor.getSearchRecommend(function(res){
                this.$data.search_recommend = res.data;
                setTimeout(function(){
                    this.$data.hasLoad = true;
                    setTimeout(function(){
                        $(".search_input input")[0].focus();
                    },50)
                }.bind(this),500);
            }.bind(this));
        },
        methods:{
            searchDoctor(){
                location.href="#/searchDoctors?keyword=" + this.$data.keyword;
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