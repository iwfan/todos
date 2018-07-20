<template lang="pug">
  v-app#inspire
    v-container.app-wrapper(fluid fill-height align-center)
      v-layout(align-center justify-start column)
        toolbar
        v-flex.main-wrapper(fill-height)
          sidebar
          todos(:fold="fold")
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
  mounted() {
    this.$bus.$on('foldSideBar', type => {
      // this.fold = type
    })
  },
  beforeDestroy() {
    this.$bus.$off('foldSideBar')
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
    /*overflow hidden*/
    padding-top: 60px
    max-width 1000px
    width 100%
</style>
