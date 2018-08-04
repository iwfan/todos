<template lang="pug">
  v-app#inspire
    template(v-if="!loading")
      v-container.app-wrapper(
        fluid
        fill-height
        align-center)
        v-layout(
          align-center
          justify-start
          column)
          toolbar(@addTodo="addTodoDialog = true")
          v-flex.main-wrapper(fill-height)
            sidebar(
              v-bind:app-data.sync="appData"
              v-on:changeFilter="changeFilter"
              v-on:showToast="showToast")
            todos(
              v-bind:app-data.sync="appData"
              v-bind:dp-name="dpName"
              v-bind:filter-key="filterKey"
              v-bind:filter-value="filterValue"
              v-on:showToast="showToast"
              v-on:editTodo="editTodo($event)"
              )
    v-dialog(
      v-model="loading"
      persistent
      width="300")
      v-card(
        color="primary"
        dark)
        v-card-text 加载中，请稍候...
          v-progress-linear(
            indeterminate
            color="white"
            class="mb-0")
    v-snackbar(
      v-model="showSnackBar"
      v-bind:color="type"
      v-bind:timeout="6000"
      left
      bottom
      :text="msg") {{ msg }}
    todo-editor(
      v-bind:visible="addTodoDialog"
      v-bind:on-save="addNewTodo"
      v-bind:categoriesData="appData.categories"
      v-bind:title="willEditTodo && willEditTodo.title"
      v-on:close="addTodoDialog = false"
      v-on:showToast="showToast")
</template>

<script>
import { findCategories, findTodo, addTodo, updateTodo } from '@/leancloudAPI'
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
      addTodoDialog: false,
      willEditTodo: null
    }
  },
  created() {
    Promise.all([findCategories(), findTodo()]).then(data => {
      this.appData.categories = data[0]
      this.appData.todos = [].sort.call(data[1], (a, b) => a.status > b.status)
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
      console.log(arguments)
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
      if (this.willEditTodo) {
        updateTodo(this.willEditTodo.id, {
          title: data.title,
          content: data.content,
          categories: data.categories
        }).then((todo) => {
          // 修改本地数据
        }).catch(e => {
          this.showToast('error', e)
        }).finally(() => {
          this.willEditTodo = null
          this.addTodoDialog = false
        })
      } else {
        addTodo({
          title: data.title,
          content: data.content,
          categories: data.categories
        }).then(data => {
          this.appData.todos.push(data)
          this.appData.todos.sort((a, b) => a.status > b.status)
        }).catch(e => {
          this.showToast('error', e)
        })
      }
    },
    editTodo(id) {
      this.willEditTodo = this.appData.todos.filter(item => item.id === id)[0]
      this.addTodoDialog = true
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
