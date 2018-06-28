<template lang="pug">
  .signin-wrapper
    .signin-container
      header.img-box
        img(src="@/assets/icon.svg" alt="avatar" title="avatar" width="250")
      .separator
        span.desc 注册
      article.login-form
        section.singin-box
          a-form(@submit.prevent="signup" refs="signinForm" :autoFormCreate="(form)=>{this.form = form}")
            template(v-if="form")
              a-form-item(fieldDecoratorId="username" :fieldDecoratorOptions="rules.username" :hasFeedback="true")
                a-input(placeholder='用户名' style="height: 40px" autocomplete="off")
                  a-icon(slot="prefix" type='user' style="color:#C4C4C4")
              a-form-item(fieldDecoratorId="email" :fieldDecoratorOptions="rules.email" :hasFeedback="true")
                a-input(placeholder='邮箱' style="height: 40px" autocomplete="off")
                  a-icon(slot="prefix" type='mail' style="color:#C4C4C4")
              a-form-item(fieldDecoratorId="password" :fieldDecoratorOptions="rules.password" :hasFeedback="true")
                a-input(placeholder='密码' style="height: 40px" type='password' autocomplete="off")
                  a-icon(slot="prefix" type='lock' style="color:#C4C4C4")
              a-form-item(style="text-align: justfiy")
                a-button(@click="reset" style="width: 35%; height: 40px;float: left ") 重置
                a-button(type='primary' style="width: 60%; height: 40px;float: right" htmlType="submit"
                icon="user-add" :loading="loading" :disabled="hasErrors(form.getFieldsError())") 创建账户
      .separator
        span.desc 或许
      .signup
        | 已有账户？
        router-link(to="/sign") 去登录
</template>
<script>
import { singUp } from '@/assets/js/leadCloudUtil'
import { ruleMixin } from '@/assets/js/mixin'
export default {
  name: 'signup',
  data () {
    return {
      loading: false,
      form: null,
      hasErrors (fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field])
      }
    }
  },
  mixins: [
    ruleMixin
  ],
  methods: {
    signup () {
      this.loading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          singUp(values)
            .then(() => {
              this.loading = false
              this.$message.success('创建账户成功！ 3秒后进入主页...', 3, () => {
                this.$router.push('/')
              })
            })
            .catch(err => {
              this.loading = false
              this.$message.error(err, 5)
            })
        } else {
          this.loading = false
        }
      })
    },
    reset () {
      this.form.setFieldsValue({
        username: '',
        email: '',
        password: ''
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
  .signin-wrapper
    max-width 750px
    min-width 320px
    height: 100%
    margin 0px auto
    background-color: #fff
    border 1px solid #ebebeb
    .signin-container
      max-width: 350px
      min-width 300px
      margin: 0 auto
      padding 12px
      .img-box
        /*padding-top 20px*/
        text-align center
      .separator
        margin 30px 0
        border-top 1px solid #ddd
        height 0
        text-align: center
        line-height 0px
        .desc
          padding 10px
          background-color #fff
      .signup
        text-align: center
        margin 12px 0
</style>
