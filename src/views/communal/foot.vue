<template>
  <div class="bk-foot">
    <div class="bk-content">
      <div class="foot-left">
        <div class="bitkerlogo"></div>
        <p class="bktext">{{$t("message.footer.blockchain")}}</p>
        <ul class="bk-share">                    
            <li class="und2">
               <a href="#" class="bank_a"></a>
               <div class="msi2"></div>
            </li>
            <li class="und5">
              <a href="https://t.me/bitker_cn" class="bank_a" target="_blank"></a>
              <div class="msi5 msi"><a href="https://t.me/bitker_cn"  target="_blank" class="linksun">@bitker_cn</a></div>
            </li>
            <li class="und6">
               <a href="#" class="bank_a"></a>
               <div class="msi6"></div>
            </li>
            <li class="und1">
               <a href="https://weibo.com/p/1006066534479047/home?from=page_100606&mod=TAB&is_all=1#place" class="bank_a"  target="_blank"></a>
               <div class="msi1 msi">
                  <a href="https://weibo.com/p/1006066534479047/home?from=page_100606&mod=TAB&is_all=1#place"  target="_blank" class="linksun">币客Bitker</a>
                </div>
            </li>
            
            <li class="und3">
               <a href="https://twitter.com/Bitker1" class="bank_a"  target="_blank"></a>
               <div class="msi3 msi"><a href="https://twitter.com/Bitker1"  target="_blank" class="linksun">@Bitker1</a></div>
            </li>
            <li class="und4">
              <a href="https://www.facebook.com/bitkercom" class="bank_a"  target="_blank"></a>
              <div class="msi4 msi"><a href="https://www.facebook.com/bitkercom"  target="_blank" class="linksun">@bitkercom</a></div>
            </li>              
          </ul>
      </div>
      <div class="foot-right">
        <ul class="foot-nav">
          <li class="top-tip">{{$t("message.footer.about")}}</li>
          <li><a href="/static/info" target="_blank">{{$t("message.footer.bitker")}}</a></li>
          <li><a href="/static/get_bkb" target="_blank">{{$t("message.footer.bkb")}}</a></li>
          <li><a href="/static/get_bkb" target="_blank">{{$t("message.footer.alliance")}}</a></li>
        </ul>
        <ul class="foot-nav">
          <li class="top-tip">{{$t("message.footer.services")}}</li>
          <li><a href="/notice" target="_blank">{{$t("message.footer.news")}}</a></li>
          <li><a href="https://github.com/bitkerapi/API_Docs/wiki/REST-API-Reference" target="_blank">{{$t("message.footer.api")}}</a></li>
        </ul>
        <ul class="foot-nav">
          <li class="top-tip">{{$t("message.footer.fee")}}</li>
          <li><a href="/register_contract" target="_blank">{{$t("message.footer.user")}}</a></li>
          <li><a href="/privacy" target="_blank">{{$t("message.footer.policy")}}</a></li>
          <li><a href="/limit_rules" target="_blank">{{$t("message.footer.otc")}}</a></li>
          <li><a href="https://www.bitker.com/notice_desc/id/1/type/1" target="_blank">{{$t("message.footer.fees")}}</a></li>
        </ul>
        <ul class="foot-nav">
          <li class="top-tip">{{$t("message.footer.contact")}}</li>
          <li><a href="javascript:void(0)" target="_blank">{{$t("message.footer.business")}}</a></li>
          <li><a href="javascript:void(0)" target="_blank">{{$t("message.footer.wechat")}}</a></li>
          <li><a href="javascript:void(0)" target="_blank">{{$t("message.footer.customer")}}</a></li>
        </ul>
      </div>
    </div>
    <div>
      <ul class="blogroll">
        <li>{{$t("message.footer.link")}}</li>
        <li><a href="https://www.jinse.com" target="blank">{{$t("message.footer.jinse")}}</a></li>
        <li><a href="https://www.hbg.com/zh-cn" target="blank">{{$t("message.footer.huobi")}}</a></li>
        <li><a href="https://www.okex.com" target="blank">{{$t("message.footer.okex")}}</a></li>
        <li><a href="http://www.8btc.com" target="blank">{{$t("message.footer.btc")}}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
    name:'footers',
  }
</script>

<style lang="scss" scoped>
  .bk-foot{
     width: 100%;
     height: 290px;
     min-width: 1400px;
     background:rgba(25,28,37,1);
     overflow:hidden;
     .bk-content{
        margin: 50px 70px 0;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        border-bottom:1px solid #292D38;
        padding-bottom:23px;
        .foot-left{
          width: 38.5%;
          .bitkerlogo{
            width: 128px;
            height: 26px;
            background:url("../../assets/foot/icon_logo2.png") no-repeat center center;
            background-size:128px 26px;
          }
          .bktext{
            color: #555E70;
            font-size:11px;
            padding-top:9px;
            padding-bottom:23px;
          }
          .bk-share{
            width:229px;
            display: flex;
            display: -webkit-flex;
            justify-content: space-between;
            height: 23px;
            .und1{
              background: url(../../assets/foot/weibo.png) no-repeat center center;
            }
            .und1:hover .msi1{
              display: block;
            }
            .und1:hover {
              background: url(../../assets/foot/weibo2.png) no-repeat center center;
            }
            .und2{
              background: url(../../assets/foot/weixin.png) no-repeat center center;
            }
            .und2:hover .msi2{
              display: block;
            }
            .und2:hover {
              background: url(../../assets/foot/weixin2.png) no-repeat center center;
            }
            .und3{
              background: url(../../assets/foot/twitter.png) no-repeat center center;
            }
            .und3:hover .msi3{
              display: block;
            }
            .und3:hover {
              background: url(../../assets/foot/twitter2.png) no-repeat center center;
            }
            .und4{
              background: url(../../assets/foot/facebook.png) no-repeat center center;
            }
            .und4:hover .msi4{
              display: block;
            }
            .und4:hover {
              background: url(../../assets/foot/facebook2.png) no-repeat center center;
            }
            .und5{
              background: url(../../assets/foot/telegram.png) no-repeat center center;
            }
            .und5:hover .msi5{
              display: block;
            }
            .und5:hover{
              background: url(../../assets/foot/telegram2.png) no-repeat center center;
            }
            .und6{
              background: url(../../assets/foot/weixin_xms.png) no-repeat center center;
            }
            .und6:hover .msi6{
              display: block;
            }
            .und6:hover{
              background: url(../../assets/foot/weixin_xms2.png) no-repeat center center;
            }

            
            li{
              cursor: pointer;
              width: 23px;
              height: 23px;
              position: relative;
              .bank_a{
                display: inline-block;
                width: 22px;
                height: 22px;
              }
              .msi1{
                display: none;
                position: absolute;
                height: 29px;
                width: 90px; 
                top: -29px;
                left: -33px;
                background: url(../../assets/foot/pic_qp_lxwm.png) no-repeat center center;
                z-index: 500;
                border-radius: 3px;
                .linksun{
                  display: inline-block;
                  width: 80px;
                  text-align: center;
                  height: 29px;
                  line-height: 29px;
                  color: #848893;
                }
                .alink{
                  color: #e1e5ef;
                }
              }
              .msi2{
                display: none;
                position: absolute;
                height: 120px;
                width: 120px; 
                top: -124px;
                left: -44px;
                z-index: 500;
                border-radius: 3px;
                background: url(../../assets/foot/pic_un_ewm.png) no-repeat center center #252935;
              }
              .msi3{
                display: none;
                position: absolute;
                height: 29px;
                width: 90px; 
                top: -29px;
                left: -33px;
                z-index: 500;
                background: url(../../assets/foot/pic_qp_lxwm.png) no-repeat center center;
                border-radius: 3px;
                .linksun{
                  display: inline-block;
                  width: 90px;
                  text-align: center;
                  height: 29px;
                  line-height: 29px;
                  color: #BAC1DA;
                }
                .alink{
                  color: #e1e5ef;
                }
              }
              .msi4{
                display: none;
                position: absolute;
                height: 29px;
                width: 90px; 
                top: -31px;
                left: -33px;
                z-index: 500;
                background: url(../../assets/foot/pic_qp_lxwm.png) no-repeat center center;
                border-radius: 3px;
                .linksun{
                  display: inline-block;
                  width: 90px;
                  text-align: center;
                  height: 29px;
                  line-height: 29px;
                  color: #848893;
                }
                .alink{
                  color: #e1e5ef;
                }
              }
              .msi5{
                display: none;
                position: absolute;
                height: 29px;
                width: 90px; 
                top: -29px;
                left: -31px;               
                background: url(../../assets/foot/pic_qp_lxwm.png) no-repeat center center;
                z-index: 500;
                border-radius: 3px;
                .linksun{
                  display: inline-block;
                  width: 90px;
                  text-align: center;
                  height: 29px;
                  line-height: 29px;
                  color: #848893;
                }
                .alink{
                  color: #e1e5ef;
                }
              }
              .msi6{
                display: none;
                position: absolute;
                height: 120px;
                width: 120px; 
                top: -124px;
                left: -46px;
                z-index: 500;
                border-radius: 3px;
                background: url(../../assets/foot/pic_ewm2.png) no-repeat center center #252935;
              }

            }
          }
        }
        .foot-right{
          flex:1;
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          .foot-nav{
            .top-tip{
              padding-bottom:16px;
              font-size:14px;
              color: #555E70;
            }
            li{
              a{
                line-height:30px;
                color: #C7CCDF;
                font-size:13px;
              }
              a:hover {
                color: #FFAE36;
              }
            }
          }
        }
     }
     .blogroll{
       width:335px;
       margin-top:20px;
       margin-left:80px;
       display: flex;
       display: -webkit-flex;
       justify-content: space-between;
       li{
        font-size:12px;
        color: #555E70;
        a{
          font-size:12px;
          color: #555E70;
        }
        a:hover {
          color: #FFAE36;
        }
       } 
     }
  }
</style>