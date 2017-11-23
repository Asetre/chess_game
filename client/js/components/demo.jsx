import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import * as actions from '../actions.js'

let props
function Demo(p) {
    props = p
    return(
        <div className="demo-container">
        <h2>Demonstration account</h2>
        <h3>Please use two different tabs, logging onto two different users in order to test this app</h3>
        <h3>Here are two accounts that are already created for you to use</h3>
        <a href="#">Github and documentation here</a>
        <ul>
            <li>
                <h4>username: testuser</h4>
                <h4>password: testtest</h4>
            </li>
            <li>
                <h4>username: abctest</h4>
                <h4>password: testtest</h4>
            </li>
        </ul>
        <h5>After clicking below a new tab will open for you to login to the second account</h5>
        <a href="/demo" rel="noopener noreferrer" target="_blank">
            <button onClick={handleDemoLogin}>Login First Demo account</button>
        </a>
        <button onClick={handleSecondDemoLogin}>Login Second Demo account</button>
    </div>
)
}

function handleDemoLogin() {
    let username = 'testuser'
    let password = 'testtest'
    axios.post('/login', {
        username: username,
        password: password
    })
    .then(res => {
        if(res.data.redirect) {
            props.login(res.data.user)
            props.history.push('/dashboard')
            let info = {
                username: username,
                socketId: socket.id
            }
            socket.emit('login', info)
        }
    })
    .catch(err => {
        if(err.response) {
            if(err.response.status === 401) {
                console.log('Error: Unable to login')
            }
        }
    })
}

function handleSecondDemoLogin() {
    let username = 'abctest'
    let password = 'testtest'
    axios.post('/login', {
        username: username,
        password: password
    })
    .then(res => {
        if(res.data.redirect) {
            props.login(res.data.user)
            props.history.push('/dashboard')
            let info = {
                username: username,
                socketId: socket.id
            }
            socket.emit('login', info)
        }
    })
    .catch(err => {
        if(err.response) {
            if(err.response.status === 401) {
                console.log('Error: Unable to login')
            }
        }
    })
}

const mapStateToProps = state => {
    return {
        error: state.errors
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: user => {
            dispatch(actions.loginUser(user))
        },
        addError: err => {
            dispatch(actions.addError(err))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Demo)
