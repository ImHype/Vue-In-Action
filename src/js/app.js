var Vue = require("vue");
var appVue = require('./app.vue');
var Router = require('director').Router;
var app = new Vue(appVue);
require('./api').register(app);
var router = new Router();
Vue.app = app;


router.on('/',function () {
	app.view = "index";
});
router.on('/searchDoctors',function () {
    app.view = "searchdoctors";
});
router.on("/hospitals",function() {
   app.view = "hospitals";
});
router.on('/searchDoctors/:name',function () {
    app.view = "searchdoctors";
});
router.on('/searchCategory',function () {
    app.view = "searchcategory";
});

router.on('/userCenter',function(){
    if(!app.currentUser){
        app.view="login";
        return;
    }
    app.view="usercenter";
});
router.on('/myBook',function () {
    if(!app.currentUser){
        app.view="login";
        return;
    }
    app.view = "mybook";
});
router.on('/myFollow',function () {
    if(!app.currentUser){
        app.view="login";
        return;
    }
    app.view = "myfollow";
});
router.on('/okBook/:id/:bookIndex',function (id,bookIndex) {
    if(!app.currentUser){
        app.view="login";
        return;
    }
    app._data.id= id;
    app._data.bookIndex= bookIndex;
    app.view = "okbook";
});
router.on('/uploadCase',function () {
    if(!app.currentUser){
        app.view="login";
        return;
    }
    app.view = "uploadcase";
});
router.on('/regist',function(){
    if(!app.currentUser){
        app.view="login";
        return;
    }
    app.view="regist";
});
router.on('/login',function(){
    app.view="login";
});
router.on('/setInfo',function(){
    if(!app.currentUser){
        app.view="login";
        return;
    }
    app.view="setinfo";
});

router.on('/doctor/:id',function(id){
    if(!app.currentUser){
        app.view="login";
        return;
    }
    app.view="doctor";
});
router.on('/worktime/:id',function(id){
    if(!app.currentUser){
        app.view="login";
        return;
    }
    app.view="worktime";
});
router.on('/hospital/doctors',function(id){
    if(!app.currentUser){
        app.view="login";
        return;
    }
    app.view="hospitaldoctors";
});


router.init();