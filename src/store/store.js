import {createStore} from 'redux'
import {cakeReducer }from '../reducer/cakeReducer'

const store=createStore(cakeReducer)

export default store;