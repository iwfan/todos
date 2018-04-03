const emit = new EventEmitter()
// 劫持对象， 给属性添加 getter 与 setter
function hijack(data, watcher, p) {
    if (!data || typeof data !== 'object') {
        return
    }
    const superKey = p || ''
    for (const key of Object.keys(data)) {
        let val = data[key]
        Object.defineProperty(data, key, {
            configurable: true, // 可以配置 可以删除
            enumerable: true, // 可以枚举
            get() {
                return val
            },
            set(newVal) {
                if (val !== newVal) {
                    val = newVal
                    hijack(newVal, watcher, key)
                    // 触发通知
                    emit.emit(superKey + key, val)
                }
            },
        })
        emit.on(superKey + key, watcher)
        hijack(val, watcher, key)
    }
}

// 数据代理， 使用target来代理data
function dataProxy(target, data) {
    if (!target || !data) { return }
    for (const key of Object.keys(data)) {
        Object.defineProperty(target, key, {
            configurable: true,
            enumerable: true,
            get() {
                return data[key]
            },
            set(newVal) {
                data[key] = newVal
            },
        })
    }
}

function compile(template, data) {
    // const fragment = document.createDocumentFragment()
    const REGEXP = /{{([$_a-zA-Z][a-zA-Z$_0-9\.]+)}}/ig
    return ''.replace.call(template, REGEXP, (raw, key) => {
        // 不能使用 []  只能用 .
        const path = ''.split.call(key, '.')
        let _data = data
        while (_data && path.length) {
            _data = _data[path.shift()]
        }
        return _data || raw
    })
}


function MVVM(options) {
    this.$options = options || {}
    const { data } = this.$options
    this._data = data
    const $el = document.querySelector(this.$options.el)
    if (!$el) {
        return
    }
    this._tpl = $el.innerHTML
    this.watcher = obj => {
        // debugger
        const html = compile(this._tpl, this)
        $el.innerHTML = html
    }
    // 数据劫持
    hijack(data, this.watcher)
    // shutcut of this._data
    dataProxy(this, this._data)
    this.watcher()
}