import { Todo, AV } from './Todo'

const Model = function Model(selector) {
    const appId = 'pDAVsDD9SILklHldH52mAXoN-gzGzoHsz'
    const appKey = 'R8grFdtFaI0vg3si8rubvmKL'

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
                    <li class='list-item'><span>{{value.attributes.title}}</span><a data-id={{value.id}} class="remove">remove</a></li>
                {{/each}}
            </ul>
        `
    }

    const signUp = function signUp() {
        const user = new AV.User()
        user.setUsername('wangfan')
        user.setPassword('wangfan')
        user.setEmail('i.wangfan@foxmail.com')
        return user.signUp()
    }

    const signIn = function signIn() {
        // return AV.User.logIn('wangfan', 'wangfan')
        return Promise.resolve()
    }

    const addTodo = function addTodo(title) {
        const todo = new Todo()
        todo.set('title', title)
        return todo.save()
    }

    const removeTodo = function removeTodo(id) {
        const todo = AV.Object.createWithoutData('Todo', id)
        return todo.destroy()
    }

    const getTodos = function getTodos() {
        const query = new AV.Query('Todo')
        return query.find()
    }

    const indexOfTodos = function indexOfTodos(todos, id) {
        let index
        let todo
        for (index = 0; index < todos.length; index += 1) {
            todo = todos[index]
            if (todo.id === id) {
                return index
            }
        }
        return -1
    }

    return {
        element: selector,
        data: {
            title: 'A Todo List Based on LeanCloud',
            todos: [],
        },
        template: getTpl,
        events: {
            'click button#add': 'add',
            'click a.remove': 'remove',
        },
        init() {
            AV.init({ appId, appKey })
            // localStorage.setItem('debug', 'leancloud*')
            // signUp().then(data => console.log(data)).catch(e => console.error(e))
            signIn().then(() => getTodos())
                .then(todos => {
                    this.data.todos = todos
                    this.render()
                }).catch(e => console.error(e))
        },
        add() {
            const data = this.$element.find('#todo_input').val()
            if (!data) {
                alert('标题不能为空')
                return
            }
            addTodo(data).then(todo => {
                this.data.todos.push(todo)
                this.render()
            })
        },
        remove(event) {
            const { target } = event
            const { id } = target.dataset
            removeTodo(id).then(() => {
                const index = indexOfTodos(this.data.todos, id)
                if (index !== -1) {
                    this.data.todos.splice(index, 1)
                    this.render()
                }
            })
        },
    }
}
export default Model