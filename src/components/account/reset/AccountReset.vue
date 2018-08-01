<template lang="pug">
  v-card.elevation-0.form-wrapper
    v-card-text
      v-form(
        ref="form"
        v-model="valid"
        lazy-validation
        @keyup.native.enter="doLogin")
        v-text-field(
          v-model="form.email"
          validate-on-blur
          :rules="rules.email"
          prepend-icon="email"
          name="email"
          label="电子邮箱地址"
          type="text")
    v-card-actions
      v-btn(
        color="primary"
        tabindex="-1"
        flat
        @click="$router.push('/account/signin')") 返回登录
      v-spacer
      v-btn(
        color="primary"
        @click="forgotPass"
        :loading="showLoading") 重置密码
</template>

<script>
import rulesMixin from '@/mixin/validateRule'
import { forgotPass } from '@/leancloudAPI'
export default {
  name: 'reset',
  data() {
    return {
      valid: false,
      showLoading: false,
      form: {
        email: ''
      }
    }
  },
  methods: {
    forgotPass() {
      if (this.$refs.form.validate()) {
        this.showLoading = true
        forgotPass(this.form.email).then(() => {
          this.$emit('toast', 'success', '邮件已发送')
        }).catch(err => {
          this.$emit('toast', 'error', err)
        }).finally(() => {
          this.showLoading = false
        })
      }
    }
  },
  mixins: [
    rulesMixin
  ]
}
</script>

<style lang="stylus">

</style>
