<template lang="pug">
  #todos
    router-view
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
*
  box-sizing border-box
*:focus
  outline none
html, body, #todos
  height 100%
body
  font-family Monospaced Number,Chinese Quote,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color: #555
  background-color: #f1f1f1
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
