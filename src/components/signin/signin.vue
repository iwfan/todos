<template lang="pug">
  section
    article
      el-form(label-position="left" :model="loginFormData")
        el-form-item
          el-input(:model="loginFormData.name" placeholder="username")
        el-form-item
          el-input(:model="loginFormData.name" type="password" placeholder="password")
        el-form-item(style="text-align:center")
          el-button(type="primary") SIGN IN
    footer
      el-button(size="small" type="text" @click.stop="$message({message:'暂不支持此功能!', type: 'warning'})")
        icon(name="github" scale="1.5")
        span Sign In With Github
</template>
<script>
export default {
  name: 'signin',
  data () {
    return {
      loginFormData: {
        name: ''
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
article
  padding 0 30px
footer
  background-color #f6f6f6
  border-top 1px solid #dce8f1
  border-radius 0 0 10px 10px
  text-align: center
  padding 10px
  .el-button
    color #606266
    :hover
      color #409EFF
    svg
      vertical-align top
    span
      font-size 14px
      line-height 24px
      margin-left 5px
</style>
