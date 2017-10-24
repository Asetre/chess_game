import React from 'react'
import * as Engine from '../chess_engine.js'
import * as actions from '../actions.js'
import {connect} from 'react-redux'

import Tile from './tile.jsx'

class Board extends React.Component {
    constructor(props) {
        super(props)
        Engine.InitializeBoard()
        Engine.setupPieces()
        let board = Engine.board
        props.initB(board)
        console.log('constructed board')
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
            let isGameOver = Engine.isGameOver()
            if(isGameOver) {
                socket.emit('game over', {
                    winner: isGameOver,
                    user: props
                })
            }
        })
    }

    render() {
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
        user: state.user
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
