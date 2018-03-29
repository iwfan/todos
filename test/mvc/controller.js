import $ from 'jquery'

class Controller {
    constructor(options) {
        const defaultOptions = {
            init: null,
            element: null,
            events: {},
            model: {
                data: [],
            },
            template: '',
        }

        Object.assign(this, defaultOptions, options)

        this.$element = $(this.element)

        if (typeof this.init === 'function') {
            this.init.call(this)
        }

        if (this.template && this.model.data) {
            this.render()
        }

        this.bindEvent()
    }
    bindEvent() {
        if (Object.keys(this.events).length) {
            this.events.forEach()
        }
    }
}
export default Controller