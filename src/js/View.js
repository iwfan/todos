import EventEmitter from '../lib/EventEmitter.js'

var View = function() {
    var emit = Object.create(EventEmitter.prototype)
    var element

    return Object.assign(emit, {
        init(selector) {
            element = document.querySelector(selector)
            if (!element) {
                throw new Error('selector is invalid')
            }
        },
        update(lists) {
            if (!element) {
                throw new Error('must be init')
            }
            element.innerHTML = ''
            var tpl = document.createElement('template')
            if (lists && lists.length) {
                for (let item in lists) {
                   tpl.innerHTML += `<li class='list-item' data-id='${item}'><span>${lists[item]}</span><a>remove</a></li>` 
                }
            }
            element.appendChild(tpl.content)
        }
    })
}

export default View