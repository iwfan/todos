import Dep from './Dep.js'

function Watcher(vm, exp, cb) {
    this.cb = cb
    this.vm = vm
    this.exp = exp
    this.value = this.get()
}
Watcher.prototype.update = function update() {
    this.run()
}
Watcher.prototype.run = function run() {
    const value = this.vm.data[this.exp]
    const oldValue = this.value
    if (value !== oldValue) {
        this.value = value
        this.cb.call(this.vm, value, oldValue)
    }
}
Watcher.prototype.get = function get() {
    Dep.target = this
    const value = this.vm.data[this.exp]
    Dep.target = null
    return value
}

export default Watcher