<template lang="pug">
  v-card.elevation-0.form-wrapper
    v-card-text
      v-form(ref="form" v-model="valid" lazy-validation @keyup.native.enter="doLogin")
        v-text-field(v-model="form.username"
          validate-on-blur
          :rules="rules.username"
          prepend-icon="person"
          name="username"
          label="电子邮件地址或登录名"
          type="text")
        v-text-field(v-model="form.password"
          validate-on-blur
          :rules="rules.password"
          prepend-icon="lock"
          name="password"
          label="输入您的密码"
          id="password"
          :type="showpasswd ? 'text' : 'password'"
          :append-icon="showpasswd ? 'visibility_off' : 'visibility'"
          v-on:click:append="showpasswd = !showpasswd")
      v-btn(color="primary" tabindex="-1" flat @click.native.stop="$router.push('/account/reset')") 忘记了账户密码？
    v-card-actions
      v-btn(color="primary" tabindex="-1" flat @click="$router.push('/account/signup')") 创建账号
      v-spacer
      v-btn(color="primary" @click="doLogin") 登录
</template>

<script>
import rulesMixin from '@/mixin/validateRule'
export default {
  name: 'signin',
  data() {
    return {
      valid: true,
      showpasswd: false,
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    doLogin() {
      if (this.$refs.form.validate()) {
        console.log(this.form)
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
