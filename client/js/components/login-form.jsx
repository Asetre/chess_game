import React from 'react'
import {Link} from 'react-router-dom'

export default class Login extends React.Component {

    render() {
        return(
            <div className="login-container">
                <h2>Login</h2>
                <form action="#">
                    <input type="text" name="username" placeholder="username" required/>
                    <input type="password" name="password" placeholder="password" required/>
                    <input type="submit" value="Login"/>
                </form>
                <div className="auth-containers">
                    <div className="fb-login-button" data-max-rows="1" data-size="medium" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>
                    <div>
                        <a href="#"> Login with Google</a>
                    </div>
                </div>

                <Link to='/test'>
                    <div className="signup-btn">
                        <h3>Signup here</h3>
                    </div>
                </Link>
                <Link to='/dashboard'>
                    <h2>Dash</h2>
                </Link>
            </div>
        )
    }
}
