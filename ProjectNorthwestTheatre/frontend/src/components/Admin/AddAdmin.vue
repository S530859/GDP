<template>
<!-- Keerthi Chiduruppa - Added Model for adding new admin -->
<div class="card m-5 w-75 align-self-center">
  <div class="card-header">
    <strong ><h1> Add Admin</h1></strong>
  </div>
  <div class="card-body">
     <form class="justify-content-center " @submit.prevent="AddAdmin" id="addadmin" autocomplete="new-password">
    <h1 class="h3 mb-3 font-weight-normal"></h1>
    <div class="form-group row justify-content-center">
      <label for="username" class="col-sm-3 text-right col-form-label required">Username:</label>
      <div class="col-sm-4">
        <input type="username" class="form-control" id="username" name="RegUsername" placeholder="Username" autofocus="autofocus" required>
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
        <input type="password" class="form-control" id="Password" name="RegPassword" placeholder="Password" @click="seen = true" @input="password_check" v-model="message" autocomplete="false" required>
        <div class="text-left" v-if="seen">
          <p class="frmValidation" :class="{'frmValidation--passed' : message.length > 6}"><i class="frmIcon fas" :class="message.length > 6 ? 'fa-check' : 'fa-times'"></i> 6 Characters Long</p>
          <p class="frmValidation" :class="{'frmValidation--passed' :has_uppercase }"><i class="frmIcon fas" :class="has_uppercase ? 'fa-check' : 'fa-times'"></i> One Uppercase Letter</p>
          <p class="frmValidation" :class="{'frmValidation--passed' : has_number }"><i class="frmIcon fas" :class="has_number ? 'fa-check' : 'fa-times'"></i> One Number</p>
          <p class="frmValidation" :class="{'frmValidation--passed' : has_special }"><i class="frmIcon fas" :class="has_special ? 'fa-check' : 'fa-times'"></i> Has a special character</p>
        </div>

      </div>
    </div>
    <div class="form-group row justify-content-center">
      <label for="inputPassword3" class="col-sm-3 col-form-label text-right required">Confirm Password:</label>
      <div class="col-sm-4">
        <input type="password" class="form-control" id="confirmpassword" placeholder="Confirm Password" @input="password_match" v-model="message2"  @focus="seen2 = true">
      </div>
    </div>
         <p v-if="seen2" id="pwmatch" class="frmValidation" :class="{'frmValidation--passed' : pmatch }"><i id="cpSymbol" class="frmIcon fas fa-times"></i> Password Matched</p>
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
      message: '',
      has_number: false,
      has_lowercase: false,
      has_uppercase: false,
      has_special: false,
      pmatch: false,
      message2: '',
      seen: false,
      seen2: false
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
      /* global axios url swal $ */
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
    },
    password_check () {
      this.has_number = /\d/.test(this.message)
      this.has_lowercase = /[a-z]/.test(this.message)
      this.has_uppercase = /[A-Z]/.test(this.message)
      this.has_special = /[!@#$%^&*)(+=._-]/.test(this.message)
    },

    password_match () {
      if ($('#Password').val() === $('#confirmpassword').val()) {
        $('#cpSymbol').addClass('fa-check')
        $('#cpSymbol').removeClass('fa-times')
        $('#cpSymbol').css('color', '#00A41E')
      } else {
        $('#cpSymbol').addClass('fa-times')
        $('#cpSymbol').removeClass('fa-check')
        $('#cpSymbol').css('color', 'red')
      }
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

.frmField{background-color:white; color:#495057; line-height: 1.25; font-size: 16px; font-family: 'Roboto', sans-serif; border:0; padding: 10px; border:1px solid #dbdbdb;  border-radius: 3px; width:90%;}
.frmLabel{display: block; margin-bottom: 10px; font-weight: bold;}
.frmValidation{font-size: 13px; }
.frmValidation--passed{color:#717b85;}
.frmIcon{color:#EB0029;}
    .frmValidation--passed .frmIcon{color:#0fa140;}

</style>
