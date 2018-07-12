import Vue from 'vue'
import Router from 'vue-router'
import Todos from '@/components/todos'
import SignIn from '@/components/signin/signin'
import SignUp from '@/components/signup/signup'
import { getCurrentUser } from '@/leancloudAPI'
Vue.use(Router)

const router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'todos',
      component: Todos
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
router.beforeEach((to, from, next) => {
  switch (to.path) {
    case '/':
      next(getCurrentUser() ? undefined : {name: 'signin'})
      break
    case '/signin':
    case '/signup':
      next(getCurrentUser() ? {name: 'todos'} : undefined)
      break
    default:
      next()
  }
})
export default router
