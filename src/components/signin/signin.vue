<template lang="pug">
  .signin-wrapper
    .signin-container
      header.img-box
        img(src="@/assets/icon.svg" alt="avatar" title="avatar" width="250")
      .separator
        span.desc 登录
      article.login-form
        section.singin-box
          a-form(@submit.prevent="signin" refs="signinForm" :autoFormCreate="(form)=>{this.form = form}")
            template(v-if="form")
              a-form-item(fieldDecoratorId="username" :fieldDecoratorOptions="rules.username" :hasFeedback="true")
                a-input(placeholder='用户名或电子邮箱账号' style="height: 40px" autocomplete="off")
                  a-icon(slot="prefix" type='mail' style="color:#C4C4C4")
              a-form-item(fieldDecoratorId="password" :fieldDecoratorOptions="rules.password" :hasFeedback="true")
                a-input(placeholder='密码' style="height: 40px" type='password' autocomplete="off")
                  a-icon(slot="prefix" type='lock' style="color:#C4C4C4")
              a-form-item
                a-button(type='primary' style="width: 100%; height: 40px" htmlType="submit"
                  icon="login" :loading="loading" :disabled="hasErrors(form.getFieldsError())") 登录
      .separator
        span.desc 或许
      .signup
        | 还没有账户？
        router-link(to="/signup") 快速注册
      .forgot
        a-button(type="danger" @click="forgetPassVisible = true") 忘记密码?
        a-modal(title="重置密码" v-model="forgetPassVisible" @ok="handleOk" cancelText="取消" okText="重置")
          a-form-item(:hasFeedback="true" :validateStatus='emailValidate' :help='validaEmailMsg')
            a-input(placeholder='输入您的注册邮箱' style="height: 40px" autocomplete="off" v-model="forgetEmailAdress")
              a-icon(slot="prefix" type='mail' style="color:#C4C4C4")
</template>
<script>
import { login, forgotPass } from '@/assets/js/leadCloudUtil'
import { ruleMixin } from '@/assets/js/mixin'
export default {
  name: 'signin',
  data () {
    return {
      loading: false,
      forgetPassVisible: false,
      form: null,
      emailValidate: '',
      validaEmailMsg: '',
      forgetEmailAdress: '',
      hasErrors (fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field])
      }
    }
  },
  mixins: [
    ruleMixin
  ],
  methods: {
    signin () {
      this.loading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          login(values)
            .then(() => {
              this.loading = false
              this.$router.push('/')
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
    handleOk () {
      if (this.checkEmail()) {
        forgotPass(this.forgetEmailAdress).then((data) => {
          this.$message.success('邮件发送成功， 请注意查收！', 5)
        }).catch(err => {
          this.$message.error(err, 5)
        })
      }
    },
    checkEmail () {
      if (!this.forgetEmailAdress || !(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.forgetEmailAdress))) {
        this.emailValidate = 'error'
        this.validaEmailMsg = '邮箱格式不正确'
        return
      }
      this.emailValidate = 'success'
      this.validaEmailMsg = ''
      return true
    }
  },
  mounted () {
    // this.$nextTick(() => {
    //   // To disabled submit button at the beginning.
    //   this.form.validateFields()
    // })
  }
}
</script>
<style lang="stylus" scoped>
@media (max-width: 767.98px)
  .signin-wrapper
    .signin-container
      .img-box
        img
          width: 150px
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
    .signup,
    .forgot
      text-align: center
      margin 12px 0
</style>
