import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/Login'
import { getCurrentUser } from '@/assets/js/leadCloudUtil'
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  // ...
  debugger
  console.log(to, from)
  if (from.name && to.path === '/' && !getCurrentUser()) {
    next('/login')
  } else if (to.path === '/login' && getCurrentUser()) {
    next('/')
  } else {
    next()
  }
})

export default router
