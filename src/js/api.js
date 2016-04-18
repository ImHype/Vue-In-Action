/**
 * Created by junyu-pc on 2016/3/6.
 */
"use strict";


var USER_KEY = "USER_INFO";
var localApp;

var register = function(app){

    app.currentUser = localStorage[USER_KEY];
    if(app.currentUser){
        try{
            app.currentUser = JSON.parse(app.currentUser);
        }catch(e){
            delete localStorage[USER_KEY];
            app.currentUser = null;
        }

    }
    localApp = app;
};

var post = function(url,data,cb){
    $.post({
        type: 'POST',
        url: url ,
        data:data
    }).success(function(res){
        if(res.result_code!=200){
            //localApp.$broadcast("showToast",res.message);
            if(res.message=="未授权,请登录"){
                delete localStorage[USER_KEY];
                localApp.currentUser = null;
                localApp.view="login";
                return;
            }
        }
        cb(res);
    }).error(function(res){
        localApp.$broadcast("showToast","连接失败");
    });
};
var postFormData = function(url,data,cb){
    $.post({
        type: 'POST',
        url: url ,
        processData : false,
        contentType : false,
        data:data
    }).success(function(res){
        //if(res.result_code!=200){
        //    localApp.$broadcast("showToast",res.message);
        //    return;
        //}
        cb(res);
    }).error(function(res){
        localApp.$broadcast("showToast",res.message);
    });
};

var User = {
    login(data,cb){
        post("http://tcm.shaodj.net/user/login",data,function(res){
            cb(res);
            saveLocalUserInfo(data,res);
        });
    },
    loginout(data,cb){
        post("http://tcm.shaodj.net/user/logout",data,cb);
    },
    getUserInfo(cb){
        post("http://tcm.shaodj.net/user/info",localApp.currentUser,cb);
    },
    setUserInfo(data,cb){
        data.append('token',localApp.currentUser.token);
        postFormData("http://tcm.shaodj.net/user/setinfo",data,function(res){

            modifyPhone(data.phone);
            cb(res);
        });
    },
    getCode:function(data,cb){
        post("http://tcm.shaodj.net/user/code",data,cb);
    },
    getRecords(cb){
        post("http://tcm.shaodj.net/user/records",localApp.currentUser,cb);
    },
    getFollowList(cb){
        post("http://tcm.shaodj.net/user/follows",localApp.currentUser,cb);
    },
    getBookList(cb){
        post("http://tcm.shaodj.net/user/books",localApp.currentUser,cb);
    },
    uploadRecord(data,cb){
        data.append("phone",localApp.currentUser.phone);
        data.append("token",localApp.currentUser.token);
        postFormData("http://tcm.shaodj.net/user/record_upload",data,function(res){
            cb(res);
        });
    },
    saveLocalUserInfo:saveLocalUserInfo
};

var Index = {
    recommend(cb){

        post("http://tcm.shaodj.net/doctor/recommend",localApp?localApp.currentUser:{},cb);
    },
    getDoctor(data,cb){
        wrapWithCurrentUser(data);
        post("http://tcm.shaodj.net/doctor/info",data,cb);
    },
    getHospitals(cb){
        post("http://tcm.shaodj.net/doctor/hospitals",{},cb);
    }
};
var Doctor ={
    follow(data,cb){
        wrapWithCurrentUser(data);
        post("http://tcm.shaodj.net/doctor/follow",data,cb);
    },
    unFollow(data,cb){
        wrapWithCurrentUser(data);
        post("http://tcm.shaodj.net/doctor/unfollow",data,cb);
    },
    getSearchRecommend(cb){
        post("http://tcm.shaodj.net/doctor/search_recommend",localApp.currentUser,cb);
    },
    getBookTime(data,cb){
        post("http://tcm.shaodj.net/doctor/worktime",data,cb);
    },
    search(data,cb){
        //wrapWithCurrentUser(data);
        post("http://tcm.shaodj.net/doctor/search",data,cb);
    },
    searchByHospitalId(data,cb){
        post("http://tcm.shaodj.net/doctor/hospitaldoctors",data,cb);
    },
    book(data,cb){
        wrapWithCurrentUser(data);
        post("http://tcm.shaodj.net/doctor/book",data,cb);
    },
    unBook(data,cb){
        wrapWithCurrentUser(data);
        post("http://tcm.shaodj.net/doctor/unbook",data,cb);

    }
};
function wrapWithCurrentUser(data){
    if(!data.phone){
        data.phone = localApp.currentUser.phone;
    }
    if(!data.token){
        data.token = localApp.currentUser.token;
    }
}
function saveLocalUserInfo(data,res){

    if(res.result_code!=200){
        return;
    }
    localApp.currentUser = {
        phone:data.phone,
        token:res.data.token
    };

    localStorage.setItem(USER_KEY,JSON.stringify(localApp.currentUser));
}
function modifyPhone(phone){
    if(typeof phone != 'undefined'){
        localApp.currentUser.phone = phone;
        localStorage.setItem(USER_KEY,JSON.stringify(localApp.currentUser));
    }
}
module.exports =  {
    register,
    post,
    User,
    Index,
    Doctor
};
