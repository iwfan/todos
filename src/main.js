// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import AV from 'leancloud-storage'
import App from './App';
import router from './router';
import 'normalize.css'
Vue.config.productionTip = false;
Vue.prototype.$AV = AV
const APPID = 'PwJpIXfhKL1WH0QDmdutG9Eb-gzGzoHsz'
const APPKEY = 'RPeMx26ScrwDY2Iutozf2vR1'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  created() {
    AV.init({ appId: APPID, appKey: APPKEY })
    this.checkUserStatus()
  },
  watch: {
    '$route': this.checkUserStatus
  },
  methods: {
    checkUserStatus() {
      if (AV.User.current()) {
        this.$route.push('/')
      } else {
        this.$route.push('/login')
      }
    }
  }
});
