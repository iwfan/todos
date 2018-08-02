<template lang="pug">
  .wrapper
    v-navigation-drawer(stateless floating
      width="250"
      v-bind:value="true")
      v-list(dense)
        v-list-tile(
          ripple
          @click="changeMenu('all', '全部事项')"
          color="grey darken-1"
          :class="{'activeMenu': activeMenu === 'all'}")
          v-list-tile-action
            v-icon(color="primary") archive
          v-list-tile-content
            v-list-tile-title 全部事项
        v-list-tile(
          color="grey darken-1"
          ripple
          @click="changeMenu('done', '已完成', 'status', '1')"
          :class="{'activeMenu': activeMenu === 'done'}")
          v-list-tile-action
            v-icon(color="green") check
          v-list-tile-content
            v-list-tile-title 已完成
        v-list-tile(
          ripple
          color="grey darken-1"
          @click="changeMenu('trash', '已删除', 'status', '2')"
          :class="{'activeMenu': activeMenu === 'trash'}")
          v-list-tile-action
            v-icon(color="red") delete
          v-list-tile-content
            v-list-tile-title 已删除
        template(v-if="categories")
          v-divider(v-if="!cateMenuActive" v-bind:style="{'marginBottom': '-1px'}")
          v-list-group(v-model="cateMenuActive" prepend-icon="flag" append-icon="")
            v-layout(row align-center slot="activator")
                v-flex
                  v-subheader 分类
                v-flex(class="text-xs-right")
                  v-btn(small flat icon @click.stop="showAddCateDialog = true")
                    v-icon(:style="{'fontSize': '22px', 'color': 'rgba(0, 0, 0, .54)'}") playlist_add
            v-list-tile(ripple v-for="(cate, index) in categories" :key="cate.id"
              color="grey darken-1"
              @click="changeMenu(cate.id, cate.name, 'categories', cate.id)"
              :class="{'activeMenu': activeMenu === cate.id}"
              @mouseenter.native="cate.active = true"
              @mouseleave.native="cate.active = false")
              v-list-tile-content
                v-list-tile-title.pl-3 {{ cate.name }}
              v-list-tile-action(v-if="cate.active")
                v-btn(flat small icon color="red"
                  :loading="cate.removeLoading"
                  @click.native.stop="removeCate(cate.id, index)")
                  v-icon delete_sweep
    v-dialog(v-model="showAddCateDialog" persistent max-width="400"
      @keyup.native.enter.prevent="addCate")
      v-card
        v-card-title 添加新分类
        v-card-text
          v-text-field(ref="newCateName" label="分类名称"
            v-model.lazy.trim="newCateDataForm.name"
            browser-autocomplete="off"
            name="name"
            autofocus
            required
            counter="15"
            :rules = "[\
              f => !!f || '不能为空',\
              f => !!f && f.length < 15 || '超出长度了呦'\
            ]"
            prepend-icon="widgets"
            validate-on-blur
            type="text"
            @keyup.native.enter.prevent="addCate")
        v-card-actions
          v-spacer
          v-btn(color="grey darken-1" flat @click="cancaleAddCate") 取消
          v-btn(color="blue darken-1" flat :loading="addCateLoading" @click="addCate") 添加
    v-dialog(v-model="deleteCateDialog" persistent max-width="400")
      v-card
        v-card-title 删除
        v-card-text 确定删除该分类吗？(该分类下的数据都将移入全部事项中)
        v-card-actions
          v-spacer
          v-btn(flat color="green darken-1" @click.native="deleteCateDialog = false") 取消
          v-btn(flat color="red darken-1"
            @keyup.native.enter="deleteCate"
            @click.native="deleteCate" :loading="deleteLoading") 删除
</template>

<script>
import { addTodo, addCategories, updateCategories, deleteCategories } from '@/leancloudAPI'
export default {
  name: 'sidebar',
  props: {
    appData: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data() {
    return {
      activeMenu: 'all',
      showAddCateDialog: false,
      addCateLoading: false,
      newCateDataForm: {
        name: ''
      },
      deleteCateDialog: false,
      deleteLoading: false,
      willDeleteCateData: { id: null, index: null },
      cateMenuActive: true
    }
  },
  computed: {
    categories() {
      return Object.keys(this.appData.categories).map(item => {
        this.$set(this.appData.categories[item], 'active', false)
        this.$set(this.appData.categories[item], 'removeLoading', false)
        return this.appData.categories[item]
      })
    }
  },
  methods: {
    changeMenu(menu, name, key, value) {
      this.activeMenu = menu
      this.$emit('changeFilter', name, key, value)
    },
    addCate() {
      if (this.$refs.newCateName.validate()) {
        this.addCateLoading = true
        const { name } = this.newCateDataForm
        addCategories(name).then(cate => {
          this.$set(this.appData.categories, cate.id, cate)
          this.showAddCateDialog = false
          this.newCateDataForm.name = ''
          this.$emit('showToast', 'success', '添加成功')
        }).catch(e => {
          this.$emit('showToast', 'error', e)
        }).finally(() => {
          this.addCateLoading = false
        })
      }
    },
    cancaleAddCate() {
      this.newCateDataForm.name = ''
      this.showAddCateDialog = false
    },
    deleteCate() {
      const { id } = this.willDeleteCateData
      this.deleteLoading = true
      deleteCategories(id).then(() => {
        this.$delete(this.appData.categories, id)
        this.$emit('showToast', 'success', '删除成功')
      }).catch(e => {
        this.$emit('showToast', 'error', e)
      }).finally(() => {
        this.deleteLoading = false
        this.deleteCateDialog = false
      })
    },
    removeCate(id, index) {
      this.willDeleteCateData.id = id
      this.willDeleteCateData.index = index
      this.deleteCateDialog = true
    },
    test() {
      console.log(updateCategories)
      console.log(addTodo)
    }
  },
  mounted() {
    // debugger
    // var c1 = '5b54a31aee920a003c696ff0'
    // var c2 = '5b54a3220b61600031fdba06'
    // addTodo({title: '取消设备tooltip上的链路算法显示', categories: c1})
    // addTodo({title: '机柜视图左侧树， 使用<设备所属子网>-<设备IP>格式展示', categories: c1})
    // addTodo({title: '过滤功能仅作用于全网视图', categories: c1})
    // addTodo({title: '全网与子网的中心点与缩放存数据库', categories: c1})
    // addTodo({title: '全网上 展开收起设备的BUG， 过滤后， 展开会将过滤掉的设备展示出来', categories: c1})
    // addTodo({title: '每个子网存储单独的中心点与缩放比例', categories: c1})
    // addTodo({title: '设备发现后， 设备位置错乱', categories: c1})
    // addTodo({title: '移动设备发现菜单的位置， 移至工具栏', categories: c1})
    // addTodo({title: '取消中心点', categories: c1})
    // addTodo({title: 'underscore源码学习', categories: c2})
    // addTodo({title: 'hyperapp学习', categories: c2})
    // addTodo({title: '这是一个其他任务'})
  }
}
</script>

<style lang="stylus" scoped>
.application
  .v-navigation-drawer
    background #fafafa
    top: 60px
    z-index: 100
    padding 10px 8px
    overflow-x hidden
    .v-list .activeMenu
      background-color #e6e6e6
      color: rgb(33, 33, 33) !important
      .v-list__tile__title
        font-weight: 700
</style>
