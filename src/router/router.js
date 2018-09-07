import VueRouter from 'vue-router'

import base from '@/views/base/base' //demo
import demo from '@/views/base/demo'

/*xf*/
import index from '@/views/home/index'
import register from '@/views/register/register'


/*czw*/
import consignRecords from '@/views/consignRecords/consignRecords.vue'//
import bbTrades from '@/views/bbTrades/bbTrades.vue'

/*zyw*/
import TradeManager from '@/views/tradeManager/tradeManager.vue'
import drawMoney from '@/views/tradeManager/drawMoney.vue'
import myAsset from '@/views/tradeManager/myAsset.vue'


let routes = [
  //demo
  {
    path: '/',
    name: 'index',
    component: index,
  },
  {
    path: '/base',
    name: 'base',
    component: base,
  },
  {
    path: '/demo',
    name: 'demo', 
    component: demo,
    children:[
    { path: '/', component: demo, name: '例子'},
    ]
  },
  {
    path: '/consignRecords',
    name: 'consignRecords', 
    component: consignRecords,

  },
  {
    path: '/bbTrades/:symbol',
    name: 'bbTrades', 
    component: bbTrades,
  },
  {
    path: '/register',
    name: 'register', 
    component: register,
  },
  {
    path: '/tradeManager',
    name: '交易管理',
    component: TradeManager,
    children: [
      { path: '/myAsset', name: 'assetLink', component: myAsset },
      { path: '/drawMoney', name: 'drawMoneyLink', component: drawMoney }
    ]
  },

];

//export default routes;

export default new VueRouter({
  routes: routes
})
