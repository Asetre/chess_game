import React from 'react'
import {Link, Redirect} from 'react-router-dom'

export default class Landing extends React.Component {
    render() {
        return (
            <div className="main-landing">
                <div className="main-landing-content">
                    <div className="header-container">
                        <h2>Chess Battles</h2>
                        <p>Choose a class and battle other players! The same rules of chess apply except each class has it's own advantages!</p>
                        <Link to='login'>
                            <button>login</button>
                        </Link>
                        <h6>or</h6>
                        <Link to='signup'>
                            <button>Signup</button>
                        </Link>
                    </div>
                    <div className="news-container">
                        <h3>News</h3>
                    </div>
                </div>
            </div>
        )
    }
}
