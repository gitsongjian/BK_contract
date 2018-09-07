import $ from 'jquery';

const datafeedConfig = (params) => {
  const {symbol, resolution, Datafeeds, serverUrl ,symbolId} = params;

  return {
    debug: false,
    fullscreen: false,
    symbol: symbol,
    interval: resolution,
    container_id: 'tv_chart_container',
    datafeed: new Datafeeds.UDFCompatibleDatafeed(serverUrl,symbol,symbolId),
    library_path: "../../../../static/charting_library/",
    width: '100%',
    height:'530',
    locale: 'zh',//待修改
    drawings_access: { type: 'black', tools: [ { name: "Regression Trend" } ] },
    studies_access: {type:'black',tools:[{name: "Scales"}]},
    // disabled_features: ["use _localstorage_for_settings"],
    // enabled_features: ["study_templates"],
    charts_storage_url: 'http://saveload.tradingview.com',  
    charts_storage_api_version: "1.12",
    // autosize: true,
     theme: "Black",
    //toolbar_bg: '#161920',  
    //hide_side_toolbar: true,
    // autosize: true,
    timezone: 'Asia/Shanghai',
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
        'left_toolbar',
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
    client_id: 'tradingview.com',
    user_id: 'public_user_id',
    /*         time_frames: [
              { text: "1min", resolution: "5s", description: "1 min" },
              { text: "1h", resolution: "1", description: "1 hour" },
              { text: "1d", resolution: "5", description: "1 Days" },
            ], */
    overrides:bgBlack,
    custom_css_url: 'night.css' ,
    loading_screen: { backgroundColor: "#161920" }
  };
};

const bgBlack = {
    "paneProperties.legendProperties.showLegend":false,//symbol名称显示隐藏
    //"mainSeriesProperties.style": 0, //线图 文字颜色样式
    "paneProperties.background":"#0C0D0F", // 图表背景色, 
    "paneProperties.vertGridProperties.color":"#191F2B", //网格颜色,191F2B
    "paneProperties.horzGridProperties.color":"#191F2B", //网格颜色,
    //"symbolWatermarkProperties.transparency": 50,
    "scalesProperties.textColor" : "#444D5E",//名称字体颜色
    "scalesProperties.lineColor" : "#4B5667",//坐标颜色

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

/*
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


}*/

const chartReady = (widget,resolution) => {
  const resolutionBtns = [

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


  let btn = {};

  const handleClick = (e, value) => {
    
    widget.chart().setResolution(value);
    $(e.target).addClass('select').closest('div.space-single').siblings('div.space-single').find('div.button').removeClass('select');
  };

  resolutionBtns.forEach((v, i) => {
    if(v.value == resolution ){
       btn = widget.createButton().attr({class:'button select'}).on('click', (e) => {
        handleClick(e, v.value);
      });
       // widget.createButton().attr({class:'button selected',title:data[i].label})
    }else{
       btn = widget.createButton().on('click', (e) => {
        handleClick(e, v.value);
      });
      
    }
    btn[0].innerHTML = v.label;
    btn[0].title = v.label;
    /*btn = widget.createButton().on('click', (e) => {
      handleClick(e, v.value);
    });
    btn[0].innerHTML = v.label;
    btn[0].title = v.label;*/
  });
};

export default {
  datafeedConfig,
  chartReady,
};
