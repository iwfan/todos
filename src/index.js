import Model from './js/Model'
import View from './js/View'
import Controller from './js/Controller'

const btn = document.querySelector('button')
const txt = document.querySelector('input')
const container = document.querySelector('.list-container')

const model = Model()
const view = View()
view.init('.list-container')

btn.onclick = () => {
    view.emit('add', txt.value)
    txt.value = ''
}

container.addEventListener('click', (evt) => {
    const { target } = evt
    if (target.tagName === 'A') {
        view.emit('remove', target.parentNode.dataset.id)
    }
})

Controller(model, view)