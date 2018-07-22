<template lang="pug">
  .wrapper
    v-navigation-drawer(stateless floating
      v-bind:value="true")
      v-list.pt-3(dense)
        v-list-tile(
          ripple
          @click="$emit('changeFilter', () => true)")
          v-list-tile-action
            v-icon lightbulb_outline
          v-list-tile-content
            v-list-tile-title 全部事项
        v-divider.my-3
        v-list-tile(
          ripple
          @click="$emit('changeFilter', (item) => item.status === '1')")
          v-list-tile-action
            v-icon archive
          v-list-tile-content
            v-list-tile-title 已完成
        v-list-tile(
          ripple
          @click="$emit('changeFilter', (item) => item.status === '2')")
          v-list-tile-action
            v-icon delete
          v-list-tile-content
            v-list-tile-title 已删除
        template(v-if="categories")
          v-divider.my-3
          v-layout(row align-center)
              v-flex
                v-subheader 分类
              v-flex(class="text-xs-right")
                v-btn(small flat icon @click="addCate")
                  v-icon(:style="{'fontSize': '22px', 'color': 'rgba(0, 0, 0, .54)'}") playlist_add
          v-list-tile(v-for="(cate, index) in categories" :key="cate.id"
            @click="$emit('changeFilter', cate.id)"
            @mouseenter.native="cate.active = true"
            @mouseleave.native="cate.active = false")
            v-list-tile-content
              v-list-tile-title.pl-3 {{ cate.name }}
            v-list-tile-action(v-if="cate.active")
              v-btn(flat small icon color="red"
                :loading="cate.removeLoading"
                @click.native.stop="removeCate(cate.id, index)")
                v-icon delete_sweep
    v-dialog(v-model="showAddCateDialog" persistent max-width="400")
      v-card
        v-card-title 添加新分类
        v-card-text
          v-text-field(label="分类名称"
          browser-autocomplete="false"
          autofocus
          :rules = "[f => !!f || '不能为空', f => true]"
          prepend-icon="place"
          validate-on-blur)
        v-card-actions
          v-spacer
          v-btn(color="grey darken-1" flat @click.native="showAddCateDialog = false") 取消
          v-btn(color="blue darken-1" flat @click.native="showAddCateDialog = false") 添加
</template>

<script>
import { addCategories, updateCategories, deleteCategories } from '@/leancloudAPI'
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
      showAddCateDialog: false
      // categories: this.appData.categories
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
    addCate() {
      console.log('addCate')
      this.showAddCateDialog = true
    },
    removeCate(id, index) {
      console.log(id, index)
      this.categories[index].removeLoading = true
      deleteCategories(id).then(() => {
        this.categories[index].removeLoading = false
        this.$delete(this.appData.categories, id)
        this.$emit('showToast', 'success', '删除成功')
      }).catch(e => {
        this.$emit('showToast', 'error', e)
        this.categories[index].removeLoading = false
      })
    },
    test() {
      console.log(addCategories)
      console.log(updateCategories)
    }
  }
}
</script>

<style lang="stylus" scoped>
.application
  .v-navigation-drawer
    background #fafafa
    top: 60px
    z-index: 100
    padding 0 10px
    overflow-x hidden
</style>
