<template lang="pug">
  v-expansion-panel-content(
    :hide-actions="!item.content"
    expand-icon="arrow_drop_down"
    readonly=false
    v-bind:style="{position: 'relative'}"
    v-on:mouseenter.native="mouseEnter(item)"
    v-on:mouseleave.native="mouseLeave(item)")
    div(slot="header")
      template(v-if="item.status === 0")
        v-btn(
          icon
          dark
          flat
          :loading="item.checkLoading"
          v-bind:color="item.hover ? 'green' : 'grey lighten-2'"
          v-on:click.stop="changeStatus(item.id, 1)")
          v-icon() check_circle
        span.todo-title(v-bind:title="item.title") {{ item.title }}
        span.todo-control(v-if="item.hover" v-bind:key="item.id+'undone'")
          v-btn(icon flat color="primary" v-on:click.stop="editItem(item.id)")
            v-icon() edit
          v-btn(icon flat color="red" v-on:click.stop="$emit('remove', item.id)")
            v-icon delete
      template(v-else)
        v-btn(
          icon
          flat
          color="green"
          v-on:click.stop="changeStatus(item.id, 0)")
          v-icon done
        del.todo-title(v-bind:title="item.title") {{ item.title }}
        span.todo-control(v-if="item.hover" v-bind:key="item.id+'done'")
          v-btn(icon flat color="red" v-on:click.stop="$emit('remove', item.id)")
            v-icon delete
    v-card(v-if="item.content")
      v-card-text.markdown-body(
      v-html="renderMarkdown(item.content)")
</template>

<script>
import { updateTodo } from '@/leancloudAPI'
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
      item: Object.assign({}, this.todo, { checkLoading: false, removeLoading: false, hover: false })
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
    },
    changeStatus(id, status) {
      this.item.checkLoading = true
      updateTodo(id, { status })
        .then(() => {
          this.todo.status = status
          this.item.status = status
        })
        .catch((e) => {
          this.$emit('showToast', 'error', e)
        })
        .finally(() => {
          this.item.checkLoading = false
        })
    },
    editItem(id) {
      console.log('edit', id)
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
  display inline-block
  width: 70%
  max-width 600px
  height: 48px
  font-weight: 600
  line-height 48px
  overflow hidden
  vertical-align middle
  text-overflow: ellipsis
  white-space: nowrap
.todo-control
  position absolute
  right: 50px
</style>
