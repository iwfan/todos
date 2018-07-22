<template lang="pug">
  v-container.todos-wrapper(fluid fill-height align-center grid-list-md)
    v-layout(column wrap)
      v-flex
        todo-group(v-for="(item, key, index) in todosData" :key="key" :groupName="getCateName(key)" :todos="item")
    <!--v-btn.edit(absolute right bottom dark fab color="blue darken-2")-->
      <!--v-icon edit-->
</template>

<script>
import TodoGroup from './todoGroup'
import TodoItem from './todoItem'
export default {
  name: 'todos',
  props: {
    appData: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return {
      categories: this.appData.categories
    }
  },
  computed: {
    todosData () {
      return Object.keys(this.appData.categories).reduce((p, c, i, a) => {
        const todos = [].filter.call(this.appData.todos, item => item.categories === c)
        if (todos && todos.length) {
          p[c] = todos
        }
        return p
      }, {})
    }
  },
  methods: {
    getCateName(cateId) {
      return this.categories[cateId].name
    }
  },
  components: {
    TodoGroup,
    TodoItem
  }
}
</script>

<style lang="stylus" scoped>
.todos-wrapper
  flex 1 1 auto
  padding 0 20px
/*  .v-expansion-panel .v-expansion-panel__container:not(.v-expansion-panel__container--active)
    margin-top -1px
    border 1px solid rgba(0,0,0,.12)*/
    /*border-bottom none*/
  .v-list
    background: none
  .list-item
    background-color: #fff
    /*border: 1px solid #ddd*/
    /*margin-bottom: 10px*/
  .cate-name
    font-size 12px
    line-height 24px
    font-weight: blod
    color #616161
    padding: 2px 20px
  /*height: 30px*/
  .edit
    bottom 50%
</style>
