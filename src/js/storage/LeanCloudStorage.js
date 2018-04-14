import AV from 'leancloud-storage'
import Storage from './Storage'

const leancloudStorage = new Storage()
const appId = 'pDAVsDD9SILklHldH52mAXoN-gzGzoHsz'
const appKey = 'R8grFdtFaI0vg3si8rubvmKL'
const Todo = AV.Object.extend('Todo')

function init() {
    AV.init({ appId, appKey })
    return true
}

leancloudStorage.enabled = init()

leancloudStorage.add = function add(todo) {
    const _todo = new Todo()
    _todo.set('title', todo.title)
    return _todo.save().then(data => ({ id: data.id, title: data.get('title') }))
}

leancloudStorage.get = function get(key) {
    const query = new AV.Query('Todo')
    return query.get(key).then(todo => ({ id: todo.id, title: todo.get('titile') }))
}

leancloudStorage.getAll = function getAll() {
    const query = new AV.Query('Todo')
    return query.find().then(todos => {
        const result = []
        for (const todo of todos) {
            result.push({ id: todo.id, title: todo.get('title') })
        }
        return result
    })
}

leancloudStorage.remove = function remove(key) {
    const todo = AV.Object.createWithoutData('Todo', key)
    return todo.destroy()
}

export default leancloudStorage