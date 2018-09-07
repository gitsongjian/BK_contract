<template>
  <div>
    <img src="../../assets/icon_yztg.svg" height="200" width="200">
    <p>{{title}}</p>
    <p>{{ $t("message.language") }}</p>
    <p>{{count}}</p>
    <p>{{msg}}</p>
    <button @click="add">增加数值</button>
    <button @click="requestAction">java</button>
    <button @click="testAction">php</button>
  </div>
</template>
<script>
  import util from '../../common/js/util';
  import {getRequest,getJavaRequest} from '@/axios/axios'
  export default {
  name: 'test',
  data(){
    return {
      title: 'demo'
    }
  },
  mounted(){
    //util.getQueryStringByString('ZH');
  },
  computed:{
    count() {
      return this.$store.state.base.count;
    },
    msg(){
      return this.$store.state.base.res.msg;
    },
    res(){
      return this.$store.state.base.res;
    }
  },
  methods:{
    add() {
      this.$store.dispatch('actionIncrease');
    },
    requestAction(){
      let params = {
        api_type:"WEB_API",
        api_method:"AppTrans_Banner",
        site_type:1
      }
      this.$store.dispatch('requestAction',params);
    },
    testAction(){
      let params = {
        api_type:"WEB_API",
        api_method:"AppTrans_Banner",
        username:1
      }
      getRequest(params).then((res) => {
        console.log('res',res);
        if(res.status != 200){

        }else{
          
        }
      }).catch(() => {
      });
    }
   
  }
}
</script>
