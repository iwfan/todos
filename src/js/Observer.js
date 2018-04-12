import Dep from './Dep'
import Watcher from './Watcher'

/**
 * 设置属性监听
 * @param {*} data
 */
function observer(data) {
    if (!data || typeof data !== 'object') {
        return
    }
    // 判断data是何种类型的数据
    (Array.isArray(data) ? observeArray : observeObject)(data)
}

/**
 * 通过 Object.defineProperty 给对象设置getter/setter
 * @param {*} data
 */
function observeObject(obj) {
    for (const key of Object.keys(obj)) {
        let value = obj[key]
        // 创建一个事件管理器
        const dep = new Dep()
        Object.defineProperty(obj, key, {
            configurable: true,
            enumerable: true,
            get() {
                // 当创建一个watcher时，添加一个订阅者
                if (Watcher.target) {
                    dep.add(Watcher.target)
                }
                return value
            },
            set(newValue) {
                if (value !== newValue) {
                    // 新的属性继续添加监听
                    value = newValue
                    observer(newValue)
                    // 修改属性时， 发布通知
                    dep.notify()
                }
            },
        })
        // 添加监听
        observer(value)
    }
}
/**
 * 通过扩展原型链的方式给数组设置监听
 * @param {*} array
 */
function observeArray(array) {
    const dep = new Dep()
    const proto = Array.prototype
    const _array = Object.create(proto)
    const methods = {
        push: args => args,
        pop: () => undefined,
        unshift: args => args,
        shift: () => undefined,
        splice: args => args.slice(2),
        sort: () => undefined,
        reserve: () => undefined,
    }
    _array.addWatcher = () => {
        if (Watcher.target) {
            dep.add(Watcher.target)
        }
    }
    for (const method of Object.keys(methods)) {
        _array[method] = (...args) => {
            const result = proto[method].apply(array, args)
            // 获取将要改变的数据
            const target = methods[method](args)
            // 新数据也要添加getter/setter
            if (target && target.length) {
                for (const iterator of target) {
                    observer(iterator)
                }
            }
            // 通知发生变更
            dep.notify()
            return result
        }
    }
    Object.setPrototypeOf(array, _array)
    // 给数组的每一项也添加getter/setter
    for (const iterator of array) {
        observer(iterator)
    }
}

export { observer, Watcher, Dep }