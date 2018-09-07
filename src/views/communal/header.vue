<template>
  <div class="bk-header">
    <div class="bk-ele">
      <div class="bk-left">
        <div class="bk_logo"></div>
        <ul class="bk-tab">
          <span class="bk-inx"><a href="" class="bk-tip">{{$t("message.header.bitker")}}</a></span>
          <span><a href="/trans">{{$t("message.header.otc")}}</a></span>
          <span><a href="">{{$t("message.header.exchange")}}</a></span>
          <span><a href="/static/trade_bkb">{{$t("message.header.mining")}}</a></span>
          <span><a href="/plus_list">{{$t("message.header.voting")}}</a></span>
          <span><a href="/static/get_bkb">{{$t("message.header.bkb")}}</a></span>
          <span><a href="/asset">{{$t("message.header.management")}}</a></span>
        </ul>
      </div>

      <div class="bk-right">
        <div class="en-beat">
          <div class="beat-a" v-show='isLogin'>
            <span class="bk-login"><a href="/login">{{$t("message.header.login")}}</a></span>
            <i></i>
            <span class="bk-register"><a href="/register">{{$t("message.header.register")}}</a></span>
          </div>
          <div class="beat-c" v-show='isAnist'>
            <div class="property">
              <span class="chin" :class="triproperty" v-clickoutside="hideProperty" @click="showProperty">{{$t("message.header.asset")}}</span>
              <ul class="bk_list bk-selbind" v-show="isProperty" >
                <div class="triangle_border_up">
                </div>
                <li><a href="/recharge">{{$t("message.header.despoit")}}</a></li>
                <li><a href="/withdraw">{{$t("message.header.withdraw")}}</a></li>
                <li><a href="/transfer">{{$t("message.header.transfer")}}</a></li>
              </ul>
            </div>
            <div class="property">
              <span class="chin" :class="triangleuser" v-clickoutside="hideUser" @click="showUser" v-text="usertoken">{{usertoken}}</span>
              <ul class="bk_list bk-user" v-show="isUser" >
                <div class="triangle_border_up">
                </div>
                <li><a href="/set_info">{{$t("message.header.security")}}</a></li>
                <li><a href="/auth">{{$t("message.header.verifi")}}</a></li>
                <li><a href="/account_info">{{$t("message.header.paymen")}}</a></li>
                <li><a href="/api">{{$t("message.header.api")}}</a></li>
                <li><a href="/invite">{{$t("message.header.friend")}}</a></li>
                <li><a href="javascript:void(0);" id="login_out">{{$t("message.header.log")}}</a></li>
              </ul>
            </div>
            <!-- <div class="property">
              <span class="chin" :class="trindent" v-clickoutside="hideIndent" @click="showIndent">订单</span>
              <ul class="bk_list bk-indent" v-show="isIndent" >
                <div class="triangle_border_up">
                </div>
                <div class="inbox">
                  <div class="incontent">
                    <div class="inmessage">
                      <a href="javascript:void(0)">
                        <span class="inimg"><img src=""></span>
                        <div>
                          <p class="color1 padding12">币客大人</p>
                          <p class="color2">卖出USDT</p>
                        </div>
                        <div class="inlast">
                          <p class="colorred padding12"><span>待付款</span><span>00:24:57</span></p>
                          <p class="color2"><span>100.78</span><span>CNY</span></p>
                        </div>
                      </a>
                    </div>
                    <div class="inmessage">
                      <a href="javascript:void(0)">
                        <span class="inimg"><img src=""></span>
                        <div>
                          <p class="color1 padding12">币客大人</p>
                          <p class="color2">卖出USDT</p>
                        </div>
                        <div class="inlast">
                          <p class="colorred padding12"><span>待付款</span><span>00:24:57</span></p>
                          <p class="color2"><span>100.78</span><span>CNY</span></p>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div class="innone"></div>
                  <div class="allindent"><a href="">全部订单</a></div>
                </div>
              </ul>
            </div> -->
          </div>
          <div class="beat-b" id="bk-selbind">
            <span class="chin"  :class="{lanbgs:this.lanbg}" v-clickoutside="hideLangcut" @click="showLangcut"><img :src="imgLanu"  height="20" width="30"></span>
            <ul class="bk-selbind" v-show="lanbg">
              <div class="triangle_border_up">
              </div>
              <li @click="transZn">简体中文</li>
              <li @click="transEn">English</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
    
  </div>
</template>
<script>
const clickoutside = {
    // 初始化指令
    bind(el, binding, vnode) {
        function documentHandler(e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false;
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e);
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = documentHandler;
        document.addEventListener('click', documentHandler);
    },
    update() {},
    unbind(el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__);
        delete el.__vueClickOutside__;
    },
};

  export default {
    name:'headers',
    data(){
      return {
        lanbg:false,
        imgLanu:'/static/img/pic_china.png',
        lang:sessionStorage.getItem('LANGUAGE'),
        triangleuser:'downbg',
        triproperty:'downbg',
        trindent:'downbg',
        isProperty:false,
        isUser:false,
        isIndent:false,
        usertoken:'',
        isLogin:true,
        isAnist:false,
      }
    },
    mounted(){
       if(this.lang == "ZH"){
         this.imgLanu = '/static/img/pic_china.png';
       }else if(this.lang == "EN"){
         this.imgLanu = '/static/img/pic_english.png';
       }
       var arrCookie=document.cookie.split('; ');
      console.log(arrCookie)
      for(var i=0;i<arrCookie.length;i++){
          var arr=arrCookie[i].split('=');
          if(arr[0]=='user_token'){
             this.usertoken = arr[1];
             if(this.usertoken){
                this.isLogin = false;
                this.isAnist = true;
             }
          }
      }      
    },
    directives: {clickoutside},
    methods:{
      showProperty(e){
        this.isProperty === false? this.isProperty=true : this.isProperty=false;
        this.triproperty === 'downbg'? this.triproperty='upbg' : this.triproperty='downbg';
      },
      hideProperty(e){
        //this.isProperty === false? this.isProperty=true : this.isProperty=false;
        this.isProperty = false;
        this.triproperty = 'downbg';
      },
      showIndent(e){
        this.isIndent === false? this.isIndent=true : this.isIndent=false;
        this.trindent === 'downbg'? this.trindent='upbg' : this.trindent='downbg';
      },
      hideIndent(e){
        //this.isProperty === false? this.isProperty=true : this.isProperty=false;
        this.isIndent = false;
        this.trindent = 'downbg';
      },
      showUser(e){
        this.isUser === false? this.isUser=true : this.isUser=false;
        this.triangleuser === 'downbg'? this.triangleuser='upbg' : this.triangleuser='downbg';
      },
      hideUser(e){
        //this.isProperty === false? this.isProperty=true : this.isProperty=false;
        this.isUser = false;
        this.triangleuser = 'downbg';
      },
      showLangcut(e){
        this.lanbg === false? this.lanbg=true : this.lanbg=false;
      },
      hideLangcut(e){
        this.lanbg = false;
      },
      transEn(){        
        this.$store.dispatch('englishAction');
        this.imgLanu = '/static/img/pic_english.png';
      },
      transZn(){
        this.imgLanu = '/static/img/pic_china.png';
        this.$store.dispatch('chineseAction');
      },
    }
  }
</script>
<style lang="scss" scoped>
  .bk-header{
    position: absolute;
    top: 0;
    width: 100%;
    min-width:1300px;
    height:82px;
    background:rgba(22,25,32,1);
    z-index:888;
    border-bottom:1px solid #373b4a;
    .bk-ele{
      margin:0 70px;
      display: flex;
      display: -webkit-flex;
      justify-content:space-between;
      .bk-left{
        display: flex;
        display: -webkit-flex;
        .bk_logo{
          width: 128px;
          height: 82px;
          margin-right:38px;
          background:url("../../assets/index/logo.png") no-repeat center;
        }
        .bk-tab{
          height: 82px;
          .bk-inx{            
            border-bottom:2px solid #FFAE36;
          }
          span{
            display: inline-block;
            margin:0 20px;
            height: 80px;
            line-height:82px;
            font-size:14px;
            color: #C7CCDF;
            cursor:pointer;
            a{
              color: #C7CCDF;
            }
            .bk-tip{
              color: #FFAE36;
            }
            a:hover{
              color: #FFAE36;
            }
          }
          
        }
      }
      .bk-right{
        .en-beat{
          display: flex;
          display: -webkit-flex;
          padding-top:32px;
          .beat-a{
            padding-right:30px;
            height: 20px;
            i{
              display: inline-block;
              width: 1px;
              height:10px; 
              background-color:#555E70;
            }
            span{
              display: inline-block;
              height: 20px;
              line-height:22px;
              font-size:13px;
              color: #C7CCDF;
              cursor:pointer;
              a{
                color: #C7CCDF;
              }
              a:hover{
                color: #FFAE36;
              }
            };
            .bk-login{
              padding-right:8px;
            }
            .bk-register{
              padding-left:8px;
            }
          }
          .beat-c{
            height: 20px;
            display: flex;
            display: -webkit-flex;
            .property{
              height: 20px;
              position:relative;
              margin-right:30px;
              .chin{
                display:block;
                padding-right:14px;
                height: 20px;
                line-height:20px;
                cursor:pointer;
                color: #C7CCDF;                                
              }
              .bk-user{
                left: -90%;
              }
              .bk-selbind{
                left: -152%;
              }
              .bk-indent{
                left:-125px;
              }
              .bk_list{
                border-radius:4px;
                background-color:#262C38;
                position:absolute;
                top: 34px;              
                padding:11px 0;
                .triangle_border_up{
                  width:0;
                  height:0;
                  border-width:0 12px 4px;
                  border-style:solid;
                  border-color:transparent transparent #262C38;/*透明 透明  灰*/
                  margin:0 auto;
                  position:relative;
                  top: -15px;
                }
                li{
                  width: 146px;
                  height: 34px;
                  cursor:pointer;
                  font-size:13px;
                  color: #BAC1DA;
                  text-align:center;
                  line-height:34px;
                  a{
                    display: inline-block;
                    width: 146px;
                    height: 34px;
                    color: #BAC1DA;
                  }
                }
                li:hover{
                  background-color:#343A4C;
                }
                .inbox{
                  .incontent{
                    
                    .inmessage{
                      width: 280px;
                      height: 60px;                     
                      a{
                        display: inline-block;
                        height: 60px;
                        display: flex;
                        display: -webkit-flex;
                        margin: 0 17px;
                        .inimg{
                          display: inline-block;
                          width: 36px;
                          height: 36px;
                          margin:14px 11px 10px 0px;
                          border-radius: 50%;
                          background:rgba(234,234,234,0.1);
                          img{
                            display: inline-block;
                            width: 36px;
                            height: 36px;
                            border-radius: 50%;
                            background:rgba(234,234,234,0.1);
                          }
                        }
                        div{
                          p{
                            font-size:12px;
                            line-height:18px;
                          }
                          .color1{
                            color: #BAC1DA;
                          }
                          .color2{
                            color: #858CA3;
                          }
                          .colorblue{
                            color: #14C285;
                          }
                          .colorred{
                            color: #F53B31;
                          }
                          .padding12{
                            padding-top:12px;
                          }
                        }
                        .inlast{
                          flex:1;
                          p{
                            text-align:right;
                          }
                        }
                      }
                    }
                    .inmessage:hover {
                      background-color:#343A4C;
                    }
                  }
                  .allindent{
                    width: 280px;
                    height: 40px;
                    a{
                      display: inline-block;
                      width: 280px;
                      height: 40px;
                      text-align:center;
                      line-height:40px;
                      font-size:13px;
                      color: #BAC1DA;
                    }
                  }
                  .allindent:hover {
                     background-color:#343A4C;
                  }
                }
              }
            }
            .downbg{
              background:url("../../assets/index/pic_daohang_weizhaikai.png") no-repeat right center;
              background-size:6px 3px;
            }
            .upbg{
              background:url("../../assets/index/pic_daohang_zhaikai.png") no-repeat right center;
              background-size:6px 3px;
            }
          }
          .beat-b{
            height: 20px;
            position:relative;
            .chin{
              display:block;
              width: 44px;
              height: 20px;
              cursor:pointer;
              background:url("../../assets/index/pic_daohang_weizhaikai.png") no-repeat 38px center;
              background-size:6px 3px
            }
            .lanbgs{
              background:url("../../assets/index/pic_daohang_zhaikai.png") no-repeat 38px center;
            }
            .bk-selbind{
              border-radius:4px;
              background-color:#262C38;
              position:absolute;
              top: 34px;
              left: -96%;
              padding:11px 0;
              .triangle_border_up{
                width:0;
                height:0;
                border-width:0 12px 4px;
                border-style:solid;
                border-color:transparent transparent #262C38;/*透明 透明  灰*/
                margin:0 auto;
                position:relative;
                top: -15px;
              }
              li{
                width: 120px;
                height: 34px;
                cursor:pointer;
                font-size:13px;
                color: #BAC1DA;
                text-align:center;
                line-height:34px;
              }
              li:hover{
                background-color:#343A4C;
              }
            }
            .iShow{
              display: block;
            }
          }
        }
      }
    }
  }
  
</style>