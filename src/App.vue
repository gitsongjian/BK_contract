<template>
  <div id="app">
    <headers/>
    <router-view/>
    <footers/>
  </div>
</template>

<script>
import headers from './views/communal/header.vue'
import footers from './views/communal/foot.vue'
export default {
  name: 'App',
  components:{
    headers,
    footers,
  }
}
</script>

<style>
@import './styles/reset.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
