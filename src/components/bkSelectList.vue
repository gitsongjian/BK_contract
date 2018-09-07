<template>
  <ul class="bk_select_list" :style="{display:showList?'block':'none'}">
    <li v-for="item in listData"  @click="selectItemClick(item[attribute[0]])" >{{item[attribute[1]]}}</li>
  </ul>
</template>
<script>
export default {
  name: 'bkSelectList',
  props:['listData','showList','attribute'],
  data () {
    return {
      selectData: ''
    }
  },
  methods:{
    selectItemClick(value) {
      //console.log(value);
      this.$emit('setSelectData',value);
      this.$emit('hideList',false);
    }
   
  }
}
</script>
<style scoped>
.bk_select_list{
  position: absolute;
  top:26px;
  left: 0;
  width: 100%;
  z-index: 999;
  border-radius: 4px;
}
.bk_select_list li{
  width: 100%;
  height: 30px;
  line-height: 30px;
  color:#858CA3;
  background-color:#262C38; 
  font-size: 14px;
  text-align: center;
}
.bk_select_list li:first-child{
  border-radius: 4px 4px 0 0;
}
.bk_select_list li:last-child{
  border-radius: 0 0 4px 4px;
}
.bk_select_list li:hover{
  background-color: #343A4C;
  color:#BAC1DA;
}

  
</style>