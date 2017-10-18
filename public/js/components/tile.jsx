import React from 'react'
import Piece from './piece.jsx'
import {connect} from 'react-redux'
import * as actions from '../actions.js'
import * as Engine from '../chess_engine.js'

class Tile extends React.Component {
    constructor(props){
        super(props)
        this.tileClicked = this.tileClicked.bind(this)
        props.tile = props.board[props.index]
    }

    tileClicked() {
        let props = this.props
        let piece = Engine.board[props.index].piece
        //todo: check is user turn
        if(props.status === 'idle') {
            //check if there is a piece on this tile
            //todo: check if the playersTeam matches the piece team clicked/ current players turn
            if(piece && props.selectedPiece != piece && piece.team === props.playerTurn) {
                let moves = piece.findValidMoves()
                //dispatch action
                props.addValidMoves(moves, piece)
            }
        }else if(props.status === 'waiting for valid move') {
            //check if a valid move
            if(props.validMoves.indexOf(props.index) !== -1) {
                Engine.movePiece(props.selectedPiece, props.index)

                let newTurn = props.playerTurn === 1 ? 0 : 1
                //dispatch action
                props.movePiece(Engine.board)
                //dispatch action
                return props.changeTurn(newTurn)
            }else return props.invalidMove()
        }
    }

    render() {
        let props = this.props
        //check to see if the tile needs to be highlighted
        if(props.validMoves.indexOf(props.index) != -1) {
            //this tile is part of valid moves and needs to be highlighted
            props.highlight = 'highlight'
        }else props.highlight = null

        return(
            <div className={"tile " + props.highlight } onClick={this.tileClicked}>
                <Piece piece={props.tile.piece} />
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        validMoves: state.validMoves,
        selectedPiece: state.selectedPiece,
        board: state.board,
        status: state.status,
        playerTurn: state.playerTurn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addValidMoves: (tile, piece) => {
            dispatch(actions.addMoves(tile, piece))
        },
        invalidMove: () => {
            dispatch(actions.invalidMove())
        },
        movePiece: board => {
            dispatch(actions.movePiece(board))
        },
        changeTurn: newTurn => {
            dispatch(actions.changePlayerTurn(newTurn))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tile)
