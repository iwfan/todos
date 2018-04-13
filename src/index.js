import 'babel-polyfill'
import './css/index.css'
import V from './js/V'
import storage from './js/StoragePolicy'

document.addEventListener('DOMContentLoaded', () => {
    window.app = new V({
        el: '#todo',
        data: {
            title: 'A Todo List',
            text_value: '',
            todos: [],
        },
        created: function created() {
            storage.getAll().then(list => {
                this.todos.push(...list)
            })
        },
        method: {
            add() {
                storage.add({ title: this.text_value }).then(todo => {
                    this.todos.push(todo)
                })
            },
            remove(evt) {
                this.todos.splice(evt.target.dataset.id, 1)
            },
        },
    })
})