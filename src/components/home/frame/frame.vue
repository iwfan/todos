<template lang="pug">
  v-app#inspire
    template(v-if="!loading")
      v-container.app-wrapper(fluid fill-height align-center)
        v-layout(align-center justify-start column)
          toolbar
          v-flex.main-wrapper(fill-height)
            sidebar(:appData.sync="appData"
              @changeFilter="changeFilter"
              @showToast="showToast")
            todos(:appData="appData")
    v-dialog(v-model="loading" persistent width="300")
      v-card(color="primary" dark)
        v-card-text 加载中，请稍候...
          v-progress-linear(indeterminate color="white" class="mb-0")
    v-snackbar(v-model="showSnackBar"
      v-bind:color="type"
      v-bind:timeout="4000"
      left bottom v-bind:text="msg") {{ msg }}
</template>

<script>
import { findCategories, findTodo } from '@/leancloudAPI'
import header from '../header/header'
import sidebar from '../sidebar/sidebar'
import Todos from '../todos/todos'
export default {
  name: 'frame',
  data() {
    return {
      loading: true,
      showSnackBar: false,
      msg: '',
      type: '',
      appData: {
        categories: null,
        todos: null
      }
    }
  },
  created() {
    Promise.all([findCategories(), findTodo()]).then(data => {
      this.appData.categories = data[0]
      this.appData.todos = data[1]
      console.log(this.appData)
    }).catch(e => {
      this.showToast('error', (e.rawMessage) || (e.message) || e)
    }).finally(() => {
      this.loading = false
    })
  },
  mounted() {},
  methods: {
    showToast(type, msg) {
      this.showSnackBar = true
      this.type = type
      this.msg = msg
    },
    changeFilter(fn) {
      console.log(fn)
    }
  },
  components: {
    Todos,
    toolbar: header,
    sidebar
  }
}
</script>

<style lang="stylus" scoped>
.app-wrapper
  padding 0
  .main-wrapper
    position: relative
    z-index: 10
    display flex
    flex-direction row
    flex-wrap nowrap
    justify-content flex-start
    /*overflow hidden*/
    padding-top: 60px
    max-width 1000px
    width 100%
</style>
