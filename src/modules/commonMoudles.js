import Vue from 'vue';
import VueRouter from 'vue-router'
import router from '../router/router'
import {getRequest,getJavaRequest} from '../axios/axios'
Vue.use(VueRouter)
/*types*/
const types = {
  BBOTCLEGEL:'bbOtcLegel',
  OTC_TRSNS:'otcTrans',
  LEGAL_UPDATE:'legalUpadate',
  TRANS_UPDATE:'transUpdate',
  DEPTH_UPDATE:'depthUpdate',
  OTC_CNY_PRICE:'otcCnyPrice',
 
  /*CONSIGN_RECORDS:'consignRecords',
  ORDER_UNTODO:'orderUntodo',
  CONSIGN_DETAIL:'consignDetail'*/
}

/*states*/
const state = {
  otcLegel:null,
  bbLegel:null,

  legalUpadate:null,//交易对
  transUpadate:null,//实时成交明细
  depthUpadate:null,//深度数据


  otcCnyPrice:0,

 /* consignRecordsData:{
    list:[],
    price_precision:0,
    number_precision:0,
    total_record:0
  },
  orderUntodo:null,
  consignDetailData:null,*/
  //kline
  //
}

/*mutations*/
const mutations = {
  [types.BBOTCLEGEL](state, data) {
    if(data){
      //state.otcLegel = data.otc;
      state.bbLegel = data;

    }
     
  },
  [types.OTC_TRSNS](state, data) {
    if(data){
      state.otcLegel = data;
      //state.bbLegel = data.bb;
    }
     
  },
  [types.LEGAL_UPDATE](state, data) {
    if(data){
      state.legalUpadate = data;
      //state.bbLegel = data.bb;
    }
     
  },
  [types.TRANS_UPDATE](state, data) {
    if(data){
      state.transUpadate = data;
      //console.log('TRANS_UPDATE',data)
      //state.bbLegel = data.bb;
    }
     
  },
  [types.DEPTH_UPDATE](state, data) {
    if(data){
      state.depthUpadate = data;
      //console.log('depthUpadate',data)
      //state.bbLegel = data.bb;
    }
     
  },
  [types.OTC_CNY_PRICE](state, data) {
    if(data){
      state.depthUpadate = data;
      //console.log('depthUpadate',data)
      //state.bbLegel = data.bb;
    }
     
  },

  /*[types.CONSIGN_RECORDS](state, data) {
    
    if(data){
      state.consignRecordsData = data;
      console.log(state.consignRecordsData)
    }
    
  },
  [types.ORDER_UNTODO](state, res) {
     state.orderUntodo = res;
  },
  [types.CONSIGN_DETAIL](state, res) {
     state.consignDetailData = res;
  },*/
}

/*actions*/
const actions = {
  //获取币币 otc交易对
  bbOtcLegelAction:function({commit, state},params){
    //请求
    getJavaRequest(params).then((res) => {
       
      if(res.status != 200){

      }else{
        commit(types.BBOTCLEGEL,res.data);
         console.log('bbOtcLegelAction',res)
         //console.log('router',router)
         
      }
    }).catch(() => {
    });
  },
  otcAction:function({commit, state},params){
    //请求
    getJavaRequest(params).then((res) => {
      if(res.status != 200){

      }else{
        commit(types.OTC_TRSNS,res.data);
        console.log('otcAction',res)
         //console.log('msg',res.msg)
         //console.log('router',router)
         
      }
    }).catch(() => {
    });
  },


  //websocket
  websocketAction:function(){
    window.ws = new window.WebSocket("ws://localhost:8081/ws/websocket"); 
  },
  //test
  testAction:function(params){
   console.log('testAction')
  },
  legalUpadteAction:function({commit, state},params){//交易对websocket
    commit(types.LEGAL_UPDATE,params);
  },
  transUpadteAction:function({commit, state},params){//实时数据websocket
    commit(types.TRANS_UPDATE,params);
  },
  depthUpadteAction:function({commit, state},params){//深度数据websocket
    commit(types.DEPTH_UPDATE,params);
  },


  //现价交易---->买卖盘 人民币价格
  otcCnyPriceAction:function({commit, state},params){//深度数据websocket
    commit(types.OTC_CNY_PRICE,params);
  },



  //kline请求数据
  klineAction:function({commit, state},params){
   //console.log('klineAction',params)
  },
/*  // 历史交易明细
  consignRecordsAction:function({commit, state},params){
    //请求
    getRequest(params).then((res) => {
      if(res.status != 200){
      }else{
        commit(types.CONSIGN_RECORDS,res.data);
         console.log('msg',res)
         //console.log('router',router)
         
      }
    }).catch(() => {
    });
  },
  //撤单
  orderUntodoAction:function({commit, state},params){
    console.log(params)
    //请求
    getRequest(params).then((res) => {
      if(res.status != 200){
      }else{
        commit(types.ORDER_UNTODO,res);
         console.log('msg',res.msg)
         //console.log('router',router)
         
      }
    }).catch(() => {
    });
  },
  //历史详情
  consignDetailAction:function({commit, state},params){
      console.log(params)
      //请求
      getRequest(params).then((res) => {
        if(res.status != 200){
        }else{
          commit(types.CONSIGN_DETAIL,res);
          console.log('msg',res)
           //console.log('router',router)
        }
      }).catch(() => {
      });
      return  getRequest(params).then(res => res);
    },*/
  
} 


export default{
    state,
    mutations,
    actions,
    //getters
}