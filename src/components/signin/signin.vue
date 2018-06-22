<template lang="pug">
  section
    article
      el-form(label-position="left" :model="formData" :rules="rules" ref="singinForm" status-icon @keyup.enter.native="signin")
        el-form-item(prop="username")
          el-popover(placement="bottom" width="250" trigger="manual" v-model="popTip.username.visible" :content="popTip.username.message")
            el-input(slot="reference" v-model="formData.username" placeholder="请输入用户名")
        el-form-item(prop="password")
          el-popover(placement="bottom" width="250" trigger="manual" v-model="popTip.password.visible" :content="popTip.password.message")
            el-input(slot="reference" v-model="formData.password" type="password" placeholder="请输入密码")
        el-form-item(style="text-align:center")
          el-button(type="primary" :loading="loading" @click="signin") 登录
    footer
      el-button(size="small" type="text" @click.stop="$message({message:'暂不支持此功能!', type: 'warning'})")
        icon(name="github" scale="1.5")
        span Sign In With Github
</template>
<script>
import { login } from '@/assets/js/leadCloudUtil'
import { ruleMixin, utilMixin } from '@/assets/js/mixin'
export default {
  name: 'signin',
  data () {
    return {
      loading: false,
      formData: {
        username: '',
        password: ''
      }
    }
  },
  mixins: [
    ruleMixin,
    utilMixin
  ],
  methods: {
    signin () {
      this.loading = true
      this.$refs['singinForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        login(this.formData).then(() => {
          this.loading = false
          this.$router.push('/')
        }).catch(err => {
          this.loading = false
          this.handleError(err.rawMessage)
        })
      })
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
