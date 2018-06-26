<template lang="pug">
  .todos
    header.header-wrapper
      .header-container
    .todos-container
</template>

<script>
import { logout } from '@/assets/js/leadCloudUtil'
export default {
  name: 'todos',
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item),
      isCollapse: true
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

<style lang="stylus" scoped>
.todos
  height: 100%
  background-color: #fafafa
  .header-wrapper
    height 50px
    background-color #db4c3f
    border-bottom: solid 1px #ca2100
    box-shadow: 0 1px 2px rgba(0,0,0,0.15)
    .header-container
      margin 0 auto
      max-width 950px
      height 100%
  &-wrapper
    max-width 950px
</style>
