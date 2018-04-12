import observer from './Observer'
import Watcher from './Watcher'
// import compile from './Compile'

function V(options) {
    this.$options = options
    this.$el = document.querySelector(options.el)
    this._data = options.data
    this._method = options.method
    observer(this._data)
    this._dataProxy(this, this._data)
    this._compile(this.$el, this._data)
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
    _compile(root, data) {
        if (!root || !(root instanceof Node)) {
            throw new Error('xx')
        }
        const nodes = root.childNodes
        for (const node of Array.from(nodes)) {
            //
            if (node.nodeType === Node.TEXT_NODE) {
                // 处理属性节点
                // if (/\s/.test(node.nodeValue)) {
                //     continue
                // } 
                if (/\{\{(.*?)\}\}/g.test(node.nodeValue)) {
                    const attrVal = RegExp.$1
                    node.nodeValue = data[attrVal]
                    Watcher.create(this, node, attrVal, 'nodeValue')
                }
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                // 处理普通的元素节点
                if (node.hasAttribute('v-click')) {
                    const method = node.getAttribute('v-click')
                    node.addEventListener('click', this._method[method].bind(this))
                }
                if (node.hasAttribute('v-bind')) {
                    const attrVal = node.getAttribute('v-bind')
                    node.innerHTML = data[attrVal]
                    Watcher.create(this, node, attrVal, 'innerHTML')
                }
                if (node.hasAttribute('v-model')
                    && (node.tagName.toUpperCase() === 'INPUT' || node.tagName.toUpperCase() === 'TEXTAREA')) {
                    const attrVal = node.getAttribute('v-model')
                    node.value = data[attrVal]
                    Watcher.create(this, node, attrVal, 'value')
                    node.addEventListener('input', () => { this._data[attrVal] = node.value })
                }
                if (node.hasAttribute('v-for')) {
                    const attrVal = node.getAttribute('v-for')
                    const reg = /([\$\w]+)\s+of\s+([\$\w]+)/
                    if (reg.test(attrVal)) {
                        const alias = RegExp.$1
                        const exp = RegExp.$2
                        const pNode = node.parentNode
                        const callback = () => {
                            if (data[exp] && data[exp].length) {
                                pNode.innerHTML = ''
                                for (const itor of data[exp]) {
                                    const cloneNode = node.cloneNode(true)
                                    cloneNode.removeAttribute('v-for')
                                    this._compile(cloneNode, { [alias]: itor })
                                    pNode.appendChild(cloneNode)
                                }
                            }
                        }
                        callback()
                        Watcher.create(this, node, exp, callback)
                    }
                } else if (node.hasChildNodes()) {
                    this._compile(node, data)
                }
            }
        }
    },
})

export default V