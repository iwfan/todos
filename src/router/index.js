import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import Login from '@/components/login/Login'
import { init, getCurrentUser } from '@/assets/js/leadCloudUtil'
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      beforeEnter (to, from, next) {
        if (!from.name) {
          init()
        }
        if (!getCurrentUser()) {
          next({name: 'login'})
        } else {
          next()
        }
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter (to, from, next) {
        if (!from.name) {
          init()
        }
        if (getCurrentUser()) {
          next({name: 'index'})
        } else {
          next()
        }
      }
    }
  ]
})

export default router
