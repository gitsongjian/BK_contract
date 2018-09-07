<template>
   <div class="bk-register">
     <div class="top"></div>
     <div class="regis">
       <div class="bk-regis">
         <div class="bk-slide"><span>注册&nbsp;BITKER</span><span>已有账号，<a href="javascript(0)">马上登录</a></span></div>
         <div class="re-medis">
           <div class="re-ster">
             <span class="re-phone" :class="{adlist:this.isHave}" @click="rePhone()">手机注册</span>
             <span class="re-phone" :class="{adlist:this.isUse}" @click="reMailbox()">邮箱注册</span>
           </div>
           <div class="re-form">
             <!-- 选择国籍 -->
             <div class="re-put">
               <span class="put-left">国籍</span>
               <input type="button" name="guoji"  v-model="nationData" class="put-right" :class="{upbg:this.isChose}"  @click="choseNation()">
               <div class="search-box" v-show="isChose">
                 <input type="text" name="输入国籍" class="se-nation" placeholder="请输入国籍" v-model="searchString">
                 <div class="search">
                   <ul>                 
                    <li v-for="(item,index) in filteredNation" @click="getValue(item.english,item.chinese)"><span>{{item.english}}</span><span>{{item.chinese}}</span></li>
                   </ul>
                 </div>
               </div>
             </div>
             <div class="error-text"></div>
             <!-- 手机号码 -->
             <div class="re-put">
               <span class="put-left">手机</span>
               <input type="number" name="telephone"  placeholder="请输入手机号" class="puts-right" maxlength="11">
             </div>
             <div class="error-text" v-html="phontErr"></div>
           </div>
         </div>
       </div>
     </div>
   </div>
</template>

<script>
  export default {
    name:'register',
    data(){
      return {
        isHave:true,
        isUse:false,
        isChose:false,
        searchString:'',
        nationData:'China(中国)',
        phontErr:'手机号码格式不对',
        nationList:[
          {'english':'China','chinese':'中国'},
          {'english':'USA','chinese':'美国'},
          {'english':'Hong Kong','chinese':'中国香港'},
          {'english':'Taiwan','chinese':'中国台湾'},
          {'english':'Japan','chinese':'日本'},
          {'english':'Hong Kong','chinese':'中国台湾'},
          {'english':'China','chinese':'中国'},
          {'english':'USA','chinese':'美国'},
          {'english':'Hong Kong','chinese':'中国台湾'},
        ]
      }
    },
    computed:{
      filteredNation(){
        let notionListArray = this.nationList;
        let searchArray = this.searchString;
        if(!searchArray){
          return notionListArray;
        }
        searchArray = searchArray.trim().toLowerCase();
        notionListArray = notionListArray.filter(function(items){
          if(items.english.toLowerCase().indexOf(searchArray) !== -1){
            return items;
          }
        })
        return notionListArray;
      }
    },
    methods:{
      rePhone(){
        this.isHave = true;
        this.isUse = false;
      },
      reMailbox(){
        this.isHave = false;
        this.isUse = true;
      },
      choseNation(){
        this.isChose = !this.isChose;
      },
      getValue(valEn,valZh){
        this.nationData = valEn    + "(" +valZh+")";
        this.isChose = false;
        this.isUse = false;
      }
    }
  }
</script>

<style lang="scss" scoped>

  .top{
    width: 100%;
    min-width:1300px;
    height: 82px;
    background-color:#161920;
  }
  .regis{
    min-width:1300px;
    height: 710px;
    margin:0 auto;
    background: url('../../assets/index/bg_dlzc.png') no-repeat center;
    background-size:1920px 1281px;
    overflow:hidden;
    .bk-regis{
      width: 320px;
      padding:38px 60px 36px;
      background-color:#fff;
      margin:60px auto 0;
      box-shadow:0px 4px 10px 0px rgba(56,110,219,0.2);
      .bk-slide{
        display: flex;
        display: -webkit-flex;
        justify-content:space-between;
        span:nth-of-type(1){
          font-size:18px;
          color: #292D38;
          font-weight: normal;
        };
        span:nth-of-type(2){
          font-size:13px;
          color: #858CA3;
          line-height:28px;
          a{
            color: #FFAE36;
          };
          a:hover{
            text-decoration:underline;
          }
        }
      }
      .re-medis{
        padding-top:41px;
        .re-ster{
          .re-phone{
            font-size:13px;
            color: #555E70;
            line-height:18px;
            margin-right:41px;
            cursor:pointer;
            padding-bottom:5px;
          }
          .adlist{
            color: #FFAE36;
            border-bottom:2px solid #FFAE36;
          }
        }
        .re-form{
          padding-top:30px;
          .re-put{
            padding-bottom:11px;
            border-bottom:1px solid #DCE0EC;
            position:relation;
            .put-left{
              color: #555E70;
              font-size:13px;
              padding-right:37px;
              border-right:1px solid #555E70;
            }
            .put-right{
              width: 250px;
              color: #292D38;
              text-align:left;
              font-size:13px;
              padding-left:30px;
              background-color:#fff;
              border:none;
              background:url('../../assets/index/icon_zk_1.png') no-repeat 230px center;
              background-size:11px 6px;
              cursor: pointer;
            }
            .put-right:focus{
              border-color:#fff;
            }
            .upbg{
              background:url('../../assets/index/icon_zk_2.png') no-repeat 230px center;
            }
            .search-box{
              position:absolute;
              width: 320px;
              top: 30px;
              background-color:#fff;
              box-shadow:0px 4px 10px 0px rgba(56,110,219,0.2);
              z-index:888;
              padding-top:10px;
              padding-bottom:10px;
              .search{
                width: 260px;
                padding-top:10px;
                margin:0 auto; 
                max-height:150px;
                overflow:hidden;
                li{
                  display: flex;
                  display:-webkit-flex;
                  justify-content: space-between;
                  height: 32px;
                  line-height:32px;
                  background-color:#fff;
                  cursor:pointer;
                  span{
                    color: #555E70;
                    font-size:13px;
                  }
                } 
                li:hover{
                  background-color:#F3F5F9;
                }                             
              }
              .se-nation{
                display: block;
                margin:0 auto;
                width: 280px;
                height: 30px;
                box-sizing: border-box;
                border:1px solid #DCE0EC;
                font-size:13px;
                color: #BAC1DA;
                text-indent:10px;
                letter-spacing: 1px;
              }
            }
            .puts-right{
              width: 155px;
              color: #BAC1DA;
              text-align:left;
              font-size:13px;
              padding-left:30px;
              background-color:#fff;
              border:none;
            }
          }
          .error-text{
            height: 24px;
            font-size:12px;
            color: #DD3451;
            line-height:20px;
          }
        }
      }
    }
  }

  
</style>