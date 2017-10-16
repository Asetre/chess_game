import React from 'react'
import * as Engine from '../chess_engine.js'

import Tile from './tile.jsx'
import Piece from './piece.jsx'

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            game: false
        }
        //Populate the board with tiles
        Engine.InitializeBoard()
        this.props.board = Engine.board
        let whiteKing = new Engine.King(1)
        Engine.placePiece(whiteKing, 0)
        this.props.boardView = []
        this.props.board.forEach(tile => this.props.boardView.push(
            <Tile tile={tile}/>
        ))
    }

    render() {
        return (
            <div className="board">
                {this.props.boardView}
            </div>
        )
    }

    updateBoard() {

    }
}
