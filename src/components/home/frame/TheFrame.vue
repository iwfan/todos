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
    todo-editor(:visible="addTodoDialog" :on-save="addNewTodo" @close="addTodoDialog = false" @showToast="showToast")
</template>

<script>
import { findCategories, findTodo, addTodo } from '@/leancloudAPI'
import header from '../header/TheHeader'
import sidebar from '../sidebar/TheSidebar'
import Todos from '../todos/TodoList'
import TodoEditor from '../todos/TodoListEditor'
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
    },
    async addNewTodo(data) {
      addTodo({
        title: data.title,
        content: data.content,
        priority: data.priority,
        categories: data.categories,
        status: 0
      }).then(data => {
        this.appData.todos.splice(0, 0, data)
      }).catch(e => {
        this.showToast('error', e)
      })
    }
  },
  components: {
    TodoEditor,
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
</style>
