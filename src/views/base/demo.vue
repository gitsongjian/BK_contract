<template>
  <div class="demo">
  <h1>demo</h1>
    <h1>{{lang}}</h1>
    <h1>{{msg}}</h1>
     <button @click="zhClick">{{ $t("message.chinese") }}</button>
    <button @click="enClick">{{ $t("message.english") }}</button>

   <div class="live">
    <bk-beat :a="textsData"></bk-beat>
  </div>
  </div>
  
</template>
<script>
  import util from '../../common/js/util';
  import bkBeat from "../../components/combox/combox.vue"
  export default {
    name:'demo',
    components:{
      bkBeat
    },
    data(){
      return {
        title: 'demo',
        textsData:['中文','yingwen']
      }
    },
    mounted(){
       //document.cookie="lang="+"ZH";
      //util.getQueryStringByString('ZH');
    },
    computed:{

      lang(){
        return this.$store.state.demo.lang;
      },
      msg(){
        return this.$store.state.base.res.lang;
      },

    },
    methods:{
      zhClick() {
        this._i18n.locale = 'ZH';
        //this.$store.dispatch('chineseAction');
      },
      enClick() {
        this._i18n.locale = 'EN';
        //this.$store.dispatch('englishAction');
      },
     
    }
  }
</script>

<style >
  .demo{
    padding-top:200px;
  }
  .live{
    padding-top: 80px;
  }
</style>