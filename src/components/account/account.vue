<template lang="pug">
  v-app
    v-content
      v-container(fluid fill-height)
        v-layout(align-center justify-center)
          v-flex.account-wrapper
            v-card.account-box
              v-card-media(src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" height="200px")
              router-view
</template>

<script>
export default {
  name: 'account'
}
</script>

<style lang="stylus">
.account-box
  margin: 0 auto
  .form-wrapper
    padding 0 10px 10px
</style>

<style lang="stylus" data-role-type="normal">
.normal
  .account-box
    max-width 450px
    padding 0 0 10px
    border-radius 10px
</style>

<style lang="stylus" data-role-type="mini">
.mini
  .container
    padding 0 !important
  .account-wrapper
    height: 100%
    .account-box
      height 100%
      box-shadow none
</style>
