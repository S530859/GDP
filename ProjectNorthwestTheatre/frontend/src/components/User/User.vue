<template>
  <Navbar class="container-fluid">
       <router-view></router-view>
  </Navbar>
</template>
<script>
import Navbar from './UserNavbar.vue'
export default {
  name: 'User',
  data () {
    return {
    }
  },
  components: {
    Navbar
  }
}
</script>
<style>

</style>
