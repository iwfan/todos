import 'babel-polyfill'
import './css/index.css'
import Model from './js/Model'
import Controller from './js/Controller'

const options = Model('.wrapper')
const controller = new Controller(options)
// console.log(controller)