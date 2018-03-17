/**
 * EventEmitter
 */
function EventEmitter() {}

let proto = EventEmitter.prototype

// 获取全部的事件监听
proto._getEvents = function _getEvents() {
    return this._events || (this._events = Object.create(null))
}

// 获取指定事件的监听
proto.getListeners = function getListeners(evt) {
    let events = this._getEvents()
    return events[evt] || (events[evt] = [])
}

// 校验监听函数
proto.validListener = function validListener(listener) {
    if (typeof listener === 'object') {
        validListener(listener.listener)
        return
    }
    if (typeof listener !== 'function') {
        throw new Error('listener must be a function')
    }
    return this
}

// 获取指定监听器在数组中的索引
proto.indexOfListener = function indexOfListener(listeners, listener) {
    let isWrapperObject = typeof listener === 'object'
    let index = listeners.length
    let item
    while (index--) {
        item = listeners[index]
        if (item.listener === (isWrapperObject ? listener.listener : listener)) {
            return index
        }
    }
    return -1   
}

// 添加事件监听
proto.addListener = function addListener(evt, listener) {
    this.validListener(listener)

    let listeners = this.getListeners(evt)
    let isWrapperObject = typeof listener === 'object'

    if (this.indexOfListener(listeners, listener) === -1) {
        [].push.call(listeners, isWrapperObject ? listener : {
            listener,
            once: false,
        })
    }
    return this
}

// 
proto.on = function on(evt, listener) {
    return this.addListener(evt, listener)
}

// 一次性的事件监听
proto.once = function once(evt, listener) {
    return this.addListener(evt, {
        listener,
        once: true,
    })
}

//移除事件监听
proto.removeListener = function removeListener(evt, listener) {
    // 不传入具体函数的话，就清空此事件下的函数
    if (!listener) {
       delete this._getEvents()[evt]
       return
    } 
    // 
    let listeners = this.getListeners(evt)
    let index = this.indexOfListener(listeners, listener)

    // 删除指定的监听函数
    listeners.splice(index >>> 0, 1)
    return this
}

// 移除事件监听
proto.off = function off(evt, listener) {
    return this.removeListener(evt, listener)
}

// 触发事件
proto.emitListener = function emitListener(evt, ...args) {
    let listeners = this.getListeners(evt)
    // 
    let index = listeners.length
    let item
    while (index--) {
        item = listeners[index]
        item.listener.apply(this, args || [])
        if (item.once) {
            this.removeListener(evt, item)
        }
    }
    return this
}

// 触发事件
proto.emit = function emit(evt, ...args) {
    return this.emitListener.apply(this, [evt].concat(args))
}

export default EventEmitter