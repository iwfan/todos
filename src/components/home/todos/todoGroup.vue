<template lang="pug">
  v-list(subheader)
    v-subheader {{ groupName }}
    v-expansion-panel
      template(v-if="todos")
        v-expansion-panel-content(v-for="(item, index) in todos" :key="item.id")
          div(slot="header")
            v-checkbox(:label="item.title")
          v-card
            v-card-text(class="grey lighten-3") Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
</template>

<script>
export default {
  name: 'todoGroup',
  props: {
    groupName: {
      type: String,
      default: ''
    },
    todos: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
