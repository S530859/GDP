<template>
    <div id="AdminLogin">
      <div class="row mt-5">
        <div class="col-sm-6 d-none d-md-block d-lg-block d-xl-block">
           <img class="mb-4 w-50" src="../../assets/logoproject.jpg" alt="">
        </div>
         <div class="col-sm-6 align-self-center">
            <div class="card text-white w-100 mb-3" style="max-width: 24rem;">
               <div class="alert alert-danger alert-dismissible fade" role="alert" :class="{ 'd-none': !alert, show: alert}">
                Incorrect username or password.
                <button type="button" class="close" aria-label="Close" @click="closealert()">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="card-header bg-success display-4">
                <h1 class="heading">  Login </h1>
               </div>
                <div class="card-body bg-light">
                  <form class="form-signin " @submit.prevent = "formsubmit">
                    <div class="mar">
                        <label for="inputEmail" class="sr-only mar">Email address</label>
                  <input type="text" v-model="formdata.Username" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
                    </div>
                  <div>
                     <label for="inputPassword" class="sr-only">Password</label>
                  <input type="password" id="inputPassword" v-model="formdata.Password" class="form-control" placeholder="Password" required>
                  </div>
                 
                  <button class="btn btn-lg btn-success btn-block mt-4" type="submit" >Login</button>
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
      }
    }
  },
  methods: {
    formsubmit () {
      var _this = this
      /* Saivarun Illendula - Added API Calls */
      /* global axios url */
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
.heading{
  font-size: 30px;
}

@media only screen and (max-width: 600px) {
.heading{
  font-size: 25px;
  margin: -10px;
  letter-spacing: 4px;
  
}
.card-header{
  height: 35px;
}
.mar{
  padding-bottom: 20px;
}
.form-signin {
  padding: 1px;
  /* margin: auto; */
}
.align-self-center {
    -ms-flex-item-align: center!important;
    align-self: center!important;
    padding: 1px;
}
.card{
  border: 1px solid #28a745;
  margin: 2px;
}
}


</style>
