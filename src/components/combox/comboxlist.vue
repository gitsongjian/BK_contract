<template>
  <ul class="bk-selbind" >
    <div class="triangle_border_up">
    </div>
    <li @click="comTextClick()" v-for="(mast,index) in textsData">{{mast}}</li>
  </ul>
</template>

<script>
  export default {
    name:'bkSelbind',
    props:['textsData'],
    data(){
      return {
        lanbg:false,
      }
    },
    methods:{
      comTextClick(){

      }
    }
  }
</script>

<style lang="scss">
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
</style>