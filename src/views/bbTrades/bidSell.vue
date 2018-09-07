<template>
  <div class="bidSell">
    <div class="bk-title">
      <span :class="isTitle == 0?'active':''" @click="titleClick(0)">{{$t("message.om.all")}}</span>
      <span :class="isTitle == -1?'active':''" @click="titleClick(-1)">{{$t("message.om.buyOrders")}}</span>
      <span :class="isTitle == 1?'active':''" @click="titleClick(1)">{{$t("message.om.sellOrders")}}</span>
    </div>
    <div class="rt-view">
      <div class="rt-row rt-title">
        <span>盘口</span>
        <span>价格<strong>{{otcSymbol}}</strong></span>
        <span style="width:25%">数量<strong>{{bbSymbol}}</strong></span>
        <span>累计<strong>{{bbSymbol}}</strong></span>
      </div>
      

       <ul class="rt-list innerbox" :style="{display:isTitle==-1?'none':'block',height:isTitle==1?'312px':'156px'}">
         <happy-scroll color="rgba(63,78,93,1)" size="4" resize>
         
        <li class="rt-row" v-for="(item,index) in depeData.asks">
          <span class="bs-sell">卖{{depeData.asks.length-index}}</span>
          <span>{{item[0]}}</span>
          <span>{{item[1]}}</span>
          <span>{{item[2]}}</span>
        </li>
        </happy-scroll>
      </ul>
      <div class="rt-row cny-price">
        <strong>{{newDealData.transPrice?newDealData.transPrice:'----'}}</strong>
        <span>≈</span>
        <span>{{newDealData.transPrice?(Number(newDealData.transPrice)*otcCnyPrice).toFixed(2):'----'}}</span>
        <span>CNY</span>
      </div>
      <ul class="rt-list innerbox" :style="{display:isTitle==1?'none':'block',height:isTitle==-1?'312px':'156px'}">
         <happy-scroll color="rgba(63,78,93,1)" size="4" resize >
         
        <li class="rt-row"  v-for="(item,index) in depeData.bids">
          <span class="bs-buy">买{{index+1}}</span>
          <span>{{item[0]}}</span>
          <span>{{item[1]}}</span>
          <span>{{item[2]}}</span>
        </li>
        </happy-scroll>
      </ul>
     
    </div>
  </div>
</template>
<script>
import $ from 'jquery';
import Bus from '../../common/js/bus.js'
export default {
  name:'bidSell',
 
  components:{

  },
  props:['otcSymbol','bbSymbol'],
  data(){
    return {
      isTitle:0,//0全部 -1买盘 1卖盘
      depeData:{
        asks:[],//卖盘
        bids:[]//买盘
      },
      newDealData:null,
      otcCnyPrice:0,//人民币单价

    }

  },
  computed:{
     depthUpadate(){
       return this.$store.state.common.depthUpadate;
    },
/*
    otcCnyPrice(){
       return this.$store.state.common.otcCnyPrice;
    },*/
  },
  watch:{
    depthUpadate(v){
      this.updateSell(v);
      this.updateBuy(v);
    },

  },
  mounted(){
    Bus.$on('newDealData',(v) => {
      this.newDealData = v;
    })
    Bus.$on('otcCnyPrice',(v) => {
      this.otcCnyPrice = Number(v);
    })
  },
  methods:{
    //选择
    titleClick(value){
      this.isTitle = value;
      $('.happy-scroll-container').css('height','100%');
    },
    //卖盘
    updateSell(depthData){
      this.depeData.asks = [];
      var rData = depthData.asks;
      if(!rData){rData=[];}
      var resData = [];
      for(var i = 0;i<8;i++){
        resData[i] = ["----","----","----"];
      }
      var i = resData.length;
      for(var j = rData.length;j >= 0;j--){ 
        resData[i--] = rData[j];
      }
      resData.pop();
      var sum = 0; 
      var widthArr = [];
      for (let t = resData.length - 1; t >= 0; t--) {
        widthArr.push(resData[t][1]);
        sum = sum + Math.floor(resData[t][1]*1000)/1000;
        resData[t].push(Math.ceil(sum*1000)/1000); 
      }
      for(var i = 0;i<resData.length;i++){
        var ele = resData[i];
        if(!ele[0]||isNaN(ele[0])){ele[0]="----";}else{ele[0]=Number(ele[0])}//.toFixed(window.bitker.price_precision);}
        if(!ele[1]||isNaN(ele[1])){ele[1]="----";}else{ele[1]=Number(ele[1])}//.toFixed(window.bitker.precision);}
        if(!ele[2]||isNaN(ele[2])){ele[2]="----";}else{ele[2]=Number(ele[2])}//.toFixed(window.bitker.precision);}
        this.depeData.asks.push(ele);
      }
    },
    updateBuy(depthData){
      this.depeData.bids = [];
      var rData = depthData.bids;
      if(!rData){rData=[];} 
      var sum = 0; 
      var widthArr = [];

      var resData = [];
      for(var i = 0;i<8;i++){ 
        resData[i] = ["----","----","----"];
       }
      for(var j = 0;j < resData.length;j++){ 
        resData[j] = rData[j];
        if(resData[j] == undefined){
          resData[j] = ["----","----","----"];
        }
      }
      for (let t = resData.length - 1; t >= 0; t--) {
      //for (let t = resData.length - 1; t >= 50; t--) {
        widthArr.push(resData[t][1]);
        sum = sum + Math.floor(resData[t][1]*1000)/1000;
        resData[t].push(Math.ceil(sum*1000)/1000);
      }
      for(var i = 0;i<resData.length;i++){
        var ele = resData[i];
        if(!ele[0]||isNaN(ele[0])){ele[0]="----";}else{ele[0]=Number(ele[0])}//.toFixed(window.bitker.price_precision);}
        if(!ele[1]||isNaN(ele[1])){ele[1]="----";}else{ele[1]=Number(ele[1])}//.toFixed(window.bitker.precision);}
        if(!ele[2]||isNaN(ele[2])){ele[2]="----";}else{ele[2]=Number(ele[2])}//.toFixed(window.bitker.precision);}
        this.depeData.bids.push(ele);
      }
    
    },

  } 
}
</script>
<style type="text/css" lang="scss" scoped>
$block-color: #161920;

.bidSell{
  letter-spacing:0;
  width: 100%;
  height:100%;
  margin-top:0;
  .bk-title{
    height:60px;
    line-height:60px;
    padding-left:16px;

    background-color:#1C2029;
    border-radius:4px 4px 0 0;
    font-size:14px;
    color:#BAC1DA;
    box-shadow: 0px 2px 4px #000000;
    span{
      display:inline-block;
      margin-right:30px;
      cursor:pointer;
    }
    span.active{
      color:#FFAE36;
    }
  }
  .rt-view{
    height:376px;
    background-color:$block-color;
    padding:0 16px;
    .rt-title{
      color:#555E70;
    }
    .rt-list{
      color:#858CA3;
      height:155px; 
      
    }
    .rt-row{
      height:30px;
      line-height:30px;
      border-bottom:1px solid #1C2029;
      span{
        display:inline-block;
        font-size:12px;
        text-align:left;
      }
      span:nth-of-type(1){
       width:10%;
      }
      span:nth-of-type(2){
       width:28%;
      }
      span:nth-of-type(3){
        width:28%;
      }
     
      span:nth-of-type(4){
        width:28%;
        text-align:right;
      }
      .bs-buy{
        color:#14C285;
      }
      .bs-sell{
        color:#DD3451;
      }
    }
    .rt-row:hover{
      background-color:#1C2029;
    }
    .cny-price{
      span{
        display:inline;
      }
      strong{
        color:#BAC1DA;
      }
    }
    .happy-scroll{
      .happy-scroll-container{
        height:100%;
        .happy-scroll-content{
          border-bottom:0;
        }
      }
    }

    
    
    
  }
}





</style>
<style type="text/css">
.happy-scroll-container{
  width:100%;
  height:100%;
}
</style>