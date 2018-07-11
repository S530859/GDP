import Vue from 'vue'
import Router from 'vue-router'
import UserDashboard from '../components/User/UserDashboard.vue'
import AdminLogin from '../components/Admin/AdminLogin.vue'
import UserReservation from '../components/User/UserShowReservation.vue'
import AdminDashboard from '../components/Admin/AdminDashboard.vue'
import AddAdmin from '../components/Admin/AddAdmin.vue'
import AddSection from '../components/Admin/AddSection.vue'
import Guard from '../services/authservice'
import AdminList from '../components/Admin/AdminList.vue'
import Admin from '../components/Admin/Admin.vue'
import PageNotFound from '../components/Admin/PageNotFound.vue'
import SectionList from '../components/Admin/SectionList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'UserDashboard',
      component: UserDashboard
    },
    {
      path: '/user/reservation',
      name: 'UserReservation',
      component: UserReservation
    },
    {
      path: '/admin',
      component: Admin,
      children: [
        {
          path: 'login',
          name: 'AdminLogin',
          beforeEnter: Guard.auth,
          component: AdminLogin
        },
        {
          path: 'dashboard',
          name: 'AdminDashboard',
          beforeEnter: Guard.auth,
          component: AdminDashboard
        },
        {
          path: 'addadmin',
          name: 'AddAdmin',
          beforeEnter: Guard.auth,
          component: AddAdmin
        },
        {
          path: 'addsection',
          name: 'AddSection',
          beforeEnter: Guard.auth,
          component: AddSection
        },
        {
          path: 'adminlist',
          name: 'AdminList',
          beforeEnter: Guard.auth,
          component: AdminList
        },
        {
          path: 'sectionlist',
          name: 'SectionList',
          beforeEnter: Guard.auth,
          component: SectionList
        }
      ]
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ]
})
