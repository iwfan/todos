<template lang="pug">
  div 1
    button(@click="logout") 注销
</template>

<script>
import { logout } from '@/leancloudAPI'
export default {
  name: 'frame',
  data() {
    return {}
  },
  methods: {
    logout() {
      logout()
      this.$router.push({ name: 'signin' })
    }
  }
}
</script>

<style lang="stylus">

</style>
