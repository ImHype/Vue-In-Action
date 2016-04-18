<template>
  <component :is="view">
  </component>
</template>
<script>
    import regist from './components/regist.vue';
    import login from './components/login.vue';
    import index from './components/index.vue';
    import usercenter from './components/usercenter.vue';
    import setinfo from './components/setInfo.vue';
    import doctor from './components/doctor.vue';
    import myfollow from './components/myfollow.vue';
    import searchdoctors from './components/searchdoctors.vue';
    import searchcategory from './components/searchcategory.vue';
    import mybook from './components/mybook.vue';
    import okbook from './components/okbook.vue';
    import uploadcase from './components/uploadcase.vue';
    import worktime from './components/worktime.vue';
    import hospitals from './components/hospitals.vue';
    import hospitaldoctors from './components/hospitaldoctors.vue';

	module.exports = {
		el:'#app',
		data:function() {
			return {
				view: 'index'
			}
		},
        components: {
            regist,
            login,
            index,
            usercenter,
            setinfo,
            doctor,
            myfollow ,
            searchdoctors,
            searchcategory,
            mybook,
            okbook,
            uploadcase,
            worktime,
            hospitals,
            hospitaldoctors
        }
	}

</script>