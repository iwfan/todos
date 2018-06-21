<template lang="pug">
  .login
    .login-wrapper
      .login-container
        nav.nav
          a.nav-item(@click.stop="activeComponent = 'signin'" :class="{'active': activeComponent === 'signin'}") SIGN IN
          a.nav-item(@click.stop="activeComponent = 'signup'" :class="{'active': activeComponent === 'signup'}") SIGN UP
        header.img-wrapper
          .img-container
            img(src="@/assets/icon.svg" alt="avatar" title="avatar" width="60%")
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
    .nav
      padding 20px 0 0
      text-align center
      font-size 16px
      font-weight 600
      color #cccccc
      &-item
        cursor pointer
        display: inline-block
        margin 10px
        padding 5px
        &.active
          color #0d0d0d
          border-bottom 2px solid #5fbae9
        &:hover
          color #0d0d0d
    .img-wrapper
      margin-bottom 10px
      .img-container
        text-align center
</style>
