import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
import * as actions from '../actions.js'

class Signup extends React.Component {
    constructor() {
        super()
        this.handleSubmit = this.handleSubmit.bind(this)
        this.state = {redirect: false, err: null}
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
            if(res.data.redirect) return this.setState({redirect: true})
            else if(res.data.err === 'Validation error') return this.setState({err: res.data.msg})
        })
        .catch(err => {
            console.log(err)
        })
    }

    render() {
        const {redirect} = this.state
        if(redirect) {
            return <Redirect to="/dashboard"></Redirect>
        }
        return(
            <div className="landing">
                <div className="signup-container">
                    <h2>Signup</h2>
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
        login:
    }
}

export defult connect(mapStateToProps, mapDispatchToProps)(Signup)
