// 校验用户名的正则表达式
const usernameRegExp = /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/
// 校验密码的正则表达式
const passwordRegExp = /^[a-zA-Z][a-zA-Z0-9]{5,19}$/
// 校验邮箱的正则表达式
const emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/

export const ruleMixin = {
  data () {
    const vm = this
    return {
      popTip: {
        username: {
          visible: false,
          message: '名称不合法， 必须是以字母开头，可以包含数字、字母、下划线， 长度在4到20之间。'
        },
        email: {
          visible: false,
          message: '邮箱格式不合法。'
        },
        password: {
          visible: false,
          message: '密码格式不合法， 必须是以字母开头，可以包含数字、字母， 长度在6到20之间。'
        },
        checkpass: {
          visible: false,
          message: '两次输入的密码不一致。'
        }
      },
      rules: {
        username: [
          {
            validator: function (ruler, value, callback) {
              if (!usernameRegExp.test(value)) {
                vm.popTip.username.visible = true
                vm.popTip.password.visible = false
                vm.popTip.checkpass.visible = false
                vm.popTip.email.visible = false
                callback(new Error(' '))
              } else {
                vm.popTip.username.visible = false
                callback()
              }
            },
            required: true,
            trigger: 'blur'
          }
        ],
        password: [
          {
            validator: function (ruler, value, callback) {
              if (!passwordRegExp.test(value)) {
                vm.popTip.password.visible = true
                vm.popTip.username.visible = false
                vm.popTip.checkpass.visible = false
                vm.popTip.email.visible = false
                callback(new Error(' '))
              } else {
                vm.popTip.password.visible = false
                callback()
              }
            },
            required: true,
            trigger: 'blur'
          }
        ],
        checkpass: [
          {
            validator: function (ruler, value, callback) {
              if (!passwordRegExp.test(value) || value !== vm.formData.password) {
                vm.popTip.checkpass.visible = true
                vm.popTip.password.visible = false
                vm.popTip.username.visible = false
                vm.popTip.email.visible = false
                callback(new Error(' '))
              } else {
                vm.popTip.checkpass.visible = false
                callback()
              }
            },
            required: true,
            trigger: 'blur'
          }
        ],
        email: [
          {
            validator: function (ruler, value, callback) {
              if (!emailRegExp.test(value)) {
                vm.popTip.email.visible = true
                vm.popTip.checkpass.visible = false
                vm.popTip.password.visible = false
                vm.popTip.username.visible = false
                callback(new Error(' '))
              } else {
                vm.popTip.email.visible = false
                callback()
              }
            },
            required: true,
            trigger: 'blur'
          }
        ]
      }
    }
  }
}

export const utilMixin = {
  methods: {
    handleError (msg) {
      this.$alert(msg, '错误', {
        confirmButtonText: '确定',
        callback: action => {
        }
      })
    }
  }
}
