<template lang="pug">
  div(ref="router-wrapper" class="normal")
    router-view
</template>

<script>
import debounce from 'lodash.debounce'
export default {
  name: 'App',
  data() {
    return {
      wrapEL: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.wrapEL = this.$refs['router-wrapper']
      window.addEventListener('resize', this.onResize, { passive: true })
      window.dispatchEvent(new Event('resize'))
    })
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize, { passive: true })
  },
  computed: {
    onResize() {
      return debounce(() => {
        const classList = this.wrapEL.classList
        classList.value = ''
        const bp = this.$vuetify.breakpoint
        if (bp.xs) {
          classList.add('mini')
        } else {
          classList.add('normal')
        }
        this.$bus.$emit('foldSideBar', bp.width > 850)
      }, 300)
    }
  }
}
</script>

<style lang="stylus">
*
  box-sizing border-box
*:focus
  outline none

input:-webkit-autofill,
textarea:-webkit-autofill,
select:-webkit-autofill
  box-shadow: 0 0 0 1000px #fff inset
input[type="text"]:focus,
input[type="password"]:focus,
textarea:focus
  box-shadow: 0 0 0 1000px #fff inset
/*::-webkit-scrollbar-track
  box-shadow: inset 0 0 6px rgba(0,0,0,0.3)
  border-radius: 10px
  background-color: rgba(0, 0, 0, .0)*/
::-webkit-scrollbar
  width: 6px
::-webkit-scrollbar-thumb
  border-radius: 10px
  background-color: hsla(220, 4%, 58%, .3)
</style>
