<template lang="pug">
  .todos(v-cloak)
    header.header-wrapper
      .header-container
        .header-container__left
          .side-switch.hidden-md-and-up(@click="switchSideBar")
            a-icon(:type="sideBarVisible ? 'menu-fold' : 'menu-unfold'")
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
          //a-input
    article.main-wrapper
      aside.side-box(:style="{'left': sideBarOffsetX}")
        a-collapse(:bordered="false" :activeKey="['folders', 'tags']" style="background: none;")
          a-collapse-panel(v-for="(type, index) of [{name: '项目', data: 'folders', icon: 'bulb'}, {name: '标签', data: 'tags', icon: 'pushpin-o'}]" :key="type.data")
            template(slot="header")
              span(style="font-weight: bolder") {{ type.name }}
              a-icon(type="plus" style="float: right;padding: 3px 15px;font-size: 16px" @click.native.stop="addFolder(type.data)")
            template(v-if="remote[type.data]")
              a-list(itemLayout="horizontal" :dataSource="remote[type.data]")
                a-list-item.fold-item(slot="renderItem" slot-scope="item, index"
                  style="border: none; padding: 12px 20px 12px 30px"
                  @click.native.stop="selectFolder(type.data, item.id)")
                  a-icon.icon(:type="type.icon" style="padding: 3px 10px;")
                  span.name {{ item.name }}
                  a-popconfirm(title="确定删除该记录吗?" placement="bottom" okText="确定" cancelText="取消" @confirm="delFolder(type.data, item.id)")
                    a-icon.del(type="delete" style="padding: 3px 10px;color: #DB483E" @click.native.stop="void(0)")
            template(v-else)
              a-spin(size="large")
      main.main-box
</template>

<script>
import { logout
  , getCurrentUser
  , fetchAllFolderAndTag
} from '@/assets/js/leadCloudUtil'
export default {
  name: 'todos',
  data () {
    return {
      sideBarVisible: false,
      sideBarOffsetX: '-320px',
      remote: {
        folders: null,
        tags: null
      }
    }
  },
  methods: {
    logout () {
      logout().then(() => {
        this.$router.push('/signin')
      })
    },
    switchSideBar () {
      if (this.sideBarVisible) {
        this.sideBarOffsetX = '-320px'
      } else {
        this.sideBarOffsetX = '0'
      }
      this.sideBarVisible = !this.sideBarVisible
    },
    addFolder (type) {
      console.log(type)
    },
    selectFolder (type, id) {
      console.log('select', type, id)
    },
    delFolder (type, id) {
      console.log(type, id)
    }
  },
  created () {
    this.currentUser = getCurrentUser().get('nickname')
    fetchAllFolderAndTag().then(({folders, tags}) => {
      this.remote.folders = folders
      this.remote.tags = tags
    }).catch(err => this.$message.error(err))
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
[v-cloak]
  display none
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
        .side-switch
          line-height 50px
          padding 0 20px
          cursor pointer
      &__middle
        float right
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
      width 300px
      background-color: #fafafa
      height 100%
      padding 10px 0 0 5px
      transition all .4s linear
    .main-box
      flex: 1
      height 100%
      padding 20px
      background-color: #fff
@media (max-width: 767.98px)
  .todos
    .side-box
      position: fixed
      z-index 100
      left -320px
      box-shadow: 0 2px 10px rgba(0,0,0,0.3)
      transition all .4s linear
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
.fold-item
  cursor pointer
  position relative
  .del
    position absolute
    right 10px
    display none
  &:hover
    .icon
      /*color #fadb14*/
      color #1890ff
    .name
      color: #1890ff
    .del
      display inline-block
</style>
