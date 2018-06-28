<template lang="pug">
  .todos
    header.header-wrapper
      a-row(class="header-container")
        .header-container__left
          .sider-switch.hidden-sm-and-up
            a-icon(type="menu-unfold")
          .logo.hidden-xs-only
            a(href="/")
              img(src="../assets/logo.png" width="40")
        .header-container__search
        .header-container__right
    a-row(class="main-wrapper")
      a-col(class="aside" sm="0" xs="0" md="8" lg="8" xl="8" xxl="8" span="300px")
      a-col(class="main")
</template>

<script>
import { logout, getCurrentUser } from '@/assets/js/leadCloudUtil'
export default {
  name: 'todos',
  data () {
    return {
    }
  },
  methods: {
    logout () {
      this.$confirm('确定要注销登录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        logout()
        this.$router.push('/login')
      }).catch(() => {})
    }
  },
  created () {
    this.currentUser = getCurrentUser().getUsername()
  }
}
</script>

<style lang="stylus" scoped>
.todos
  height: 100%
  background-color: #fafafa
  .header-wrapper
    position fixed
    top: 0
    z-index 200
    width: 100%
    height 50px
    background-color: #ffffff
    /*background-color #db4c3f*/
    /*border-bottom: solid 1px #ca2100*/
    box-shadow: 0 1px 2px rgba(0,0,0,0.15)
    .header-container
      margin 0 auto
      max-width 950px
      min-width 320px
      &__left
        float left
        .logo
          font-size: 0
          width: 300px
          a
            display inline-block
            padding 5px
            margin-left 20px
            img
              width: 40px
              height: 40px
      &__search
        /*flex: 1 1 auto*/
        float left
        margin-left 20px
        padding 9px
        &>>>input
          border none
      &__right
        float right
        color: #34495e
        line-height 50px
        span
          margin 0 20px 0 10px
  .main-wrapper
    /*display: flex*/
    max-width 950px
    min-width 350px
    height: 100%
    margin: 0 auto
    padding-top 50px
    .aside
      /*flex: 0 0 300px*/
      /*width 300px*/
      background-color: red
      height 100%
      padding 10px 0 0 20px
    .main
      /*flex: 1*/
      height 100%
      padding 20px
      background-color: #fff
</style>
