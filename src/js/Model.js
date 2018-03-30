// import AV from 'leancloud-storage'

const Model = function Model(selector) {
    // const appId = 'pDAVsDD9SILklHldH52mAXoN-gzGzoHsz'
    // const appKey = 'R8grFdtFaI0vg3si8rubvmKL'
    const getTpl = function getTpl() {
        return `
            <header>
                <h1 class="title">{{title}}</h1>
            </header>
            <section class="input-container">
                <input type="text" name="" id="todo_input"> <button id="add">submit</button>
            </section>
            <ul class="list-container">
                {{each todos as value index}} 
                    <li class='list-item'><span>{{value}}</span><a data-id={{index}} class="remove">remove</a></li>
                {{/each}}
            </ul>
        `
    }

    const getTodos = function getTodos() {
        return ['代办1', '代办2', '代办3']
    }

    return {
        element: selector,
        data: {
            title: 'My Todo List',
            todos: [],
        },
        template: getTpl,
        events: {
            'click button#add': 'addTodo',
            'click a.remove': 'removeTodo',
        },
        init() {
            // AV.init({ appId, appKey })
            // localStorage.setItem('debug', 'leancloud*')
            this.data.todos = getTodos()
        },
        addTodo() {
            const data = this.$element.find('#todo_input').val()
            this.data.todos.push(data)
            this.render()
        },
        removeTodo(event) {
            const { target } = event
            const index = target.dataset.id
            this.data.todos.splice(index, 1)
            this.render()
        },
    }
}
export default Model