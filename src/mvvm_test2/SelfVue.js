import observer from './Observer.js'
import Watcher from './Watcher.js'
import observe from './Observer.js'

function SelfVue(data, el, exp) {
    this.data = data
    observe(data)
    el.innerHTML = this.data[exp]
    new Watcher(this, exp, value => {
        el.innerHTML = value
    })
}

export default SelfVue