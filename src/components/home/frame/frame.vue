<template lang="pug">
  v-app
    v-navigation-drawer(app fixed clipped v-model="drawer" mobile-break-point="768" width="250")
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
    v-toolbar(app fixed clipped-left dense color="primary" dark)
      v-toolbar-side-icon(@click.native="drawer = !drawer")
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
    v-content
      v-container(fluid fill-height)
        v-layout(justify-center align-center)
          v-flex(shrink)
    v-btn(fab bottom right color="pink" dark fixed)
      v-icon add
    <!--button(@click="logout") 注销-->
</template>

<script>
import { logout } from '@/leancloudAPI'
export default {
  name: 'frame',
  data() {
    return {
      drawer: null,
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
    }
  },
  methods: {
    logout() {
      logout()
      this.$router.push({ name: 'signin' })
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
