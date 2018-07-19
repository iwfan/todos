// 校验用户名的正则表达式
const usernameRegExp = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/
// 校验密码的正则表达式
const passwordRegExp = /^[a-zA-Z][a-zA-Z0-9]{5,19}$/
// 校验邮箱的正则表达式
const emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

export default {
  data () {
    return {
      rules: {
        username: [
          v => !!v || '请输入电子邮箱地址或登录名',
          v => (usernameRegExp.test(v) || emailRegExp.test(v)) || '必须是以字母开头，可以包含数字、字母、下划线，长度在4到20之间，或者为正确的邮箱地址。'
        ],
        password: [
          v => !!v || '请输入您的密码',
          v => passwordRegExp.test(v) || '必须是以字母开头，可以包含数字、字母， 长度在6到20之间'
        ],
        invitcode: [
          v => !!v || '请输入您的邀请码'
        ],
        email: [
          v => !!v || '请输入您的电子邮箱地址',
          v => emailRegExp.test(v) || '邮箱格式不正确'
        ]
      }
    }
  }
}
