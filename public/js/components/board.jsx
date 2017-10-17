import React from 'react'
import * as Engine from '../chess_engine.js'
import {connect} from 'react-redux'

import Tile from './tile.jsx'
import Piece from './piece.jsx'

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        //Populate the board with tiles
        Engine.InitializeBoard()
        let board = Engine.board
        this.props.boardView = []
        //create tile Components
        board.forEach((tile, i) => this.props.boardView.push(
            <Tile tile={tile} index={i}/>
        ))
    }

    render() {
        return (
            <div className="board">
                {this.props.boardView}
            </div>
        )
    }
}
