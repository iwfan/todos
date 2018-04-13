import 'babel-polyfill'
import './css/index.css'
import V from './js/V'

document.addEventListener('DOMContentLoaded', () => {
    window.app = new V({
        el: '#todo',
        data: {
            title: 'A Todo List',
            text_value: '',
            todos: [],
        },
        created: function created() {
            this.todos.push('vue', 'react')
        },
        method: {
            add() {
                this.todos.push(this.text_value)
            },
            remove(evt) {
                this.todos.splice(evt.target.dataset.id, 1)
            },
        },
    })
})