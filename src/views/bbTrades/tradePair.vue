<template>
  <div class="tradePair">
    <div class="bk-title pair-title">
      <div class="select">
        <label>{{$t("message.om.markets")}}</label>
        <div class='tp-search'>
          <input type="text" name="" v-model="searchSymbol" />
        </div>
      </div>
      <div class="otc-list">
        <span @click="selfClick" :style="{'color':otc_active_id==''?'#FFAE36':'#c7ccdf'}">{{$t("message.om.marked")}}</span>
        <ul>
          <li v-for="item in otcLegel" name='item.coin_id' @click="otcClick(item.coin_id)"  
          :style="{'color':otc_active_id==item.coin_id?'#FFAE36':'#c7ccdf'}">{{item.coin_short_name}}</li>
        </ul>
      </div>
    </div>
    <div class="pair-view">
      <ul class="sort-title-list"  >
        <li @click="coinSortClick()">
            <a href="javascript:void(0)">{{$t("message.om.coin")}}</a>
            <i :class="coinSortClass()"></i>
           
        </li>
        <li @click="priceSortClick()">
            <a href="javascript:void(0)">{{$t("message.om.lastPrice")}}</a>
            <i :class="priceSortClass()"></i>
            
        </li>
        <li @click="rangeSortClick()">
            <a href="javascript:void(0)">{{$t("message.om.change")}}</a>
            <i :class="rangeSortClass()"></i>
        </li>
      </ul>
      <!--发币下交易对列表-->
      <div class="bb" v-if="otc_active_id != ''">
      <!--主区-->
        <div :class="isMainShow?'bb-title bb-icon-show':'bb-title bb-icon-hide'" @click="mainAreaClick()">
          <span>{{$t("message.om.mainArea")}}</span>
        </div>
        <ul class="bb-list" :style="{height:isMainShow?'145px':'0'}" >
        <happy-scroll color="rgba(63,78,93,1)" size="4" resize>
          <li v-for="item in mainLegalDataList" @click="bbClick(item[7],item[8])" v-if="showBBData(item)">
            <span class="name">
              <i :class="selfIds.indexOf(item[0])>-1?'active':''"  @click.stop="starClick($event,item[0])" ></i>
              <strong>{{item[7]}}</strong>
            </span>
            <span class="price">{{item[1]}}</span>
            <span :class="rangeNumColor(item[3])">{{item[3]}}</span>
          </li>
        </happy-scroll>
        </ul>
         <!--创新区-->
        <div :class="isNewShow?'bb-title bb-icon-show':'bb-title bb-icon-hide'" @click="newAreaClick()">
          <span>{{$t("message.om.newArea")}}</span>
        </div>
        <ul class="bb-list" :style="{height:isNewShow?'116px':'0'}">
        <happy-scroll color="rgba(63,78,93,1)" size="4" resize>
           <li v-for="item in newLegalDataList" @click="bbClick(item[7],item[8])" v-if="showBBData(item)">
            <span class="name">
              <i :class="selfIds.indexOf(item[0])>-1?'active':''"  @click.stop="starClick($event,item[0])"></i>
              <strong>{{item[7]}}</strong>
            </span>
            <span class="price">{{item[1]}}</span>
            <span class="range">{{item[3]}}</span>
          </li>
          <!-- <li>
            <span class="name">
              <i class="star"></i>
              <strong>最后</strong>
            </span>
            <span class="price">7844.88888888</span>
            <span class="range">+1000.00%</span>
          </li> -->
        </happy-scroll>
        </ul>
        <!--PLUS区-->
        <div :class="isBplusShow?'bb-title bb-icon-show':'bb-title bb-icon-hide'" @click="bplusAreaClick()">
          <span>{{$t("message.om.bPlusArea")}}</span>
        </div>
        <ul class="bb-list" :style="{height:isBplusShow?'88px':'0'}">
        <happy-scroll color="rgba(63,78,93,1)" size="4" resize>
           <li v-for="item in plusLegalDataList" @click="bbClick(item[7],item[8])" v-if="showBBData(item)">
           <span class="name">
             <i :class="selfIds.indexOf(item[0])>-1?'active':''"  @click.stop="starClick($event,item[0])"></i>
             <strong>{{item[7]}}</strong>
           </span>
           <span class="price">{{item[1]}}</span>
           <span class="range">{{item[3]}}</span>
         </li> 
        </happy-scroll>
        </ul>
      </div>

      <!--自选-->
       <div class="bb" v-if="otc_active_id == ''">
      <!--主区-->
        <div :class="isMainShow?'bb-title bb-icon-show':'bb-title bb-icon-hide'" @click="mainAreaClick()">
          <span>{{$t("message.om.mainArea")}}</span>
        </div>
        <ul class="bb-list" :style="{height:isMainShow?'145px':'0'}" >
        <happy-scroll color="rgba(63,78,93,1)" size="4" resize>
          <li v-for="item in mainLegalDataList" @click="bbClick(item[7],item[8])" v-if="showSelfBBData(item)">
           <span class="name">
             <i :class="selfIds.indexOf(item[0])>-1?'active':''"  @click.stop="selfStarClick($event,item[0])" ></i>
             <strong>{{item[7]+' / '+item[8]}}</strong>
           </span>
           <span class="price">{{item[1]}}</span>
           <span :class="rangeNumColor(item[3])">{{item[3]}}</span>
         </li> 
        </happy-scroll>
        </ul>
         <!--创新区-->
        <div :class="isNewShow?'bb-title bb-icon-show':'bb-title bb-icon-hide'" @click="newAreaClick()">
          <span>{{$t("message.om.newArea")}}</span>
        </div>
        <ul class="bb-list" :style="{height:isNewShow?'116px':'0'}">
        <happy-scroll color="rgba(63,78,93,1)" size="4" resize>
          <li v-for="item in newLegalDataList" @click="bbClick(item[7],item[8])" v-if="showSelfBBData(item)">
            <span class="name">
              <i :class="selfIds.indexOf(item[0])>-1?'active':''"  @click.stop="selfStarClick($event,item[0])"></i>
              <strong>{{item[7]+' / '+item[8]}}</strong>
            </span>
            <span class="price">{{item[1]}}</span>
            <span class="range">{{item[3]}}</span>
          </li> 
        </happy-scroll>
        </ul>
        <!--PLUS区-->
        <div :class="isBplusShow?'bb-title bb-icon-show':'bb-title bb-icon-hide'" @click="bplusAreaClick()">
          <span>{{$t("message.om.bPlusArea")}}</span>
        </div>
        <ul class="bb-list" :style="{height:isBplusShow?'88px':'0'}">
        <happy-scroll color="rgba(63,78,93,1)" size="4" resize>
          <li v-for="item in plusLegalDataList" @click="bbClick(item[7],item[8])" v-if="showSelfBBData(item)">
            <span class="name">
              <i :class="selfIds.indexOf(item[0])>-1?'active':''"  @click.stop="selfStarClick($event,item[0])"></i>
              <strong>{{item[7]+' / '+item[8]}}</strong>
            </span>
            <span class="price">{{item[1]}}</span>
            <span class="range">{{item[3]}}</span>
         </li>
        </happy-scroll>
        </ul>
      </div>

    </div>
  </div>
</template>
<script>
import {getRequest,getJavaRequest} from '@/axios/axios'
export default {
  name:'tradePair',
  components:{

  },
  props:['otcSymbol','bbSymbol','symbolId','isWsOpen'],
  data(){
    return {
      uid:779,
      isLogin:false,//是否登录
      //排序
      isCoinSort:0,
      isPriceSort:0,
      isRangeSort:0,
      //区域显示
      isMainShow:true,
      isNewShow:true,
      isBplusShow:true,
      otc_active_id:null,//当前被点击的otc
      otcList:[
        {}
      ],
      selfIds:[],//自选交易对id

      searchSymbol:'',//查询
      subscribeQuotation:[],//当前订阅的交易对id

      renderBbRecordsDataList:[],//交易对数据
      mainLegalDataList:[],//主区
      newLegalDataList:[],//创新区
      plusLegalDataList:[],//plus区

      legalUpadteId:0,//发送的交易对更新id websocket
    }

  },
  computed:{
    //法币数据
    otcLegel(){
      return this.$store.state.common.otcLegel;
    },
    //币币数据
    bbLegel(){
       return this.$store.state.common.bbLegel;
    },
    //状态
    legalUpadate(){
       return this.$store.state.common.legalUpadate;
    },
  },
  watch:{
    otcLegel(v){
      //默认当前第一个法币
      this.otc_active_id = v[0].coin_id;
    },
    legalUpadate(v){
      //if(this.legalUpadteId < v){
       // this.nextTick(function () {
          this.renderBbRecords();
       // })
        //this.legalUpadteId = v;
      //}

    },
  },
  mounted(){
    this.otcAction();
    this.loginAction();

  },
  methods:{
    //法币点击
    otcClick(id){
      this.otc_active_id = id;
      this.subscribePairGroup();
    },
    //自选点击
    selfClick(){
      this.otc_active_id = '';
      this.subscribePairGroup();
    },
    //交易对点击
    bbClick(bb,otc){
     

      sessionStorage.removeItem('bb_records'); 
      //localStorage.removeItem('self_select');
      sessionStorage.removeItem('updateTrans');
      sessionStorage.removeItem('lastBar');
      sessionStorage.removeItem('intervalResolution'); 
       
      var symbolParmas = bb.toLowerCase() +'_'+ otc.toLowerCase();
      this.$router.push({path:'/bbTrades/' + symbolParmas});
      window.location.reload() ;
    },
    //星星自选点击
    starClick(e,bbid){

      //获取本地存储的自选
      var selfSelect =  localStorage.getItem('self_select');
      //console.log('sf',selfSelect);
      if(selfSelect && selfSelect !='undefined' && selfSelect != undefined){
        selfSelect = JSON.parse(selfSelect);
      }else{
        selfSelect = [];
      }


      let thisStarClass = e.target.className;
      //添加自选
      if (thisStarClass.indexOf("active") == -1) {
        e.target.className = "active"; //切换按钮样式
        if(this.isLogin){
           this.userPreferedAction(bbid,1);
        }
        //将自选交易对id存到浏览器
        selfSelect.push(bbid); 
       
      } 
      //删除自选
      else {
        e.target.className = "";//切换按钮样式
        if(this.isLogin){
           this.userPreferedAction(bbid,0);
        }
        //浏览器自选删除
        let index = selfSelect.indexOf(bbid);  
        if(index>-1){selfSelect.splice(index,1);} 
      }
      localStorage.setItem('self_select',JSON.stringify(selfSelect)); 
      console.log('self_select',selfSelect);
    },
    //自选下星星点击 删除
    selfStarClick(e,bbid){
      //获取本地存储的自选
      var selfSelect =  localStorage.getItem('self_select');
      //console.log('sf',selfSelect);
      if(selfSelect && selfSelect !='undefined' && selfSelect != undefined){
        selfSelect = JSON.parse(selfSelect);
      }else{
        selfSelect = [];
      }

      //本地存储删除
      var index = selfSelect.indexOf(parseInt(bbid)); 
      if(index>-1){selfSelect.splice(index,1);}  
      localStorage.setItem('self_select',JSON.stringify(selfSelect));

      this.selfIds = selfSelect;

      //登录删除
      if(this.isLogin){
        this.userPreferedAction(bbid,0);
      }

    },
    //币种排序点击
    coinSortClick(){
      if(this.isCoinSort == 0 || this.isCoinSort == 2){
        this.isCoinSort = 1;//升序
        window.bitker.bb_list_sort = 0;
      }
      else if(this.isCoinSort == 1){
        this.isCoinSort = 2;//降序
        window.bitker.bb_list_sort = 1;
      }
      this.isPriceSort = 0;
      this.isRangeSort = 0;

      this.renderBbRecords();
   
    },
    //价格排序点击
    priceSortClick(){
      if(this.isPriceSort == 0 || this.isPriceSort == 2){
        this.isPriceSort = 1;//升序
        window.bitker.bb_list_sort = 2;
      }
      else if(this.isPriceSort == 1 ){
        this.isPriceSort = 2;//降序
        window.bitker.bb_list_sort = 3;
      }
      this.isCoinSort = 0;
      this.isRangeSort = 0;

      this.renderBbRecords();

    },
    //涨跌排序点击
    rangeSortClick(){
      if(this.isRangeSort == 0  || this.isRangeSort == 2){
        this.isRangeSort = 1;//升序
        window.bitker.bb_list_sort = 4;
      }
      else if(this.isRangeSort == 1){
        this.isRangeSort = 2;//降序
        window.bitker.bb_list_sort = 5;
      }
      this.isCoinSort = 0;
      this.isPriceSort = 0;

      this.renderBbRecords();
    },

    //排序样式
    coinSortClass(){
      if(this.isCoinSort == 0){
        return '';
      }
      else if(this.isCoinSort == 1){
        return 'sort-up';
      }
      else if(this.isCoinSort == 2){
        return 'sort-down';
      }
      
    },
    priceSortClass(){
      if(this.isPriceSort == 0){
        return '';
      }
      else if(this.isPriceSort == 1){
        return 'sort-up';
      }
      else if(this.isPriceSort == 2){
        return 'sort-down';
      }
    },
    rangeSortClass(){
      if(this.isRangeSort == 0){
        return '';
      }
      else if(this.isRangeSort == 1){
        return 'sort-up';
      }
      else if(this.isRangeSort == 2){
        return 'sort-down';
      }
    },
    //涨幅样式
    rangeNumColor(value){
      let rangeNum = Number(value.split('%')[0]);
      if(rangeNum!= 0 && rangeNum > 0){
        return "range green";
      }else if(rangeNum!= 0 && rangeNum < 0){
        return "range red";
      }else {
        return " range ";
      }
    },
    //单词转ASC码 排序 交易对  
    wordCodeTrans(word){
      if(word){
        var wordArr = word.split("");
        var wordCode = "";
        /*for(var i = 0;i<wordArr.length;i++){
         wordCode += wordArr[i].charCodeAt();
        }*/
        var wordCode_0 = wordArr[0]?wordArr[0].charCodeAt() + '' : '00',
        wordCode_1 = wordArr[1] ? wordArr[1].charCodeAt() + '' : '00',
        wordCode_2 = wordArr[2] ? wordArr[2].charCodeAt() + '' : '00', 
        wordCode_3 = wordArr[3] ? wordArr[3].charCodeAt() + '' : '00'; 

        wordCode = wordCode_0 + wordCode_1 + wordCode_2 + wordCode_3;  
        return Number(wordCode);
      }else{
        return 0; 
      }
    },
    //交易对排序
    bbListSort(res){
      var _this = this;
       //0名称升序 1名称降序 2价格升序 3价格降序 4涨幅升序 5涨幅降序
      switch(window.bitker.bb_list_sort){
        case 0:
            //sortReindeer_a(res);
          res.sort(function(x,y){
            var rx = _this.wordCodeTrans(x[7]),ry = _this.wordCodeTrans(y[7]);
            return rx - ry;
          }); 
          //console.log('after',res)
          break; 
        case 1: 
            //sortReindeer_b(res);
          res.sort(function(x,y){ 
            var rx = _this.wordCodeTrans(x[7]),ry = _this.wordCodeTrans(y[7]);
            return ry - rx;
          }); 
          break;
        case 2:
          res.sort(function(x,y){
            var rx = isNaN(x[1])?0:x[1], ry = isNaN(y[1])?0:y[1];
            return rx - ry;
          });  
          break;
        case 3:
          res.sort(function(x,y){
            var rx = isNaN(x[1])?0:x[1], ry = isNaN(y[1])?0:y[1];
            return ry - rx;   
          });
          break;
        case 4:
          res.sort(function(x,y){
            var rx = Number(x[3].split('%')[0]),ry = Number(y[3].split('%')[0]);
            rx = isNaN(rx)?0:rx;
            ry = isNaN(ry)?0:ry;
            return rx - ry; 
          });
          break;
        case 5:
          res.sort(function(x,y){ 
            var rx = Number(x[3].split('%')[0]),ry = Number(y[3].split('%')[0]);
            rx = isNaN(rx)?0:rx;
            ry = isNaN(ry)?0:ry;
            return ry - rx; 
          });
          break;
        default:break;
      }

      
    },

    //币币数据条件过滤  查询 自选 当前法币...
    showBBData(item){
      if(this.searchSymbol != ''){
        if( item[9]==this.otc_active_id && item[7].indexOf(this.searchSymbol.toLocaleUpperCase())>-1){
          return true;
        }else{
          return false;
        }
      }else{
        if( item[9]==this.otc_active_id){
          return true;
        }else{
          return false;
        }
      }
    },
    //自选下 币币数据条件过滤  查询 自选 当前法币...
    showSelfBBData(item){
      if(this.searchSymbol != ''){
        if(this.selfIds.indexOf(item[0])>-1 && item[7].indexOf(this.searchSymbol.toLocaleUpperCase())>-1){
          return true;
        }else{
          return false;
        }
      }else{
        if( this.selfIds.indexOf(item[0])>-1){
          return true;
        }else{
          return false;
        }
      }
    },
    //区域显示点击
    mainAreaClick(){
      this.isMainShow = !this.isMainShow;
    },
    newAreaClick(){
      this.isNewShow = !this.isNewShow;
    },
    bplusAreaClick(){
      this.isBplusShow = !this.isBplusShow;
    },
    //请求法币
    otcAction(){
      let params = {
        api_type:"WEB_API",
        api_method:"AppTrans_OtcList",
      }
      //请求
      getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        if(status != 200){
        }else{
         this.bbOtcLegelAction();
        }
      });
    },
    //请求币币
    bbOtcLegelAction(){
      let params = {
        api_type:"WEB_API",
        api_method:"AppConsign_OtcBBList",
      }
      //请求
      getJavaRequest(params).then((res) => {
        let {msg,data,status,login_status} = res;
        if(status != 200){
        }else{
         //交易对数据加工
         this.legalDataWork(data,login_status);
        }
      });
    },
    //交易对数据加工
    legalDataWork(data,login_status){


      let updGrpMktData =[];
      for(let i = 0;i<data.length;i++){
        let arr = [];
        arr[0] = data[i].bb_id;
        arr[1] = '----';
        arr[2] = '----';
        arr[3] = '----';
        arr[4] = '----';
        arr[5] = '----';
        arr[6] = '----';
        arr[7] = data[i].bb_short_name;
        arr[8] = data[i].otc_short_name;
        arr[9] = data[i].otc_id;
        arr[10] = data[i].zone_type;
        updGrpMktData.push(arr);
      }
      sessionStorage.setItem('transbbRecords',JSON.stringify(updGrpMktData));
      //}
      window.bitker.bbRecodesSuccess = true;
      window.bitker.isLogin = login_status;
      let selfSelect = [];
      for(let i = 0;i<data.length;i++){
        //登录 设置自选
        if(data[i].bb_id == data[i].trade_pair_id){
          selfSelect.push(parseInt(data[i].bb_id));
        }

      }
      //登录 设置自选
      if(window.bitker.isLogin == 1){
        //console.log('loading---selfSelect',selfSelect) 
        //保存自选
        localStorage.setItem('self_select',JSON.stringify(selfSelect));
        //var test = localStorage.getItem('self_select');
        //console.log('loading---test',test); 
      }
      sessionStorage.setItem('bb_records',JSON.stringify(data)); 
      this.subscribePairGroup();
      this.renderBbRecords();

    },
    // 渲染币币
    renderBbRecords(){
      var bbList =  sessionStorage.getItem('transbbRecords');
      var res = JSON.parse(bbList);
      var searchSymbol = window.bitker.searchSymbol;
      //排序
      this.bbListSort(res);
      //console.log('window.bitker.otc_record_id',window.bitker.otc_record_id);
      //自选
      var selfSelect = localStorage.getItem('self_select');
      //console.log('rendbb self',selfSelect)
      if(selfSelect && selfSelect != 'undefined') {
        selfSelect = JSON.parse(selfSelect);
      }else{
        selfSelect = [];
      } 
      this.selfIds = selfSelect;

      this.renderBbRecordsDataList = res;
      this.mainLegalDataList = [];
      this.newLegalDataList = [];
      this.plusLegalDataList = [];
      for(let i = 0;i<res.length;i++){
        if(res[i][10] == 1){

          this.mainLegalDataList.push(res[i]);
         
        }
        else if(res[i][10] == 2){
          this.newLegalDataList.push(res[i]);
        }
        else if(res[i][10] == 3){
          this.plusLegalDataList.push(res[i]);
        }


        //24小时数据
        if(res[i][0] == this.symbolId){
          let dayhData = [];
          dayhData[0] = res[i][6];//high
          dayhData[1] = res[i][5];//low
          dayhData[2] = res[i][4];//number
          dayhData[3] = res[i][3];//range
          dayhData[4] = res[i][1];//newprice
          dayhData[5] = res[i][2];//cnyprice
          this.$emit('updMktData',dayhData);
        }
      }

      this.isMainShow = this.mainLegalDataList.length>0?true:false;
      this.isNewShow = this.newLegalDataList.length>0?true:false;
      this.isBplusShow = this.plusLegalDataList.length>0?true:false;

      //console.log('renderBbRecords',res)  
      //console.log('this.mainLegalDataList',this.mainLegalDataList)  
      /*console.log('this.newLegalDataList',this.newLegalDataList)    
      console.log('this.plusLegalDataList',this.plusLegalDataList)  */


      

      
    },
    //订阅 交易对 自选
    subscribePairGroup(){
      //取消上次订阅
      if(this.subscribeQuotation.length > 0){
        let unpairGroupConfig = {
            action:'unsubscribeQuotation' ,
            data:{ids:this.subscribeQuotation}
          }; 
        window.ws.send(JSON.stringify(unpairGroupConfig));
      }
      var pairGroupConfig = {
          action:'subscribeQuotation' 
      }; 
      //自选 window.bitker.selfSelect
      var selfSelect = [];
      if(this.otc_active_id == ''){
        let self_select = localStorage.getItem('self_select');
        if(self_select && self_select != 'undefined'){
          selfSelect = JSON.parse(self_select);
          this.subscribeQuotation = selfSelect; 
        } 
      }else{
        let bbIds = [];
        let bb_records =  sessionStorage.getItem('bb_records'); 
        if(bb_records){
            bb_records = JSON.parse(bb_records);
            for(let i = 0; i<bb_records.length;i++){
              if(bb_records[i].otc_id == this.otc_active_id){
                bbIds.push(bb_records[i].bb_id);
              }
            }
            this.subscribeQuotation = bbIds;
        }
         
          //pairGroupConfig.data = {ids:bbIds};
      } 
      let isThisOtcId  = this.subscribeQuotation.indexOf(parseInt(this.symbolId));
      if(isThisOtcId < 0){
        this.subscribeQuotation.push(parseInt(this.symbolId));
      }
      pairGroupConfig.data = {ids:this.subscribeQuotation};
       window.ws.send(JSON.stringify(pairGroupConfig));
      //this.wsSend(this.subscribeQuotation);

      //if(this.subscribeQuotation.length<=0){
        //$('#bb_records').html('');    
      //} 
    },
    //websocket 订阅交易对
    wsSend(subscribeQuotation){
      let _this = this;
      let pairGroupConfig = {
          action:'subscribeQuotation' ,
          ids:subscribeQuotation
      }; 
      console.log('000000000',this.isWsOpen) 
      let T = null;
      if(_this.isWsOpen){
        clearTimeout(T);
        window.ws.send(JSON.stringify(pairGroupConfig));
       
        console.log('000000000','SEND')  
        console.log('000000000','SEND------end') 
      }else{
        T = setTimeout(function(){
           _this.wsSend();
           console.log('11111111',_this.isWsOpen) 
        },1000) 
      }
    },

    //用户交易对自选管理
    userPreferedAction(bbid,operateType){
      let params = {
        api_type:"WEB_API",
        api_method:"AppUserPrefered",
        trade_pair_id:bbid,
        operate_type:operateType,
        uid:this.uid,

      }
      //请求
      getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        if(status != 200){
        }else{
         
        }
      });
    },

   
    //登录
    loginAction(){
     /* let params = {
        api_type:"AppApi",
        api_method:"AppUserLogin",
        username:'',
        password:''
      }
      //请求
      getJavaRequest(params).then((res) => {
        let {msg,data,status} = res;
        console.log('login',res);
        if(status != 200){
        }else{
         //console.log('login',res);
        }
      });*/
    },
    

  }
}
</script>
<style type="text/css" lang="scss" scoped>
$block-color: #161920;
.tradePair{
  letter-spacing:0;
  width: 100%;
  height:100%;
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
  .pair-title{
    height:100px;
    .select{
      height:60px;
      line-height:60px;
      display:flex;
      flex-direction:row;
      label{
        flex:1;
        font-size:14px;
      }
      .tp-search{
        display:inline-block;
        flex:1;
        margin-right:16px;
        width:160px;
        height:27px;
        border-radius:4px;
        background-color:#1C2029;
        border:1px solid #555E70;
        position: relative;
        top: 14px;
        background:url(../../assets/icon_sousuo.png) right center no-repeat;
        input{
          display:inline-block;
          border:0;
          width:124px;
          height:27px;
          border-radius:4px;
          background-color:#1C2029;
          position:absolute;
          text-indent: 6px;
          color:#BAC1DA;
        }
      }
    }
    .otc-list{
      height:40px;
      line-height:40px;

      span{
        display:inline-block;
        height:40px;
        margin-right:6%;
        cursor: pointer;

      }
      ul{
        display:inline-block;
        vertical-align: bottom;
        width:80%;
        li{
          float:left;
          display:inline-block;
          margin-right:6%;
          cursor: pointer;
        }
      }
    }
  }
  .pair-view{
    height:500px;
    padding:0 16px;
    background-color:$block-color;
    .sort-title-list{
      height:30px;
      line-height:30px;
      border-bottom:1px solid #1C2029;
      display:flex;
      flex-direction:row;
      li{
        flex:1;
        font-size:12px;
        cursor: pointer;
        a{
          color:#555E70;
        }
        i{
          display:inline-block;
          width:6px;
          height:10px;
          background:url(../../assets/icon_sx0.png) center center no-repeat;
        }
        i.sort-up{
          background:url(../../assets/icon_sx2.png) center center no-repeat;
        }
        i.sort-down{
          background:url(../../assets/icon_sx1.png) center center no-repeat;
        }
      }
      li:nth-of-type(2){
        text-align:center;
      }
       li:nth-of-type(3){
        text-align:right;
      }
    }
    .bb{
      .bb-icon-hide{
         background:url(../../assets/icon_zhankai.png) right center no-repeat;
      }
      .bb-icon-show{
        background:url(../../assets/icon_shouqi.png) right center no-repeat;
      }
      .bb-title{
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #1C2029;
        span{
          display:inline-block;
          height:13px;
          line-height:13px;
          color:#858CA3;
          font-size:12px;
          padding-left:6px;
          border-left: 3px solid #858CA3;
        }
      }
      .bb-list{
        transition:height 1s;
        li:hover{background-color:#1C2029;}
        li{
          height:28px;
          line-height:28px;
          display:flex;
          flex-direction:row;
          border-bottom: 1px solid #1C2029;
          color:#858CA3;
          span{
            flex:1;
          }
          span:nth-of-type(1){
            i{
              display:inline-block;
              width:15px;
              height:14px;
              vertical-align:middle;
              background:url(../../assets/icon_star1.png) center center no-repeat;
              z-index:99;
            }
            i.active{
              background:url(../../assets/icon_star2.png) center center no-repeat;
            }
            strong{
              display:inline-block;
              vertical-align:middle;
            }
          }
          span:nth-of-type(2){
            text-align:center;
          }
          span:nth-of-type(3){
            text-align:right;
          }
        }
      }
      .main{
        height:145px;


      }
      .new{
        height:116px;
      }
      .bplus{
        height:88px;
      }
    }
  }
}
.star{

}
.green{
  
  color: #14C285;
}
.red{
  color: #DD3451;
}
.happy-scroll{
      .happy-scroll-container{
        height:100%;
        .happy-scroll-content{
          border-bottom:0;
        }
      }
    }

</style>