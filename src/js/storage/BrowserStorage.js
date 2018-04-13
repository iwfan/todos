import store from 'store'
import Storage from './Storage'

const browserStorage = new Storage()
const key = '__todo__'
const randomKey = function randomKey() {
    return Math.random().toString(16).substr(2) + Date.now().toString(16)
}

function init() {
    if (!store.enabled) {
        throw new Error('Local storage is not supported by your browser. Please disabled "Private Mode", or upgrade to a modern browser')
    }
    if (!store.get(key)) {
        store.set(key, {})
    }
    return true
}

browserStorage.enabled = init()

browserStorage.add = function add(todo) {
    const todos = store.get(key)
    const primarykey = randomKey()
    const _todo = todo
    _todo.id = primarykey
    todos[primarykey] = _todo
    store.set(key, todos)
    return Promise.resolve(_todo)
}

browserStorage.get = function get(primarykey) {
    const todos = store.get(key)
    return Promise.resolve(todos[primarykey])
}

browserStorage.getAll = function getAll() {
    const todos = store.get(key)
    return Promise.resolve(Object.values(todos))
}

browserStorage.remove = function remove(primarykey) {
    const todos = store.get(key)
    delete todos[primarykey]
    store.set(key, todos)
    return Promise.resolve(primarykey)
}

export default browserStorage