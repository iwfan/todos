<template lang="pug">
  section
    header
      .img-container
        img(src="http://danielzawadzki.com/codepen/01/icon.svg" alt="avatar" title="avatar" width="60%")
    article
      el-form(label-position="left" :model="loginFormData")
        el-form-item
          el-input(:model="loginFormData.name" placeholder="username")
        el-form-item
          el-input(:model="loginFormData.name" type="password" placeholder="password")
        el-form-item(style="text-align:center")
          el-button(type="primary") SIGN IN
    footer
</template>
<script>
export default {
  name: 'signin'
}
</script>
<style lang="stylus" scoped>
header
  .img-container
    text-align: center
article
  padding 0 30px
footer
  background-color #f6f6f6
  border-top 1px solid #dce8f1
  padding 30px
  border-radius 0 0 10px 10px
</style>
