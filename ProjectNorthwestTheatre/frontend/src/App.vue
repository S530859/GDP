<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
/* @import '../node_modules/font-awesome/css/font-awesome.css'; */
@import '../node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker.css';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container-fluid {
    padding-right:0;
    padding-left:0;
    margin-right:auto;
    margin-left:auto
 }
</style>
