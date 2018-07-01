import Vue from 'vue'
import Router from 'vue-router'
import UserDashboard from '../components/User/UserDashboard.vue'
import AdminLogin from '../components/Admin/AdminLogin.vue'
import UserReservation from '../components/User/UserShowReservation.vue'
import AdminDashboard from '../components/Admin/AdminDashboard.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: UserDashboard,
      component: UserDashboard
    },
    {
      path: '/admin/login',
      name: AdminLogin,
      component: AdminLogin
    },
    {
      path: '/user/reservation',
      name: UserReservation,
      component: UserReservation
    },
    {
      path: '/admin/dashboard',
      name: AdminDashboard,
      component: AdminDashboard
    }
  ]
})