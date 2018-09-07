<template>
  <div class="container">
    <div class="main">
    <div class='bk-row'>
      <!--行情-->
      <div class="trade-view">
        <div class="bk-title">
          <!--24h行情-->
          <p class='tv-bb'><span>{{bbSymbol}}</span>/<span>{{otcSymbol}}</span></p>
          <p class='tv-price'><span>{{hourNewPrice}}</span> ≈ <span>{{hourCnyPrice}}</span>CNY</p>
          <ul class="tv-tfhour">
            <li>
              <p>{{$t("message.om.ChangeH")}}</p>
              <p  :class="rangeNumColor(hourRange)">{{hourRange}}</p>
            </li>
            <li>
              <p>{{$t("message.om.HighH")}}</p>
              <p>{{hourHigh}}</p>
            </li>
            <li>
              <p>{{$t("message.om.LowH")}}</p>
              <p>{{hourLow}}</p>
            </li>
            <li>
              <p>{{$t("message.om.VolH")}}</p>
              <p>{{hourNumber}} <span>{{bbSymbol}}</span></p>
            </li>
          </ul>
        </div>
        <!--K线-->
        <div class="chart">
          <tradeView :symbol='symbol' :symbolId='symbolId' :wsurl='wsurl' v-if="isSymbolIdSuccess"></tradeView>
        </div>
      </div>
      <!--交易对-->
      <div class="trade-pair">
        <tradePair :otcSymbol='otcSymbol' :bbSymbol='bbSymbol' :symbolId='symbolId' :isWsOpen='isWsOpen' @updMktData="updMktData"
         v-if="isSymbolIdSuccess"></tradePair>
       <!-- <div class="bk-title pair-title">
         <div class="select"></div>
         <div class="list"></div>
       </div>
       <div class="pair-view"></div>-->
     </div> 
    </div>
    <div class='bk-row'>
        <!--实时成交-->
       <div class="real-time">
          <realTime :otcSymbol='otcSymbol' :bbSymbol='bbSymbol'></realTime>
         <!-- <div class="bk-title"></div>
         <div class="rt-view second-block"></div> -->
       </div>
       <!--市价交易 现价交易-->
       <div class="price-trade">
          <priceTride :otcSymbol='otcSymbol' :bbSymbol='bbSymbol' :symbolId='symbolId' v-if="isSymbolIdSuccess"></priceTride>
         <!-- <div class="bk-title"></div>
         <div class="pt-view second-block"></div> -->
       </div>
       <!--买盘卖盘-->
       
       <div class="bid-sell">
          <bidSell :otcSymbol='otcSymbol' :bbSymbol='bbSymbol'></bidSell>
         <!-- <div class="bk-title"></div>
         <div class="bs-view second-block"></div> -->
       </div>
    </div>
    <div class='bk-row'>
      <!--币种详情-->
      <div class="coin-info">
        <coinInfo :bbSymbol="bbSymbol"></coinInfo>
        <!-- <div class="bk-title"></div>
        <div class="ci-view third-block"></div> -->
      </div>
      <!--委托 记录-->
      <div class="record-entrust">
        <recordEntrust :otcSymbol='otcSymbol' :bbSymbol='bbSymbol' ></recordEntrust> 
     <!--  <consignRecords></consignRecords> -->
       <!-- <div class="bk-title"></div>
       <div class="re-view third-block"></div>  -->
      </div>
    </div>
      
    </div>
  </div>
</template>

<script type="text/javascript">
import util from '../../common/js/util'
import bkPrompt from '@/components/bkPrompt' 
import tradeView from './tradeView'
import tradePair from './tradePair'
import realTime from './realTime'
import priceTride from './priceTride'
import bidSell from './bidSell'
import coinInfo from './coinInfo'
import recordEntrust from './recordEntrust'
import {getRequest,getJavaRequest} from '@/axios/axios'

export default {
  name:'bbTrades',
   components: {
      bkPrompt,
      tradeView,
      tradePair,
      realTime,
      priceTride,
      bidSell,
      coinInfo,
      recordEntrust
      //consignRecords,
  },
  data(){
    return {
      //wsurl:"ws://localhost:8081/ws/websocket",//ws地址wss://market.bitker.com/websocket
      wsurl:"wss://market.bitker.com/websocket",//ws地址
      ws:null,//
      isWsOpen:false,
      symbol:'',
      symbolId:null,
      otcSymbol:'',
      bbSymbol:'',
      isSymbolIdSuccess:false,

      //24h
      hourHigh:'----',
      hourLow:'----',
      hourNumber:'----',
      hourRange:'----',
      hourNewPrice:'----',
      hourCnyPrice:'----',
    }

  },
  created(){
    this.getUrlSymbol();

  },
  mounted(){

    sessionStorage.removeItem('bb_records'); 
    //localStorage.removeItem('self_select');
    sessionStorage.removeItem('updateTrans');
    sessionStorage.removeItem('lastBar');
    sessionStorage.removeItem('intervalResolution'); 
   
    this.bbOtcLegelAction();
    this.otcAction();
    //this.initWebsocket();
    
    

    
    //window.bitker.dayhData = [];
    //window.bitker.thisSymbol = document.getElementById("currency_name").value; 
    //bitker对象中的参数
    //thisSymbol法币名称  otc_record_id法币id   transSymbol交易币币名称  symbol_id币币id symbol_symbol 'btc/btc' header_list人民币汇率
    //var xx = 'http://101.132.76.80/exchange/eth_btc/';      bb_list_sort bb交易对排序       selfSelect 是否自选 subscribeQuotation订阅交易对

    //获取url
    //var transPair = getParams(window.location.href);
    //交易对信息 
    //window.bitker.thisSymbol = transPair.split('_')[1].toUpperCase() , 
    //window.bitker.transSymbol = transPair.split('_')[0].toUpperCase(); 
    //window.bitker.symbol_symbol = window.bitker.transSymbol+'/'+window.bitker.thisSymbol; 


  },
  
  destroyed(){
     //取消订阅
    let params = { "action":"unsubscribe","data":{"legalId":this.symbolId}};
    this.websocketsend(params);
  },
  methods:{
    //24h数据
    updMktData(data){
      this.hourHigh = data[0]?data[0]:'----';
      this.hourLow = data[1]?data[1]:'----';
      this.hourNumber = data[2]?data[2]:'----';
      this.hourRange = data[3]?data[3]:'----';
      this.hourNewPrice = data[4]?data[4]:'----';
      this.hourCnyPrice = data[5]?data[5]:'----';

    },
    rangeNumColor(value){
      let rangeNum = Number(value.split('%')[0]);
      if(rangeNum!= 0 && rangeNum > 0){
        return "green";
      }else if(rangeNum!= 0 && rangeNum < 0){
        return "red";
      }else {
        return "  ";
      }
    },

     //请求币币
    bbOtcLegelAction(){
      let params = {
       // uid:779,
        api_type:"WEB_API",
        api_method:"AppConsign_OtcBBList"
      }
      this.$store.dispatch('bbOtcLegelAction',params).then((res)=>{
        
      });
    },
    otcAction(){
      let params = {
        //uid:779,
        api_type:"WEB_API",
        api_method:"AppTrans_OtcList"
      }
      this.$store.dispatch('otcAction',params).then((res)=>{
        this.bbOtcLegelAction();
      });
    },




    //获取地址中的交易对
    getUrlSymbol(){
      console.log('---------symbolId-----------------');
      console.log(this.$route.params.symbol);
      let urlSymbol = this.$route.params.symbol;
      this.otcSymbol = urlSymbol.split('_')[1].toUpperCase();
      this.bbSymbol = urlSymbol.split('_')[0].toUpperCase();
      this.symbol = this.bbSymbol + '/' + this.otcSymbol;
      //请求币币
      this.bbSymbolAction();
    },
   
    //请求币币
    bbSymbolAction(){
      let params = {
        api_type:"WEB_API",
        api_method:"AppConsign_OtcBBList",
      }
      //请求
      getJavaRequest(params).then((res) => {
        let {msg,data,status,login_status} = res;
        if(status != 200){
        }else{
         for(let i = 0;i<data.length;i++){
          if(data[i].bb_short_name == this.bbSymbol && data[i].otc_short_name == this.otcSymbol){
            this.symbolId = data[i].bb_id;
          }
         }
          this.initWebsocket();
          this.isSymbolIdSuccess = true;
        }
      });
    },
    
    //初始化websocket
    initWebsocket(){
      window.bitker = {};
      window.bitker.bb_list_sort = 0; 
      window.bitker.bbRecodesSuccess  = false;
      //window.bitker.symbol = this.symbol;
      window.bitker.bbTrades = this;
     
　　　window.ws = new window.WebSocket(this.wsurl); 
　　　window.ws.onopen = this.websocketonopen;
      window.ws.onerror = this.websocketonerror;
      //window.ws.onmessage = this.websocketonmessage; 
      //this.ws.onclose = this.websocketclose;
    },
    websocketonopen() {
　　　console.log("WebSocket连接成功");
      this.isWsOpen = true;
      //this.websocketsend();
      //订阅交易对
      //this.wsSubscribeTradePair();
　　},
　　websocketonerror(e) { //错误
 　    console.log("WebSocket连接发生错误");
　　},
　　/*websocketonmessage(e){ //数据接收 
　　　const redata = JSON.parse(e.data);
　　　console.log(redata.value); 
　　}, */
　　websocketsend(params){//数据发送 
　　　window.ws.send(JSON.stringify(params)); 
　　}, 
    websocketclose(e){ //关闭 
　　　console.log("connection closed (" + e.code + ")"); 
　　},
    //订阅
    wsSubscribeTradePair(){
      let params = { "action":"subscribe","data":{"legalId":this.symbolId}};
      this.websocketsend(params);
    }

  



  }
}
</script>
<style type="text/css" lang="scss" scoped>

$block-color: #161920;


.bk-title{
  height:60px;
  line-height:60px;
  padding-left:16px;
  background-color:#1C2029;
  border-radius:4px 4px 0 0;
  font-size:14px;
  color:#BAC1DA;
  box-shadow: 0px 2px 4px #000000;
}
.second-block{
  height:376px;
  background-color:$block-color;
}
.third-block{
  height:530px;
  background-color:$block-color;
}
.container {
    letter-spacing:0;
    background-color: #0C0D0F;
    letter-spacing: 1px;
    padding: 112px 70px 300px;
    min-width: 1300px;
    .main {
        min-width: 1220px;
        .bk-row{
          display: flex;
          flex-direction: row;
          justify-content:space-between;
          margin-top:14px;
        }
        .bk-row:nth-of-type(1){
          height:600px;
          .trade-view{
            flex:3;
            min-width:1029px;
            margin-right:10px;
            .bk-title{
              display:flex;
              flex-direction:row;
              p{
                display:inline-block;
              }
              .tv-bb{
                flex:1;
                font-size:16px;
                color:#BAC1DA;
                margin-right:25px;
              }
              .tv-price{
                flex:3;
                min-width:248px;
                font-size:13px;
                color:#555E70;
                span:nth-of-type(1){
                  color:#BAC1DA;
                  font-size: 16px;
                }
              }
              .tv-tfhour{
                flex:6;
                display:flex;
                flex-direction:row;
                li{
                  flex:1;
                  display:flex;
                  flex-direction:column;
                  p{
                    flex:1;
                    height: 30px;
                  }
                  P:nth-of-type(1){
                     line-height:38px;
                     font-size:13px;
                     color:#555E70;
                  }
                  P:nth-of-type(2){
                     line-height:20px;
                     font-size:12px;
                  }
                }
              }
              
              
            }
            .chart{
              height:540px;
              padding:0 12px;
              background-color:$block-color;
            }
          }
          .trade-pair{
            flex:1;
            min-width:330px;
            .pair-title{
              height:100px;
            }
            .pair-view{
              height:500px;
              background-color:$block-color;
            }
          }
        }
        .bk-row:nth-of-type(2){
          height:436px;
          .real-time{
            flex:1;
             min-width:330px;
            margin-right:10px;
          }
          .price-trade{
            flex:2;
            min-width:690px;
            margin-right:10px;
          }
          .bid-sell{
            min-width: 330px;
            flex:1;
          }
        }
        .bk-row:nth-of-type(3){
          height:590px;
          .coin-info{
            flex:1;
            min-width: 330px;
            margin-right:10px;
          }
          .record-entrust{
            flex:3;
            min-width:1030px;
          }
        }
    }
    .green{
      color: #14C285;
    }
    .red{
      color: #DD3451;
    }

}



</style>
