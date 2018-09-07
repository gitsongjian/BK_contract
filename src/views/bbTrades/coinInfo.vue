<template>
  <div class="coinInfo">
    <div class="bk-title">
     币种资料
    </div>
    <div class="rt-view">

      <h2 class="ci-title">{{coinInfo.coin_short_name?coinInfo.coin_short_name:'--'}}</h2>
      <p class='ci-otc'>{{coinInfo.coin_name?coinInfo.coin_name:'--'}}</p>
     <!--  <p class='ci-otc'>比特币（Bitcoin）</p> -->
      <p class='info-title'>简介</p>
      <p class='info-content'>{{coinInfo.coin_comment?coinInfo.coin_comment:'--'}}</p>
      <ul class='info-list'>
        <li>
          <label>发行时间 </label>
          <span>{{coinInfo.publish_date?coinInfo.publish_date:'--'}}</span>
        </li>
        <li>
          <label>发行总量 </label>
          <span>{{coinInfo.publish_amonut?coinInfo.publish_amonut:'--'}}</span>
        </li>
        <li>
          <label>流通总量 </label>
          <span>{{coinInfo.circulate_amount?coinInfo.circulate_amount:'--'}}</span>
        </li>
        <li>
          <label>众筹价格 </label>
          <span>{{coinInfo.crowd_price?coinInfo.crowd_price:'--'}}</span>
        </li>
        <li>
          <label>白皮书 </label>
          <span>{{coinInfo.white_book_file?coinInfo.white_book_file:'--'}}</span>
        </li>
        <li>
          <label>官网 </label>
          <span>{{coinInfo.official_website?coinInfo.official_website:'--'}}</span>
        </li>
        <li>
          <label>区块查询 </label>
          <span>{{coinInfo.block_query?coinInfo.block_query:'--'}}</span>
        </li>
      </ul>
      
      
      
        
    </div>
  </div>
</template>
<script>
import {getRequest,getJavaRequest} from '@/axios/axios'
export default {
  name:'coinInfo',
 
  components:{

  },
  props:['bbSymbol'],
  data(){
    return {
      coinInfo:{},
    }

  },
  computed:{

  },
  mounted(){
   this.coinInfoAction();

  },
  methods:{
     //币币详情
    coinInfoAction(){
      let params = {
        api_type:"WEB_API",
        api_method:"AppData_coinInfo",
        coin_name:this.bbSymbol
      }
      //请求
      getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        if(status != 200){
        }else{
          this.coinInfo = data;
          console.log('bbinfo',res);
        }
      });
    },
  }
}
</script>
<style type="text/css" lang="scss" scoped>
$block-color: #161920;

.coinInfo{
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
    height:510px;
    background-color:$block-color;
    padding:0 16px;
    padding-top:20px;
    font-size:13px;
    .ci-title{
      font-size:18px;
      font-weight:400;
      color:#BAC1DA;
    }
    .ci-otc{
      color:#858CA3;
      margin-top:8px;
    }
    .info-title{
      color:#555E70;
      margin-top:16px;
    }
    .info-content{
      color:#858CA3;
      margin-top:10px;
      line-height:18px;
    }
    .info-list{
      margin-top:16px;
      li{
        height:20px;
        line-height:20px;
        label{
          display:inline-block;
          width:72px;
          color:#555E70;
        }
        span{
          color:#BAC1DA;
        }
      }
    }
    

    
  }
}




</style>