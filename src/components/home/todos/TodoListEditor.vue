<template lang="pug">
  // hide-overlay
  v-dialog(content-class="addTodoDialog" v-model="visible" scrollable persistent width="600px")
    v-container.elevation-1
      v-layout
        v-flex
          v-toolbar(dense flat height="40" dark color="grey darken-3")
            v-toolbar-title(:style="{'color': '#e3e3e3'}") 添加事项
            v-spacer
            v-btn(icon small depressed flat @click="beforeClose")
              v-icon(:style="{'color': '#b3b3b3'}") close
          v-card
            v-card-title
              input(type=text ref="newTodoTitle" placeholder="标题" v-model.lazy.trim="title")
            v-card-text
              mavon-editor.editor(
                v-model="content"
                :subfield="false"
                placeholder="备注"
                :editable="true"
                :box-shadow="false"
                :toolbars="toolbar")
            v-card-actions
              v-btn(icon)
                v-icon(:style="{'color': '#666666'}") flag
              v-btn(icon)
                v-icon(:style="{'color': '#666666'}") priority_high
              v-btn(icon)
                v-icon(:style="{'color': '#666666'}") event_note
              v-spacer
              v-btn(color="primary" @click="beforeSave" :loading="saveLoading") 添加
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
    todoData: {
      type: Object,
      default() {
        return {}
      }
    },
    onSave: {
      type: Function
    }
  },
  data() {
    return {
      saveLoading: false,
      title: this.todoData.title || '',
      content: this.todoData.content || `\`code\`
\`\`\`javascript
var a = 'hello world'
\`\`\`
      `,
      priority: this.todoData.priority || '',
      categories: this.todoData.categories || '',
      toolbar: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: false, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: false, // 标记
        superscript: false, // 上角标
        subscript: false, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: false, // 链接
        imagelink: false, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: false, // 展示html源码
        help: false, // 帮助
        /* 1.3.5 */
        undo: false, // 上一步
        redo: false, // 下一步
        trash: true, // 清空
        save: false, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: false, // 导航目录
        /* 2.1.8 */
        alignleft: false, // 左对齐
        aligncenter: false, // 居中
        alignright: false, // 右对齐
        /* 2.2.1 */
        subfield: false, // 单双栏模式
        preview: true // 预览
      }
    }
  },
  methods: {
    getRealLen(str) {
      // eslint-disable-next-line
      return str.replace(/[^\x00-\xff]/g, '__').length
    },
    validate() {
      const lt = this.getRealLen(this.title)
      if (lt > 50) {
        this.$emit('showToast', 'error', '标题太长了呦， 不要超过50个字符。')
        return false
      }

      const lc = this.getRealLen(this.content)
      if (lc > 500) {
        this.$emit('showToast', 'error', '内容太长了呦， 不要超过500个字符。')
        return false
      }

      return true
    },
    reset() {
      this.title = ''
      this.content = ''
    },
    beforeClose() {
      this.reset()
      this.$emit('close')
    },
    beforeSave() {
      if (this.validate()) {
        this.saveLoading = true
        this.onSave({
          title: this.title,
          content: this.content,
          priority: 0
        }).then(() => {
          this.saveLoading = false
          this.beforeClose()
        })
      }
    }
  },
  components: {
    mavonEditor
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
        padding 0 20px
        input
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
</style>
