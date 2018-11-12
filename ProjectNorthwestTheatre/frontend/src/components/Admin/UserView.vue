<template>
<div>
      <div class="border_color" id="left"></div>
    <div class="border_color" id="right"></div>
    <div class="border_color" id="top"></div>
    <div>
             <userDashboard style="padding-left:20px;"></userDashboard>
    </div>
    <div class="border_color" id="bottom">
        <div class="row">
            <div class="col pl-5">
                <p class="text-light"> <span class="mr-2"><i class="fas fa-eye"></i></span>You are currently looking into Audience View</p>
            </div>
            <div class="col pr-5 ">
                  <router-link to="/admin/dashboard" class="float-right btn btn1 btn-success btn-large">
                        <span class="mr-2"><i class="fas fa-home"></i></span>Admin Home Page</router-link>
            </div>
        </div>
    </div>
  

</div>
</template>
<script>
import userDashboard from '../User/UserDashboard' 
import userNavbar from '../User/UserNavbar' 
export default {
  name: "userView",
  components: {
    userDashboard,
    userNavbar
  },

};
</script>

<style>

    .border_color {
        background: #bb109e;
        position: fixed;
        z-index: 2000;
    }

    #left {
        top: 0;
        bottom: 0;
        width: 5px;
        left: 0;
    }

    #right {
        top: 0;
        bottom: 0;
        width: 5px;
        right: 0;
    }

    #top {
        left: 0;
        right: 0;
        height: 5px;
        top: 0;
    }

    #bottom {
        left: 0;
        right: 0;
        /* height: 15px; */
        bottom: 0;
        padding-top: 10px;
        padding-bottom: 10px
    }

    .btn1{
      background-color: white;
      color: #bb109e
    }
</style>
