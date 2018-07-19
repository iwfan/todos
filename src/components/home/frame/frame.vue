<template lang="pug">
  v-app#inspire
    v-container.app-wrapper(fluid fill-height align-center)
      v-layout(align-center justify-start column)
        toolbar(@sideIconClick = "fold = !fold")
        v-flex.main-wrapper(fill-height)
          sidebar(:fold="fold")
          todos(:fold="fold")
          v-speed-dial(v-model="fab" absolute right bottom direction="top" transition="scale-transition")
            v-btn(slot="activator" v-model="fab" color="blue darken-2" dark fab)
              v-icon account_circle
              v-icon close
            v-btn(fab small dark color="green")
              v-icon edit
            v-btn(fab small dark color="indigo")
              v-icon add
            v-btn(fab small dark color="red")
              v-icon delete
</template>

<script>
import { logout } from '@/leancloudAPI'
import header from '../header/header'
import sidebar from '../sidebar/sidebar'
import Todos from '../todos/todos'
export default {
  name: 'frame',
  data() {
    return {
      // TODO  移动端适配
      fold: true,
      fab: false
    }
  },
  methods: {
    logout() {
      logout()
      this.$router.push({ name: 'signin' })
    }
  },
  components: {
    Todos,
    toolbar: header,
    sidebar
  }
}
</script>

<style lang="stylus" scoped>
.app-wrapper
  padding 0
  .main-wrapper
    position: relative
    z-index: 10
    display flex
    flex-direction row
    flex-wrap nowrap
    justify-content flex-start
    overflow hidden
    padding-top: 60px
    max-width 1000px
    width 100%
</style>
