<template lang="pug">
  .login
    .login-wrapper
      .login-container
        nav
          a(@click.stop="activeComponent = signin") SIGN IN
          a(@click.stop="activeComponent = signup") SIGN UP
        keep-alive
          component(:is="activeComponent")
</template>
<script>
import signin from '@/components/signin/signin'
import signup from '@/components/signup/signup'
export default {
  name: 'login',
  data () {
    return {
      activeTab: 'signin',
      activeComponent: 'signin'
    }
  },
  components: {
    signin,
    signup
  }
}
</script>
<style lang="stylus" scoped>
.login
  display flex
  align-items center
  flex-direction column
  justify-content center
  width 100%
  height 100%
  background-color #56baed
  &-wrapper
    width 90%
    max-width 400px
    margin 0px auto
    background-color: #fff
    border 1px solid #ebebeb
    border-radius 10px
    box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3)
  &-container
    padding-top 20px
    height 400px

/*  nav
    text-align center
    font-size 16px
    font-weight 600
    color #cccccc
    a
      display: inline-block
      margin 10px
      padding 5px
      &.active
        color: #0d0d0d;
        border-bottom: 2px solid #5fbae9;*/
</style>
