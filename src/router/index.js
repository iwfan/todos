import Vue from 'vue'
import Router from 'vue-router'
import { getCurrentUser } from '@/leancloudAPI'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/account',
      /**
       *  Named Route 'account' has a default child route.
       *  When navigating to this named route (:to="{name: 'account'"),
       *  the default child route will not be rendered.
       *  Remove the name from this route and use the name of the default child route for named links instead.
       */
      // name: 'account',
      component: () => import('@/components/account/account'),
      meta: {
        title: '登录'
      },
      children: [
        {
          path: '',
          redirect: 'signin'
        },
        {
          path: 'signin',
          name: 'signin',
          component: () => import('@/components/account/signin/signin'),
          meta: {
            title: '登录'
          }
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('@/components/account/signup/signup'),
          meta: {
            title: '注册'
          }
        },
        {
          path: 'reset',
          name: 'reset',
          component: () => import('@/components/account/reset/reset'),
          meta: {
            title: '重置密码'
          }
        }
      ]
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/components/home/frame/frame'),
      meta: {
        title: 'todos-更好的管理你的代办事项'
      }
    },
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
router.beforeEach((to, from, next) => {
  switch (true) {
    case /^\/index/.test(to.path):
      next(getCurrentUser() ? undefined : { name: 'signin' })
      break
    case /^\/account/.test(to.path):
      next(getCurrentUser() ? { name: 'index' } : undefined)
      break
    default:
      next()
  }
  window.document.title = to.meta.title
  next()
})
export default router
