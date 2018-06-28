<template lang="pug">
  .todos
    header.header-wrapper
      .header-container
        .header-container__left
          .side-switch.hidden-md-and-up
            a-icon(type="menu-unfold")
          .logo.hidden-md-and-down
            a(href="/")
              img(src="../assets/logo.png" width="40")
        .header-container__right
          .control
            a-popover(placement="bottomRight" trigger="click")
              template(slot="content")
                span.pop-menu-item
                  a-icon(type="setting" style="margin-right: 10px")
                  | 设置
                a-divider(style="margin: 0")
                a-popconfirm(title="确定注销登录吗?" placement="bottom" okText="确定" cancelText="取消" @confirm="logout")
                  span.pop-menu-item
                    a-icon(type="logout" style="margin-right: 10px")
                    | 注销登录
              a-icon(type="appstore")
        .header-container__middle
          a-input
    article.main-wrapper
      aside.side-box.hidden-md-and-down
      main.main-box
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
      logout().then(() => {
        this.$router.push('/signin')
      })
    }
  },
  created () {
    this.currentUser = getCurrentUser().get('nickname')
  }
}
</script>
<style lang="stylus">
@media (max-width: 767.98px)
/*小于768px 是隐藏*/
  .hidden-md-and-down
    display none
@media (min-width: 768px)
  .hidden-md-and-up
    display none
</style>

<style lang="stylus" scoped>
.pop-menu-item
  display block
  width: 100%
  &:first-child
    padding 0 0 10px 0
  &:last-child
    padding 10px 0 0px 0
  cursor: pointer
  &:hover
    color: #1890ff
.todos
  height: 100%
  background-color: #fafafa
  .header-wrapper
    position fixed
    top: 0
    z-index 200
    width: 100%
    height 50px
    background-color: #fff
    box-shadow: 0 1px 2px rgba(0,0,0,0.15)
    .header-container
      margin 0 auto
      max-width 950px
      min-width 320px
      font-size 16px
      color: #5c5c5c
      &__left,
      &__middle,
      &__right
        display inline-block
      &__left
        float left
        .logo
          padding 5px 10px 5px 20px
          /*width 300px*/
        .side-switch
          line-height 50px
          padding 0 20px
      &__middle
        /*float left*/
        /*width: 100%*/
        background-color: red
        margin-left 320px
        /*height: 50px*/
      &__right
        float: right
        padding 0 10px
        .control
          line-height 50px
          .anticon
            margin: 0 10px
            cursor: pointer
  .main-wrapper
    display: flex
    max-width 950px
    min-width 320px
    height: 100%
    margin: 0 auto
    padding-top 50px
    .side-box
      flex: 0 0 300px
      width 300px
      background-color: #5fbae9
      height 100%
      padding 10px 0 0 20px
    .main-box
      flex: 1
      height 100%
      padding 20px
      background-color: #fff
</style>
