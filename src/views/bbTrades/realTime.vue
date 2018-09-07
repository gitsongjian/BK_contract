<template>
  <div class="realTime">
    <div class="bk-title">
      {{$t("message.om.marketTrades")}}
    </div>
    <div class="rt-view">
      <div class="rt-row rt-title">
        <span>{{$t("message.om.bbData")}}</span>
        <span>{{$t("message.om.Type")}}</span>
        <span style="width:28%">{{$t("message.om.bbPrice")}}<strong>{{otcSymbol}}</strong></span>
        <span>{{$t("message.om.bbAmount")}}<strong>{{bbSymbol}}</strong></span>
      </div>
      
      <ul class="rt-list innerbox">
         <happy-scroll color="rgba(63,78,93,1)" size="4" resize > 
         <li class="rt-row" v-for="item in realTimeData">
          <span>{{transTime(item.finishTime)}}</span>
          <span :style="{color:item.transDirection==1?'#14C285':'#DD3451'}">{{transDirectionFormatter(item.transDirection)}}</span>
          <span>{{item.transPrice}}</span>
          <span>{{item.transNumber}}</span>
        </li>
        </happy-scroll>
      </ul>
        
    </div>
  </div>
</template>
<script>
import Bus from '../../common/js/bus.js'
export default {
  name:'realTime',
 
  components:{

  },
  props:['otcSymbol','bbSymbol'],
  data(){
    return {
      realTimeData:[],
      //–>1：买入  2：卖出
      transDirections:[
        {
          value:1,
          label:this.$t('message.om.Buy')
        },
        {
          value:2,
          label:this.$t('message.om.Sell')
        }
      ],

    }

  },
  computed:{
 //状态
    transUpadate(){
       return this.$store.state.common.transUpadate;
    },
  },
  watch:{
    transUpadate(v){

      //if(this.transUpadate != v){
       // this.nextTick(function () {
      this.makeDargain(v);
       Bus.$emit('newDealData',v);
       // })
        //this.transUpadate = v;
      //}

    }
  },
  mounted(){

  },
  methods:{

      //交易方向
    transDirectionFormatter(cellValue){
      if(!cellValue){return '--';}
      for(let item of this.transDirections){
        if(item.value == cellValue){
          return item.label;
        }
      }
    },
    //渲染数据
    makeDargain(v){
      this.realTimeData.push(v);
      this.realTimeData.sort(function(x,y){
        return y.matchSequence - x.matchSequence;  
        //return y.finishTime - x.finishTime;  
      }); 
    },
    //时间戳转换
    transTime(fmt){
      var _time = new Date(fmt);
      var hours = parseInt(_time.getHours())>9?_time.getHours():'0'+ _time.getHours();
      var minute = parseInt(_time.getMinutes())>9?_time.getMinutes():'0'+ _time.getMinutes();
      var second = parseInt(_time.getSeconds())>9?_time.getSeconds():'0'+ _time.getSeconds();
      return hours + ':' + minute + ':' + second;
    }
 

  }
}
</script>
<style type="text/css" lang="scss" scoped>
$block-color: #161920;

.realTime{
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
      height:342px; 
      padding-right: 10px;
      
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
       width:26%;
      }
      span:nth-of-type(2){
       width:16%;
      }
      span:nth-of-type(3){
        width:30%;
      }
     
      span:nth-of-type(4){
        width:23%;
        text-align:right;
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

.happy-scroll-container{
  width:100%;
  height:100%;
}



</style>