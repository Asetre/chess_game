import React from 'react'
import * as Engine from '../chess_engine.js'
import * as actions from '../actions.js'
import {connect} from 'react-redux'

import Tile from './tile.jsx'


class Board extends React.Component {
    constructor(props) {
        super(props)
        Engine.InitializeBoard()
        let whiteRook = new Engine.Rook(1)
        let whiteQueen = new Engine.Queen(1)
        let whiteBishop = new Engine.Bishop(1)
        let blackQueen = new Engine.Queen(0)
        Engine.placePiece(whiteRook, 0)
        Engine.placePiece(whiteQueen, 11)
        Engine.placePiece(whiteBishop, 27)
        Engine.placePiece(blackQueen, 12)
        let board = Engine.board
        props.initB(board)
    }

    render() {
        let tiles = []
        if(this.props.status) {
        }

        try {
            this.props.board.forEach((tile, index) => { tiles.push(<Tile tile={tile} index={index}/>)})
        } catch(err) {
            console.log(err)
        }

        return (
            <div>
                <div className="board">
                    {tiles}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        board: state.board,
        status: state.status
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initB: board => {
            dispatch(actions.initializeBoard(board))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
