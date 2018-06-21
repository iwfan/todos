// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import AV from 'leancloud-storage'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$AV = AV
// const APPID = 'PwJpIXfhKL1WH0QDmdutG9Eb-gzGzoHsz'
// const APPKEY = 'RPeMx26ScrwDY2Iutozf2vR1'

/* eslint-disable no-new */
new Vue({
  el: '#todos',
  router,
  components: { App },
  template: '<App/>',
  created () {
    // AV.init({ appId: APPID, appKey: APPKEY })
  }
})
