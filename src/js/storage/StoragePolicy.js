import browserStorage from './BrowserStorage'
import leanCloudStorage from './LeanCloudStorage'

const storages = [browserStorage, leanCloudStorage]

export default (function fn() {
    for (const itor of storages) {
        if (itor.enabled) {
            return itor
        }
    }
    return null
}())