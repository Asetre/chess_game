import React from 'react'
import ReactDOM from 'react-dom'

import {Provider} from 'react-redux'
import store from './store.js'

import Board from './components/board.jsx'
import Layout from './components/layout.jsx'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Provider store={store}>
            <Board />
        </Provider>,
        document.getElementById('app'))
    }
);
