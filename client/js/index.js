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
import Login from './components/login-form.jsx'
import Signup from './components/signup.jsx'
import Landing from './components/landing-page.jsx'
import Demo from './components/demo.jsx'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Provider store={store}>
            <Router>
                <div>
                    <Route exact path="/" component={Landing}/>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/board" component={Board}/>
                    <Route exact path='/dashboard' component={Dashboard}/>
                    <Route exct path='/demo' render={props => <Demo {...props} />} />
                </div>
            </Router>
        </Provider>,
        document.getElementById('app'))
    }
)
