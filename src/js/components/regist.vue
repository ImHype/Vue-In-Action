<template xmlns:v-on="http://www.w3.org/1999/xhtml">
	<!--<div class="topBar">-->
		<!--<h1><a href="javascript:history.back(-1);" class="backHistory"><</a>个人中心</h1>-->
	<!--</div>-->
    <header-component
        title="个人中心"
    ></header-component>
	<div>
		<div class="formWrap">
			<div class="formBox">
				<div class="head">
					<img src="/image/userHead.png" alt="">
				</div>
				<div class="formLine">
					<div>
						<input type="text" placeholder="姓名：">
					</div>
				</div>
				<div class="formLine">
					<div>
						<input type="text" placeholder="地址：">
					</div>
				</div>
				<div class="formLine">
					<div>
						<input type="text" placeholder="手机号：" v-model="phone">
					</div>
				</div>
				<div class="formLine right_btn">
					<div>
						<input type="text" placeholder="输入验证码：">
					</div>

                    <code-component></code-component>
				</div>
				<div>
					<a href="javascript:void(0)" class="btn btnPrimary">保存</a>
				</div>
			</div>
		</div>
	</div>
    <bottom-component></bottom-component>
    <toast-component></toast-component>
</template>
<style>
    .sendBtn{
        width:87px;
        text-align: center;
    }
</style>
<script>
    import HeaderComponent from './header.vue';
    import BottomComponent from './bottom.vue';
    import CodeComponent from './code.vue';
    import ToastComponent from "./toast.vue";
    export default{
        data(){
            return{
                title:'个人中心'
            }
        },
        components:{
            HeaderComponent,
            BottomComponent,
            CodeComponent,
            ToastComponent
        },
        events:{
            showToast(msg){
                this.$broadcast("showToast",msg);
            },
            askPhone(){
                this.$broadcast('getPhone',this.$data.phone);
            }
        }

    }
</script>