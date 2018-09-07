<template>
  <div   :class="{ 'bk-prompt': true, 'bk-icon-right': isPrompt == 1,'bk-icon-error': isPrompt == -1}"
   :style="{display:isShow == 0?'none':'block'}" >
    {{promptText}}
  </div>
  
</template>
<script>
export default {
  name: 'bkPrompt',
  props:['isPrompt','promptText'],
  mounted(){
   
  },
  data () {
    return {
      isShow:this.isPrompt
    }
  },
  watch:{
    isShow(){

　　}
  },
  methods:{
    
  }
}
</script>
<style scoped>
.bk-prompt{
  width: 190px;
  height: 60px;
  padding-left: 10px;
  line-height: 60px;
  background-color: #262C38;
  border-radius: 4px;
  font-size: 14px;
  color: #BAC1DA;
  text-align: center;
  position: absolute;
  top:112px;
  left:45%;

  background-position: 20px center;
  background-repeat: no-repeat;

}
.bk-icon-right{
  background-image: url(../assets/icon_chenggong01.png);
}
.bk-icon-error{
  background-image: url(../assets/icon_shibai.png);
}
  
</style>