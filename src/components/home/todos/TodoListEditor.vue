<template lang="pug">
  // hide-overlay
  v-dialog(
    content-class="addTodoDialog"
    v-model="visible"
    scrollable
    persistent
    width="600px"
    )
    v-container.elevation-1
      v-layout
        v-flex
          v-toolbar(
            dense
            flat
            height="40"
            dark
            color="grey darken-3")
            v-icon(v-bind:style="{'color': '#eee'}") flag
            v-spacer
            v-btn(
              icon
              small
              depressed
              flat
              @click="beforeClose")
              v-icon(v-bind:style="{'color': '#b3b3b3'}") close
          v-card
            v-card-title
              input(
                type=text
                ref="newTodoTitle"
                placeholder="标题"
                v-model.lazy.trim="todoData.title")
            v-divider
            v-card-text
              mavon-editor.editor(
                ref="editor"
                v-model="todoData.content"
                v-bind:subfield="false"
                placeholder="备注"
                v-bind:default-open="editConfig.defaultOpen"
                v-bind:toolbars-flag="false"
                v-bind:box-shadow="false")
            v-card-actions
              v-tooltip(
                top
                v-if="categories"
                )
                v-menu(
                  slot="activator"
                  bottom
                  origin="center center"
                  transition="scale-transition"
                )
                  v-btn(icon slot="activator" small)
                    v-icon(v-bind:style="{'color': '#666666'}") flag
                  v-list(
                    dense
                  )
                    v-list-tile(
                      v-for="(item, key, index) in categories"
                      v-bind:key="key"
                      v-on:click="selectedCate = item"
                    )
                      v-list-tile-title {{ item.name }}
                span 分类
              v-chip(
                v-if="selectedCate"
                v-model="showSelectedCate"
                close
                small
                ) {{ selectedCate.name }}
              //v-tooltip(top)
                v-menu(
                  slot="activator"
                )
                  v-btn(icon slot="activator")
                    v-icon(:style="{'color': '#666666'}") priority_high
                  v-list
                    v-list-tile(
                      v-for="(item, index) of ['高', '中', '低', '无']"
                      v-bind:key="index")
                      v-list-tile-title {{ item }}
                span 设置优先级
              v-tooltip(top)
                v-btn(
                  icon
                  small
                  slot="activator"
                  v-on:click="togglePreview")
                  v-icon(:style="{'color': editConfig.defaultOpen === 'edit' ? '#666666' : '#1976d2'}") remove_red_eye
                span 预览
              v-spacer
              v-btn(
                color="primary"
                v-on:click="beforeSave"
                v-bind:loading="saveLoading") 添加
</template>

<script>
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  name: 'todoEditor',
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    categories: {
      type: Object,
      default: null
    },
    onSave: {
      type: Function
    }
  },
  data() {
    return {
      saveLoading: false,
      selectedCate: '',
      showSelectedCate: true,
      editConfig: {
        defaultOpen: 'edit'
      },
      todoData: {
        title: '',
        content: '',
        categories: ''
      }
    }
  },
  watch: {
    showSelectedCate() {
      this.selectedCate = ''
    },
    selectedCate(val) {
      this.showSelectedCate = true
      this.todoData.categories = (val && val.id) || ''
    }
  },
  methods: {
    getRealLen(str) {
      // eslint-disable-next-line
      return str.replace(/[^\x00-\xff]/g, '__').length
    },
    validate() {
      const lt = this.getRealLen(this.todoData.title)
      if (!lt) {
        this.$emit('showToast', 'error', '就不知道要填个标题？')
        return false
      }
      if (lt > 200) {
        this.$emit('showToast', 'error', '标题太长了呦， 不要超过200个字符。')
        return false
      }
      const lc = this.getRealLen(this.todoData.content)
      if (lc > 2000) {
        this.$emit('showToast', 'error', '内容太长了呦， 不要超过2000个字符。')
        return false
      }
      return true
    },
    reset() {
      this.todoData.title = ''
      this.todoData.content = ''
      this.editConfig.defaultOpen = 'edit'
      this.selectedCate = ''
      this.showSelectedCate = true
    },
    beforeClose() {
      this.reset()
      this.$emit('close')
    },
    beforeSave() {
      if (this.validate()) {
        this.saveLoading = true
        this.onSave(this.todoData).then(() => {
          this.saveLoading = false
          this.beforeClose()
        })
      }
    },
    onEscUp(evt) {
      if (evt.keyCode === 27) {
        this.beforeClose()
      }
    },
    togglePreview() {
      if (this.editConfig.defaultOpen === 'edit') {
        this.editConfig.defaultOpen = 'preview'
      } else {
        this.editConfig.defaultOpen = 'edit'
      }
    }
  },
  components: {
    mavonEditor
  },
  mounted() {
    document.addEventListener('keyup', this.onEscUp)
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.onEscUp)
  }
}
</script>

<style lang="stylus">
.v-note-wrapper .v-note-op .v-left-item .op-icon-divider
  display none
.markdown-body code
  display: inline
  color #24292e
  box-shadow none
  font-weight: normal
.v-note-wrapper .v-note-panel .v-note-edit.divarea-wrapper .content-input-wrapper
  padding 8px 20px 15px 20px !important
.v-note-wrapper .v-note-panel
  border: none !important
</style>

<style lang="stylus" scoped>
.addTodoDialog
  .container
    padding 0
    .v-toolbar i
      font-size 20px
    .v-toolbar .v-toolbar__title
      font-size 14px
    .v-card
      .v-card__title
        padding 0
        input
          padding 0 20px
          width 100%
          height: 40px
          font-size 17px
          color #424242
          line-height 40px
          font-weight bolder
      .v-card__text
        padding 0
        height: 300px
        .editor
          width 100%
          height 100%
      .v-card__actions
        padding 10px 20px
        .v-tooltip
          margin 0 3px
</style>
