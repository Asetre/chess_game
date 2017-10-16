import React from 'react'
import Tile from './tile.jsx'
import * as Engine from '../chess_engine.js'

export default class Board extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            game: false
        }
        //Populate the board with tiles
        Engine.InitializeBoard()
        this.props.board = Engine.board
        this.props.boardView = []
        this.props.board.forEach(tile => this.props.boardView.push(<Tile />))
    }

    render() {
        return (
            <div className="board">
                {this.props.boardView}
            </div>
        )
    }
}
