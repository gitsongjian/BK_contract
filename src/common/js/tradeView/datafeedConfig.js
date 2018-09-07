
let datafeedConfig = {};




datafeedConfig.configJSON = 
{
    "supports_search": true,
    "supports_time": true,
    "supports_timescale_marks": false,
    "supports_group_request": false,
    "supports_marks": false,
    "supported_resolutions": ["1", "5", "15", "30", "60", "120", "240", "360", "720", "D", "W"], 
}

datafeedConfig.symbolResolveJSON =  function(symbol){
    let  sr = 
    {
        "name":symbol,// "BTC/USDT", 
        "exchange-traded": "",
        "exchange-listed": "",
        "timezone": "Asia/Shanghai",
        "minmov": 1,
        "minmov2": 0,
        "pointvalue": 1,
        "session": "24x7",     
        // "has_seconds": false,
        // "seconds_multipliers": ["1S", "5S", "15S", "30S"], 
        "has_intraday": true,   
        "intraday_multipliers":["1","5","15","30", "60", "120", "240", "360", "720"],    
        //"intraday_multipliers": ["120", "60", "30", "5", "1"],
        //"supporting marks":true, 
        "has_daily": true,
        "has_weekly_and_monthly":true,    
        "has_empty_bars": true,   
        "force_session_rebuild":false,     
        "has_no_volume": false,
         
        "description": "",
        "type": "Index",
        "supported_resolutions": ["1", "5", "15", "30", "60", "120", "240", "360", "720", "D", "W"],  
        "pricescale": 1000000,//y轴右侧数据精度
        "ticker": symbol,// "BTC/USDT",
    } 
    return sr;
     
}

export default datafeedConfig;



