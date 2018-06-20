<template lang="pug">
  .login-wrapper
      button(@click="doLogin")
</template>
<script>
  export default {
    name: 'login',
    methods: {
      doLogin() {
        this.$AV.login()
        this.$route.push('/')
      }
    }
  }
</script>
<style lang="stylus">

</style>
