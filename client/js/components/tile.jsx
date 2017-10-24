import React from 'react'
import Piece from './piece.jsx'
import {connect} from 'react-redux'
import * as actions from '../actions.js'
import * as Engine from '../chess_engine.js'

class Tile extends React.Component {
    constructor(props){
        super(props)
        this.tileClicked = this.tileClicked.bind(this)
    }

    tileClicked() {
        let props = this.props
        let piece = Engine.board[props.index].piece

        if(props.status === 'idle') {
            //check if there is a piece on this tile
            //todo: check if the playersTeam matches the piece team clicked/ current players turn
            if(piece && props.selectedPiece != piece && piece.team === props.playerTurn && piece.team === props.team) {
                let moves = piece.findValidMoves()
                //dispatch action
                props.addValidMoves(moves, piece)
            }
        }else if(props.status === 'waiting for valid move') {
            //check if a valid move
            if(props.validMoves.indexOf(props.index) !== -1) {
                let oldPosition = props.selectedPiece.position
                Engine.movePiece(props.selectedPiece, props.index)
                props.selectedPiece.position = oldPosition

                let newTurn = props.playerTurn === 1 ? 0 : 1

                //update other players board
                socket.emit('move piece', {
                    board: Engine.board,
                    turn: props.playerTurn,
                    opponent: props.opponent,
                    piece: props.selectedPiece,
                    newLocation: props.index
                })
                //dispatch action
                props.movePiece(Engine.board)
                //dispatch action
                props.changeTurn(newTurn)
            }else return props.invalidMove()
        }
    }

    render() {
        let props = this.props

        socket.on('update', data => {
            Engine.movePiece(data.piece, data.newLocation)
            let newData = {
                turn: data.turn,
                board: Engine.board
            }
            props.updateBoard(newData)
        })

        return(
            <div className={"tile " + props.highlight } onClick={this.tileClicked}>
                <Piece piece={props.tile.piece} />
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    let highlight
    if(state.validMoves.indexOf(ownProps.index) !== -1) {
        highlight = 'highlight'
    }else highlight = null
    return {
        board: state.board,
        validMoves: state.validMoves,
        selectedPiece: state.selectedPiece,
        status: state.status,
        playerTurn: state.playerTurn,
        tile: state.board[ownProps.index],
        highlight: highlight,
        team: state.playerTeam,
        opponent: state.opponent
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
        },
        updateBoard: data => {
            dispatch(actions.updateBoard(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tile)
