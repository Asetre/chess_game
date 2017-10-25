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
        if(!this.props.user) return <Redirect to="/"></Redirect>
        if(this.props.status === 'dashboard') return <Redirect to="/dashboard"></Redirect>

        if(this.props.status === 'game over') {
            return (
                <div className="game-over-screen">
                    <h2>Game over</h2>
                    <h4>Winner</h4>
                    <h3 className="game-winner">{this.props.winner}</h3>
                    <h4>Loser</h4>
                    <h3 className="game-loser">{this.props.loser}</h3>
                    <button onClick={this.returnToMenu}>Menu</button>
                </div>
            )
        }

        let tiles = []
        this.props.board.forEach((tile, index) => { tiles.push(<Tile tile={tile} index={index} key={index}/>)})

        return (
            <div className="board">
                {tiles}
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
        redirect: state.redirect
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
