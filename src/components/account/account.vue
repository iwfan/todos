<template lang="pug">
  v-app
    v-content
      v-container(fluid fill-height)
        v-layout(align-center justify-center)
          v-flex.account-wrapper
            v-card.account-box
              v-card-media(:src="mediaImg" height="200px")
              transition(name="slide-fade" mode="out-in")
                keep-alive
                  router-view(@toast="showToast")
    v-snackbar(v-model="showSnackBar"
      v-bind:color="type"
      v-bind:timeout="6000"
      left
      bottom
      v-bind:text="msg"
    ) {{ msg }}
</template>

<script>
export default {
  name: 'account',
  data() {
    return {
      showSnackBar: false,
      msg: '',
      type: '',
      mediaImg: this.getRandomImg()
    }
  },
  methods: {
    showToast(type, msg) {
      this.showSnackBar = true
      this.type = type
      this.msg = msg
    },
    getRandomImg() {
      const imgArray = ['/static/img1.jpg', '/static/img2.jpg', '/static/img3.jpg']
      const index = ~~(Math.random() * 3)
      return imgArray[index]
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.mediaImg = this.getRandomImg()
    next()
  }
}
</script>

<style lang="stylus" scoped>
.account-box
  margin: 0 auto
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, .1)
  overflow hidden
  .form-wrapper
    padding 0 10px 10px
.slide-fade-enter-active,
.slide-fade-leave-active
  transition all .4s linear
.slide-fade-enter
  transform translateX(50px)
  opacity 0
.slide-fade-leave
  transform translateX(0px)
  opacity 1
.slide-fade-leave-to
  transform translateX(-50px)
  opacity 0
.slide-fade-enter-to
  transform translateX(0px)
  opacity 1
</style>

<style lang="stylus" data-role-type="normal" scoped>
.normal
  .account-wrapper
    transform: translateY(-100px);
    .account-box
      max-width 450px
      padding 0 0 10px
</style>

<style lang="stylus" data-role-type="mini" scoped>
.mini
  .container
    padding 0 !important
  .account-wrapper
    height: 100%
    .account-box
      height 100%
      box-shadow none
</style>
