<template>
  <div class="tradeView">
    <div id="tv_chart_container"></div>
  </div>
</template>
<script>
import Datafeeds from '../../common/js/tradeView/datafeed.js'
import tradeviewPageUtil from '../../common/js/tradeView/tradeviewPageUtil.js';
export default {
  name:'tradeView',
  components:{
  },
  props:['symbol','symbolId','wsurl'],
  data(){
    return {
      resolution:15,
    }
  },
  computed:{
  },
  mounted(){
    this.tradingViewGetReady();
  },
  methods:{
    // tradeView准备
    tradingViewGetReady() {
      let _this = this;
      let params = {
        symbol:this.symbol,
        symbolId:this.symbolId,
        resolution: this.resolution,
        Datafeeds,
        serverUrl:this.wsurl , 
      }
      TradingView.onready((() => {
        window.widget = new TradingView.widget(tradeviewPageUtil.datafeedConfig(params));
        widget.onChartReady(() => {
          tradeviewPageUtil.chartReady(widget,_this.resolution);
          //widget.chart().createStudy('Moving Average',false,false,[5,"close",0],null,{'Plot.color':'#965fc4'});
          //widget.chart().createStudy('MACD',false,false,26,null,{'Plot.color':'#965fc4'});
        })
      })());
    },

  }
}
</script>
<style type="text/css" lang="scss" scoped>
.tradeView{
  letter-spacing:0;
  width: 100%;
  height:100%;
  margin-top:0;
}
</style>