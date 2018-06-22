// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import { init } from '@/assets/js/leadCloudUtil'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Icon from 'vue-awesome/components/Icon'
import 'vue-awesome/icons'
import 'normalize.css'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.component('icon', Icon)

/* eslint-disable no-new */
new Vue({
  el: '#todos',
  router,
  components: { App },
  template: '<App/>',
  created () {
    init()
  }
})
