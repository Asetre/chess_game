import React from 'react'
import * as Engine from '../chess_engine.js'
import * as actions from '../actions.js'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Tile from './tile.jsx'

class Board extends React.Component {
    constructor(props) {
        super(props)
        Engine.InitializeBoard()
        Engine.setupPieces(props.playerOneClass, props.playerTwoClass)
        let board = Engine.board
        props.initB(board)
        this.returnToMenu = this.returnToMenu.bind(this)
    }
    componentDidMount() {
        let props = this.props
        socket.on('update board', data => {
            Engine.movePiece(data.oldLocation, data.newLocation)
            let newData = {
                turn: data.turn,
                board: Engine.board
            }
            props.updateBoard(newData)
            let inCheck = Engine.inCheck()
            if(inCheck) {
                return props.playerInCheck(inCheck)
            }
        })
        socket.on('game over', data => {
            props.gameOver(data.winner, data.loser)
        })
    }

    returnToMenu(e) {
        e.preventDefault()
        this.props.returnToMenu()
    }

    render() {
        let white
        let black
        let whiteHighlight
        let blackHighlight

        this.props.turn === 1 ? whiteHighlight = 'turn-show' : whiteHighlight = null
        this.props.turn === 0 ? blackHighlight = 'turn-show' : blackHighlight = null

        //Update our user object to match the format of the opponent info
        let updatedInfo = {
            username: this.props.user.local.username,
            wins: this.props.user.wins,
            losses: this.props.user.losses
        }
        //Get the info for which side the user should be on
        if(this.props.team === 1) {
            white = updatedInfo
            black = this.props.opponentInfo
        }else {
            white = this.props.opponentInfo
            black = updatedInfo
        }

        //Redirect if user is not logged in
        if(!this.props.user) return <Redirect to="/"></Redirect>
        //Redirect to dashboard once game is over
        if(this.props.status === 'dashboard') return <Redirect to="/dashboard"></Redirect>

        if(this.props.status === 'game over') {
            return (
                <div className="game-over-screen">
                    <h2>Game over</h2>
                    <div className="winner-animation-container">
                        <h4>Winner</h4>
                        <h3 className="game-winner">{this.props.winner}</h3>
                    </div>
                    <h4>Loser</h4>
                    <h3 className="game-loser">{this.props.loser}</h3>
                    <button onClick={this.returnToMenu}>Menu</button>
                </div>
            )
        }

        let tiles = []
        this.props.board.forEach((tile, index) => { tiles.push(<Tile tile={tile} index={index} key={index}/>)})

        return (
            <div className="board-view">
                <div className="board">
                    {tiles}
                </div>
                <div className="board-users-info-container">
                    <div className="game-user-container">
                    <h3 className={blackHighlight + " board-username"}>{black.username}</h3>
                    <h3>{this.props.playerOneClass}</h3>
                    <h3>wins: {black.wins}</h3>
                    <h3>losses: {black.losses}</h3>
                    </div>
                    <h6>vs</h6>
                    <div className="game-user-container">
                    <h3 className={whiteHighlight + " board-username"}>{white.username}</h3>
                    <h3>{this.props.playerTwoClass}</h3>
                    <h3>wins: {white.wins}</h3>
                    <h3>losses: {white.losses}</h3>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.board,
        status: state.status,
        user: state.user,
        playerOneClass: state.playerOneClass,
        playerTwoClass: state.playerTwoClass,
        winner: state.winner,
        loser: state.loser,
        redirect: state.redirect,
        opponentInfo: state.opponentInfo,
        team: state.playerTeam,
        turn: state.playerTurn
    }
}
const mapDispatchToProps = dispatch => {
    return {
        initB: board => {
            dispatch(actions.initializeBoard(board))
        },
        updateBoard: data => {
            dispatch(actions.updateBoard(data))
        },
        playerInCheck: data => {
            dispatch(actions.playerInCheck(data))
        },
        gameOver: (winner, loser) => {
            dispatch(actions.gameOver(winner, loser))
        },
        returnToMenu: () => {
            dispatch(actions.redirectDashboard())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
