<template>

  <div class="trad_head">
    <span class="tit">
     资产管理
    </span>
    <ul class="head_ul">
      <li class="line">
        <router-link :to="{name:'assetLink'}">我的资产</router-link>
      </li>
      <li>
        <router-link :to="{name:'drawMoneyLink'}">充币</router-link>
      </li>
      <li><a href="#">提币</a></li>
      <li><a href="#">划转</a></li>
      <li><a href="#">福利</a></li>
      <li><a href="#">资产记录</a></li>
    </ul>
    <div class="zhehe select_li">
      <div class="nav">
        <p class="set">折合总资产 (BTC)</p>
        <ul class="new" style="display: none;">
          <li>Bitfinex1</li>
          <li>Bitfinex2</li>
          <li>Bitfinex3</li>
        </ul>
      </div>
      <div class="blank2"></div>
      <div class="cny">
        <span class="hui38">15.03702302 BTC</span><span class="huia3"> ≈ 600000.00 CNY</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'managerHead'
}
</script>

<style scoped lang="stylus">
  @import "../../styles/trading_oct.css";

</style>
