import AV from 'leancloud-storage'
import EventEmit from '../lib/EventEmitter'

const Model = function Model() {
    // init
    const appId = 'pDAVsDD9SILklHldH52mAXoN-gzGzoHsz'
    const appKey = 'R8grFdtFaI0vg3si8rubvmKL'
    AV.init({ appId, appKey })
    localStorage.setItem('debug', 'leancloud*')

    // create class
    // const Todo = AV.Object.extend('Todo')
    const emit = Object.create(EventEmit.prototype)
    // let todoList

    // const todo = new Todo()
    // todo.set('title', "测试数据一")
    // todo.save()
    // .then(function(data) {
    //     console.log(data)
    // }).catch(function(e) {

    // })

    // var query = new AV.Query('Todo')
    // query.find()
    // .then(function(data) {
    //     console.log(data)
    // })
    // .catch(function(e) {

    // })
    console.log(AV)

    const lists = ['代办1', '代办2', '代办3', '代办4', '代办5']

    const handler = {
        get(target, key, receiver) {
            return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver) {
            return Reflect.set(target, key, value, receiver)
        },
        apply(target, context, args) {
            const result = Reflect.apply([target, context, args])
            context.emit(target.name, args)
            return result
        },
    }
    const API = {
        add: new Proxy((data => lists.push(data)), handler),
        remove: new Proxy(((index) => {
            lists.splice(index, 1)
        }), handler),
        getLists() {
            return lists
        },
    }
    return Object.assign(emit, API)
}

export default Model