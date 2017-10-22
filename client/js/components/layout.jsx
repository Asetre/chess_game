import React from 'react'
import Login from './login-form.jsx'

export default class Layout extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className="landing">
                <h1>Chess Battles</h1>
                <Login />
            </div>
        )
    }
}
