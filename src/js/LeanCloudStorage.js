import AV from 'leancloud-storage'
import Storage from './Storage'

class Todo extends AV.Object {
    constructor() {
        super()
        this.title = null
        this.content = null
        this.image = null
        this.status = null
        this.deadline = null
        this.reminder = null
        this.priority = null
        this.author = null
    }
}

AV.Object.register(Todo)
export default new Storage()