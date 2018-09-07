<template>
  <div>
  <div>
    <div class="account">
      <ul>
        <li class="greenbg" v-for="(item,index) in tabs" :class="{ active:index == num }" @click="tab(index)">
          <span class="font13 huia3">{{ item.name }}</span>
          <div class="blank10"></div>
          <div class="blank5"></div>
          <span class="font16 hui70">{{ item.btc }} BTC</span>
          <div class="blank5"></div>
          <div class="blank5"></div>
          <span class="huia3">≈ {{ item.cny }}</span>
        </li>
      </ul>
    </div>
    <div class="blank20"></div>
    <div class="radio">
      <div class="checkb">
        <input type="checkbox" id="fcdy1" checked="checked" value="1" name="tyxy">
        <label for="fcdy1" class="font14 hui_blue" id="fcdy1">
          隐藏资产为 0 的币种
        </label>
      </div>
    </div>
    <input type="text" placeholder="币种搜索" class="search right">

  </div>
    <div class="blank10"></div>
  <div class="list">
    <div v-for="(itemCon,index) in tabContents" v-show="index ==num">{{ itemCon }}</div>
  </div>
  </div>
</template>

<script>
import { getRequest, getJavaRequest } from '@/axios/axios'
export default {
  name: 'my-asset',
  data: function () {
    return {
      coincny: '',
      currencycny: '',
      cointotal: '',
      currencytotal: '',
      tabs: [],
      tabContents: ['内容一', '内容二'],
      num: 1

    }
  },
  mounted () {
    this.assetHead_data()
  },
  methods: {

    tab (index) {
      this.num = index
    },
    assetHead_data () {
      let params = {
        api_type: 'WEB_API',
        api_method: 'AppAsset_userAsset',
        uid: '779'
      }
      // 请求
      getJavaRequest(params).then((res) => {
        this.cointotal = res.data.coin.coin_amount;
        this.coincny = res.data.coin.cny;
        this.currencytotal = res.data.currency.coin_amount;
        this.currencycny = res.data.currency.cny;
        var tab_coin=[
          {name:'币币交易账户',btc:this.cointotal,cny:this.coincny},
          {name:'OTC交易账户',btc:this.currencytotal,cny:this.currencycny}
        ]
        this.tabs = tab_coin;
        console.log(res);


        console.log(this.cointotal)
      })
    }

  }
}
</script>

<style scoped>
  @import "../../styles/trading_oct.css";
</style>
