<template lang="pug">
  v-container.todos-wrapper(
    fluid
    fill-height
    align-center
    grid-list-md)
    v-layout(
      column
      wrap)
      v-flex
        v-subheader {{ dpName }} {{ todosData.length }}
        template(v-if="todosData && todosData.length")
          v-expansion-panel
            todo-item(
              v-for="(item, index) in todosData"
              v-bind:key="item.id"
              v-bind:todo.sync="item"
              v-on:showToast="showToast")
        template(v-else)
          v-alert(
            v-bind:value="true"
            type="info"
            outline) 干净的像你的脑子一样
    v-dialog(v-model="deleteTodoDialog" persistent max-width="400")
      v-card
        v-card-title 删除
        v-card-text 确定删除吗？ (该条数据会移入已删除中)
        v-card-actions
          v-spacer
          v-btn(flat color="green darken-1" v-on:click.native="deleteTodoDialog = false") 取消
          v-btn(flat color="red darken-1"
            v-on:keyup.native.enter="deleteCate"
            v-on:click.native="deleteCate" v-bind:loading="deleteLoading") 删除
</template>

<script>
import TodoItem from './TodoListItem'
export default {
  name: 'todos',
  props: {
    appData: {
      type: Object,
      required: true,
      default: () => ({})
    },
    dpName: {
      type: String,
      required: true
    },
    filterKey: {
      type: String,
      required: true,
      default: ''
    },
    filterValue: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {
      deleteTodoDialog: false,
      categories: this.appData.categories
    }
  },
  computed: {
    todosData () {
      return [].filter.call(this.appData.todos, item => {
        if (this.filterKey) {
          return item[this.filterKey] === this.filterValue
        }
        return true
      })
    }
  },
  methods: {
    showToast(type, msg) {
      this.$emit('showToast', type, msg)
    }
  },
  components: {
    TodoItem
  }
}
</script>

<style lang="stylus" scoped>
.todos-wrapper
  padding 0 20px
  max-width 710px
</style>
