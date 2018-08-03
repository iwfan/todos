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
              v-bind:todo="item")
        template(v-else)
          v-alert(
            v-bind:value="true"
            type="info"
            outline) 干净的像你的脑子一样
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
  components: {
    TodoItem
  }
}
</script>

<style lang="stylus" scoped>
.todos-wrapper
  padding 0 20px
</style>
