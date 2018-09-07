import $ from 'jquery';

function  transformTime(resolution){
  
   var period = 0;
   if (resolution.toString().indexOf('D') !== -1) {
    var datNumber = resolution.split('D')[0]; 
    if(datNumber){
      period = parseInt(resolution.split('D')[0]) * 24 *60 ; 
    }else{
      period = 1 * 24 *60; 
    }
   }
   else if (resolution.toString().indexOf('W') !== -1) {
    var weekNumber = resolution.split('W')[0]; 
    if(weekNumber){
      period = parseInt(resolution.split('W')[0]) * 24 *60 *7; 
    }else{
      period = 1 * 24 *60 *7; 
    }
   }
   else{ 
      period = parseInt(resolution);
   }
   return period;
  /* if (resolution.toString().indexOf('D') !== -1) {
    var datNumber = resolution.split('D')[0];
    if(datNumber){
      period = parseInt(resolution.split('D')[0]) * 24 *60 * 60 * 1000; 
    }else{
      period = 1 * 24 *60 * 60 * 1000; 
    }
   }
   else if(resolution.toString().indexOf('W') !== -1){
      period = parseInt(resolution.split('W')[0]) * 24 *60 * 60 * 1000 * 7;
   }
   else{ 
      period = parseInt(resolution) * 60 * 1000;
   }
   return period;*/
}
function stransformTime(time){
  var period = ""; 
  if(time.toString().indexOf('W') !== -1){
    if (time === "W") {
       period = "1week";
    } else {
      var weekNumber = parseInt(time.split('W')[0]);
      period = weekNumber + 'week' ; 
    }
  }
 else if (time.toString().indexOf('D') !== -1) {
    if (time === "D") {
      period = "1day";
    } else {
      var dayNumber = parseInt(time.split('D')[0]);
      period = dayNumber + 'day' ; 
    }
  } else {
    if (parseInt(time) < 60) {
      period = time + 'min';
    } else {
      var hourNumber = Math.floor(parseInt(time) / 60); 
      period = hourNumber + 'hour';
    }
  }
  return period;
}

//处理kline历史数据
function dealKlineData(data,to,from){
  //console.log('from',from);
  //console.log('to',to);
  var resData = transHistoryBars(data);
  var bars = [];
  var meta = {noData: false};
  //console.log('resData',resData)
  if(resData.length > 0){ 
    var firstDataTime = resData[0].time;
    var lastDataTime = resData[resData.length-1].time; 
    window.bitker.klinePrev = lastDataTime;
  }
  //console.log('dealKlineData',resData); 
  if(!resData && resData.length &&resData.length <= 0){ 
  //if(!res.s || res.s == 'no_data'){   
    meta.noData = true;
   // meta.nextTime = res.nextTime;
    //window.dealSuccess = true; 
  }
  else if(firstDataTime < from*1000 || lastDataTime > to * 1000){
     meta.noData = true; 
  }
  else{  
    //resData = completionData(resData,to); 
    //resData = completionFromData(resData,from);  
    var lastBar = sessionStorage.getItem('lastBar');
    if(lastBar){
      lastBar = JSON.parse(lastBar);
      if(resData && resData.length>0){
        if(resData[resData.length-1].time > lastBar.time){  
          lastBar = resData[resData.length-1]; 
        }
      }
    }else{
     if(resData && resData.length>0){
        lastBar = resData[resData.length-1];
      }else{
        lastBar = {}; 
      }
    }
    //console.log('lastBar2',lastBar);  

    /*var lastBar = {};
    if(!resData){
      lastBar = {};
    }else{
      lastBar = resData[resData.length-1];
    }
    console.log('lastBar',lastBar);*/
 
    var lastBarString = JSON.stringify(lastBar);
    sessionStorage.setItem('lastBar',lastBarString);
    bars = resData; 
    //sessionStorage.setItem('klineBars',JSON.stringify(bars));

  } 
//console.log('window.bitker.klinePrev',window.bitker.klinePrev) 
  return {bars:bars,meta:meta};
 
}

//k线行情数据转换
function transHistoryBars(res){ 
    var resData = res;
    var bars = [];
    for(var i = 0;i<resData.length;i++){
      var bar = {};

     /* bar.open = resData[i].openPrice;
      bar.high = resData[i].hightPrice;
      bar.low = resData[i].lowPrice;
      bar.close = resData[i].closePrice;
      bar.volume = resData[i].totalNum;
      if(!resData[i].hightPrice){
        bar.high = bar.open;   
      }
      if(!resData[i].lowPrice){
        bar.low = bar.open;
      }
      if(!resData[i].closePrice){
        bar.close = bar.open;
      }
      if(!resData[i].totalNum){
        bar.volume = 0;
      }*/
      bar.open = resData[i][1];
      bar.high = resData[i][4];
      bar.low = resData[i][3];
      bar.close = resData[i][2];
      bar.volume = resData[i][5];
      if(!resData[i][4]){
        bar.high = bar.open;   
      }
      if(!resData[i][3]){
        bar.low = bar.open;
      }
      if(!resData[i][2]){
        bar.close = bar.open;
      }
      if(!resData[i][5]){
        bar.volume = 0;
      }
      //bar.time = parseInt(resData[i].klineTime) * 1000; 
      //bar.time = parseInt(resData[i].klineTime); 
      bar.time = parseInt(resData[i][0]);  
      bars.push(bar);
    }
   // bars.sort(compare);
    return bars;
 
  
}


 //获取实时k线数据
function getRealKlineData(data,that){

  var to =  window.bitker.klineTo;
  if(parseInt(data.finishTime)<to){

  }else{

    var newBar = {
      //time:parseInt(data.finishTime) * 1000,
      time:parseInt(data.finishTime),   
      close:Number(data.transPrice),
      volume:Number(data.transNumber)
    }
    //var newData = res.data[0];
    var lastBarString = sessionStorage.getItem('lastBar');
    var lastBar = JSON.parse(lastBarString);
    if(!lastBar){
      lastBar = {}; 
      newBar.open =  newBar.high = newBar.low = newBar.close;
    }else{
      newBar.open = lastBar.close;
      if(window.bitker.klineHighPrice){
        newBar.high = window.bitker.klineHighPrice;
      }else{
        if(lastBar.high >  newBar.close){
          newBar.high = lastBar.high;
        }else{
          newBar.high =  newBar.close;
        }

      }
      if(window.bitker.klineLowPrice){
        newBar.low = window.bitker.klineLowPrice;
      }else{
        if(lastBar.low <  newBar.close){
          newBar.low = lastBar.low;
        }else{
          newBar.low =  newBar.close;
        }
      }
     /* if(lastBar.high >  newBar.close){
         newBar.high = lastBar.high;
      }else{
        newBar.high =  newBar.close;
      }
      if(lastBar.low <  newBar.close){
         newBar.low = lastBar.low;
      }else{
        newBar.low =  newBar.close;
      }*/

    }
    that._barsWebsocketUpdater.wsUpdate(lastBar,newBar);    
    var newBarString = JSON.stringify(newBar);
    //console.log('getRealKlineData newBar',newBar)
    sessionStorage.setItem('lastBar',newBarString); 
  }

}




/*交易对行情*/
//组装币币数据
function transbbRecords(arr,bb_records){
  for(var i = 0;i<arr.length;i++){
    if(arr[i] == null){
      arr[i] = '----';
    }
  }
  var res = sessionStorage.getItem('transbbRecords');
  if(res){
    res = JSON.parse(res);
    for(var i = 0;i<res.length;i++){
      if(arr[0] == res[i][0]){
        //res.splice(i,1);
        res[i] = arr; 
      }
    }
    //res.push(arr);
    //console.log('res2- arr----------------',res)  
  }else{
    res = [];
    res.push(arr);
  }

  if(bb_records){
    for(var i = 0;i < res.length;i ++){
      for(var j = 0;j < bb_records.length;j++){ 
        if(res[i][0] == bb_records[j].bb_id){ 
          res[i][7] = bb_records[j].bb_short_name;
          res[i][8] = bb_records[j].otc_short_name;
          res[i][9] = bb_records[j].otc_id;
          res[i][10] = bb_records[j].zone_type;
        }
      }
    }
  }
  //console.log('res3-----------------',res)
  sessionStorage.setItem('transbbRecords',JSON.stringify(res));
  //return res;  
}


//实时成交明细
function updateTrans(res){

  //var transPrice = res.data.transPrice||'----';
  //var cnyPrice = (transPrice?Number(transPrice):0) * window.bitker.cnyPrice;
  //$('.lin_price .new_price').html(transPrice); 
  //$('.lin_price .new_price_cny').html(Number(cnyPrice).toFixed(2) + 'CNY'); //window.bitker.cnyPrice

  var trans = [];
  var transStr = sessionStorage.getItem('updateTrans'); 
  if(transStr && transStr != undefined){
     trans = JSON.parse(transStr); 
  }
  trans.unshift(res.data);
  trans.sort(function(x,y){
    
    return y.matchSequence - x.matchSequence;  
    //return y.finishTime - x.finishTime;  
  }); 
  sessionStorage.setItem('updateTrans',JSON.stringify(trans));
  
}



/*kline*/
let datafeedUtil = {};
//datafeed调用方法
datafeedUtil.websocketGetData = function(params){

  var symbolId = params.symbolId,
      that = params.that,
      from = params.from, 
      to = params.to,
      period = transformTime(params.period),
      send_period = stransformTime(params.send_period);

      


  var klineConfig = {
    action:'getKline', 
    data:{
      legalId:symbolId,
      //legalId:5,  
      type:send_period, 
      //timeBegin:from ,
      timeBegin:from * 1000,
      //timeEnd:to
      timeEnd:to* 1000,
      current:true
    }
  }; 
  if(window.bitker.klineFrom){
    if(to < window.bitker.klineFrom){
      klineConfig.data.current = false;   
    }
  }

  window.bitker.klineTo = to;
  window.bitker.klineFrom = from;
  window.bitker.period = period;



  var heartCheck = {
    timeout: 5000,
    timeoutObj: null,
    index:0,
    reset: function(){
        clearTimeout(this.timeoutObj);
        this.start();
    },
    start: function(){
        var ht = { action:"heartBeat",data:{times:this.index }} 
        this.timeoutObj = setTimeout(function(){
          ws.send(JSON.stringify(ht));
        }, this.timeout)
    },
  }; 


  //蹦床函数 递归 避免溢出
  function trampoline(f) {
    while (f && f instanceof Function) {
      f = f();
    }
    return f;
  }
  //ws连接  
  function wsConnect(){ 
    if(window.ws   && window.ws.readyState == 1){
      let params = { "action":"subscribe","data":{"legalId":symbolId}};
       ws.send(JSON.stringify(params)); 
      //第一次连接
     /* if(!window.wsFirstConnect){  
        $("iframe").contents().find("#loading-indicator").css('display','none');    
        //查币币
        //otcAjax();
        //bbAjax(); 

        firstConnect(window.bitker.symbol_id); 
        heartCheck.start();  
        window.wsFirstConnect = true;
        window.hasWsMessage = false;  
      } */

     //请求kline数据
     // if (!window.hasWsMessage) { 
        ws.send(JSON.stringify(klineConfig)); 
        //window.hasWsMessage = true;  
     // } 
      //console.log('ws.readyState',ws.readyState);
     wsLineMessage();
    }else{  
      $("iframe").contents().find("#loading-indicator").css('display','block');
      var t = setTimeout(function(){
        wsConnect(); 
      },1000); 
      //clearTimeout(t);    
     // console.log('ws.readyState');
    }
  }

  //连接ws
  trampoline(wsConnect());  

  /*//请求kline数据
  if (!window.hasWsMessage) { 
    ws.send(JSON.stringify(klineConfig)); 
    //window.hasWsMessage = true;  
  } 
  console.log('ws.readyState',ws.readyState);
  wsLineMessage();*/
  window.legalUpadteId = 0;
 function wsLineMessage(){
  var hasData = false; 
  window.ws.onmessage = (function (e){
    if(e){
      var res = JSON.parse(e.data);
    } 
    if(res.action == "heartBeat"){
      hasData = false;
    }else{
      hasData = true;
    }
  
    switch(res.action){
      case 'updateQuotation': //交易对组行情
        var bb_recordsStr = sessionStorage.getItem('bb_records'), 
            bb_records = JSON.parse(bb_recordsStr);
        transbbRecords(res.data,bb_records); 
        window.legalUpadteId++;
        window.bitker.bbTrades.$store.dispatch('legalUpadteAction',window.legalUpadteId);
        break; 
      case 'updateTrans' ://实时行情成交明细
        updateTrans(res);
        //kineHighLowPrice();
        //console.log('updateTrans',res)
        window.bitker.bbTrades.$store.dispatch('transUpadteAction',res.data);
        getRealKlineData(res.data,that);//实时k线  

        break;
      case 'updateDepth' ://深度行情
        window.bitker.bbTrades.$store.dispatch('depthUpadteAction',res.data);
        //updateBuy(res.data);
        //updateSell(res.data);
        break;
      case 'update24hourPriceChange':
        upd24hMktData(res.data);
        break;
      case 'getKline' : //k线

        window.bitker.bbTrades.$store.dispatch('testAction');
        var to = window.bitker.klineTo;
        var from = window.bitker.klineFrom;
        var historyData = dealKlineData(res.data,to,from);
        var bars = historyData.bars;
        var meta = historyData.meta;
        var nodata = bars.length <= 0;
        if(nodata){
          meta.noData = true;
        }
        //if (nodata) {
          //if (params.onErrorCallback) {
            //params.onErrorCallback('noData');  
         // }
          //return;   
        //}
        //console.log('bars->', bars);  
        //console.log('meta->', meta);     
        // 只会执行一次   
        params.onDataCallback(bars, meta);  
        /*if(bars.length > 0){
          if(from < bars[0].time /1000){
            //console.log('定制边界');
            //console.log(new Date(bars[0].time),'边界时间');
            params.onDataCallback([], {noData:true}); 
            return false; 
          }
        }  */
        break;
      case "heartBeat": 
        if(res.data){
          heartCheck.index = parseInt(res.data.times);
          if(!hasData){
            heartCheck.reset();
          }
          //heartCheck.reset();
        }
        break;
      default:break;
    }
  });

 }
}

export default datafeedUtil

