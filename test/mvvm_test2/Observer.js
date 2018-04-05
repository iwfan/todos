import Dep from './Dep.js'
/**
 * 一个数据监听器， 通过 Object.defineProperty 对所有属性增加getter/setter
 * 监听数组的变化：
 * http://www.51xuediannao.com/javascript/javascriptjtszbh_1258.html
 * https://github.com/youngwind/blog/issues/85
 */

const dep = Dep()
function observe(data) {
    // 如果data属于基本数据类型的话则不劫持
    if (!data || typeof data !== 'object') {
        return
    }
    if (data instanceof Array) {
        observeArray(data)
    } else {
        observeObject(data)
    }
}

function observeObject(data) {
    for (const key of Object.keys(data)) {
        let val = data[key]
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get() {
                // 不能直接返回 data[key]， 会形成死循环， 最终导致call stack溢出
                // data[key] => get => data[key] => get ... 无限死循环
                if (Dep.target) {
                    dep.add(Dep.target)
                }
                return val
            },
            set(newVal) {
                if (newVal !== data[key]) {
                    val = newVal
                    observe(val)
                    console.log('对象发生变动')
                    dep.notify(newVal)
                }
            },
        })
        observe(val)
    }
}

/**
 * 通过重新定义数组的原型，来监测数组的变动
 */
function observeArray(array) {
    const beforeProto = Array.prototype
    const afterProto = Object.create(beforeProto)
    const arrayMethod = {
        push: args => args,
        pop: () => undefined,
        unshift: args => args,
        shift: () => undefined,
        splice: args => args.slice(2),
        sort: () => undefined,
        reverse: () => undefined,
    }

    for (const method of Object.keys(arrayMethod)) {
        afterProto[method] = function f(...args) {
            const target = arrayMethod[method](args)
            if (target && target.length) {
                for (const key of target) {
                    observe(target[key])
                }
            }
            const result = beforeProto[method].apply(this, args)
            console.log('数组发生变动', target)
            // notify
            dep.notify(...target)
            return result
        }
    }
    Object.setPrototypeOf(array, afterProto)
    for (const item of array) {
        observe(item)
    }
}

export default observe