
var ir = sessionStorage.getItem('intervalResolution');
if(ir){
  window.intervalResolution = ir; 
}else{
  //默认初始15分钟
  window.intervalResolution = '15'; 
}
sessionStorage.setItem('intervalResolution',window.intervalResolution);

TradingView.onready(function(){ 
  //清除本地存储的历史数据
  //localStorage.removeItem('wsLocalStorage'); 
  var widget = window.tvWidget = new TradingView.widget({
      //debug: true, 
      fullscreen: false,
      symbol:"BTC/USDT",//"BTC/USDT"
      interval: '5',                                      
      container_id: "tv_chart_container",
      //  BEWARE: no trailing slash is expected in feed URL
      //datafeed: new Datafeeds.UDFCompatibleDatafeed(ws_url),
      datafeed: new Datafeeds.UDFCompatibleDatafeed(),
      library_path: "charting_library/",
      width: "850",
      height:'370',
      locale:"zh",        
      //timeframe:'1D',//设置起始时间                         
      //  Regression Trend-related functionality is not implemented yet, so it's hidden for a while
      drawings_access: { type: 'black', tools: [ { name: "Regression Trend" } ] },
      studies_access: {type:'black',tools:[{name: "Scales"}]},
     // disabled_features: ["use _localstorage_for_settings"],
     // enabled_features: ["study_templates"],
      charts_storage_url: 'http://saveload.tradingview.com',  
      charts_storage_api_version: "1.12",  
      client_id: 'tradingview.com',
      user_id: 'public_user_id',
      theme: "Black",
      //toolbar_bg: '#161920',  
      //hide_side_toolbar: true,
      // autosize: true,
      timezone: "Asia/Shanghai",
      disabled_features: [
        'header_symbol_search',
        'use_localstorage_for_settings',
        'symbol_search_hot_key',
        'header_chart_type',
        'header_compare',
        'header_undo_redo',
        'header_screenshot',
        'header_saveload',
        'timeframes_toolbar',
        'context_menus',
        //'chart_scroll',   
        //'chart_zoom',  
        //'left_toolbar',
        'header_indicators', //图表指标
        // 'header_settings', //设置  
        'header_resolutions',  //时间下拉框
        // 'header_fullscreen_button' //全屏按钮
        //'chart_property_page_timezone_sessions'//时区/交易时段功能
        'chart_property_page_sessions',
        'volume_force_overlay'//k线与销量分开
      ],
      //'header_indicators', //图表指标 'left_toolbar',//左侧工具 'study_templates',//指标右侧下拉按钮,'volume_force_overlay'//k线与销量分开
      enabled_features: ['header_indicators'],   
      //overrides:{"paneProperties.legendProperties.showLegend": false}  //数据信息默认闭合
      overrides:bgBlack,
      custom_css_url: 'night.css' ,
      loading_screen: { backgroundColor: "#161920" }
      //auto_save_delay:'1S'
  });
  widget.onChartReady(function(){  
    // 是否第一次滚动图表
    window.onAutoSaveNeeded_first = false;

    //监听 图表变化
    widget.subscribe('onAutoSaveNeeded', function(){ 
      if(window.onAutoSaveNeeded_first){
        /*var klineConfig = window.bitker.klineConfig; 
         ws.send(JSON.stringify(klineConfig)); 
         console.log('send2')*/
        window.hasWsMessage=false; 
      }else{
        window.onAutoSaveNeeded_first = true; 
      }
      //console.log('tv',window.hasWsMessage) 
    }); 
    //显示隐藏绘图工具
    widget.chart().executeActionById("drawingToolbarAction"); 

    //分时按钮
    createBtn(widget,resolutionBtns);
     /*设置多条线类型*/
      widget.chart().createStudy('Moving Average',false,false,[5,"close",0],null,{'Plot.color':'#965fc4'});
      widget.chart().createStudy('MACD',false,false,26,null,{'Plot.color':'#965fc4'});
      //widget.chart().createStudy('Moving Average',false,true,[10,"close",0],null,{'Plot.color':'#84aad5'});
      //widget.chart().createStudy('Moving Average',false,true,[30,"close",0],null,{'Plot.color':'#55b263'});
      //widget.chart().createStudy('Moving Average',false,true,[60,"close",0],null,{'Plot.color':'#b7248a'});
  });
})


var resolutionBtns = [
  {label:'1分钟',value:'1'},
  {label:'5分钟',value:'5'},
  {label:'15分钟',value:'15'},
  {label:'30分钟',value:'30'},
  {label:'1小时',value:'60'},
  {label:'2小时',value:'120'},
  {label:'4小时',value:'240'},
  {label:'6小时',value:'360'},
  {label:'12小时',value:'720'},
  {label:'日线',value:'D'},  
  {label:'周线',value:'W'}   
];

function createBtn(widget,data){
  for(let i = 0;i<data.length;i++){
    if(data[i].value == window.intervalResolution){ 
       widget.createButton().attr({class:'button selected',title:data[i].label})
       .on('click', function (e)  {
          if(window.intervalResolution != data[i].value){ 
          //console.log('1',window.intervalResolution);
            sessionStorage.removeItem('lastBar');
            window.hasWsMessage=false; 
            window.intervalResolution = data[i].value; 
            window.dealSuccess = false;
          //console.log('2',window.intervalResolution); 
            $(this).parent().siblings().children().removeClass('selected'); 
            $(this).addClass('selected');
            widget.chart().setResolution(data[i].value);
            sessionStorage.setItem('intervalResolution',window.intervalResolution);
          //console.log('data[i].value',data[i].value); 
          } 
     
    ;})
    .append($('<span>'+data[i].label+'</span>'));  
    }else{
     widget.createButton().attr('title', data[i].label)             
        .on('click', function (e) {
          if(window.intervalResolution != data[i].value){ 
          //console.log('1',window.intervalResolution);
            window.hasWsMessage=false; 
            window.intervalResolution = data[i].value; 
            window.dealSuccess = false;
          //console.log('2',window.intervalResolution); 
            $(this).parent().siblings().children().removeClass('selected'); 
            $(this).addClass('selected');
            widget.chart().setResolution(data[i].value);
            sessionStorage.removeItem('lastBar'); 
            sessionStorage.setItem('intervalResolution',window.intervalResolution);
          //console.log('data[i].value',data[i].value); 
          } 
        ;})
        .append($('<span>'+data[i].label+'</span>'));
        }
      }


}

var bgBlack = {
    "paneProperties.legendProperties.showLegend":false,//symbol名称显示隐藏
    //"mainSeriesProperties.style": 0, //线图 文字颜色样式
    "paneProperties.background":"#161920", // 图表背景色, 
    "paneProperties.vertGridProperties.color":"#1B202B", //网格颜色,
    "paneProperties.horzGridProperties.color":"#1B202B", //网格颜色,
    //"symbolWatermarkProperties.transparency": 50,
    "scalesProperties.textColor" : "#555E70",//名称字体颜色
    "scalesProperties.lineColor" : "#555E70",//坐标颜色

    "paneProperties.topMargin": 20,

    "mainSeriesProperties.hollowCandleStyle.upColor": "#3D8560",//柱图颜色
    "mainSeriesProperties.hollowCandleStyle.downColor": "#97403A",//柱图颜色

    /*k线样式*/
    "mainSeriesProperties.candleStyle.upColor": "#3D8560",
    "mainSeriesProperties.candleStyle.downColor": "#97403A", //"#d75442",
    "mainSeriesProperties.candleStyle.drawWick": true,
    "mainSeriesProperties.candleStyle.drawBorder": true,
    //"mainSeriesProperties.candleStyle.borderColor": "#378658",
    "mainSeriesProperties.candleStyle.borderUpColor": "#3D8560",
    "mainSeriesProperties.candleStyle.borderDownColor": "#97403A",
    "mainSeriesProperties.candleStyle.wickUpColor": '#3D8560',//k up 线颜色 上下线
    "mainSeriesProperties.candleStyle.wickDownColor": '#97403A',//k down 线颜色 上下线
    "mainSeriesProperties.candleStyle.barColorsOnPrevClose": false

    /* "paneProperties.background": "#ffffff",
    "paneProperties.vertGridProperties.color": "#E6E6E6",
    "paneProperties.vertGridProperties.style": "LINESTYLE_SOLID",
    "paneProperties.horzGridProperties.color": "#E6E6E6",
    "paneProperties.horzGridProperties.style": "LINESTYLE_SOLID",
    "paneProperties.crossHairProperties.color": "#989898"*/


    /*"paneProperties.leftAxisProperties.autoScale":true   ,              
    "paneProperties.leftAxisProperties.autoScaleDisabled":false  ,        
    "paneProperties.leftAxisProperties.percentage":false,
    "paneProperties.leftAxisProperties.percentageDisabled":false,
    "paneProperties.leftAxisProperties.log":false,
    "paneProperties.leftAxisProperties.logDisabled":false,
    "paneProperties.leftAxisProperties.alignLabels":true,*/
    
}