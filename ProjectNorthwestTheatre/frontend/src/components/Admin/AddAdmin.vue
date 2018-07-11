<template>
<!-- Keerthi Chiduruppa - Added Model for adding new admin -->
<div class="card m-5 w-75 align-self-center">
  <div class="card-header">
    <strong ><h1> Add Admin</h1></strong>
  </div>
  <div class="card-body">
     <form class="justify-content-center " @submit.prevent="AddAdmin" id="addadmin">
    <h1 class="h3 mb-3 font-weight-normal"></h1>
    <div class="form-group row justify-content-center">
      <label for="username" class="col-sm-3 text-right col-form-label required">Username:</label>
      <div class="col-sm-4">
        <input type="username" class="form-control" id="username" name="RegUsername" placeholder="Username" required>
      </div>
    </div>
    <div class="form-group row justify-content-center">
      <label for="email" class="col-sm-3 col-form-label text-right required">Email:</label>
      <div class="col-sm-4">
        <input type="email" class="form-control" id="email" placeholder="Email" name="RegEmail" required>
      </div>
    </div>
    <div class="form-group row justify-content-center">
      <label for="inputPassword3" class="col-sm-3 col-form-label text-right required">Password:</label>
      <div class="col-sm-4">
        <input type="password" class="form-control" id="Password" name="RegPassword" placeholder="Password" required>
      </div>
    </div>
    <div class="form-group row justify-content-center">
      <label for="inputPassword3" class="col-sm-3 col-form-label text-right required">Confirm Password:</label>
      <div class="col-sm-4">
        <input type="password" class="form-control" id="confirmpassword" placeholder="Password" required>
      </div>
    </div>

    <button type="reset" class="btn btn-danger">Reset</button>
    <button type="submit" class="btn btn-success">Create Admin</button>
  </form>
  </div>
</div>
</template>

<script>
export default {
  name: 'AddAdmin',
  data () {
    return {
    }
  },
  methods: {
    AddAdmin () {
      var formdata = new FormData(document.querySelector('#addadmin'))
      var data = {
        RegEmail: formdata.get('RegEmail'),
        RegUsername: formdata.get('RegUsername'),
        RegPassword: formdata.get('RegPassword')
      }
      /* global axios url swal */
      axios.create({
        baseURL: url,
        timeout: 1000,
        headers: { 'token': window.localStorage.getItem('AccessToken') }
      }).post('/addadmin', data)
        .then(res => {
          axios({
            method: 'get',
            headers: {
              token: window.localStorage.getItem('AccessToken')
            },
            url: url + '/all'
          })
            .then(response => {
              this.$eventbus.$emit('admindata', response.data)
              this.alert('Admin Added Successfully!', ' ', 'success')
            })
            .catch(err => {
              console.log('error while getting admin list', err)
            })
        })
        .catch(error => {
          this.alert(error.response.data, 'Please try again', 'error')
          console.log(error)
        })
    },
    alert (header, msg, type) {
      swal(
        header,
        msg,
        type
      )
    }
  }
}

// Regular Expression
</script>

<style scoped>
.required:after {
        content: '*';
        color: red;
    }

</style>
