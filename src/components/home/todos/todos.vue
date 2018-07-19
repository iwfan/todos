<template lang="pug">
  v-container(fluid fill-height align-center grid-list-md
    :style="{marginLeft: fold ? '250px': '0px' }")
    v-layout(align-center justify-start column)
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
.container
  padding 0 20px
</style>
