import 'babel-polyfill'
import './css/index.css'
import V from './js/mvvm/V'
import storage from './js/storage/StoragePolicy'

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
                const key = evt.target.dataset.id
                storage.remove(key).then(() => {
                    let index = 0
                    for (const todo of this.todos) {
                        if (todo.id === key) {
                            this.todos.splice(index, 1)
                            break
                        }
                        index += 1
                    }
                })
            },
        },
    })
})