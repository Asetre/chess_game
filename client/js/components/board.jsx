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
