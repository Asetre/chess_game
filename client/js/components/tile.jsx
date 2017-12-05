import React from 'react'
import Piece from './piece.jsx'
import {connect} from 'react-redux'
import * as actions from '../actions.js'
import * as Engine from '../chess_engine.js'

class Tile extends React.Component {
    constructor(props){
        super(props)
        this.tileClicked = this.tileClicked.bind(this)
        //For dynamic tile width
        this.state = {width: null}
    }

    componentDidMount() {
        //Set the current tile width
        this.setState(prev => {
            return  {
                width: this.myTile.offsetWidth
            }
        })
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
                Engine.movePiece(props.selectedPiece.position, props.index)

                let newTurn = props.playerTurn === 1 ? 0 : 1

                //update other players board
                socket.emit('move piece', {
                    board: Engine.board,
                    turn: props.playerTurn,
                    opponent: props.opponent,
                    oldLocation: oldPosition,
                    newLocation: props.index
                })
                //dispatch action
                props.movePiece(Engine.board)
                //check if any Kings in check
                //dispatch action
                props.changeTurn(newTurn)
                let inCheck = Engine.inCheck()
                if(inCheck) {
                    props.playerInCheck(inCheck)
                }
                //Check if the game is over
                let isGameOver = Engine.isGameOver()
                if(isGameOver || isGameOver === 0) {
                    socket.emit('game over', {
                        winner: isGameOver,
                        user: props.user,
                        opponent: props.opponentInfo,
                        userTeam: props.team,
                        opponentSocketId: props.opponent,
                        userSocketId: socket.id
                    })
                }
            }else return props.invalidMove()
        }
    }

    render() {
        let styles = {
            height: `${this.state.width}px`
        }
        let props = this.props

        return(
            <div ref={element => this.myTile = element} style={styles} className={"tile " + props.highlight + ' ' + this.props.inCheck} onClick={this.tileClicked}>
                <Piece piece={props.tile.piece} />
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    let highlight
    let inCheckHighlight
    if(state.inCheck && state.inCheckTiles.indexOf(ownProps.index) !== -1) {
        inCheckHighlight = 'in-check'
    }
    if(state.validMoves.indexOf(ownProps.index) !== -1) {
        highlight = 'highlight'
    }else highlight = null
    return {
        validMoves: state.validMoves,
        selectedPiece: state.selectedPiece,
        status: state.status,
        playerTurn: state.playerTurn,
        tile: state.board[ownProps.index],
        highlight: highlight,
        team: state.playerTeam,
        opponent: state.opponent,
        inCheck: inCheckHighlight,
        user: state.user,
        opponentInfo: state.opponentInfo
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
        playerInCheck: data => {
            dispatch(actions.playerInCheck(data))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Tile)
