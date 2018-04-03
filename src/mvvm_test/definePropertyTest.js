const obj = {}
obj.singer = '周杰伦'
Object.defineProperty(obj, 'music', {
    configurable: true, // 可以配置， 可以删除
    enumerable: true, // 可以枚举
    // writable: true, // 可以修改
    // value: '七里香',

    /** 使用 get set时，不能设置 writeable 和 value， 他们是互斥的  */
    get() {
        return '发如雪'
    },
    set(newValue) {
        console.log(newValue)
    },
})

console.log(obj)

// 如果需要删除改属性， 则需要将 configurable 设置为 true
delete obj.music
console.log(obj)

// 如果想对属性进行修改， 那么 writeable 设置为true
obj.music = '听妈妈的话'
console.log(obj)

// 默认情况下使用 defineProperty 定义的属性是不能被枚举的，
// 可以修改 enumerable 属性为true
