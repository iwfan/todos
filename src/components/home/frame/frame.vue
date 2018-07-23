<template lang="pug">
  v-app#inspire
    template(v-if="!loading")
      v-container.app-wrapper(fluid fill-height align-center)
        v-layout(align-center justify-start column)
          toolbar(@addTodo="addTodoDialog = true")
          v-flex.main-wrapper(fill-height)
            sidebar(:app-data.sync="appData"
              @changeFilter="changeFilter"
              @showToast="showToast")
            todos(:app-data="appData"
              :dp-name="dpName"
              :filter-key="filterKey"
              :filter-value="filterValue"
              @showToast="showToast")
      v-btn(fixed dark fab right bottom color="primary" @click="addTodoDialog = true")
        v-icon add
    v-dialog(v-model="loading" persistent width="300")
      v-card(color="primary" dark)
        v-card-text 加载中，请稍候...
          v-progress-linear(indeterminate color="white" class="mb-0")
    v-snackbar(v-model="showSnackBar"
      v-bind:color="type"
      v-bind:timeout="6000"
      left bottom v-bind:text="msg") {{ msg }}
      // hide-overlay
    v-dialog(content-class="addTodoDialog" v-model="addTodoDialog" scrollable persistent width="700px")
      v-container.elevation-1
        v-layout
          v-flex
            v-toolbar(dense flat height="40" dark color="grey darken-3")
              v-toolbar-title(:style="{'color': '#e3e3e3'}") 添加事项
              v-spacer
              v-btn(icon small depressed flat @click="addTodoDialog = false")
                v-icon(:style="{'color': '#b3b3b3'}") close
            v-card
              v-card-title
                input(type=text ref="newTodoTitle" placeholder="标题")
              v-divider.mb-2
              v-card-text
                textarea(placeholder="备注" ref="newTodoContent")
              v-card-actions
                v-btn(icon)
                  v-icon(:style="{'color': '#666666'}") flag
                v-btn(icon)
                  v-icon(:style="{'color': '#666666'}") priority_high
                v-btn(icon)
                  v-icon(:style="{'color': '#666666'}") event_note
                v-spacer
                v-btn(color="primary") 添加
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
      },
      filterKey: '',
      filterValue: '',
      dpName: '全部事项',
      addTodoDialog: false
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
    changeFilter(name, key, value) {
      this.dpName = name
      this.filterKey = key
      this.filterValue = value
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
    padding-top: 50px
    max-width 960px
    width 100%
.addTodoDialog
  .container
    padding 0
    .v-toolbar i
      font-size 20px
    .v-toolbar .v-toolbar__title
      font-size 14px
    .v-card
      .v-card__title
        padding 0 20px
        input
          width 100%
          height: 40px
      .v-card__text
        padding 0 20px
        height: 400px
        textarea
          width 100%
          height 100%
          resize: none
      .v-card__actions
        padding 10px 20px
</style>
