import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import * as actions from '../actions.js'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.findGame = this.findGame.bind(this)
    }

    findGame(e) {
        e.preventDefault()
        socket.emit('find game', socket.id)
        this.props.findGame()
    }

    render() {
        let props = this.props
        if(props.redirect) {
            return <Redirect to="/board"></Redirect>
        }

        socket.on('game found', function(data) {
            props.startGame(data.team, data.opponent)
        })

        //Temporary middleware
        if(!props.user) {
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

                <button className="find-game-btn" onClick={this.findGame}>Find Game</button>
            </div>
        )

    }
}
const mapStateToProps = (state, ownProps) => {
    return  {
        user: state.user,
        opponent: state.opponent,
        redirect: state.redirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        findGame: () => {
            dispatch(actions.findingGame())
        },
        startGame: (team, opponent) => {
            dispatch(actions.startGame(team, opponent))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
