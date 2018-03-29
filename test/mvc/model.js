import $ from 'jquery'
import Controller from './controller'

const controller = new Controller({
    element: '.modules',
    template: `
        <input type="text" name="number1" value="{{output}}">
        <button name="button1">点我</button>
        <div class="output">{{output}}</div>
    `,
    data: {
        output: '',
    },
    events: {
        'click button': 'onButtonClick',
        'change input': 'onInputChange',
    },
    onButtonClick() {
        this.data.output = this.$element.find('input').val()
        this.render()
    },
    onInputChange(evt) {
        // this.data.output = $(evt.target).val()
        // this.render()
    },
})