<template lang="pug">
  v-flex.header-wrapper
    .header-container
      v-toolbar(dense flat clipped-left dark)
        v-toolbar-side-icon(@click.native="$emit('sideIconClick')")
        v-toolbar-title Todos
        v-spacer
        v-btn(icon)
          v-icon search
        v-btn(icon)
          v-icon apps
        v-btn(icon)
          v-icon refresh
        v-btn(icon)
          v-icon more_vert
</template>

<script>
export default {
  props: {
  },
  data: () => ({

  }),
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
.application
  .v-toolbar
    background none
.header-wrapper
  position fixed
  z-index 200
  top 0
  left 0
  height 48px
  width 100%
  background #4285f4
  box-shadow: 0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)
  .header-container
    max-width 1000px
    margin: 0 auto
</style>
