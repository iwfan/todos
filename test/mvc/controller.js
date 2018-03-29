import $ from 'jquery'

class Controller {
    constructor(options) {
        Object.keys(options).forEach((key) => {
            this[key] = options[key]
        })

        this.$element = $(this.element)

        if (typeof this.init === 'function') {
            this.init.call(this)
        }


    }
}


export default Controller