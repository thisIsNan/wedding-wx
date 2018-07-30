import Vue from 'vue'
import Router from 'vue-router'
import Guests from '@/components/Guests'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/guest',
      name: 'GetGuests',
      component: Guests
    },
    {
      path: '/',
      name: 'Register',
      component: Register
    }
  ]
})
