<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <header-component
            title="个人中心"
    ></header-component>
    <div v-if="hasLoad" class="bottomSpace">
        <div class="formWrap">
            <div class="formBox">
                <form action="" class="setInfoForm">
                    <div class="head">
                        <img v-bind:src="userinfo.icon" class="head_icon" alt="">
                        <input type="file" class="userHeadUpload" name="icon" v-on:change="changeFile">
                    </div>
                    <div class="formLine">
                        <div>
                            <input type="text" placeholder="姓名：" v-model="userinfo.name" name="name">
                        </div>
                    </div>
                    <div class="formLine">
                        <div>
                            <input type="text" placeholder="地址：" v-model="userinfo.address" name="address">
                        </div>
                    </div>
                    <div class="formLine">
                        <div>
                            <input type="text" placeholder="手机号：" v-model="userinfo.phone" name="phone">
                        </div>
                    </div>
                    <div class="formLine right_btn">
                        <div>
                            <input type="text" placeholder="输入验证码：">
                        </div>
                        <code-component></code-component>

                    </div>
                    <div>
                        <a href="javascript:void(0);" v-on:click="setInfo" class="btn btnPrimary">保存</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <loader-component v-else></loader-component>

    <bottom-component active=3></bottom-component>
    <toast-component></toast-component>
</template>
<style>
    .formWrap .formBox .head{
        position: relative;
    }
    .userHeadUpload{
        width:100%;
        height:100%;
        opacity:0;
        position: absolute;
        left:0;
        top:0;
    }
</style>
<script>
    import HeaderComponent from './header.vue';
    import BottomComponent from './bottom.vue';
    import ToastComponent from "./toast.vue";
    import CodeComponent from './code.vue';
    import LoaderComponent from "./loader.vue";

    let api = require("../api");
    export default{
        data(){
            return{
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
        methods:{
            changeFile(){
                console.log(window.URL.createObjectURL($(".userHeadUpload")[0].files[0]))
                this.$data.userinfo.icon = window.URL.createObjectURL($(".userHeadUpload")[0].files[0]);
            },
            setInfo(){
                let formData = new FormData($(".setInfoForm")[0]);
                let _this = this;
                formData.phone = _this.$data.userinfo.phone;
                if(!$(".setInfoForm").find(".userHeadUpload").val()){

                  formData = new FormData();
                  formData.append("phone",_this.$data.userinfo.phone);
                  formData.append("name",_this.$data.userinfo.name);
                  formData.append("address",_this.$data.userinfo.address);

                }
                api.User.setUserInfo(formData,function(res){
                  _this.$dispatch("showToast",res.message);
                  setTimeout(function(){
                      location.href="#/userCenter";
                  },1500);
                });
            }
        },
        components:{
            HeaderComponent,
            BottomComponent,
            ToastComponent,
            CodeComponent,
            LoaderComponent
        },
        events:{
            showToast(msg){
                this.$broadcast("showToast",msg);
            },
            askPhone(){
                this.$broadcast('getPhone',this.$data.userinfo.phone);
            }
        }
    }
</script>