// 用来存储数据的接口
export default function Storage() {}

Storage.prototype.enabled = false

const methods = ['add', 'get', 'getAll', 'remove']

for (const method of methods) {
    Storage.prototype[method] = function fn() {
        throw new Error('this method must be overwrite')
    }
}