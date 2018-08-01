<template lang="pug">
  v-container.todos-wrapper(fluid fill-height align-center grid-list-md)
    v-layout(column wrap)
      v-flex
        v-list(subheader)
        v-subheader {{ dpName }} {{ todosData.length }}
        template(v-if="todosData && todosData.length")
          v-expansion-panel()
              v-expansion-panel-content(v-for="(item, index) in todosData" :key="item.id" expand-icon="menu-down")
                div(slot="header")
                  v-checkbox(:label="item.title")
                v-card
                  v-card-text.markdown-body(v-html="mark(item.content)")
        template(v-else)
          v-alert(:value="true" type="info" outline) 干净的像你的脑子一样
</template>

<script>
import TodoItem from './TodoListItem'
import Markdownit from 'markdown-it'
import hljs from 'highlightjs'
const md = new Markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (__) {}
    }
    return '' // use external default escaping
  }
})
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
  methods: {
    mark(input) {
      return md.render(input)
    }
  },
  created() {
  },
  components: {
    TodoItem
  }
}
</script>

<style lang="stylus">
  .v-card__text code
    display: inline
    color #24292e
    box-shadow none
    font-weight: normal
    background-color rgba(27,31,35,.05)
  .v-card__text p
    margin 0
</style>

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
