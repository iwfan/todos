import $ from 'jquery'
// import template from 'art-template'

class Controller {
    constructor(options) {
        const defaultOptions = {
            init: null,
            element: null,
            events: {},
            data: null,
            template: '',
        }

        Object.assign(this, defaultOptions, options)

        this.$element = $(this.element)

        if (typeof this.init === 'function') {
            this.init.call(this)
        }

        if (this.template && this.data) {
            this.render()
        }

        this.bindEvent()
    }
    bindEvent() {
        if (Object.keys(this.events).length) {
            Object.keys(this.events).forEach((key) => {
                const parts = key.split(' ')
                const event = parts.shift()
                const selector = parts.join(' ')
                if (typeof this.events[key] === 'function') {
                    this.$element.on(event, selector, this.events[key])
                } else if (typeof this.events[key] === 'string') {
                    const methodName = this.events[key]
                    if (typeof this[methodName] === 'function') {
                        this.$element.on(event, selector, this[methodName].bind(this))
                    }
                }
            })
        }
    }
    render() {
        const source = (this.template[0] === '#') ?
            $(this.template).html() : this.template
        const html = template.compile(source)(this.data)
        this.$element.html(html)
    }
}
export default Controller