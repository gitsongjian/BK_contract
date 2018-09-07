<template>
  <div class="bk_select">
    <input v-model="selectData" :class="showList?'select_ipt select_down':'select_ipt select_up'"  :placeholder='$t("message.om.Coin")' @click="selectClick" readonly="readonly"></input>
    <bk-select-list :listData='listData' :showList='showList' :attribute='attribute'  @setSelectData="setSelectData" @hideList='hideList' ></bk-select-list>
  </div>
</template>
<script>
import bkSelectList from './bkSelectList'
export default {
  name: 'bkSelect',
  components:{
    bkSelectList
  },
  props:['listData','attribute'],
  data () {
    return {
      selectData: '',
      showList:false
    }
  },
  methods:{
    selectClick(){
      this.showList = !this.showList;
    },
    setSelectData(value) {
      this.selectData = value;
      this.$emit('setSelectData', this.selectData);
    },
    hideList(value){
      this.showList = value;
    }
  }
}
</script>
<style scoped>
.bk_select{
  display: inline-block;
  position: relative;
}
.select_ipt{
  width: 70px;
  height: 16px;
  padding: 4px 10px;
  border:1px solid #555E70;
  background-color: #1C2029;
  color: #BAC1DA;
  border-radius: 4px;
  font-size:12px;
}
.select_up{
   background: url(../assets/pic_daohang_zhaikai.png) 80px center no-repeat;
}
.select_down{
  background: url(../assets/pic_daohang_weizhaikai.png) 80px center no-repeat;
}
  
</style>