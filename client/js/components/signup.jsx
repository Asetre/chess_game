import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
import * as actions from '../actions.js'
import ErrorMsg from './error-msg.jsx'
import {connect} from 'react-redux'

class Signup extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {redirect: false, err: null, user: null}
    }

    handleSubmit(e) {
        e.preventDefault()
        let username = e.target.username.value
        let password = e.target.password.value
        axios.post('/user/new', {
            username: username,
            password: password
        })
        .then(res => {
            if(res.data.redirect) {
                this.setState({redirect: true, user: res.data.user})
                let info = {
                    username: username,
                    socketId: socket.id
                }
                socket.emit('login', info)
            }
            else if(res.data.err === 'Validation error') return this.setState({err: res.data.msg})
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const {redirect} = this.state
        if(redirect) {
            this.props.login(this.state.user)
            return <Redirect to="/dashboard"></Redirect>
        }
        return(
            <div className="landing">
                <div className="signup-container">
                    <h2>Signup</h2>
                    <div className="signup-error-container">
                        <ErrorMsg msg={this.state.err} />
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="username" placeholder="username" required/>
                        <input type="password" name="password" placeholder="password" required/>
                        <input type="submit" value="Signup"/>
                    </form>
                    <Link to="/" className="return-login">
                        Already have an account? Login here.
                    </Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        redirect: state.redirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: user => {
            dispatch(actions.loginUser(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
