function Dep() {
    this.subscribs = []
}

Object.assign(Dep.prototype, {
    add(watcher) {
        if (watcher) { this.subscribs.push(watcher) }
    },
    notify() {
        for (const watcher of this.subscribs) {
            watcher.update()
        }
    },
})

export default Dep