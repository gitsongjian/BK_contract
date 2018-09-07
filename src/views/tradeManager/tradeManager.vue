<template>
  <div>
    <div class="blank50"></div>
    <div class="blank35"></div>

  <div class="trad_box">
    <div class="trad_kuan">
      <managerHead></managerHead>
      <router-view></router-view>
    </div>
  </div>
  </div>
</template>

<script>
import managerHead from '../../views/tradeManager/managerHead'
import listManager from '../../views/tradeManager/listManager'
export default {
  name: 'trade-manager',
  components: {
    'managerHead': managerHead,
    'listManager': listManager
  }
}
</script>

<style scoped lang="stylus">
  @import "../../styles/trading_oct.css";
</style>
