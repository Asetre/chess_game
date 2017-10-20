import * as actions from './actions.js'
import * as Engine from './chess_engine.js'

export let initialBoardState = {
    board: [],
    validMoves: [],
    playerTurn: 1,
    selectedPiece: null,
    status: null,
    playerTeam: null,
    playerPieces: null,
}

export default function reducer(state=initialBoardState, action) {
    let payload = action.payload
    switch (action.type) {
        case actions.init_board:
        return Object.assign({}, state, {board: payload.board, status: 'idle'})
        
        case actions.find_moves:
        return Object.assign({}, state, {validMoves: payload.validMoves, selectedPiece: payload.piece, status: 'waiting for valid move'})

        case actions.invalid_move:
        return Object.assign({}, state, {validMoves: [], selectedPiece: null, status: 'idle'})

        case actions.move_piece:
        return Object.assign({}, state, {board: payload, selectedPiece: null, validMoves: [], status: 'idle'})

        case actions.change_turn:
        return Object.assign({}, state, {playerTurn: payload})

        default:
        return state
    }
}
