/**
 * 订阅管理器
 */
function Dep() {
    const subscribs = []
    return {
        add(watcher) {
            if (watcher) {
                subscribs.push(watcher)
            }
        },
        notify() {
            for (const watcher of subscribs) {
                watcher.update()
            }
        },
    }
}

Dep.target = null

export default Dep