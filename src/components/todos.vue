<template lang="pug">
  .todos(v-cloak)
    header.header-wrapper
      .header-container
        .header-container__left
          .side-switch.hidden-md-and-up(@click="switchSideBar")
            lottie(:options="lottie.fold" :height="50" :width="80" @click.native.stop="switchSideBar" v-on:animCreated="(anim) => { this.lottie.fold.$anim = anim}")
          .logo.hidden-md-and-down
            a(href="/")
              img(src="../assets/logo.png" width="40")
        .header-container__right
          .control
            a-tooltip(placement="bottom")
              template(slot="title")  看什么看！
              .avatar-wrapper
                lottie.avatar-box(:options="lottie.avatar" :height="100" :width="100"
                  v-on:animCreated="(anim) => { this.lottie.avatar.$anim = anim}")
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
              .lottie-wrapper
                lottie.lottie-box(:options="lottie.box" :height="70" :width="70"
                  v-on:animCreated="(anim) => { this.lottie.box.$anim = anim}"
                  v-on:click.native="onSettingClick")
        .header-container__middle
          <!--lottie(:options="defaultOptions" :height="50" :width="100" @click.native.stop="onLottieClick" v-on:animCreated="handleAnimation")-->
    article.main-wrapper
      aside.side-box(:style="{'left': sideBarOffsetX}")
        template(v-if="remote.folders")
          a-menu(:defaultOpenKeys="['todo_folder', 'todo_tag']"
            :defaultSelectedKeys="['all_todo']" mode="inline"
            @select="onMenuSelect")
            a-menu-item(key="all_todo")
              a-icon(type="schedule")
              | 全部待办
            a-sub-menu(key="todo_folder")
              span(slot="title")
                a-icon(type="book")
                | 分类
              a-menu-item(v-for="(folder, index) of remote.folders" :key="folder.id")
                a-icon(:type="folder.icon")
                | {{ folder.name }}
            a-sub-menu(key="todo_tag")
              span(slot="title")
                a-icon(type="tag-o")
                | 标签
              a-menu-item(v-for="(tag, index) of remote.tags" :key="tag.id")
                a-icon(:type="tag.icon")
                | {{ tag.name }}
        template(v-else)
          a-spin(size="large" style="width:100%;margin-top: 50px")
      main.main-box
        header.input-wrapper
          a-input(placeholder="皮皮皮")
            a-icon(slot="prefix" type="flag" style="color:#C4C4C4")
        article.todos-wrapper
          template(v-if="remote.todos")
            a-list(itemLayout="horizontal" :dataSource="remote.todos")
              a-list-item(slot="renderItem" slot-scope="item, index" style="padding-bottom: 5px;")
                a-collapse(:bordered="false" style="width:100%")
                  a-collapse-panel(:key="item.id" :showArrow="false" style="border: none")
                    template(slot="header") {{ item.title }}
                    p Ant Design, a design language for background applications, is refined by Ant UED Team
                //a-list-item-meta(description="Ant Design, a design language for background applications, is refined by Ant UED Team")
                  a(slot="title" href="https://vuecomponent.github.io/ant-design/") {{ item.title }}
                  a-avatar(slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png")
          template(v-else)
            a-spin(size="large" style="width:100%;margin-top: 50px")
</template>

<script>
import { logout
  , getCurrentUser
  , fetchAllFolderAndTag
} from '@/assets/js/leadCloudUtil'

import Lottie from 'vue-lottie'
import * as animationData from '@/assets/lottie/animation_2.json'
import * as boxAnimationData from '@/assets/lottie/material_box_loader.json'
import * as avatarAnimationData from '@/assets/lottie/not_found.json'
export default {
  name: 'todos',
  data () {
    return {
      lottie: {
        fold: {
          animationData: animationData,
          loop: false,
          autoplay: false
        },
        box: {
          animationData: boxAnimationData,
          loop: false,
          autoplay: false
        },
        avatar: {
          animationData: avatarAnimationData
        }
      },
      sideBarVisible: false,
      sideBarOffsetX: '-320px',
      remote: {
        folders: null,
        tags: null,
        todos: null
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
        this.lottie.fold.$anim.playSegments([75, 120], true)
      } else {
        this.sideBarOffsetX = '0'
        this.lottie.fold.$anim.playSegments([0, 50], true)
      }
      this.sideBarVisible = !this.sideBarVisible
    },
    onSettingClick () {
      this.lottie.box.$anim.playSegments([0, 100], true)
    },
    addFolder (type) {
      console.log(type)
    },
    selectFolder (type, id) {
      console.log('select', type, id)
    },
    delFolder (type, id) {
      console.log(type, id)
    },
    handleAnimation: function (anim) {
      this.anim = anim
    },
    stop: function () {
      this.anim.stop()
    },
    play: function () {
      this.anim.play()
    },
    pause: function () {
      this.anim.pause()
    },
    onMenuSelect () {
      console.log(arguments)
    }
  },
  created () {
    this.currentUser = getCurrentUser().get('nickname')
    fetchAllFolderAndTag().then(({folders, tags}) => {
      this.remote.folders = folders
      this.remote.tags = tags
      this.remote.todos = Array.from({length: 10}).map((item, index) => ({
        id: index,
        title: 'test_test_test'
      }))
    }).catch(err => this.$message.error(err))
  },
  components: {
    Lottie
  }
}
</script>
<style lang="stylus">
  .ant-menu
    background: none !important
</style>
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
          /*padding 0 20px*/
          cursor pointer
      &__middle
        float right
      &__right
        float: right
        .control
          .anticon
            margin: 0 10px
            cursor: pointer
          .avatar-wrapper
            display inline-block
            height: 50px
            width 50px
            overflow hidden
            .avatar-box
              position: relative
              top: -18px
              left -22px
          .lottie-wrapper
            display inline-block
            height: 50px
            width 50px
            overflow hidden
            cursor pointer
            .lottie-box
              position: relative
              top: -10px
              left: -10px
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
      overflow auto
    .main-box
      flex: 1
      height 100%
      padding 20px
      background-color: #fff
      overflow auto
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
