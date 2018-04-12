function Watcher(vm, el, exp, attr, callback) {
    this.vm = vm // V 实例
    this.el = el // DOM元素
    this.exp = exp // 属性表达式
    this.attr = attr // DOM属性
    this.callback = callback
    this.value = this.getValue()
}

Watcher.create = function create(vm, el, exp, attr, callback) {
    return new Watcher(vm, el, exp, attr, callback)
}
Watcher.target = null

Object.assign(Watcher.prototype, {
    update() {
        this.el[this.attr] = this.vm._data[this.exp]
        if (this.callback) {
            this.callback.call(this.vm)
        }
    },
    getValue() {
        Watcher.target = this
        const value = this.vm._data[this.exp]
        if (Array.isArray(value)) {
            value.addWatcher()
        }
        Watcher.target = null
        return value
    },
})

export default Watcher