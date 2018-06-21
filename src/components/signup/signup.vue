<template lang="pug">
  article
    el-form(label-position="left" label-width="60px" :model="formData")
      el-form-item(label="用户名")
        el-input(:model="formData.name" placeholder="username")
      el-form-item(label="邮箱")
        el-input(:model="formData.email" placeholder="email")
      el-form-item(label="密码")
        el-input(:model="formData.password" type="password" placeholder="password")
      el-form-item(label-width="0" style="text-align:center")
        el-button(type="primary") SIGN UP
</template>
<script>
export default {
  name: 'signup',
  data () {
    return {
      formData: {
        name: '',
        email: '',
        password: ''
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
article
  padding 0 30px
</style>
