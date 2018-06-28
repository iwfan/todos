// 校验用户名的正则表达式
const usernameRegExp = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/
// 校验密码的正则表达式
const passwordRegExp = /^[a-zA-Z][a-zA-Z0-9]{5,19}$/
// 校验邮箱的正则表达式
const emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

export const ruleMixin = {
  data () {
    return {
      rules: {
        username: {
          rules: [
            {
              trigger: 'onBlur',
              required: true,
              validator (rule, value, callback) {
                if (!value) {
                  callback(new Error(' '))
                } else if (usernameRegExp.test(value) || emailRegExp.test(value)) {
                  callback()
                } else {
                  callback(new Error(' '))
                }
              },
              message: '名称格式不正确，必须是以字母开头，可以包含数字、字母、下划线， 长度在4到20之间，或者为正确的邮箱地址。'
            }
          ]
        },
        password: {
          rules: [
            {
              trigger: 'onBlur',
              required: true,
              pattern: passwordRegExp,
              message: '密码格式不正确， 必须是以字母开头，可以包含数字、字母， 长度在6到20之间。'
            }
          ]
        },
        invitcode: {rules: [{required: true, message: '邀请码为必填项'}]},
        email: {
          rules: [
            {
              trigger: 'onBlur',
              required: true,
              pattern: emailRegExp,
              message: '邮箱格式不正确'
            }
          ]
        }
      }
    }
  }
}
