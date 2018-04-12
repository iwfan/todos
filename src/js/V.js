import observer from './Observer'
import compile from './Compile'

function V(options) {
    this.$options = options
    this.$el = document.querySelector(options.el)
    this._data = options.data
    this._method = options.method
    observer(this._data)
    this._dataProxy(this, this._data)
    compile(this.$el, this._data, this)
    // create
    if (options.created && typeof options.created === 'function') {
        options.created.call(this)
    }
}

Object.assign(V.prototype, {
    _dataProxy(target, origin) {
        const _origin = origin
        for (const key of Object.keys(_origin)) {
            Object.defineProperty(target, key, {
                configurable: true,
                enumerable: true,
                get() {
                    return _origin[key]
                },
                set(val) {
                    _origin[key] = val
                },
            })
        }
    },
})

export default V