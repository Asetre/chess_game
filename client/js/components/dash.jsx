import React from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import * as actions from '../actions.js'

class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.findGame = this.findGame.bind(this)
        this.cancelSearch = this.cancelSearch.bind(this)
    }

    componentDidMount() {
        let props = this.props
        socket.on('game found', function(data) {
            props.startGame(data.team, data.opponent, data.playerOneSelectedClass, data.playerTwoSelectedClass, data.opponentInfo)
        })

        socket.on('search cancelled', () => {
            this.props.cancelSearch()
        })

    }
    componentWillUnmount() {
        //remove socket listeners
        socket.removeAllListeners('search cancelled')
        socket.removeAllListeners('game found')
    }

    findGame(e) {
        e.preventDefault()
        let f = document.getElementById('type-select')
        let selectedClass = f.options[f.selectedIndex].value
        let info = {
            id: socket.id,
            selectedClass: selectedClass
        }
        socket.emit('find game', info)
        this.props.findGame()
    }

    cancelSearch(e) {
        e.preventDefault()
        socket.emit('cancel search', socket.id)
    }

    render() {
        let props = this.props
        let user = props.user
        if(props.status === 'idle') {
            return <Redirect to="/board"></Redirect>
        }

        //Temporary middleware
        if(!props.user) {
            return <Redirect to="/"></Redirect>
        }

        if(props.status === 'looking for game') {
            return (
                <div className="finding-game-load-screen">
                    <h2>Looking for a game...</h2>
                    <div className="loader-container">
                        <div className="first-l">
                            <div className="second-l">
                                <div className="main-l">

                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={this.cancelSearch}>Cancel</button>
                </div>
            )
        }

        return (
            <div className="dashboard">
                <h2>{user.local.username}</h2>
                <div className="user-info">
                    <ul>
                        <li>Wins: {props.user.wins}</li>
                        <li>Loss: {props.user.losses}</li>
                    </ul>
                </div>

                <h4>Choose your class</h4>
                <select id="type-select">
                    <option value="null">--Select a class---</option>
                    <option value="Conqueror">Conqueror</option>
                    <option value="Knight">Knight</option>
                </select>
                <button className="find-game-btn" onClick={this.findGame}>Find Game</button>
            </div>
        )

    }
}
const mapStateToProps = (state, ownProps) => {
    return  {
        user: state.user,
        opponent: state.opponent,
        redirect: state.redirect,
        status: state.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        findGame: () => {
            dispatch(actions.findingGame())
        },
        startGame: (team, opponent, p1, p2, opponentInfo) => {
            dispatch(actions.startGame(team, opponent, p1, p2, opponentInfo))
        },
        cancelSearch: () => {
            dispatch(actions.cancelSearch())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
