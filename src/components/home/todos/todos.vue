<template lang="pug">
  v-container.todos-wrapper(fluid fill-height align-center grid-list-md)
    v-layout(align-center justify-start column)
    v-btn.edit(absolute right bottom dark fab color="blue darken-2")
      v-icon edit
</template>

<script>
export default {
  name: 'todos',
  props: {
    fold: {
      type: Boolean,
      required: true
    }
  }
  // data: () => ({}),
}
</script>

<style lang="stylus" scoped>
.todos-wrapper
  flex 1 1 auto
  padding 0 20px
  .edit
    bottom 50%
</style>
