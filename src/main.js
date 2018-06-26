// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import { init } from '@/assets/js/leadCloudUtil'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'
import 'normalize.css'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.component('icon', Icon)
// leancloud init
init()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
