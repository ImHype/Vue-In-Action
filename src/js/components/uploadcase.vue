<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
    <header-component
            title="我的病历"
    ></header-component>
    <loader-component v-if="!hasLoad" style="height:100%;"></loader-component>

    <div class="uploadCase" >
        <div v-if="records.length==0 && hasLoad == true" class="u-noData">
            您还没有病历上传哦
        </div>
        <div class="formWrap">
            <ul class="caseList clearfix {{ hasLoad ? 'u-show':'u-hide'}}">
                <li v-for="record in records">
                    <img v-bind:src="record.image" alt="">
                </li>
            </ul>
        </div>
        <div class="formWrap u-fixed FixedBottomBox">
            <div class="formBox u-noBg picWrap">
                <a href="" class="btn btnPrimary">{{process==1 ? "上传病历" : "上传中..."}}</a>
                <input type="file" name="recordPic" class="recordPic" v-on:change="recordPicChange">
            </div>
        </div>

    </div>

    <!--<bottom-component></bottom-component>-->
    <toast-component></toast-component>
</template>
<style>
    .picWrap{
        position: relative;
    }
    .picWrap .recordPic{
        width: 100%;
        height: 100%;
        opacity: 0;
        position: absolute;
        left: 0;
        top: 0;
    }

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
                records :[],
                hasLoad :false,
                process: 1
            }
        },
        ready(){

            this.getPic();
        },
        methods:{
            getPic(){
                let _this = this;
                this.$data.hasLoad = false;
                api.User.getRecords(function(res){
                    this.$data.records = res.data;
                    var count = 0;
                    var limit = this.$data.records.length;
                    var imageTemp = [];
                    for (var i = 0; i < limit; i++) {
                        imageTemp.push(new Image());
                        imageTemp[i].src = this.$data.records[i].image;
                        imageTemp[i].onload =function(){
                            count++;
                            if(count == limit){
                                _this.imageAbsolute();
                            }
                        };
                    }
                }.bind(this));
            },
            recordPicChange(){

                if(!$(".recordPic")[0].files[0]) return;
                if(this.$data.process==0){
                    this.$broadcast("showToast","等待当前病历上传完毕");
                    return;
                }
                this.$data.process = 0;
                var formData = new FormData();
                formData.append("image",$(".recordPic")[0].files[0]);
                api.User.uploadRecord(formData,function(res){

                    if(res.result_code == 200){
                        this.$broadcast("showToast","上传成功");
                        this.getPic();

                    } else {
                        this.$broadcast("showToast","上传失败");
                    }
                    this.$data.process = 1;
                }.bind(this));
            },
            imageAbsolute(){
                var records = this.$data.records;
                var recordElem = $(".caseList > li");
                var record = null;
                var prevRecord = null;

                for (var i = 2; i < records.length; i++) {
                    record = recordElem.eq(i);
                    prevRecord = recordElem.eq(i-2);
                    record.css("top",prevRecord.height() + parseFloat(prevRecord.css("top")) + 5+"px");
                }
                var lastHeight = parseFloat(recordElem.eq(recordElem.length-1).css("top") ) + recordElem.eq(recordElem.length-1).height();
                var lastTwoHeight = parseFloat(recordElem.eq(recordElem.length-2).css("top") ) + recordElem.eq(recordElem.length-2).height();
                var height = (lastHeight > lastTwoHeight) ? lastHeight: lastTwoHeight + 5;
                this.$data.hasLoad = true;
                $(".caseList").height(height );
                $(".uploadCase").height(height);

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