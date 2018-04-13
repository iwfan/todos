function Watcher(vm, el, exp, attrOrFn) {
    this.vm = vm // V 实例
    this.el = el // DOM元素
    this.exp = exp // 属性表达式
    this.attrOrFn = attrOrFn // DOM属性
    this.value = this.getValue()
}

Watcher.create = function create(vm, el, exp, attr) {
    return new Watcher(vm, el, exp, attr)
}
Watcher.target = null

Object.assign(Watcher.prototype, {
    update() {
        if (typeof this.attrOrFn === 'function') {
            this.attrOrFn.call(this.vm)
        } else {
            const args = this.exp.split('.')
            let { _data } = this.vm
            while (args.length) {
                _data = _data[args.shift()]
            }
            this.el[this.attrOrFn] = _data
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