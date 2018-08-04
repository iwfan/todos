<template lang="pug">
  v-flex.header-wrapper
    .header-container
      v-toolbar(dense flat clipped-left dark)
        v-icon spa
        v-toolbar-title.white--text Todos
        v-spacer
        v-tooltip(bottom)
          v-btn(icon slot="activator" @click="$emit('addTodo')")
            v-icon add
          span 添加事项
        //v-tooltip(bottom)
          v-btn(icon slot="activator")
            v-icon search
          span 搜索
        v-speed-dial(v-model="fab" direction="bottom")
          v-btn(slot="activator" v-model="fab" small icon fab)
            v-icon(:style="{'fontSize': '24px'}") account_circle
            v-icon(:style="{'fontSize': '24px'}") close
          v-tooltip(left)
            v-btn(fab dark small slot="activator" color="red" @click.native="dialog = true")
              v-icon power_settings_new
            span 注销
      v-dialog(v-model="dialog" persistent max-width="290")
        v-card
          v-card-title 注销
          v-card-text 您确定要退出吗？
          v-card-actions
            v-spacer
            v-btn(flat color="green darken-1" @click.native="dialog = false") 取消
            v-btn(flat color="red darken-1" @click.native="logout") 确定
</template>

<script>
import { logout } from '@/leancloudAPI'
export default {
  data: () => ({
    fab: false,
    dialog: false
  }),
  methods: {
    logout() {
      this.dialog = false
      logout().then(() => {
        this.$router.push({ name: 'signin' })
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.application
  .v-toolbar
    background none
.header-wrapper
  position fixed
  z-index 200
  top 0
  left 0
  height 48px
  width 100%
  background #4285f4
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)
  .header-container
    max-width 960px
    margin: 0 auto
</style>
