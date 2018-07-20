<template lang="pug">
  v-navigation-drawer(clipped stateless floating
    v-bind:value="true"
    width="250")
    v-list.pt-3(dense)
      template(v-for="(item, i) in items")
        v-layout(
          row
          v-if="item.heading"
          align-center
          :key="i")
          v-flex(xs6)
            v-subheader(v-if="item.heading") {{ item.heading }}
          v-flex(xs6 class="text-xs-right")
            v-btn(small flat) edit
        v-divider(
          v-else-if="item.divider"
          class="my-3"
          :key="i")
        v-list-tile(
          :key="i"
          v-else
          @click="")
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ item.text }}
</template>

<script>
export default {
  name: 'sidebar',
  data: () => ({
    items: [
      { icon: 'lightbulb_outline', text: 'Notes' },
      { icon: 'touch_app', text: 'Reminders' },
      { divider: true },
      { heading: 'Labels' },
      { icon: 'add', text: 'Create new label' },
      { divider: true },
      { icon: 'archive', text: 'Archive' },
      { icon: 'delete', text: 'Trash' },
      { divider: true },
      { icon: 'settings', text: 'Settings' },
      { icon: 'chat_bubble', text: 'Trash' },
      { icon: 'help', text: 'Help' },
      { icon: 'phonelink', text: 'App downloads' },
      { icon: 'keyboard', text: 'Keyboard shortcuts' }
    ]
  }),
  mounted() {
    // this.$bus.on('foldSide')
  }
}
</script>

<style lang="stylus" scoped>
.application
  .v-navigation-drawer
    background #fafafa
    top: 60px
    z-index: 100
</style>
