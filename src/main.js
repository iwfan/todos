// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import { init } from './leancloudAPI'
import 'normalize.css'
import 'vuetify/dist/vuetify.min.css'
// import 'material-design-icons-iconfont/dist/material-design-icons.css'
import App from './App'
import router from './router'
import Bus from './plugin/Bus'

Vue.use(Vuetify)
Vue.use(Bus)
Vue.config.productionTip = false
// leancloud init
init().then(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
})
