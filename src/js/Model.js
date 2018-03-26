import EventEmit from '../lib/EventEmitter.js'
import '../../node_modules/leancloud-storage/dist/av-min.js'

var Model = function() {
    console.log(AV)
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
    var api = {
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
    return Object.assign(emit, api)
}

export default Model