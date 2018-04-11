function V(options) {
    this._init(options)
    console.log(this)
}

Object.assign(V.prototype, {
    _init(options) {
        this.$options = options
        this.$el = document.querySelector(options.el)
        this.$data = options.data
        this.$method = options.method
        this._dep = {}
        this._observe(this.$data)
        this._compile(this.$el)
    },
    _observe(data) {
        if (!data || typeof data !== 'object') {
            return
        }
        this[Array.isArray(data) ? '_observe_array' : '_observe_object'](data)
    },
    _observe_object(data) {
        for (const key of Object.keys(data)) {
            this._dep[key] = []
            let val = data[key]
            Object.defineProperty(data, key, {
                configurable: true,
                enumerable: true,
                get: () => val,
                set: newVal => {
                    if (newVal !== val) {
                        val = newVal
                        this._dep[key].map(watch => watch())
                        this._observe(val)
                    }
                },
            })
            this._observe(val)
        }
    },
    _observe_array(data) {
        const proto = Array.prototype
        const _array = Object.create(proto)
        const methods = {
            push: args => args,
            pop: () => undefined,
            unshift: args => args,
            shift: () => undefined,
            splice: args => args.slice(2),
            sort: () => undefined,
            reserve: () => undefined,
        }

        for (const m of Object.keys(methods)) {
            _array[m] = (...args) => {
                const result = proto[m].apply(data, args)
                // 获取将要改变的数据
                const target = methods[m](args)
                // 新数据也要添加getter/setter
                if (target && target.length) {
                    for (const iterator of target) {
                        this._observe(iterator)
                    }
                }
                // 通知发生变更
                return result
            }
        }
        Object.setPrototypeOf(data, _array)
        // 给数组中的对象添加getter/setter
        for (const iterator of data) {
            this._observe(iterator)
        }
    },
    _compile(root) {
        if (!root || !(root instanceof Node)) {
            throw new Error('xx')
        }
        const nodes = root.childNodes
        for (const node of Array.from(nodes)) {
            //
            if (node.nodeType === Node.TEXT_NODE) {
                // 处理属性节点
                if (/\s/.test(node.nodeValue)) {
                    continue
                } else if (/\{\{(.*?)\}\}/g.test(node.nodeValue)) {
                    const attrVal = RegExp.$1
                    node.nodeValue = this.$data[attrVal]
                    this._dep[attrVal].push(this._createWatcher(node, attrVal, 'nodeValue'))
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // 处理普通的元素节点
                if (node.hasAttribute('v-click')) {
                    const method = node.getAttribute('v-click')
                    node.addEventListener('click', this.$method[method].bind(this))
                }
                if (node.hasAttribute('v-bind')) {
                    const attrVal = node.getAttribute('v-bind')
                    node.innerHTML = this.$data[attrVal]
                    this._dep[attrVal].push(this._createWatcher(node, attrVal, 'innerHTML'))
                }
                if (node.hasAttribute('v-model')
                    && (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA')) {
                    const attrVal = node.getAttribute('v-model')
                    node.value = this.$data[attrVal]
                    this._dep[attrVal].push(this._createWatcher(node, attrVal, 'value'))
                    node.addEventListener('input', () => { this.$data[attrVal] = node.value })
                }
            }

            if (node.hasChildNodes()) {
                this._compile(node)
            }
        }
    },
    _createWatcher(el, exp, attr) {
        return () => {
            el[attr] = this.$data[exp]
        }
    },
})