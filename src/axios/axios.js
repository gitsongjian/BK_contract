import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import md5 from 'js-md5'
import util from '../common/js/util'





//axios配置
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded:charset=UTF-8';
axios.interceptors.request.use((config) => {
  if(config.method === 'post'){
    //config.data = qs.stringify(config.data);
  }
  return config;
},(error) => {
  alert('参数错误');
  return Promise.reject(error);
});

//key
const security_code_client = "2018017bitkerclient666";
// 打包前换成0，本地开发用1 跨域反向代理配置  config -> index.js -> proxyTable
let isProxy = 1;
// 请求地址
let base = isProxy ? 'list/api/web' :'/api/web';
let base_java = isProxy ? 'java/web/api' :'/web/api';
let base_test = 'list/alliance_apply'
// 请求参数  全局
let apiParams = {
  //api_requesttime:1532417898,
  api_requesttime:util.setRequestTime(),
  api_source:1,
  //sign:'',
  //key:security_code_client
};

let javaParams = {
  //api_requesttime:1532417898,
  api_requesttime:util.setRequestTime(),
  api_source:1,
  api_version:1,
  api_dev:1,
  dev_type:1,
  app_type:1
  //sign:'',
  //key:security_code_client
};
let javaTime = javaParams.api_requesttime;

//设置签名sign
function setSign(apiParams,params){
  //1.排序 合并参数
  let paramsObj = util.objKeySort(apiParams,params);
  //2. 参数字符串
  let paramsStr = util.setParamsString(paramsObj);
   
  //3.添加key
  paramsStr = paramsStr + '&key' + security_code_client;
  //4.编码 加密 转成大写
  let paramsCode =  md5(decodeURI(paramsStr)).toUpperCase();
  return paramsCode;
}

//Sign=md5(api_requesttime+”_”+所有请求参数值)
function setJavaSign(apiParams,params){
  //1.排序 合并参数
  let paramsObj = util.objKeySort(apiParams,params);
  //delete paramsObj.api_requesttime;
  //2. 参数字符串
  let paramsStr = '';
  for(let item in paramsObj){
    paramsStr += paramsObj[item];
  }
  paramsStr = javaTime + '_' + paramsStr;
 // console.log('paramsStr',paramsStr)
  //3.加密 
  let paramsCode =  md5(paramsStr);
  //console.log('paramsCode',paramsCode)
  return paramsCode;

}

// http get请求
const getRequest = params => { 
  let url = base_test;
  // 当前时间
  apiParams.api_requesttime = util.setRequestTime();
  //合并请求参数
  let requestParams = util.objKeySort(apiParams,params);
  //添加sign参数
  let sign = setSign(apiParams,params);
  requestParams.sign = sign;
  delete requestParams.key;
  return  Vue.http({
            method: 'GET',
            url: url,
            params: requestParams,
            emulateJSON: true
          })
         .then(res => res.body);
  /*.then(function (res) {
        //commit(types.REQUEST_ACTION,res)
      }, function (res) {
        //console.log('error',res)
      })*/
  /*return axios.post(url,requestParams)
        .then(res => res.data);*/
  /*return axios.get(url,requestParams)
        .then(res => res.data);*/
    
} 


const getJavaRequest = params => { 
  let url = base_java;
  // 当前时间
  javaParams.api_requesttime = javaTime;
  //合并请求参数
  let requestParams = util.objKeySort(javaParams,params);
  //添加sign参数
  let sign = setJavaSign(javaParams,params);
  requestParams.api_sign = sign;
  //delete requestParams.key;
  return  Vue.http({
            method: 'POST',
            url: url,
            params: requestParams,
            emulateJSON: true
          })
         .then(res => res.body);
  /*.then(function (res) {
        //commit(types.REQUEST_ACTION,res)
      }, function (res) {
        //console.log('error',res)
      })*/
 /* return axios.post(url,requestParams)
        .then(res => res.data);*/
  /*return axios.get(url,requestParams)
        .then(res => res.data);*/
    
} 

export {getRequest,getJavaRequest} 



