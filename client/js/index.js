import React from 'react'
import ReactDOM from 'react-dom'
import {Router, Route, browserHistory} from 'react-router'
import {ConnectedRouter, push} from 'react-router-redux'

import indexHTML from '../index.html'
import mainCSS from '../main.scss'

import {Provider} from 'react-redux'
import store, {history} from './store.js'

import Board from './components/board.jsx'
import Layout from './components/layout.jsx'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <Route path="/" component={Board}/>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('app'))
    }
);
