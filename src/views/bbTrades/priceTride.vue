<template>
  <div class="priceTride">
    <div class="bk-title">
    <!--现价交易 市价交易切换-->
      <span :class="isLimit==0?'active':''" @click='titleClick(0)' style="margin-right:30px;">{{$t("message.om.limiteOrder")}}</span>
      <span :class="isLimit==1?'active':''" @click='titleClick(1)'>{{$t("message.om.marketOrder")}}</span>
      <!--净资产折合-->
     <div class="asset" :style="{display:isLogin?'inline-block':'none'}">
       <label>{{$t("message.om.netAssetConverted")}}:</label>
       <span class="otc-price">{{isAssetShow?balance:'********'}}</span>
       <span class="otc-name">{{isAssetShow?otcSymbol:''}}</span>
       <em>≈</em>
       <span class="cny-price">{{isAssetShow?cny:'********'}}</span>
       <span class="cny-name">{{isAssetShow?'CNY':''}}</span>
       <i @click="assetShowClick" :class="isAssetShow?'':'close'"></i>
     </div>
    </div>
    <div class="rt-view">
    <!--买入-->
      <div class="buy-sell" style="margin-right: 20px;">
        <div class="bs-title" :style="{display:isLogin?'inline-block':'none'}">
          {{$t("message.om.available")}}：
          <span>{{use_balance}}</span>
          <span> {{otcSymbol}}</span>
          <a href="javascript:void(0)" style=" float:right;">{{$t("message.om.deposit")}}</a>
        </div>
        <div class="bs-title" :style="{display:isLogin?'none':'inline-block'}">
          <a href="javascript:void(0)">登录</a>
          <span>或</span>
          <a href="javascript:void(0)">注册</a>
          <span>开始交易</span>
        </div>
        <div class="price-ipt">
          <input type="text" v-model="limBuyPrice"  @keyup="handleLimBuyPriceKeyup($event)" v-if="isLimit==0">
          <input type="button" name="" value="以市场最优价买入" v-if="isLimit==1">
          <span>{{otcSymbol}}</span>
          <p :style="{display:isLimit==0?'inline-block':'none'}">≈ {{all_otc_cny}} CNY</p>
        </div>
        <div class="num-ipt">
          <input type="text" v-model="limBuyNum" placeholder="数量" @keyup="handleLimBuyAmountKeyup($event)" v-if="isLimit==0">
           <input type="text" v-model="mktBuyNum" placeholder="交易额" @keyup="handleMktBuyAmountKeyup($event)" v-if="isLimit==1">
          <span>{{isLimit==0?bbSymbol:otcSymbol}}</span>
        </div>
        <p class="otc_error" v-if="isOtcErrorShow">{{otcErrorText}}</p>
        <p style="height:16px" v-if="!isOtcErrorShow"></p>
        <ul class="range-list" v-if="isLimit==0">
          <li @click="buyRangeClick(0.25)" :class="buyRange==0.25?'active':''">25%</li>
          <li @click="buyRangeClick(0.50)" :class="buyRange==0.50?'active':''">50%</li>
          <li @click="buyRangeClick(0.75)" :class="buyRange==0.75?'active':''">75%</li>
          <li @click="buyRangeClick(1)" :class="buyRange==1?'active':''">100%</li>
        </ul>
        <ul class="range-list" v-if="isLimit==1">
          <li @click="buyMktRangeClick(0.25)" :class="buyMktRange==0.25?'active':''">25%</li>
          <li @click="buyMktRangeClick(0.50)" :class="buyMktRange==0.50?'active':''">50%</li>
          <li @click="buyMktRangeClick(0.75)" :class="buyMktRange==0.75?'active':''">75%</li>
          <li @click="buyMktRangeClick(1)" :class="buyMktRange==1?'active':''">100%</li>
        </ul>

        <!--交易额-->
        <div class="trade-price" v-if="isLimit==0">
          <label>{{$t("message.om.jyTotal")}}</label>
          <span>{{allLimBuyPrice}}</span>
          <span>{{otcSymbol}}</span>
        </div>
        <div class="trade-price" style="height:19px" v-if="isLimit==1">
        </div>
        <button style="background:#14C285;" @click="bbLimitTransBuyClick" v-if="isLimit==0">{{$t("message.om.Buy")}}{{bbSymbol}}</button>
        <button style="background:#14C285;" @click="bbMarketTransBuyClick" v-if="isLimit==1">{{$t("message.om.Buy")}}{{bbSymbol}}</button>
      </div>

      <!--卖出-->
      <div class="buy-sell" style="margin-right: 20px;">
        <div class="bs-title" :style="{display:isLogin?'inline-block':'none'}">
          {{$t("message.om.available")}}：
          <span>{{coin_balance}}</span>
          <span>{{bbSymbol}}</span>
          <a href="javascript:void(0)" style=" float:right;">{{$t("message.om.deposit")}}</a>
        </div>
        <div class="bs-title" :style="{display:isLogin?'none':'inline-block'}">
          <a href="javascript:void(0)">登录</a>
          <span>或</span>
          <a href="javascript:void(0)">注册</a>
          <span>开始交易</span>
        </div>
        <div class="price-ipt">
          <input type="text" v-model="limSellPrice"  @keyup="handleSellPriceKeyup($event)" v-if="isLimit==0">
          <input type="button" name="" value="以市场最优价卖出" v-if="isLimit==1">
          <span>{{otcSymbol}}</span>
           <p :style="{display:isLimit==0?'inline-block':'none'}">≈ {{all_bb_cny}} CNY</p>
        </div>
        <div class="num-ipt">
          <input type="text" name="" placeholder="数量" v-model="limSellNum"  @keyup="handleLimSellAmountKeyup($event)" v-if="isLimit==0">
          <input type="text" name="" placeholder="数量" v-model="mktSellNum"  @keyup="handleMktSellAmountKeyup($event)" v-if="isLimit==1">
          <span>{{bbSymbol}}</span>
        </div>
        <p class="bb_error" v-if="isBbErrorShow">{{bbErrorText}}</p>
        <p style="height:16px" v-if="!isBbErrorShow"></p>
        <ul class="range-list" v-if="isLimit==0">
          <li @click="sellRangeClick(0.25)" :class="sellRange==0.25?'active':''">25%</li>
          <li @click="sellRangeClick(0.50)" :class="sellRange==0.50?'active':''">50%</li>
          <li @click="sellRangeClick(0.75)" :class="sellRange==0.75?'active':''">75%</li>
          <li @click="sellRangeClick(1)" :class="sellRange==1?'active':''">100%</li>
        </ul>
        <ul class="range-list" v-if="isLimit==1">
          <li @click="sellMktRangeClick(0.25)" :class="sellMktRange==0.25?'active':''">25%</li>
          <li @click="sellMktRangeClick(0.50)" :class="sellMktRange==0.50?'active':''">50%</li>
          <li @click="sellMktRangeClick(0.75)" :class="sellMktRange==0.75?'active':''">75%</li>
          <li @click="sellMktRangeClick(1)" :class="sellMktRange==1?'active':''">100%</li>
        </ul>
        <!--交易额-->
        <div class="trade-price" v-if="isLimit==0">
          <label>{{$t("message.om.jyTotal")}}</label>
          <span>{{allLimSellPrice}}</span>
          <span>BTC</span>
        </div>
        <div class="trade-price" style="height:19px" v-if="isLimit==1">
        </div>
        <button style="background:#C73049;" @click="bbLimitTransSellClick" v-if="isLimit==0">{{$t("message.om.Sell")}}{{bbSymbol}}</button>
        <button style="background:#C73049;" @click="bbMarketTransSellClick" v-if="isLimit==1">{{$t("message.om.Sell")}}{{bbSymbol}}</button>
      </div>
    </div>
    <transition name="el-fade-in-linear">
      <bk-prompt  v-show="isPrompt" :isPrompt='isPrompt' :promptText='promptText' ></bk-prompt>
    </transition>
  </div>
</template>
<script>
import bkPrompt from '@/components/bkPrompt' 
import {getJavaRequest} from '@/axios/axios'
import Bus from '../../common/js/bus.js'
export default {
  name:'priceTride',
  components:{
    bkPrompt
  },
  props:['otcSymbol','bbSymbol','symbolId'],
  data(){
    return {
      isPrompt:0,//0 不显示 1成功 -1失败
      promptText:'',//提示框文字

      isLimit:0,//0限价 1市价
      isLogin:true,//登陆标志
      isAssetShow:true,//是否显示净资产数字

      isOtcErrorShow:false,//错误显示
      isBbErrorShow:false,
      otcErrorText:null,
      bbErrorText:null,

      buyRange:0,//数量百分比
      sellRange:0,
      buyMktRange:0,
      sellMktRange:0,

      //全部可用资产  净资产
      use_balance:0,//otc可用
      coin_balance:0,//bb可用
      balance:0,//净资产
      cny:0,//人民币净资产

      otc_cny:0,//币种 人民币转换 单价
      bb_cny:0,

      all_otc_cny:0,// 输入折算人民币价格
      all_bb_cny:0,// 人民币

      show_precision:0,//交易价精度
      trans_precision:0,//交易量精度


      limit_trans_max:0,
      limit_trans_min:0,
      market_buy_max:0,
      market_buy_min:0,
      market_sell_max:0,
      market_sell_min:0,


      maxBuyBbNum:0,//最多买入量
      maxSellBbNum:0,//最多卖出量

      limBuyPrice:0,//限价买入价格
      limBuyNum:null,//限价买入数量
      limSellPrice:0,//限价卖出价格
      limSellNum:null,//限价卖出数量

      //mktBuyPrice:0,//市价买入价格
      mktBuyNum:null,//市价买入数量
      //mktSellPrice:0,//市价卖出价格
      mktSellNum:null,//市价卖出数量

      //最新价
      newBuyPrice:0,
      newSellPrice:0,

      allLimBuyPrice:0,//限价买入总价
      allLimSellPrice:0,//限价卖出总价




    }

  },
  computed:{
  
  },
  mounted(){
   // this.coinListAction();
    this.legalListAction();
    //this.userDealAssetAction();
    //this.userDealAssetAction();

    

  },
  methods:{
    //标题点击
    titleClick(isLimit){
      this.isLimit = isLimit;
    },
    //净资产数字显示点击
    assetShowClick(){
      this.isAssetShow = !this.isAssetShow;
    },
    //买卖量点击
    //限价
    buyRangeClick(value){
      this.buyRange = value;
      let limBuyPrice = this.limBuyPrice != 0? this.limBuyPrice : 1;
      this.maxBuyBbNum = this.accDiv(this.use_balance , limBuyPrice);
      this.limBuyNum = this.fomatFloat(this.accMul(this.maxBuyBbNum,value),this.trans_precision);
      let allBuyPrice =  this.accMul(limBuyPrice,this.limBuyNum);
      if(allBuyPrice>this.use_balance){
        this.isOtcErrorShow = true;
        this.otcErrorText = '可用余币不足';
      }else{
        this.isOtcErrorShow = false;
        this.otcErrorText = '';
        this.allLimBuyPrice = allBuyPrice //this.fomatFloat(allBuyPrice,this.show_precision);
      }
      
    },
    sellRangeClick(value){
      this.sellRange = value;
      this.limSellNum = this.fomatFloat(this.accMul(this.maxSellBbNum , value),this.trans_precision);
      let allSellPrice =  this.accMul(this.limSellPrice , this.limSellNum);
      if(allSellPrice>this.coin_balance){
        this.isBbErrorShow = true;
        this.bbErrorText = '可用余币不足';
      }else{
        this.isBbErrorShow = false;
        this.bbErrorText = '';
        this.allLimSellPrice = this.fomatFloat(allSellPrice,this.show_precision);
      }
    },
    //限价
    buyMktRangeClick(value){
      this.buyMktRange = value;
      this.mktBuyNum = this.fomatFloat(this.accMul(this.use_balance,value),this.trans_precision);
    },
    sellMktRangeClick(value){
      this.sellMktRange = value;
      this.mktSellNum = this.fomatFloat(this.accMul(this.coin_balance,value),this.trans_precision);
    },
    //限价
    //买入价格输入
    handleLimBuyPriceKeyup(e){

      this.clearNumPrice(e,this.show_precision); 
      //cny变动
      let all_otc_cny = this.accMul(this.limBuyPrice , this.otc_cny).toFixed(2);
      this.all_otc_cny = isNaN(all_otc_cny)?'0.00': all_otc_cny;
      //计算总量
      let limBuyNum = !isNaN(this.limBuyNum) ? this.limBuyNum : 0;
      let allBuyPrice =  this.accMul(this.limBuyPrice , limBuyNum);
      if(allBuyPrice>this.use_balance){
        this.isOtcErrorShow = true;
        this.otcErrorText = '可用余币不足';
      }else{
        this.isOtcErrorShow = false;
        this.otcErrorText = '';

        this.allLimBuyPrice = this.fomatFloat(allBuyPrice,this.show_precision);
      }
     
    },
    //买入数量输入
    handleLimBuyAmountKeyup(e){
      this.clearNumPrice(e,this.trans_precision); 
      //计算总量
      let limBuyPrice = !isNaN(this.limBuyPrice) ? this.limBuyPrice : 0;
      let allBuyPrice =  this.accMul(this.limBuyNum , limBuyPrice);
      if(allBuyPrice>this.use_balance){
        this.isOtcErrorShow = true;
        this.otcErrorText = '可用余币不足';
      }else{
        this.isOtcErrorShow = false;
        this.otcErrorText = '';
        this.allLimBuyPrice = this.fomatFloat(allBuyPrice,this.show_precision);
      }
    },

    //卖出价格输入
    handleSellPriceKeyup(e){
      this.clearNumPrice(e,this.show_precision); 

       //cny变动
      let all_bb_cny = this.accMul(this.limSellPrice , this.otc_cny).toFixed(2);
      this.all_bb_cny = isNaN(all_bb_cny)?'0.00': all_bb_cny;

      //计算总量
      let limSellNum = !isNaN(this.limSellNum) ? this.limSellNum : 0;
      let allSellPrice =  this.accMul(this.limSellPrice , limSellNum);
      if(allSellPrice>this.coin_balance){
        this.isBbErrorShow = true;
        this.bbErrorText = '可用余币不足';
      }else{
        this.isOtcErrorShow = false;
        this.otcErrorText = '';

        this.allLimSellPrice = this.fomatFloat(allSellPrice,this.show_precision);
      }
    },
    //卖出数量输入
    handleLimSellAmountKeyup(e){
      this.clearNumPrice(e,this.trans_precision); 
      //计算总量
      let limSellPrice = !isNaN(this.limSellPrice) ? this.limSellPrice : 0;
      let allSellPrice =  this.accMul(this.limSellNum , limSellPrice);
      if(allSellPrice>this.coin_balance){
        this.isBbErrorShow = true;
        this.bbErrorText = '可用余币不足';
      }else{
        this.isBbErrorShow = false;
        this.bbErrorText = '';
        this.allLimSellPrice = this.fomatFloat(allSellPrice,this.show_precision);
      }
    },

    //市价
    //市价买入
    handleMktBuyAmountKeyup(e){
      this.clearNumPrice(e,this.show_precision); 
      if(this.mktBuyNum>this.use_balance){
        this.isOtcErrorShow = true;
        this.otcErrorText = '可用余币不足';
      }else{
        this.isOtcErrorShow = false;
        this.otcErrorText = '';
      }

    },
    //市价卖出
    handleMktSellAmountKeyup(e){
      this.clearNumPrice(e,this.show_precision); 
      if(this.mktSellNum>this.use_balance){
        this.isBbErrorShow = true;
        this.bbErrorText = '可用余币不足';
      }else{
        this.isBbErrorShow = false;
        this.bbErrorText = '';
      }
    },

    //限价买入点击
    bbLimitTransBuyClick(){
      if(!this.limBuyPrice){
        this.isOtcErrorShow = true;
        this.otcErrorText = '请输入价格';
        return false;
      }
      if(!this.limBuyNum){
        this.isOtcErrorShow = true;
        this.otcErrorText = '请输入数量';
        return false;
      }
      if(this.limit_trans_max<this.limBuyNum){
        this.isOtcErrorShow = true;
        this.otcErrorText = '超出最大交易量';
        return false;
      }
      if(this.limit_trans_min>this.limBuyNum){
        this.isOtcErrorShow = true;
        this.otcErrorText = '低于最小交易量';
        return false;
      }else{
       
        this.bbLimitTransBuyAction();
      }
      
    },

    //限价卖出点击
    bbLimitTransSellClick(){
      if(!this.limSellPrice){
        this.isBbErrorShow = true;
        this.bbErrorText = '请输入价格';
        return false;
      }
      if(!this.limSellNum){
        this.isBbErrorShow = true;
        this.bbErrorText = '请输入数量';
        return false;
      }
      if(this.limit_trans_max<this.limSellNum){
        this.isBbErrorShow = true;
        this.bbErrorText = '超出最大交易量';
        return false;
      }
      if(this.limit_trans_min>this.limSellNum){
        this.isBbErrorShow = true;
        this.bbErrorText = '低于最小交易量';
        return false;
      }else{
        this.bbLimitTransSellAction();
      }
      
    },
    //市价买入点击
    bbMarketTransBuyClick(){

      if(!this.mktBuyNum){
        this.isOtcErrorShow = true;
        this.otcErrorText = '请输入数量';
        return false;
      }
      if(this.market_buy_max<this.mktBuyNum){
        this.isOtcErrorShow = true;
        this.otcErrorText = '超出最大交易量';
        return false;
      }
      if(this.market_buy_min>this.mktBuyNum){
        this.isOtcErrorShow = true;
        this.otcErrorText = '低于最小交易量';
        return false;
      }
      else{
        this.bbMarketTransBuyAction();
      }

    },
    //市价卖出点击
    bbMarketTransSellClick(){
      if(!this.mktSellNum){
        this.isBbErrorShow = true;
        this.bbErrorText = '请输入数量';
        return false;
      }
      if(this.market_sell_max<this.mktSellNum){
        this.isBbErrorShow = true;
        this.bbErrorText = '超出最大交易量';
        return false;
      }
      if(this.market_sell_min>this.mktSellNum){
        this.isBbErrorShow = true;
        this.bbErrorText = '低于最小交易量';
        return false;
      }
      else{
        this.bbMarketTransSellAction()
      }
      
    },


     //获取交易对数据
    legalListAction(){
      let params = {
       
        api_type:"WEB_API",
        api_method:"AppData_legalList"
      }
      getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        if(status != 200){
          
        }else{
          let data_price = data.price;
          let data_list = data.list;
          let _symbol = this.bbSymbol + '_' + this.otcSymbol;
          for(let name in data_price){
            if(this.otcSymbol == name){
              this.otc_cny = Number(data_price[name].coin_price);
              //this.$store.dispatch('otcCnyPriceAction',this.otc_cny);
              Bus.$emit('otcCnyPrice',this.otc_cny);
            }
            if(this.bbSymbol == name){
              this.bb_cny = Number(data_price[name].coin_price);
            }
          }
          for(let name in data_list){
            if(_symbol == name){

              this.show_precision = Number(data_list[name].show_precision);
              this.trans_precision = Number(data_list[name].trans_precision);

              this.limit_trans_max = Number(data_list[name].limit_trans_max);
              this.limit_trans_min = Number(data_list[name].limit_trans_min);
              this.market_buy_max = Number(data_list[name].market_buy_max);
              this.market_buy_min = Number(data_list[name].market_buy_min);
              this.market_sell_max = Number(data_list[name].market_sell_max);
              this.market_sell_min = Number(data_list[name].market_sell_min);


              this.allLimBuyPrice = this.fomatFloat(this.allLimBuyPrice,this.show_precision);
            }
          }
          this.userDealAssetAction();
        }
      });
    },

    //净资产 币种资产 可用余额
    userDealAssetAction(){
      let params = {
        api_type:"WEB_API",
        api_method:"AppAsset_userDealAsset",
        uid:779,
        coin_type:this.otcSymbol,
        trade_coin:this.bbSymbol,
      }

      //请求
      getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        if(status != 200){
        }else{
          this.use_balance  = data.use_balance ? Number(data.use_balance):'----'; //otc
          this.coin_balance  = data.coin_balance? Number(data.coin_balance):'----'; //
          this.balance  = data.balance ? Number(data.balance) : '----'; 
          this.cny  = Number(data.cny); 

          this.getCurrentPriceAction();
        }
      });
    },
    //获取交易对最新价
    getCurrentPriceAction(){
      let params = {
        api_type:"WEB_API",
        api_method:"AppData_getCurrentPrice",
        legal_id:this.symbolId
      }

      //请求
      getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        if(status != 200){
        }else{
          this.newBuyPrice = Number(data.buy_price);
          this.newSellPrice = Number(data.sell_price);
          this.limBuyPrice = Number(data.buy_price);
          this.limSellPrice = Number(data.sell_price);

          this.all_otc_cny = this.accMul(this.limBuyPrice , this.otc_cny).toFixed(2);
          this.all_bb_cny = this.accMul(this.limSellPrice , this.bb_cny).toFixed(2);

          let _limBuyPrice = this.limBuyPrice?this.limBuyPrice:1;
          let _limSellPrice = this.limSellPrice?this.limSellPrice:1;

          this.maxBuyBbNum = this.accDiv(this.use_balance , _limBuyPrice);
          this.maxSellBbNum = this.coin_balance;
        }
      });
    },
    //限价交易买入
    bbLimitTransBuyAction(){
      let params = {
        api_type:"WEB_API",
        api_method:"AppbbLimitTransBuy",
        legal_id:this.symbolId,
        consign_price:this.limBuyPrice,
        consign_number:this.limBuyNum,
        fee_type:'',
      }
      //请求
      getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        if(status != 200){
          this.isOtcErrorShow = true;
          this.otcErrorText = msg;
          this.promptShowHide(-1,'委托失败');
        }else{
          this.promptShowHide(1,'委托成功');
          //this.$store.dispatch('limitMarketTradeAction',{limit_buy:sign_num});
          Bus.$emit('limitMarketTrade','limit_buy');
          //this.$emit('limitMarketTrade','limitBuy'); 
         
        }
      });

    },
    //限价交易卖出
    bbLimitTransSellAction(){
      let params = {
        api_type:"WEB_API",
        api_method:"AppbbLimitTransSell",
        legal_id:this.symbolId,
        consign_price:this.limSellPrice,
        consign_number:this.limSellNum,
        fee_type:'',
      }

      //请求
      getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        if(status != 200){
          this.isBbErrorShow = true;
          this.bbErrorText = msg;
          this.promptShowHide(-1,'委托失败');
        }else{

          this.promptShowHide(1,'委托成功');
          Bus.$emit('limitMarketTrade','limit_sell');
        }
      });

    },
    //市价买入
    bbMarketTransBuyAction(){
      let params = {
        api_type:"WEB_API",
        api_method:"AppbbMarketTransBuy",
        legal_id:this.symbolId,
        consign_turnover:this.mktBuyNum,
        fee_type:'',
      }

      //请求
      getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        if(status != 200){
          this.isOtcErrorShow = true;
          this.otcErrorText = msg;
          this.promptShowHide(-1,'委托失败');
        }else{
          this.promptShowHide(1,'委托成功');
          Bus.$emit('limitMarketTrade','market_buy');
        }
      });
    },
    //市价卖出
    bbMarketTransSellAction(){
      let params = {
        api_type:"WEB_API",
        api_method:"AppbbMarketTransSell",
        legal_id:this.symbolId,
        consign_number:this.mktSellNum,
        fee_type:'',
      }

      //请求
      getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        if(status != 200){
          this.isBbErrorShow = true;
          this.bbErrorText = msg;
          this.promptShowHide(-1,'委托失败');
        }else{
          this.promptShowHide(1,'委托成功');
          Bus.$emit('limitMarketTrade','market_sell');
        }
      });
    },

    /*    //获取币种数据
     coinListAction(){
     
      let params = {
       
        api_type:"WEB_API",
        api_method:"AppData_coinList"
      }
      getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        if(status != 200){
          
        }else{
         console.log('AppData_coinList',res)
        }
      });
    },*/

    //提示框
    promptShowHide(value,text){
      this.isPrompt = value;
      this.promptText=text;
      let self = this;
      let pmtTime = window.setTimeout(function() {
        self.isPrompt = 0;
        self.promptText = '';
        window.clearInterval(pmtTime);
      }, 2000);
    },

    
    //输入价格位数限制
    clearNumPrice(e,precision){
      var wei  = new  RegExp("^(\\-)*(\\d+)\.(\\d{1,"+precision+"}).*$");
      //修复第一个字符是小数点 的情况.
      if(e.target.value !=''&& e.target.value.substr(0,1) == '.'){
        e.target.value="";
      }
      e.target.value = e.target.value.replace(/^0*(0\.|[1-9])/, '$1');//解决 粘贴不生效
      e.target.value = e.target.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符
      e.target.value = e.target.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的
      e.target.value = e.target.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
      // e.target.value = e.target.value.replace(wei,'$1$2.$3');//只能输入两个小数
      if(e.target.value.indexOf(".")< 0 && e.target.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额
        if(e.target.value.substr(0,1) == '0' && e.target.value.length == 2){
            e.target.value= e.target.value.substr(1,e.target.value.length);
        }
        if(e.target.value.length>8){
            e.target.value = e.target.value.substring(0,8);//整数只能输入8位
        }
      }else{
        var arr = e.target.value.split('.');
        var str1 = arr[0].substr(0,8);
        var str3 = '';
        if(arr[1]){
          str3 = arr[1].substr(0,parseInt(precision));
          e.target.value = str1+'.'+str3;
        }
        if(str1){
          e.target.value = str1+'.'+str3;
        }else{
          e.target.value = '';
        } 
      }
    },
    //保留两位小数(不四舍五入)，向下取
    fomatFloat(num,precision){  
      num= num.toFixed(precision+1);
      num = num.substr(0,num.length-1);
      var lastStr=num.charAt(num.length-1);
      //if(lastStr%2 ==0){
          return num;
      //}else{
          //return (num-0.01).toFixed(2);
      //}            
    },
     /**
     ** 乘法函数，用来得到精确的乘法结果
     ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
     ** 调用：accMul(arg1,arg2)
     ** 返回值：arg1乘以 arg2的精确结果
     **/
    accMul(arg1, arg2) {
        if (isNaN(arg1)) {
            arg1 = 0;
        }
        if (isNaN(arg2)) {
            arg2 = 0;
        }
        arg1 = Number(arg1);
        arg2 = Number(arg2);

        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length;
        }
        catch (e) {
        }
        try {
            m += s2.split(".")[1].length;
        }
        catch (e) {
        }
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
    /**
     ** 除法函数，用来得到精确的除法结果
     ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
     ** 调用：accDiv(arg1,arg2)
     ** 返回值：arg1除以arg2的精确结果
     **/
    accDiv(arg1, arg2) {
        if (isNaN(arg1)) {
            arg1 = 0;
        }
        if (isNaN(arg2)) {
            arg2 = 0;
        }
        arg1 = Number(arg1);
        arg2 = Number(arg2);

        var t1 = 0, t2 = 0, r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length;
        }
        catch (e) {
        }
        try {
            t2 = arg2.toString().split(".")[1].length;
        }
        catch (e) {
        }
        //with (Math) {
            r1 = Number(arg1.toString().replace(".", ""));
            r2 = Number(arg2.toString().replace(".", ""));
            return (r1 / r2) * Math.pow(10, t2 - t1);
        //}
    },



  }

}
</script>
<style type="text/css" lang="scss" scoped>
$block-color: #161920;

.priceTride{
  letter-spacing:0;
  width: 100%;
  height:100%;
  margin-top:0;
  .bk-title{
    height:60px;
    line-height:60px;
    padding-left:16px;
    padding-right:8px;

    background-color:#1C2029;
    border-radius:4px 4px 0 0;
    font-size:14px;
    color:#BAC1DA;
    box-shadow: 0px 2px 4px #000000;
    span{
      display:inline-block;
    }
    .active{
      color:#FFAE36;
    }
    .asset{
      float:right;
      label,em,i,.cny-price,.cny-name{
        display:inline-block;
        color:#555E70;
      }
      i{
        width:15px;
        height:9px;
        background:url(../../assets/icon_eye_open.png) center center no-repeat;
      }
      i.close{
        background:url(../../assets/icon_eye_close.png) center center no-repeat;
      }
    }
  }

  .rt-view{
    height:360px;
    background-color:$block-color;
    padding:16px 16px 0 16px;
    display:flex;
    flex-direction:row;
    .buy-sell{
      flex:1;
      .bs-title{
        width: 100%;
        height:20px;
        line-height:20px;
        margin-bottom:16px;
        color:#555E70;
        font-size:14px;
        a{
          color:#BAC1DA;
        }
      }
      .price-ipt{
        height:44px;
        line-height:44px;
        padding-left:16px;
        background-color:#1D222B;
        border:1px solid #2E3C54;
        font-size:14px;
        border-radius:4px;
        display:flex;
        position:relative;
        input{
          height:44px;
          border:0;
          background-color:#1D222B;
          color:#BAC1DA;
          flex:5;
          text-align:left;
        }
        span{
          display:inline-block;
          flex:1;
          color:#555E70;
        }
        p{
          width:96%;
          height:30px;
          line-height:30px;
          padding-left:4%;
          background-color:#262C38;
          position:absolute;
          color:#BAC1DA;
          top:44px;
          left: 0;
          border-radius:0 0 4px 4px;

        }
      }
      .num-ipt{
        margin-top:50px;
        height:44px;
        line-height:44px;
        padding-left:16px;
        background-color:#1D222B;
        border:1px solid #2E3C54;
        font-size:14px;
        border-radius:4px;
        display:flex;
        position:relative;
        input{
          height:44px;
          border:0;
          background-color:#1D222B;
          color:#BAC1DA;
          flex:5;
          text-align:left;
        }
        span{
          display:inline-block;
          flex:1;
          color:#555E70;
        }
      }
      .range-list{
        height:300px;
        display:flex;
        flex-direction:row;
        justify-content:space-around;
        margin-top:16px;
        height:26px;
        line-height:26px;
        text-align:center;
        font-size:13px;
        li{
          flex:1;
          display:inline-block;
          margin-left:10px;
          background-color:#1C2029;
          color:#555E70;
          border-radius:2px;
          border:1px solid #1C2029;
          cursor: pointer;
        }
        li.active{
          border:1px solid #FFAE36;
          color:#FFAE36;
        }
        li:nth-of-type(1){
          margin-left:0;
        }
      }
      .trade-price{
        margin-top:16px;
        font-size:14px;
        label{
          color:#555E70;
          display:inline-block;
          margin-right:16px;
        }
        span{
          color:#BAC1DA;
        }
      }
      button{
        margin-top:22px;
        width:100%;
        height:44px;
        line-height:44px;
        text-align:center;
        border-radius:4px;
        border:0;
        font-size:16px;
        color:#FFFFFF;
        cursor:pointer;
      }
    } 
  }

  .bk-prompt{
    top:160px;
    left:32%;
  }

}


.bb_error,.otc_error{
  color:#ff1919;
}

::-webkit-input-placeholder { /* WebKit browsers */
    color: #555E70;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #555E70;
}
::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #555E70;
}
:-ms-input-placeholder { /* Internet Explorer 10+ */
    color: #555E70;
}





</style>