<template lang="pug">
  .home
    el-container
      el-header(height="100px") Header
      el-container
        el-aside  Aside
        el-main
          el-button(type="primary" round @click="logout") 注销登陆
</template>

<script>
import { logout } from '@/assets/js/leadCloudUtil'
export default {
  name: 'index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
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
.home
  width 100%
  height 100%
  min-width 970px
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
</style>
