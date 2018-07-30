<template lang="pug">
  v-card.elevation-0.form-wrapper
    v-card-text
      v-form(ref="form" v-model="valid" lazy-validation @keyup.native.enter="doLogin")
        v-text-field(v-model="form.username"
          validate-on-blur
          :rules="rules.username"
          prepend-icon="person"
          name="username"
          label="登录名"
          type="text")
        v-text-field(v-model="form.password"
          validate-on-blur
          :rules="rules.password"
          prepend-icon="lock"
          name="password"
          label="输入您的密码"
          id="password"
          :type="showpasswd ? 'text' : 'password'"
          :append-icon="showpasswd ? 'visibility' : 'visibility_off'"
          v-on:click:append="showpasswd = !showpasswd")
        v-text-field(v-model="form.email"
          validate-on-blur
          :rules="rules.email"
          prepend-icon="email"
          name="email"
          label="电子邮箱地址"
          type="text")
        v-text-field(v-model="form.invitcode"
          validate-on-blur
          :rules="rules.invitcode"
          prepend-icon="card_giftcard"
          name="invitcode"
          label="邀请码"
          :loading="showLoading2"
          type="text")
    v-card-actions
      v-btn(color="primary" tabindex="-1" flat @click.native.stop="$router.push('/account/signin')") 已有账号？去登录
      v-spacer
      <!--v-btn(@click="resetForm" color="primary") 重置-->
      v-btn(color="primary" @click="AccountSignup" :loading="showLoading") 注册
</template>

<script>
import rulesMixin from '@/mixin/validateRule'
import { signUp, hasUser } from '@/leancloudAPI'
export default {
  name: 'AccountSignup.vue',
  data() {
    return {
      valid: false,
      showpasswd: false,
      showLoading: false,
      showLoading2: false,
      form: {
        username: '',
        password: '',
        email: '',
        invitcode: ''
      }
    }
  },
  methods: {
    signup() {
      if (this.$refs.form.validate()) {
        this.showLoading2 = true
        hasUser(this.form.invitcode).then(() => {
          this.showLoading = true
          return signUp(this.form).then(() => {
            // 注册成功
            this.$emit('toast', 'success', '注册成功')
            setTimeout(() => {
              this.$router.push('/index')
            }, 2000)
          }).finally(() => {
            this.showLoading = false
          })
        }).catch(err => {
          this.$emit('toast', 'error', err)
        }).finally(() => {
          this.showLoading2 = false
        })
      }
    },
    resetForm() {
      this.$refs.form.reset()
      this.form.username = ''
      this.form.password = ''
      this.form.email = ''
      this.form.invitcode = ''
    }
  },
  mixins: [
    rulesMixin
  ]
}
</script>

<style lang="stylus">

</style>
