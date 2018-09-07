import Vue from 'vue'
import Vuex from 'vuex'

import baseModules from '../modules/baseModules'//demo
import demoModules from '../modules/demoModules'//demo

import commonModules from '../modules/commonMoudles'//公共状态管理模块

Vue.use(Vuex)
const store = new Vuex.Store({
    modules:{
      base:baseModules, //demo
      demo:demoModules, //demo

      common:commonModules,
    }
})
export default store