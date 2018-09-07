<template>
  <div class="bk-beat">
    <span class="chin" :class="{lanbgs:this.lanbg}" @click="langcut"></span>
    <bk-selbind :class="{iShow:this.lanbg}" :textsData="a"></bk-selbind>
  </div>
</template>

<script>
  import bkSelbind from './comboxlist.vue'
  export default {
    name: "bkBeat",
    components:{
       bkSelbind,
    },
    data(){
      return {
        lanbg:false,
      }
    },
    props:['a'],
    methods:{
      langcut(event){
        this.lanbg === false? this.lanbg=true : this.lanbg=false;
        console.log(1);
      },
    }
  }
</script>

<style lang="scss">
  .bk-beat{
    height: 20px;
    position:relative;
    .chin{
      display:block;
      width: 44px;
      height: 20px;
      cursor:pointer;
      background:url("../../assets/index/pic_daohang_weizhaikai.png") no-repeat 38px center;
      background-size:6px 3px
    }
    .lanbgs{
      background:url("../../assets/index/pic_daohang_zhaikai.png") no-repeat 38px center;
    }
    .bk-selbind{
      border-radius:4px;
      background-color:#262C38;
      position:absolute;
      top: 34px;
      left: -96%;
      padding:11px 0;
      display: none;
      .triangle_border_up{
        width:0;
        height:0;
        border-width:0 12px 4px;
        border-style:solid;
        border-color:transparent transparent #262C38;/*透明 透明  灰*/
        margin:0 auto;
        position:relative;
        top: -15px;
      }
      li{
        width: 120px;
        height: 34px;
        cursor:pointer;
        font-size:13px;
        color: #BAC1DA;
        text-align:center;
        line-height:34px;
      }
      li:hover{
        background-color:#343A4C;
      }
    }
    .iShow{
      display: block;
    }
  }
</style>