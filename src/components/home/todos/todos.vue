<template lang="pug">
  v-container.todos-wrapper(fluid fill-height align-center grid-list-md)
    v-layout(column wrap)
      v-flex
        v-list(subheader)
        v-subheader {{ dpName }}
        template(v-if="todosData && todosData.length")
          v-expansion-panel()
              v-expansion-panel-content(v-for="(item, index) in todosData" :key="item.id")
                div(slot="header")
                  v-checkbox(:label="item.title")
                v-card
                  v-card-text(class="grey lighten-3") Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna ali
        template(v-else)
          v-alert(:value="true" type="info" outline) 干净的像你的脑子一样
</template>

<script>
import TodoItem from './todoItem'
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
      // debugger
      return [].filter.call(this.appData.todos, item => {
        if (this.filterKey) {
          return item[this.filterKey] === this.filterValue
        }
        return true
      })
    }
  },
  methods: {
  },
  created() {
  },
  components: {
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
