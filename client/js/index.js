import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import indexHTML from '../index.html'
import mainCSS from '../main.scss'

import {Provider} from 'react-redux'
import store from './store.js'

import Board from './components/board.jsx'
import Layout from './components/layout.jsx'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/" component={Board} />
        </Router>
    </Provider>,
        document.getElementById('app'))
    }
)
