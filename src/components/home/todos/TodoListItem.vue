<template lang="pug">
  v-expansion-panel-content(
    :hide-actions="!item.content"
    readonly=false
    v-on:mouseenter.native="mouseEnter(item)"
    v-on:mouseleave.native="mouseLeave(item)")
    div(slot="header" )
      template(v-if="item.status === 0")
        v-btn(
          icon
          dark
          flat
          :color="item.hover ? 'green' : 'grey lighten-2'"
          v-on:click.stop="item.status = 1")
          v-icon() check_circle
        span.todo-title {{ item.title }}
        span.todo-control
          v-btn(icon)
            v-icon() edit
      template(v-else)
        v-btn(
          icon
          flat
          color="green"
          v-on:click.stop="item.status = 0"
        )
          v-icon done
        del {{ item.title }}
    v-card(v-if="item.content")
      v-card-text.markdown-body(
      v-html="renderMarkdown(item.content)")
</template>

<script>
import { mavonEditor } from 'mavon-editor'
const markdownIt = mavonEditor.getMarkdownIt()
export default {
  name: 'todoItem',
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      item: Object.assign({}, this.todo, { showDetail: false, hover: false })
    }
  },
  methods: {
    renderMarkdown(md) {
      return markdownIt.render(md)
    },
    mouseEnter(item) {
      item.hover = true
    },
    mouseLeave(item) {
      item.hover = false
    }
  },
  mounted() {
    // console.log(this.todo)
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
  .v-expansion-panel__header
    padding 10px 24px 10px 0px
  .v-card__text.markdown-body
    font-size 15px
    padding 5px 16px 16px 16px
</style>

<style lang="stylus" scoped>
.todo-title
  font-weight: 600
  line-height 48px
  vertical-align middle
.todo-control
  float: right
</style>
