import Vue from 'vue'
import Router from 'vue-router'
import Todos from '@/components/todos'
import Login from '@/components/login/Login'
import { getCurrentUser } from '@/assets/js/leadCloudUtil'
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'todos',
      component: Todos,
      beforeEnter (to, from, next) {
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
