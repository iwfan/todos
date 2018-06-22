<template lang="pug">
  .home
    h1 登陆成功
    el-button(type="primary" round @click="logout") 注销登陆
</template>

<script>
import { getCurrentUser, logout } from '@/assets/js/leadCloudUtil'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    if (!getCurrentUser()) {
      this.$router.push('/login')
    }
  },
  methods: {
    logout () {
      logout()
      this.$router.push('/login')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>

</style>
