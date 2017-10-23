import React from 'react'
import {Link} from 'react-router-dom'

export default class Login extends React.Component {
    render() {
        return(
            <div className="landing">
                <div className="login-container">
                    <h2>Login</h2>
                    <form action="#">
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
