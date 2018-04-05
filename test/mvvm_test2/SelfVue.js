import observer from './Observer.js'
import Watcher from './Watcher.js'
import observe from './Observer.js'

function SelfVue(data, el, exp) {
    this.data = data
    this.proxyKeys(this.data)
    observe(data)
    el.innerHTML = this.data[exp]
    new Watcher(this, exp, value => {
        el.innerHTML = value
    })
}
SelfVue.prototype.proxyKeys = function proxyKeys(data) {
    for (const key of Object.keys(data)) {
        Object.defineProperty(this, key, {
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

Object.assign(SelfVue.prototype, {
    // 将DOM缓存至fragment
    nodeToFragment: function nodeToFragment(el) {
        const fragment = document.createDocumentFragment()
        let child = el.firstChild
        while (child) {
            fragment.appendChild(child)
            child = el.firstChild
        }
        return fragment
    },
    compileElement: function compileElement(el) {
        // 先匹配 {{var}}
        const REGEXP = /{{(.*)}}/
        const { childNodes } = el
        for (const node of [].slice.call(childNodes)) {
            const text = node.textContent
            if (this.isTextNode(node) && REGEXP.test(text)) {
                this.compileText(node, REGEXP.exec(text)[1])
            } else if (node.childNodes && node.childNodes.length) {
                this.compileElement(node)
            }
        }
    },
    compileText: function compileText(node, exp) {
        const initText = this.vm[exp]
        node.textContent = initText || ''
        new Watcher(this, exp, value => {
            node.textContent = initText || ''
        })
    },
    isTextNode: function isTextNode(node) {
        return node.nodeType === Node.TEXT_NODE
    },
})


export default SelfVue