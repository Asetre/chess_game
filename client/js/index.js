import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch, IndexRoute} from 'react-router-dom'

import indexHTML from '../index.html'
import mainCSS from '../main.scss'

import {Provider} from 'react-redux'
import store from './store.js'

import Board from './components/board.jsx'
import Layout from './components/layout.jsx'
import Dashboard from './components/dash.jsx'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <div>
                    <Route exact path='/' component={Board}/>
                    <Route exact path='/test' component={Board}/>
                    <Route exact path='/dashboard' component={Dashboard}/>
                </div>
            </Router>
        </Provider>,
        document.getElementById('app'))
    }
)
