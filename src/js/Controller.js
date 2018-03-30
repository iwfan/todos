import $ from 'jquery'
import template from 'art-template'

class Controller {
    constructor(options) {
        this.element = null
        this.template = null
        this.events = {}
        this.data = null
        this.init = null
        Object.assign(this, options)
        this.initOptions().bindEvents()
    }
    initOptions() {
        if (!this.element) {
            throw new Error('element is required')
        }
        this.$element = $(this.element)
        if (typeof this.template === 'function') {
            this.template = this.template.call(this)
        } else if (typeof this.template === 'string') {
            this.template = (this.template[0] === '#') ?
                $(this.template).html() :
                this.template
        }
        if (typeof this.init === 'function') {
            this.init.call(this)
        }
        if (this.template && this.data) {
            // this.render()
        }
        return this
    }
    bindEvents() {
        if (Object.entries(this.events).length) {
            Object.keys(this.events).forEach(key => {
                const parts = key.split(' ')
                const event = parts.shift()
                const selector = parts.join(' ')
                const method = this.events[key]
                if (typeof method === 'function') {
                    this.$element.on(event, selector, method.bind(this))
                } else if (typeof method === 'string') {
                    if (typeof this[method] === 'function') {
                        this.$element.on(event, selector, this[method].bind(this))
                    }
                }
            })
        }
    }
    render() {
        this.$element.html(template.compile(this.template)(this.data))
    }
}

export default Controller