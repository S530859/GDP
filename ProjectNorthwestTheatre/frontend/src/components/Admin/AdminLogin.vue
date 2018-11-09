<template>
    <div id="AdminLogin">
      <div class="row mt-5">
        <div class="col-sm-6 d-none d-md-block d-lg-block d-xl-block">
           <img class="mb-4 w-50" height = "335px" src="../../assets/logo1.jpg" alt="Theatre Northwest">
        </div>
          <div class="col-sm-6 align-self-center" v-if="resetpasswordpage">
            <div class="card text-white w-100 mb-3" style="max-width: 24rem;">
               <div class="alert alert-danger alert-dismissible fade" role="alert" :class="{ 'd-none': !alert, show: alert}">
                Link Expired
                <button type="button" class="close" aria-label="Close" @click="closealert()">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="card-header bg-success display-4">
                <h1 class="heading"> Reset Password </h1>
               </div>
                <div class="card-body bg-light">
                  <form class="form-signin" @submit.prevent = "confirmresetpasswordsubmit">
                    <div class="mar">
                        <label for="Password" class="sr-only mar">Password</label>
                         <input type="text" v-model="formdata.Password" id="Password" class="form-control"
                          placeholder="Password" required autofocus>
                    </div>
                    <div class="mar">
                        <label for="Confirm_Password" class="sr-only mar">Confirm Password</label>
                         <input type="text" v-model="formdata.Password" id="Confirm_Password" class="form-control"
                          placeholder="Confirm Password" required autofocus>
                    </div>
                  <button class="btn btn-lg btn-danger btn-block mt-4" type="submit">Reset Password</button>
              </form>
              </div>
            </div>
        </div>
         <div class="col-sm-6 align-self-center" v-else-if="forgotclicked">
            <div class="card text-white w-100 mb-3" style="max-width: 24rem;">
               <div class="alert alert-danger alert-dismissible fade" role="alert" :class="{ 'd-none': !alert, show: alert}">
                Incorrect username or password.
                <button type="button" class="close" aria-label="Close" @click="closealert()">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="card-header bg-success display-4">
                <h1 class="heading" id="login">Login</h1>
               </div>
                <div class="card-body bg-light">
                  <form class="form-signin" @submit.prevent = "formsubmit">
                    <div class="mar">
                        <label for="inputEmail" class="sr-only mar">Email address</label>
                  <input type="text" v-model="formdata.Username" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                    </div>
                  <div>
                     <label for="inputPassword" class="sr-only">Password</label>
                  <input type="password" id="inputPassword" v-model="formdata.Password" class="form-control" placeholder="Password" required>
                  </div>
                  <div class="resetpassword">
                      <p class="float-right text-primary" @click="resetclicked">Reset Password?</p>
                  </div>

                  <button class="btn btn-lg btn-success btn-block mt-4" type="submit" >Login</button>
              </form>
              </div>
            </div>
        </div>
         <div class="col-sm-6 align-self-center" v-else>
            <div class="card text-white w-100 mb-3" style="max-width: 24rem;">
               <div class="alert alert-danger alert-dismissible fade" role="alert" :class="{ 'd-none': !alert, show: alert}">
                Incorrect username
                <button type="button" class="close" aria-label="Close" @click="closealert()">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="card-header bg-success display-4">
                <h1 class="heading"> Reset Password </h1>
               </div>
                <div class="card-body bg-light">
                  <form class="form-signin" @submit.prevent = "resetpasswordsubmit">
                    <div class="mar">
                        <label for="inputEmail" class="sr-only mar">Email address</label>
                         <input type="text" v-model="formdata.Username" id="inputEmail" class="form-control"
                          placeholder="Email address" required autofocus>
                    </div>
                  <button class="btn btn-lg btn-danger btn-block mt-4" type="submit" >Get My Reset Link</button>
                  <button class="btn btn-lg btn-success btn-block mt-4" type="button" @click="loginclicked" >Login</button>
              </form>
              </div>
            </div>
        </div>
    <!-- For Mobile device -->
        <div class="col-sm-6 d-md-none d-lg-none d-xl-none">
           <img class="mb-4 w-50" src="../../assets/logoproject.jpg" alt="">
        </div>
      <!-- end mobile Device -->
      </div>
    </div>
</template>

<script>
export default {
  name: 'AdminLogin',
  data () {
    return {
      alert: false,
      formdata: {
        Username: '',
        Password: ''
      },
      forgotclicked: true,
      resetpasswordpage: false
    }
  },
  mounted () {
    if (this.$route.name === 'ResetPassword') {
      this.resetpasswordpage = true
      window.localStorage.setItem('AccessToken', this.$route.query.token)
    }
  },
  methods: {
    formsubmit () {
      let _this = this
      /* Saivarun Illendula - Added API Calls */
      /* global axios url swal */
      axios
        .post(url + '/authenticate', this.formdata)
        .then(function (response) {
          window.localStorage.setItem('AccessToken', response.data.token)
          _this.$router.push('/admin/dashboard')
        })
        .catch(function (error) {
          _this.alert = true
          console.log(error)
        })
    },
    closealert () {
      this.alert = false
    },
    resetclicked () {
      this.forgotclicked = !this.forgotclicked
    },
    loginclicked () {
      this.forgotclicked = !this.forgotclicked
    },
    resetpasswordsubmit () {
      let _this = this
      axios.post(url + '/resetpassword', this.formdata)
        .then(function (response) {
          console.log(response)
          swal(
            response.data,
            'Please Check Your Email for More Details',
            'success'
          )
        })
        .catch(function (error) {
          _this.alert = true
          console.log(error)
        })
    },
    confirmresetpasswordsubmit () {
      let _this = this
      axios.post(url + '/confirmresetpassword', { Password: this.formdata.Password })
        .then(function (response) {
          console.log(response)
          swal(
            response.data,
            'Now you can login with Updated Credentials',
            'success'
          )
          _this.forgotclicked = true
          _this.resetpasswordpage = false
          _this.formdata.Password = ''
          _this.$router.push({ name: 'AdminLogin' })
        })
        .catch(function (error) {
          _this.alert = true
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  align-items: center;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  text-align: center !important;
}
#AdminLogin {
  text-align: center !important;
}
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.heading {
  font-size: 30px;
}

@media only screen and (max-width: 600px) {
  .heading {
    font-size: 25px;
    margin: -10px;
    letter-spacing: 4px;
  }
  .card-header {
    height: 35px;
  }
  .mar {
    padding-bottom: 20px;
  }
  .form-signin {
    padding: 1px;
    /* margin: auto; */
  }
  .align-self-center {
    -ms-flex-item-align: center !important;
    align-self: center !important;
    padding: 1px;
  }
  .card {
    border: 1px solid #28a745;
    margin: 2px;
  }
}

.float-right {
  text-decoration: none;
  cursor: -webkit-grab;
  cursor: grab;
}
</style>
