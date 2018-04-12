import 'babel-polyfill'
import './css/index.css'
import V from './js/V'

document.addEventListener('DOMContentLoaded', () => {
    window.app = new V({
        el: '#app',
        data: {
            number: 0,
            title: ['vue', 'react'],
        },
        method: {
            increment() {
                this.number++
            },
        },
    })
})