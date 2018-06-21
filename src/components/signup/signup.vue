<template lang="pug">
  article
    el-form(label-position="left" :model="formData")
      el-form-item
        el-input(:model="formData.name" placeholder="username")
      el-form-item
        el-input(:model="formData.email" placeholder="email")
      el-form-item
        el-input(:model="formData.password" type="password" placeholder="password")
      el-form-item(style="text-align:center")
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
