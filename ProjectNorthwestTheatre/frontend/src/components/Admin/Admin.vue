<template>
  <Navbar :login="login" class="container-fluid">
       <router-view></router-view>
  </Navbar>
</template>
<script>
import Navbar from './AdminNavbar.vue'
export default {
  name: 'Admin',
  data () {
    return {
      login: false
    }
  },
  components: {
    Navbar
  },
  created () {
    /* global axios url */
    axios({
      method: 'post',
      headers: {
        token: window.localStorage.getItem('AccessToken')
      },
      url: url + '/guard'
    })
      .then(function (response) {
        this.login = true
      }.bind(this))
      .catch(function (error) {
        console.log(error)
      })
  },
  watch: {
    $route (to, from) {
      console.log('route')
      if (to.name !== 'AdminLogin') {
        this.login = true
      } else {
        this.login = false
      }
      console.log(this.login)
    }
  }
}
</script>
<style>

</style>
