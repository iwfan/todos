export default {
  install: (Vue, option) => {
    const bus = new Vue(option)
    Vue.prototype.$bus = bus
  }
}
