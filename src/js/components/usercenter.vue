<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <header-component
            title="个人中心" index=true
    ></header-component>
    <div class="userCenter bottomSpace" v-if="hasLoad">
        <div class="formWrap">
            <div class="formBox u-rela">
                <div class="head">
                    <img class="head_icon" v-bind:src="userinfo.icon" alt="">
                </div>
                <div class="formLine">
                    <div>
						<span class="font_1">
							<span>姓名</span>
						</span>:
                        <span class="tx_indent10">{{userinfo.name}}</span>
                    </div>
                </div>
                <div class="formLine">
                    <div>
						<span class="font_1">
							<span>地址</span>
						</span>:
                        <span class="tx_indent10">{{userinfo.address}}</span>
                    </div>
                </div>
                <div class="formLine">
                    <div>
						<span class="font_2">
							<span>手机号</span>
						</span>:
                        <span class="tx_indent10">{{userinfo.phone}}</span>
                    </div>
                </div>
                <a href="#/setInfo" class="editHead"></a>
            </div>
        </div>
        <div class="formWrap">
            <div class="formBox userCenterBtnBox">
                <a href="#/myFollow" class="btn btnSuccess">我的关注</a>
                <a href="#/myBook" class="btn btnWarning">我的预约</a>
                <a href="#/uploadCase" class="btn btnBlue">我的病历</a>
            </div>
        </div>
    </div>
    <loader-component v-else></loader-component>

    <bottom-component active=3></bottom-component>
    <toast-component></toast-component>
</template>
<style>
    .tx_indent10{
        text-indent: 10px;;
    }
</style>
<script>
    import HeaderComponent from './header.vue'
    import BottomComponent from './bottom.vue'
    import LoaderComponent from "./loader.vue";
    let api = require("../api");
    export default{
        data(){
            return{
                msg:'hello vue',
                userinfo:{},
                hasLoad:false
            }
        },
        ready(){
            let _this = this;
            api.User.getUserInfo(function(res){
                this.$data.userinfo = res.data;
                setTimeout(function(){
                    this.$data.hasLoad = true;
                }.bind(this),500);
            }.bind(this));
        },
        components:{
            HeaderComponent, BottomComponent,LoaderComponent
        }
    }
</script>