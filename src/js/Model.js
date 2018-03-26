import EventEmit from '../lib/EventEmitter.js'
import '../../node_modules/leancloud-storage/dist/av-min.js'

var Model = function() {
    // init
    const appId = 'pDAVsDD9SILklHldH52mAXoN-gzGzoHsz'
    const appKey = 'R8grFdtFaI0vg3si8rubvmKL'
    AV.init({ appId, appKey })
    localStorage.setItem('debug', 'leancloud*');

    // create class
    const Todo = AV.Object.extend('Todo');
    const todoList

    // let todo = new Todo()
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
    // console.log(AV)

    let lists 

    try {
       lists = await fetchTodoData() 
    } catch (error) {
       lists = [] 
    }

    async function fetchTodoData() {
        return await new AV.Query('Todo').find()
    }

    var lists = ['代办1','代办2','代办3','代办4','代办5',]
    var emit = Object.create(EventEmit.prototype)
    var handler = {
        get(target, key, receiver) {
            return Reflect.get(target, key, receiver)
        },
        set(target, key, value, receiver) {
            return Reflect.set(target, key, value, receiver)
        },
        apply(target, context, args) {
            var result = Reflect.apply(...arguments)
            context.emit(target.name, args)
            return result
        }
    }
    const API = {
        add: new Proxy(function add(data) {
            return lists.push(data)
        }, handler),
        remove: new Proxy(function remove(index) {
            lists.splice(index, 1)
        }, handler),
        getLists() {
            return lists;
        }
    }
    return Object.assign(emit, API)
}

export default Model