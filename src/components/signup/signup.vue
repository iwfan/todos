<template lang="pug">
  article
    el-form(label-position="left" label-width="80px" :model="formData" :rules="rules" ref="singupForm" status-icon @keyup.enter.native="submitForm")
      el-form-item(label="用户名" prop="username")
        el-popover(placement="bottom" width="250" trigger="manual" v-model="popTip.username.visible" :content="popTip.username.message")
          el-input(slot="reference" v-model.lazy.trim="formData.username" placeholder="请输入用户名")
      el-form-item(label="邮箱" prop="email")
        el-popover(placement="bottom" width="250" trigger="manual" v-model="popTip.email.visible" :content="popTip.email.message")
          el-input(slot="reference" v-model.lazy.trim="formData.email" placeholder="请输入邮箱地址")
      el-form-item(label="密码" prop="password")
        el-popover(placement="bottom" width="250" trigger="manual" v-model="popTip.password.visible" :content="popTip.password.message")
          el-input(slot="reference" v-model.lazy.trim="formData.password" type="password" placeholder="请输入密码" auto-complete="off")
      el-form-item(label="确认密码" prop="checkpass")
        el-popover(placement="bottom" width="250" trigger="manual" v-model="popTip.checkpass.visible" :content="popTip.checkpass.message")
          el-input(slot="reference" v-model.lazy.trim="formData.checkpass" type="password" placeholder="请再次输入密码" auto-complete="off")
      el-form-item(label-width="0" style="text-align:center")
        el-button(type="primary" :loading="loading" @click="submitForm") 提交
        el-button(@click="resetForm") 重置
</template>
<script>
import { singUp } from '@/assets/js/leadCloudUtil'
import { ruleMixin, utilMixin } from '@/assets/js/mixin'
export default {
  name: 'signup',
  data () {
    return {
      formData: {
        username: '',
        password: '',
        checkpass: '',
        email: ''
      },
      loading: false
    }
  },
  mixins: [
    ruleMixin,
    utilMixin
  ],
  methods: {
    submitForm () {
      this.loading = true
      this.$refs['singupForm'].validate((valid) => {
        if (!valid) {
          return false
        }
        singUp(this.formData).then(() => {
          this.loading = false
          this.$notify({
            title: '成功',
            message: '注册成功， 5s后进入首页',
            type: 'success',
            onClose: () => {
              this.$router.push('/')
            }
          })
        }).catch(err => {
          this.loading = false
          this.handleError(err.rawMessage)
        })
      })
    },
    resetForm () {
      this.$refs['singupForm'].resetFields()
      for (const key of Object.keys(this.popTip)) {
        this.popTip[key].visible = false
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
article
  padding 0 30px
</style>
