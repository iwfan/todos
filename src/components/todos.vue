<template lang="pug">
  .todos
    header.header-wrapper
      el-row(class="header-container")
        .header-container__left
          .sider-switch.hidden-sm-and-up
            i.el-icon-menu
          .logo.hidden-xs-only
            a(href="/")
              img(src="../assets/logo.png" width="40")
        .header-container__search
          el-input(placeholder="快速查找" size="small" auto-complete="off")
        .header-container__right
          icon(name="user-circle" scale="1.5" style="vertical-align: middle")
          span {{ currentUser }}
    .main-wrapper
      aside.hidden-xs-only
        el-collapse(:value="['1', '2']" style="border-top: none")
          el-collapse-item(title="项目" name="1")
            ul.collapse-item-content
              li(v-for="item in 5")
                el-button(icon="el-icon-news" type="text" plain style="border:none; background:none; color: #34495e;") item
          el-collapse-item(title="标签" name="2")
            ul.collapse-item-content
              li(v-for="item in 5")
                el-button(icon="el-icon-news" type="text" plain style="border:none; background:none; color: #34495e;") item
      main
        header
          el-input(size="medium" placeholder="添加一个代办事项")
            i.el-icon-date.el-input__icon(slot="suffix")
            el-button(slot="append" icon="el-icon-plus")
        section(style="margin-top:30px")
          el-card(v-for="(item, index) of tableData" :key="index" style="margin: 10px 0;")
            .clearfix(slot="header") {{ item.address }}
            el-tag 标签一
            el-tag(type="success") 标签二
            el-tag(type="info") 标签三
            el-tag(type="warning") 标签四
            el-tag(type="danger") 标签五
</template>

<script>
import { logout, getCurrentUser } from '@/assets/js/leadCloudUtil'
export default {
  name: 'todos',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    logout () {
      logout()
      this.$router.push('/login')
    }
  },
  created () {
    this.currentUser = getCurrentUser().getUsername()
    console.log(this.currentUser)
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
      min-width 350px
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
    display: flex
    max-width 950px
    min-width 350px
    height: 100%
    margin: 0 auto
    padding-top 50px
    aside
      flex: 0 0 300px
      width 300px
      height 100%
      padding 10px 0 0 20px
      .el-collapse-item
        & >>> .el-collapse-item__header,
        & >>> .el-collapse-item__wrap
          background-color rgba(0, 0, 0, .0)
    main
      flex: 1
      height 100%
      padding 20px
      background-color: #fff
</style>
