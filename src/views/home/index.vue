<template>
  <div>    
      <el-carousel :interval="3000" arrow="never" height="650px">
        <el-carousel-item v-for="(item,index) in bannerData" :key="index" >
          <h3><a :href="item.banner_link"><img :src="item.banner_img"></a></h3> 
        </el-carousel-item>
      </el-carousel>
      <div class="new-notice">
        <div class="notice-cons">
          <span>[{{$t("message.home.announcement")}}]</span>
          <div class="affiche" id="trans0">
            <ul id="stans1" >              
              <li v-for="item in noticeData"><a  :href="item.link_url"> {{item.content}}</a></li>              
            </ul>
          </div>
        </div>
      </div>

      <div class="new-notice bb-trades">
        
      </div>

      <div class="pay-logo">
        <h3 class="bitker-txt">{{$t("message.home.bitkerone")}}</h3>
        <p class="lis-txt">{{$t("message.home.concise")}}</p>
      </div>
      <ul class="l-tab">
        <li>
          <div class="tx_01"></div>
          <div class="b-text">
            <h4>{{$t("message.home.professional")}}</h4>
            <p>{{$t("message.home.platform")}}</p>
          </div>
        </li>
        <li>
          <div class="tx_02"></div>
          <div class="b-text">
            <h4>{{$t("message.home.safety")}}</h4>
            <p>{{$t("message.home.multiple")}}</p>
          </div>
        </li>
        <li>
          <div class="tx_03"></div>
          <div class="b-text">
            <h4>{{$t("message.home.community")}}</h4>
            <p>{{$t("message.home.participate")}}</p>
          </div>
        </li>
        <li>
          <div class="tx_04"></div>
          <div class="b-text">
            <h4>{{$t("message.home.transaction")}}</h4>
            <p>{{$t("message.home.exchange")}}</p>
          </div>
        </li>
        <li>
          <div class="tx_05"></div>
          <div class="b-text">
            <h4>{{$t("message.home.credits")}}</h4>
            <p>{{$t("message.home.period")}}</p>
          </div>
        </li>
        <li>
          <div class="tx_06"></div>
          <div class="b-text">
            <h4>{{$t("message.home.institution")}}</h4>
            <p>{{$t("message.home.management")}}</p>
          </div>
        </li>
      </ul>
      <div class="i-mar">
        <div class="i-bg"></div>
        <div class="app-down">
          <h4>{{$t("message.home.download")}}</h4>
          <p class="app-txt">{{$t("message.home.deal")}}</p>
          <div class="appcode">
            <a href="">
              <div class="android-bg"></div>
              <p>{{$t("message.home.android")}}</p>
            </a>
            <a href="">
              <div class="ipone-bg"></div>
              <p>{{$t("message.home.ios")}}</p>
            </a>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import {getRequest,getJavaRequest} from '@/axios/axios';

   export default {
    name: 'Index',
    data (){
      return{
        bannerData:[],
        noticeData:[],
      }
    },
    mounted(){           
      this.getNotice();
    },
    updated(){
      this.scrollTitle(2500,50);
    },
    methods:{
      getNotice:function(){
        let params = {
          api_type:"WEB_API",
          api_method:"AppTrans_Banner",
          site_type:'pc'
        };
        getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        if(status != 200){
        }else{
          console.log('data',data);
          this.bannerData = data.banner;
          this.noticeData = data.notice;
        }
      });
      },
      scrollTitle:function(changeSpeed,scrollSpeed){
          let con = document.getElementById("trans0");
          let list = document.getElementById("stans1");
           list.innerHTML += list.innerHTML;
          let items = list.getElementsByTagName("li");
          let timer_1 = setInterval(_scrollTitle,changeSpeed);
          let heightAll =0;
          for(var i=0;i<items.length;i++){
           heightAll += items[i].offsetHeight;
          }
          let heightHalf = parseInt(heightAll/2);
          con.onmouseover = function(){
            if(timer_1){
              clearInterval(timer_1);
              timer_1=null;
            }
          }
          con.onmouseout = function(){
            if(timer_1){
              clearInterval(timer_1);
              timer_1=null;
            }
            timer_1 = setInterval(_scrollTitle,changeSpeed);
          }
          function _scrollTitle(){
            var timer;
            var num = 30;
            timer = setInterval(scrollTop,scrollSpeed);
            function scrollTop(){
              if(con.scrollTop<heightHalf){
                con.scrollTop += 3;
                num -= 3;
              }else{
                con.scrollTop = 0;
              }
              if(num <= 0){
              clearInterval(timer);
              }
            }
          }
        }
    }
   }
</script>

<style lang="scss">
  .el-carousel__indicators{
    bottom: 10px;
  }
  .el-carousel__button{
    width: 60px;
    height: 4px;
    border-radius: 2px;
    opacity: 0.2;
    background-color: #C7CCDF;
  }
  .el-carousel__item h3 {
    width: 100%;
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 560px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #000000;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #000000;
  }
  .new-notice{
    width: 100%;
    height: 60px;
    background-color: #292D38;
    .notice-cons{
      width: 330px;
      margin:0 auto;
      height: 60px;
      display: flex;
      display: -webkit-flex;
      line-height:60px;
      text-align:left;
      span{
        display: inline-block;
        font-size:13px;
        color: #FFAE36;
        padding-right:20px;
      }
      .affiche{
        overflow: hidden;
        height: 30px;
        margin-top: 15px;        
        li{
          text-align:center;          
          height: 30px;
          line-height:30px;
          a{
            color: #BAC1DA;
            font-size:13px;
          }
          a:hover{ 
            text-decoration:underline
          }
        }
      }
    }
  }
  .bb-trades{
     width: 100%;
     background-color:#fff;
     margin-top:70px;
  }
  .pay-logo{
    height: 104px;
    padding-top:104px;
    padding-bottom:60px;
    margin:0 auto;
    .bitker-txt{
      font-size:24px;
      color: #555E70;
      padding-top:19px;
      text-align:center;
      padding-bottom:8px;
    }
    .lis-txt{
       font-size:16px;
       color: #858CA3;
       text-align:center;
    }
  }
  .l-tab{
    width: 1230px;
    flex-wrap:wrap;
    margin:0 auto;
    display: flex;
    display: -webkit-flex;
    li{
      width: 360px;
      box-shadow: 0px 2px 8px 0px #D6E1F5;
      margin-left:50px;
      margin-bottom:50px;
      border-radius:6px;
      display: flex;
      display: -webkit-flex;
      
      .tx_01{
        width: 100px;
        background:url("../../assets/index/icon_tx_01.png") no-repeat center center;
      }
      .tx_02{
        width: 100px;
        background:url("../../assets/index/icon_tx_03.png") no-repeat center center;
      }
      .tx_03{
        width: 100px;
        background:url("../../assets/index/icon_tx_05.png") no-repeat center center;
      }
      .tx_04{
        width: 100px;
        background:url("../../assets/index/icon_tx_07.png") no-repeat center center;
      }
      .tx_05{
        width: 100px;
        background:url("../../assets/index/icon_tx_08.png") no-repeat center center;
      }
      .tx_06{
        width: 100px;
        background:url("../../assets/index/icon_tx_09.png") no-repeat center center;
      }
      .b-text{
        width: 230px;
        margin-bottom:36px;
        h4{
         font-size:18px;
         color: #555E70;
         padding-top:36px;
         padding-bottom:9px;
         text-align:left;
         font-weight:normal;
        }
        p{
          font-size:13px;
          color: #858CA3;
          line-height:18px;
          text-align:left;
        }
      }
    }
  }
  .i-mar{
    width:1300px;
    margin:0 auto;
    padding-top:50px;
    padding-bottom:60px;
    display: flex;
    display: -webkit-flex;
    .i-bg{
      width: 710px;
      height: 389px;
      background:url(../../assets/index/pic_ipone.png) center center no-repeat;
    }
    .app-down{
      padding-top:70px;
      h4{
        font-size:24px;
        color: #555E70;
        text-align:left;
      }
      .app-txt{
        font-size:16px;
        color: #555E70;
        padding-top:8px;
        text-align:left;
        padding-bottom:30px;
      }
      .appcode{
        width: 320px;
        height: 150px;
        display: flex;
        display: -webkit-flex;
        justify-content:space-between;
        a{
          display: inline-block;
          width: 150px;
          height: 150px;
          box-shadow:0px 2px 8px 0px rgba(214,225,245,1);
          border-radius:10px;
          div{
            width: 150px;
            height: 100px;
          }
          .android-bg{
            background:url("../../assets/index/icon_android.png") no-repeat center center;
          }
          .ipone-bg{
            background:url("../../assets/index/icon_ios.png") no-repeat center center;
          }
          p{
            font-size:14px;
            color: #555E70;
            text-align:center;
          }
        }
      }
    }
  }
</style>