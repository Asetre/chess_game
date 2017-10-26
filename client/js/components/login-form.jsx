import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from 'axios'
import * as actions from '../actions.js'
import {Redirect} from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {redirect: false, user: null}
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault()
        let username = e.target.username.value
        let password = e.target.password.value

        axios.post('/login', {
            username: username,
            password: password
        })
        .then(res => {
            if(res.data.redirect) {
                this.setState({user: res.data.user, redirect: true})
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
                    console.log('doing stuff')
                    this.props.addError(err.response)
                }
            }
        })
    }
    render() {
        if(this.state.redirect && this.state.user) {
            this.props.login(this.state.user)
            return <Redirect to="/dashboard"></Redirect>
        }
        let display = this.props.error ? 'show' : null
        return(
            <div className="landing">
                <h1>Chess Battles</h1>
                <div className="login-container">
                    <h2>Login</h2>
                    <div className="err-msg-container">
                        <h3 className={display}>Invalid username or password</h3>
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="username" placeholder="username" required/>
                        <input type="password" name="password" placeholder="password" required/>
                        <input type="submit" value="Login"/>
                    </form>
                    <div className="auth-containers">
                        <div>
                            <a href="#"> Login with Google</a>
                        </div>
                    </div>

                    <Link to='signup'>
                        <div className="signup-btn">
                            <h3>Signup here</h3>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)
