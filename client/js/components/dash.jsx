import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        //Temporary middleware
        if(!this.props.user) {
            return <Redirect to="/"></Redirect>
        }

        return (
            <div className="dashboard">
                <h2>Username</h2>
                <div className="user-info">
                    <ul>
                        <li>Wins</li>
                        <li>Loss</li>
                        <li>MoreInfo</li>
                    </ul>
                </div>

                <button className="find-game-btn">Find Game</button>
            </div>
        )

    }
}
const mapStateToProps = (state, ownProps) => {
    return  {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        //add find game
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
