import {createStore, combineReducers, applyMiddleware} from 'redux'
import reducer from './reducers.js'
import {routerReducer, routerMiddleware, push } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

export const history = createHistory()
const middleware = routerMiddleware(history)

export default createStore(combineReducers({
    reducer,
    routing: routerReducer
}),applyMiddleware(middleware))
