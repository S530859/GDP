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
import UserCancelTicket from '../components/User/UserCancelTicket.vue'
import UserShow from '../components/User/UserShow.vue'
import User from '../components/User/User.vue'
import CancelTicket from '../components/Admin/CancelTicket.vue'
import UserDirections from '../components/User/UserDirections.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/user',
      name: 'User',
      component: User,
      children: [
        {
          path: 'dashboard',
          name: 'Userdashboard',
          component: UserDashboard
        },
        {
          path: 'usershow',
          name: 'UserShow',
          component: UserShow
        },
        {
          path: 'reservation',
          name: 'UserReservation',
          component: UserReservation
        },
        {
          path: 'CancelTicket',
          name: 'UserCancelTicket',
          component: UserCancelTicket
        },
        {
          path: 'directions',
          name: 'UserDirections',
          component: UserDirections
        }
      ]
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
        },
        {
          path: 'cancelticket',
          name: 'cancelticket',
          beforeEnter: Guard.auth,
          component: CancelTicket
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
